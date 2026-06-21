import { describe, it, expect } from "vitest";
import { validateEmail, validateUsername, validatePassword, validatePlanetState } from "./validation.ts";
import { PlanetState } from "./src/types.ts";

describe("Email Format Validation", () => {
  it("should validate correct email addresses", () => {
    expect(validateEmail("hanna@odyssey.org")).toBe(true);
    expect(validateEmail("explorer.one@planet.com")).toBe(true);
    expect(validateEmail("user+test@sub.domain.co.uk")).toBe(true);
  });

  it("should reject invalid email formats", () => {
    expect(validateEmail("hanna")).toBe(false);
    expect(validateEmail("@odyssey.org")).toBe(false);
    expect(validateEmail("hanna@")).toBe(false);
    expect(validateEmail("hanna @odyssey.org")).toBe(false);
    expect(validateEmail("a".repeat(151) + "@odyssey.org")).toBe(false);
  });
});

describe("Username Format Validation", () => {
  it("should validate alphanumeric usernames between 2 and 30 characters", () => {
    expect(validateUsername("pioneer")).toBe(true);
    expect(validateUsername("Pioneer 123")).toBe(true);
    expect(validateUsername("Eco-Bot_01")).toBe(true);
    expect(validateUsername("Soil Guardian")).toBe(true);
  });

  it("should reject invalid usernames", () => {
    expect(validateUsername("x")).toBe(false); // too short
    expect(validateUsername("a".repeat(31))).toBe(false); // too long
    expect(validateUsername("user#1")).toBe(false); // special char not in allowlist
    expect(validateUsername("")).toBe(false);
  });
});

describe("Password Complexity Validation", () => {
  it("should validate passwords between 6 and 128 characters", () => {
    expect(validatePassword("pass123")).toBe(true);
    expect(validatePassword("a".repeat(100))).toBe(true);
  });

  it("should reject too short or too long passwords", () => {
    expect(validatePassword("12345")).toBe(false);
    expect(validatePassword("a".repeat(130))).toBe(false);
    expect(validatePassword("")).toBe(false);
  });
});

describe("PlanetState Metric Boundary Validation", () => {
  const validState: PlanetState = {
    level: 15,
    xp: 20,
    xpNeeded: 100,
    carbonScore: 120,
    biodiversity: 35,
    health: 40,
    happiness: 55,
    airQuality: 50,
    waterQuality: 45,
    renewablePercent: 30,
    carbonSaved: 5000,
    ecoCoins: 400,
    gems: 25,
    credits: 0
  };

  it("should validate complete state inside normal bounds", () => {
    expect(validatePlanetState(validState)).toBe(true);
  });

  it("should reject level out of bounds", () => {
    expect(validatePlanetState({ ...validState, level: 0 })).toBe(false);
    expect(validatePlanetState({ ...validState, level: 101 })).toBe(false);
  });

  it("should reject negative metrics or currencies", () => {
    expect(validatePlanetState({ ...validState, carbonScore: -1 })).toBe(false);
    expect(validatePlanetState({ ...validState, ecoCoins: -100 })).toBe(false);
    expect(validatePlanetState({ ...validState, gems: -5 })).toBe(false);
    expect(validatePlanetState({ ...validState, xp: -1 })).toBe(false);
  });

  it("should reject index percentages exceeding 100%", () => {
    expect(validatePlanetState({ ...validState, biodiversity: 101 })).toBe(false);
    expect(validatePlanetState({ ...validState, health: 150 })).toBe(false);
    expect(validatePlanetState({ ...validState, happiness: 105 })).toBe(false);
  });
});
