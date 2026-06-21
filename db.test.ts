import { describe, it, expect, beforeAll } from "vitest";
import { hashPassword, registerUser, getUserByEmail, getUserState, syncUserState, initDB, useFallback, deleteUserForTest } from "./db.js";

beforeAll(async () => {
  // Initialize DB. This will set up connection or trigger useFallback = true automatically.
  await initDB();
  // Cleanup test user ID to avoid Primary Key duplicate errors across multiple test runs
  await deleteUserForTest("u_test_user_1");
});

describe("Password Hashing & Security", () => {
  it("should securely hash a password using email as a salt", () => {
    const email = "hanna@odyssey.org";
    const password = "password123";
    const hash = hashPassword(password, email);
    
    expect(hash).toBeDefined();
    expect(hash).toHaveLength(64); // SHA-256 is 64-chars hex
    expect(hash).not.toBe(password);
  });

  it("should generate different hashes for same password but different email salts", () => {
    const password = "mysecurepassword";
    const hash1 = hashPassword(password, "player1@odyssey.org");
    const hash2 = hashPassword(password, "player2@odyssey.org");
    
    expect(hash1).not.toBe(hash2);
  });

  it("should produce a consistent hash for the same email and password", () => {
    const password = "mysecurepassword";
    const email = "player@odyssey.org";
    const hash1 = hashPassword(password, email);
    const hash2 = hashPassword(password, email);
    
    expect(hash1).toBe(hash2);
  });
});

describe("Database CRUD Operations (Reliability & Sync Verification)", () => {
  it("should allow registering a user profile and retrieving it", async () => {
    const profile = {
      id: "u_test_user_1",
      username: "Greener",
      email: "greener@odyssey.org",
      avatar: "🦊",
      characterClass: "Wind Weaver",
      planetName: "Green Oasis",
      joinedAt: "6/21/2026",
      customPassword: "mypassword123"
    };

    const state = {
      level: 12,
      xp: 45,
      xpNeeded: 100,
      carbonScore: 140,
      biodiversity: 22,
      health: 30,
      happiness: 45,
      airQuality: 35,
      waterQuality: 28,
      renewablePercent: 15,
      carbonSaved: 12000,
      ecoCoins: 450,
      gems: 15,
      credits: 0
    };

    const items = [
      { id: "m_tree", purchasedCount: 3 },
      { id: "m_solar", purchasedCount: 1 }
    ];

    // Register
    await registerUser(profile, state, items);

    // Fetch user profile
    const user = await getUserByEmail(profile.email);
    expect(user).toBeDefined();
    expect(user.username).toBe(profile.username);
    
    // Hash must match
    const expectedHash = hashPassword(profile.customPassword, profile.email);
    expect(user.password).toBe(expectedHash);

    // Fetch user full state
    const userState = await getUserState(profile.id);
    expect(userState).toBeDefined();
    expect(userState?.profile.username).toBe(profile.username);
    expect(userState?.state.level).toBe(state.level);
    expect(userState?.state.carbonSaved).toBe(state.carbonSaved);
    
    // Check items mapping
    expect(userState?.items).toBeDefined();
    expect(userState?.items.length).toBeGreaterThanOrEqual(1);
  });

  it("should support updating and syncing user state dynamically", async () => {
    const userId = "u_test_user_1";
    const updatedState = {
      level: 13,
      xp: 10,
      xpNeeded: 100,
      carbonScore: 130,
      biodiversity: 25,
      health: 35,
      happiness: 50,
      airQuality: 40,
      waterQuality: 32,
      renewablePercent: 30,
      carbonSaved: 15000,
      ecoCoins: 200,
      gems: 17,
      credits: 0
    };

    const updatedItems = [
      { id: "m_tree", purchasedCount: 4 },
      { id: "m_solar", purchasedCount: 2 },
      { id: "m_wind", purchasedCount: 1 }
    ];

    // Sync
    await syncUserState(userId, updatedState, updatedItems);

    // Fetch and verify changes
    const userState = await getUserState(userId);
    expect(userState).toBeDefined();
    expect(userState?.state.level).toBe(13);
    expect(userState?.state.carbonScore).toBe(130);
    
    const treeItem = userState?.items.find((i: any) => i.id === "m_tree");
    expect(treeItem).toBeDefined();
    expect(treeItem?.purchasedCount).toBe(4);
  });

  it("should return null for non-existent users gracefully", async () => {
    const user = await getUserByEmail("nonexistent@example.com");
    expect(user).toBeNull();

    const state = await getUserState("u_nonexistent");
    expect(state).toBeNull();
  });
});
