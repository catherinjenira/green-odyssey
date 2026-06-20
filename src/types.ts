export interface PlanetState {
  level: number;
  xp: number;
  xpNeeded: number;
  carbonScore: number; // tons CO2/year (lower is better, start around 180)
  biodiversity: number; // 0-100%
  health: number; // 0-100% (overall planet rating)
  happiness: number; // 0-100% (population rating)
  airQuality: number; // 0-100%
  waterQuality: number; // 0-100%
  renewablePercent: number; // 0-100%
  carbonSaved: number; // kg of CO2 saved total
  ecoCoins: number;
  gems: number;
  credits: number;
}

export interface Choice {
  text: string;
  co2Impact: number; // change in carbonScore (negative is good reduction, e.g. -4)
  healthImpact: number; // change in planet health (positive is good)
  happinessImpact: number; // change in happiness
  biodiversityImpact: number; // change in biodiversity
  xpReward: number;
  coinReward: number;
  description: string;
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  prompt: string;
  choices: Choice[];
}

export interface MarketItem {
  id: string;
  name: string;
  category: "Nature" | "Wildlife" | "Infrastructure" | "Decorations";
  description: string;
  cost: number;
  costType: "ecoCoins" | "gems" | "credits";
  minLevel: number;
  healthBonus: number;
  biodiversityBonus: number;
  co2ReductionBonus: number; // carbon reduction impact per year
  purchasedCount: number;
}

export interface FriendPlanet {
  id: string;
  ranking: number;
  owner: string;
  planetName: string;
  level: number;
  carbonScore: number;
  health: number;
  likes: number;
  hasLiked?: boolean;
}

export interface WeeklyEvent {
  id: string;
  name: string;
  icon: string;
  description: string;
  challengeText: string;
  choices: Choice[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  icon: string;
}

export interface CitizenUser {
  id: string;
  username: string;
  email: string;
  avatar: string; // e.g. "🦊" | "🦉" | "🌿" | "🤖" | "👩‍🚀"
  characterClass: string; // e.g. "Soil Guardian" | "Wind Weaver"
  planetName: string;
  joinedAt: string;
  customPassword?: string;
}

