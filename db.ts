import mysql from "mysql2/promise";
import dotenv from "dotenv";
import crypto from "crypto";
import { CitizenUser, PlanetState } from "./src/types";

dotenv.config();

// Secure Salted Password Hashing
export function hashPassword(password: string, email: string): string {
  const salt = email.toLowerCase() + "_green_odyssey_salt_987";
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
}

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = parseInt(process.env.DB_PORT || "3306", 10);
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "Catherin@07";
const DB_NAME = process.env.DB_NAME || "green_odyssey";

let pool: mysql.Pool;

// Hybrid Fallback Storage
export let useFallback = false;
const fallbackUsers = new Map<string, any>(); // email -> user profile (password hashed)
const fallbackStates = new Map<string, any>(); // user_id -> planet_state
const fallbackItems = new Map<string, any[]>(); // user_id -> items array

export async function initDB() {
  try {
    // Attempt connection to local/cloud MySQL server
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      connectTimeout: 2500 // 2.5 seconds timeout
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await connection.end();

    // Create pool connection
    pool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      connectTimeout: 2500
    });

    // Test a connection get/release
    const testConn = await pool.getConnection();
    testConn.release();

    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        avatar VARCHAR(50) NOT NULL,
        character_class VARCHAR(100) NOT NULL,
        planet_name VARCHAR(150) NOT NULL,
        joined_at VARCHAR(50) NOT NULL
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS planet_states (
        user_id VARCHAR(50) PRIMARY KEY,
        level INT NOT NULL,
        xp INT NOT NULL,
        xp_needed INT NOT NULL,
        carbon_score DOUBLE NOT NULL,
        biodiversity DOUBLE NOT NULL,
        health DOUBLE NOT NULL,
        happiness DOUBLE NOT NULL,
        air_quality DOUBLE NOT NULL,
        water_quality DOUBLE NOT NULL,
        renewable_percent DOUBLE NOT NULL,
        carbon_saved DOUBLE NOT NULL,
        eco_coins INT NOT NULL,
        gems INT NOT NULL,
        credits INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_market_items (
        user_id VARCHAR(50),
        item_id VARCHAR(100),
        purchased_count INT NOT NULL DEFAULT 0,
        PRIMARY KEY (user_id, item_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log("MySQL database initialized successfully.");
  } catch (dbError) {
    console.warn("MySQL connection failed. Falling back to robust In-Memory database storage.", dbError.message || dbError);
    useFallback = true;
  }
}

export async function getUserByEmail(email: string) {
  if (useFallback) {
    const normalized = email.toLowerCase();
    return fallbackUsers.get(normalized) || null;
  }
  const [users] = await pool.query<any[]>("SELECT * FROM users WHERE LOWER(email) = LOWER(?)", [email]);
  if (users.length === 0) return null;
  return users[0];
}

export async function getUserState(userId: string) {
  if (useFallback) {
    let userObj = null;
    for (const u of fallbackUsers.values()) {
      if (u.id === userId) {
        userObj = u;
        break;
      }
    }
    if (!userObj) return null;

    const stateObj = fallbackStates.get(userId) || {
      level: 1,
      xp: 0,
      xpNeeded: 100,
      carbonScore: 180,
      biodiversity: 8,
      health: 12,
      happiness: 35,
      airQuality: 20,
      waterQuality: 15,
      renewablePercent: 0,
      carbonSaved: 0,
      ecoCoins: 200,
      gems: 10,
      credits: 0
    };
    
    const itemsArr = fallbackItems.get(userId) || [];

    return {
      profile: {
        id: userObj.id,
        username: userObj.username,
        email: userObj.email,
        avatar: userObj.avatar,
        characterClass: userObj.characterClass,
        planetName: userObj.planetName,
        joinedAt: userObj.joinedAt
      },
      state: stateObj,
      items: itemsArr
    };
  }

  const [users] = await pool.query<any[]>("SELECT * FROM users WHERE id = ?", [userId]);
  if (users.length === 0) return null;
  const user = users[0];

  const [states] = await pool.query<any[]>("SELECT * FROM planet_states WHERE user_id = ?", [userId]);
  const [items] = await pool.query<any[]>("SELECT * FROM user_market_items WHERE user_id = ?", [userId]);

  return {
    profile: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      characterClass: user.character_class,
      planetName: user.planet_name,
      joinedAt: user.joined_at
    },
    state: states[0] ? {
      level: states[0].level,
      xp: states[0].xp,
      xpNeeded: states[0].xp_needed,
      carbonScore: states[0].carbon_score,
      biodiversity: states[0].biodiversity,
      health: states[0].health,
      happiness: states[0].happiness,
      airQuality: states[0].air_quality,
      waterQuality: states[0].water_quality,
      renewablePercent: states[0].renewable_percent,
      carbonSaved: states[0].carbon_saved,
      ecoCoins: states[0].eco_coins,
      gems: states[0].gems,
      credits: states[0].credits
    } : null,
    items: items.map(itm => ({
      id: itm.item_id,
      purchasedCount: itm.purchased_count
    }))
  };
}

export async function registerUser(profile: CitizenUser, state: PlanetState, items: { id: string; purchasedCount: number }[]) {
  if (useFallback) {
    const hashedPass = hashPassword(profile.customPassword, profile.email);
    const savedProfile = {
      id: profile.id,
      username: profile.username,
      email: profile.email,
      password: hashedPass,
      avatar: profile.avatar,
      characterClass: profile.characterClass,
      planetName: profile.planetName,
      joinedAt: profile.joinedAt
    };
    fallbackUsers.set(profile.email.toLowerCase(), savedProfile);
    fallbackStates.set(profile.id, state);
    fallbackItems.set(profile.id, items.map(itm => ({ id: itm.id, purchasedCount: itm.purchasedCount })));
    return;
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      "INSERT INTO users (id, username, email, password, avatar, character_class, planet_name, joined_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        profile.id,
        profile.username,
        profile.email,
        hashPassword(profile.customPassword, profile.email),
        profile.avatar,
        profile.characterClass,
        profile.planetName,
        profile.joinedAt
      ]
    );

    await connection.query(
      "INSERT INTO planet_states (user_id, level, xp, xp_needed, carbon_score, biodiversity, health, happiness, air_quality, water_quality, renewable_percent, carbon_saved, eco_coins, gems, credits) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        profile.id,
        state.level,
        state.xp,
        state.xpNeeded,
        state.carbonScore,
        state.biodiversity,
        state.health,
        state.happiness,
        state.airQuality,
        state.waterQuality,
        state.renewablePercent,
        state.carbonSaved,
        state.ecoCoins,
        state.gems,
        state.credits
      ]
    );

    for (const item of items) {
      if (item.purchasedCount > 0) {
        await connection.query(
          "INSERT INTO user_market_items (user_id, item_id, purchased_count) VALUES (?, ?, ?)",
          [profile.id, item.id, item.purchasedCount]
        );
      }
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function syncUserState(userId: string, state: PlanetState, items: { id: string; purchasedCount: number }[]) {
  if (useFallback) {
    fallbackStates.set(userId, state);
    fallbackItems.set(userId, items.map(itm => ({ id: itm.id, purchasedCount: itm.purchasedCount })));
    return;
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      `UPDATE planet_states SET 
        level = ?, 
        xp = ?, 
        xp_needed = ?, 
        carbon_score = ?, 
        biodiversity = ?, 
        health = ?, 
        happiness = ?, 
        air_quality = ?, 
        water_quality = ?, 
        renewable_percent = ?, 
        carbon_saved = ?, 
        eco_coins = ?, 
        gems = ?, 
        credits = ?
      WHERE user_id = ?`,
      [
        state.level,
        state.xp,
        state.xpNeeded,
        state.carbonScore,
        state.biodiversity,
        state.health,
        state.happiness,
        state.airQuality,
        state.waterQuality,
        state.renewablePercent,
        state.carbonSaved,
        state.ecoCoins,
        state.gems,
        state.credits,
        userId
      ]
    );

    for (const item of items) {
      await connection.query(
        `INSERT INTO user_market_items (user_id, item_id, purchased_count) 
         VALUES (?, ?, ?) 
         ON DUPLICATE KEY UPDATE purchased_count = ?`,
        [userId, item.id, item.purchasedCount, item.purchasedCount]
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function deleteUserForTest(userId: string) {
  if (useFallback) {
    fallbackStates.delete(userId);
    fallbackItems.delete(userId);
    for (const [email, u] of fallbackUsers.entries()) {
      if (u.id === userId) {
        fallbackUsers.delete(email);
        break;
      }
    }
    return;
  }
  await pool.query("DELETE FROM users WHERE id = ?", [userId]);
}
