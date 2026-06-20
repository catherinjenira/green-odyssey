import { describe, it, expect } from "vitest";
import { hashPassword } from "./db";

describe("Password Hashing & Security", () => {
  it("should securely hash a password using email as a salt", () => {
    const email = "hanna@odyssey.org";
    const password = "password123";
    const hash = hashPassword(password, email);
    
    expect(hash).toBeDefined();
    expect(hash).toHaveLength(64); // SHA-256 produces a 64-character hexadecimal string
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
