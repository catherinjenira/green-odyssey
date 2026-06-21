import { PlanetState } from "./src/types.ts";

// Email validation regex (standard RFC 5322 compatible)
export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Username validation: Alphanumeric, underscores, spaces, dashes (2 to 30 characters)
export const usernameRegex = /^[a-zA-Z0-9 _-]{2,30}$/;

export function validateUsername(username: string): boolean {
  if (typeof username !== "string") return false;
  return usernameRegex.test(username);
}

export function validateEmail(email: string): boolean {
  if (typeof email !== "string") return false;
  if (email.length > 150) return false;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  if (typeof password !== "string") return false;
  return password.length >= 6 && password.length <= 128;
}

export function validatePlanetState(state: PlanetState): boolean {
  if (!state) return false;
  const numProps = [
    "level",
    "xp",
    "xpNeeded",
    "carbonScore",
    "biodiversity",
    "health",
    "happiness",
    "airQuality",
    "waterQuality",
    "renewablePercent",
    "carbonSaved",
    "ecoCoins",
    "gems",
    "credits"
  ];
  for (const prop of numProps) {
    const val = (state as any)[prop];
    if (typeof val !== "number" || isNaN(val) || val < 0) return false;
  }
  if (state.level < 1 || state.level > 100) return false;
  if (
    state.biodiversity > 100 ||
    state.health > 100 ||
    state.happiness > 100 ||
    state.airQuality > 100 ||
    state.waterQuality > 100 ||
    state.renewablePercent > 100
  ) {
    return false;
  }
  return true;
}
