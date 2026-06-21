import { useState, useEffect, FormEvent } from "react";
import {
  Globe,
  Trees,
  Heart,
  Zap,
  Building,
  Crown,
  Sparkles,
  Smile,
  Flame,
  Waves,
  Leaf,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingDown,
  Droplet,
  Wind,
  Info,
  Gift,
  Coins,
  Gem,
  Award,
  Users,
  SmilePlus,
  Compass,
  User,
  LogIn,
  LogOut,
  UserPlus,
  ShieldCheck,
  Mail,
  Key,
  Tag
} from "lucide-react";
import { PlanetCanvas } from "./components/PlanetCanvas";
import {
  INITIAL_CHALLENGES,
  INITIAL_MARKET_ITEMS,
  INITIAL_WEEKLY_EVENTS,
  INITIAL_ACHIEVEMENTS,
  SIMULATED_GALAXY_PLANETS
} from "./data";
import { PlanetState, Challenge, MarketItem, FriendPlanet, WeeklyEvent, Achievement, CitizenUser } from "./types";

const PREVIEW_COMPANIONS = [
  {
    name: "Moso (Panda)",
    avatar: "🐼",
    role: "Forests & Agriculture",
    color: "border-emerald-500 text-emerald-400 bg-emerald-950/40",
    bubbleColor: "bg-emerald-950/80 border-emerald-500 text-emerald-200",
    quote: "*yawn, munching on bamboo* Oh, hello! Did you know trees absorb carbon so softly? Let's plant more forests together! Try taking a quick walk or selecting Bicycles next time!",
    specialty: "Biodiversity & Soil Health restoration tips"
  },
  {
    name: "Bramble (Turtle)",
    avatar: "🐢",
    role: "Ocean & Water Purity",
    color: "border-cyan-500 text-cyan-400 bg-cyan-950/40",
    bubbleColor: "bg-cyan-950/80 border-cyan-500 text-cyan-200",
    quote: "*Blinks ocean-wise eyes* Water... is the mirror of our soul. Reduce plastic waste today to save my marine friends!",
    specialty: "Ocean plastic cleanups & wastewater purification"
  },
  {
    name: "Rusty (Fox)",
    avatar: "🦊",
    role: "Public Transit & Smart Grid",
    color: "border-amber-500 text-amber-400 bg-amber-950/40",
    bubbleColor: "bg-amber-950/80 border-amber-500 text-amber-200",
    quote: "*Yips with snappy excitement* Rusty here! Sleek work on keeping carbon low! Did you know riding a bicycle preserves XP and cuts emissions to zero? Clever choice!",
    specialty: "Smart urban setups & grid battery sharing hacks"
  },
  {
    name: "Chilly (Penguin)",
    avatar: "🐧",
    role: "Renewable Energy & Glaciers",
    color: "border-sky-500 text-sky-400 bg-sky-950/40",
    bubbleColor: "bg-sky-950/80 border-sky-500 text-sky-200",
    quote: "*Flaps flippers with concern* Keep the climate cool, please! If carbon hits high scores, our glaciers start weeping. We must expand renewable grids immediately. Can we use solar energy?",
    specialty: "Atmosphere monitoring & clean power grids"
  },
  {
    name: "Eco-9 (Robot)",
    avatar: "🤖",
    role: "Metrics & Carbon Capture",
    color: "border-purple-500 text-purple-400 bg-purple-950/40",
    bubbleColor: "bg-purple-950/80 border-purple-500 text-purple-200",
    quote: "[ECO-9 ONLINE] System diagnostics show planetary health is currently low. Integrating clean energy infrastructure will improve efficiency by 34.2%. Awaiting further inputs, Space Guardian!",
    specialty: "Advanced calculations & bio-gas recovery loops"
  }
];

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
}

function LandingPage({ onStart, onLogin }: LandingPageProps) {
  const [activeCompanion, setActiveCompanion] = useState<number>(0);
  
  const previewItems: MarketItem[] = INITIAL_MARKET_ITEMS.map((item) => {
    if (item.id === "m_tree") return { ...item, purchasedCount: 8 };
    if (item.id === "m_patch") return { ...item, purchasedCount: 6 };
    if (item.id === "m_lake") return { ...item, purchasedCount: 4 };
    if (item.id === "m_wind") return { ...item, purchasedCount: 3 };
    if (item.id === "m_solar") return { ...item, purchasedCount: 3 };
    if (item.id === "m_vertical") return { ...item, purchasedCount: 2 };
    if (item.id === "m_birds") return { ...item, purchasedCount: 4 };
    return { ...item, purchasedCount: 0 };
  });

  return (
    <div className="relative w-full text-slate-100 z-10 flex flex-col min-h-screen">
      {/* Frontpage Navigation */}
      <header className="w-full max-w-6xl mx-auto px-4 py-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-400 rounded-2xl border-4 border-slate-950 shadow-[3px_3px_0px_#000] flex items-center justify-center animate-pulse">
            <Globe className="w-6 h-6 text-slate-900" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider text-emerald-400 uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              Green Odyssey
            </h1>
            <p className="text-[9px] text-emerald-300/80 font-mono tracking-wide">
              Eco-companion & planet simulator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onLogin}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-black uppercase text-slate-300 hover:text-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          >
            Sign In
          </button>
          <button
            onClick={onStart}
            className="px-4 py-1.5 sm:px-5 sm:py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-black uppercase rounded-xl border-3 border-slate-950 shadow-[3px_3px_0px_#000] hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          >
            Get Passport
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold w-fit">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            New: Google Gemini Powered Companions
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-white uppercase drop-shadow-md">
            Evolve your own <span className="text-emerald-400 block sm:inline">Green Utopia</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Green Odyssey is an immersive planet evolution simulator where your daily sustainability choices directly shape a barren dust-rock into a thriving ecological paradise. Backed by state-of-the-art AI Companions that guide you through your journey.
          </p>

          {/* Quick Metrics Stats Bar */}
          <div className="grid grid-cols-3 gap-3 bg-slate-950/60 border-2 border-slate-850 p-4 rounded-2xl max-w-md shadow-inner backdrop-blur-xs">
            <div>
              <span className="block text-[8px] uppercase tracking-wider text-slate-500 font-bold">Max Stage</span>
              <span className="text-sm font-black text-amber-400 font-mono font-bold">Stage 100</span>
            </div>
            <div>
              <span className="block text-[8px] uppercase tracking-wider text-slate-500 font-bold">AI Advisors</span>
              <span className="text-sm font-black text-cyan-400 font-mono font-bold">5 Sectors</span>
            </div>
            <div>
              <span className="block text-[8px] uppercase tracking-wider text-slate-500 font-bold">Challenges</span>
              <span className="text-sm font-black text-purple-400 font-mono font-bold">50+ Quests</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
            <button
              onClick={onStart}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 text-xs font-black uppercase rounded-2xl border-4 border-slate-950 shadow-[4px_4px_0px_#000] hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            >
              Launch Your Odyssey
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
            <a
              href="#companions"
              className="px-6 py-3.5 border-3 border-slate-800 hover:border-slate-600 bg-slate-900/60 text-slate-300 hover:text-white text-xs font-black uppercase rounded-2xl text-center transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            >
              Meet Companions
            </a>
          </div>
        </div>

        {/* Live Spinning Preview Planet */}
        <div className="lg:col-span-6 flex justify-center relative">
          <div className="relative p-1 bg-gradient-to-tr from-slate-900 to-slate-950 border-4 border-slate-950 rounded-3xl shadow-2xl w-full max-w-[420px] aspect-square overflow-hidden group">
            <div className="absolute top-4 left-4 bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-emerald-300 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md z-20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE PREVIEW: STAGE 100 UTOPIA
            </div>
            
            <div className="absolute bottom-4 right-4 bg-slate-950/80 border border-slate-800 text-[9px] font-mono text-slate-400 px-3 py-1 rounded-full shadow-md z-20">
              🖱️ Drag to rotate sphere
            </div>

            <div className="w-full h-full scale-[1.02]">
              <PlanetCanvas
                level={100}
                health={98}
                biodiversity={95}
                waterQuality={95}
                airQuality={98}
                renewablePercent={100}
                happiness={98}
                marketItems={previewItems}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 border-t-2 border-slate-850">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2 mb-10">
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Core Mechanics</span>
          <h3 className="text-2xl font-black text-white uppercase">How The Simulation Works</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every action you take in the real world or decide inside our simulator changes the ecological equations of your personal planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border-2 border-slate-850 p-6 rounded-2xl shadow-md text-left flex flex-col gap-3 group hover:border-emerald-500/50 transition-colors">
            <div className="w-10 h-10 bg-emerald-950 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-white uppercase">1. Resolve Daily Quests</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Make decisions regarding transportation, agriculture, waste management, and energy generation. Watch the direct consequences on carbon emissions and ecosystem health.
            </p>
          </div>

          <div className="bg-slate-950/60 border-2 border-slate-850 p-6 rounded-2xl shadow-md text-left flex flex-col gap-3 group hover:border-amber-500/50 transition-colors">
            <div className="w-10 h-10 bg-amber-950 border border-amber-500/30 text-amber-400 rounded-xl flex items-center justify-center">
              <Trees className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-white uppercase">2. Build Your Sandbox</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use earned Eco-Coins to purchase specialized items from the Shop—like wind turbines, solar panels, and wildflower patches—to populate your planet in real-time.
            </p>
          </div>

          <div className="bg-slate-950/60 border-2 border-slate-850 p-6 rounded-2xl shadow-md text-left flex flex-col gap-3 group hover:border-cyan-500/50 transition-colors">
            <div className="w-10 h-10 bg-cyan-950 border border-cyan-500/30 text-cyan-400 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-white uppercase">3. Cooperate in the Galaxy</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore sibling worlds developed by other planetary guardians across the cosmos, send encouragement hearts, and strive for the top spots in the cosmic federation.
            </p>
          </div>
        </div>
      </section>

      {/* AI Companions Showcase */}
      <section id="companions" className="w-full max-w-6xl mx-auto px-4 py-12 border-t-2 border-slate-850 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.04),rgba(0,0,0,0))]">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2 mb-10">
          <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">Context-Aware Advisory</span>
          <h3 className="text-2xl font-black text-white uppercase">Meet Your AI Companions</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our five specialists are powered by Gemini 3.5 Flash. They read your planet state dynamically and offer custom advice to help clear atmospheric smog.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Companion selector list */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {PREVIEW_COMPANIONS.map((comp, idx) => (
              <button
                key={comp.name}
                onClick={() => setActiveCompanion(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent ${
                  activeCompanion === idx
                    ? `${comp.color} shadow-md`
                    : "border-slate-855 hover:border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="text-2xl">{comp.avatar}</span>
                <div className="flex-1">
                  <h4 className={`text-xs font-black uppercase ${activeCompanion === idx ? "" : "text-slate-300"}`}>
                    {comp.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">{comp.role}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Chat Speech bubble simulation */}
          <div className="lg:col-span-7 flex flex-col h-full justify-between">
            <div className="bg-slate-950/80 border-2 border-slate-850 rounded-3xl p-6 shadow-xl flex flex-col gap-4 text-left relative min-h-[220px]">
              <div className="absolute top-4 right-4 bg-slate-900 border border-slate-800 text-[8px] font-mono text-cyan-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Personality Matrix
              </div>
              
              <div className="flex items-center gap-3 border-b border-slate-900 pb-3">
                <span className="text-3xl">{PREVIEW_COMPANIONS[activeCompanion].avatar}</span>
                <div>
                  <h4 className="text-sm font-black text-white uppercase">
                    {PREVIEW_COMPANIONS[activeCompanion].name}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{PREVIEW_COMPANIONS[activeCompanion].role}</p>
                </div>
              </div>

              {/* Dynamic Speech bubble */}
              <div className={`p-4 rounded-2xl border-2 ${PREVIEW_COMPANIONS[activeCompanion].bubbleColor} flex-1 shadow-inner`}>
                <p className="text-xs leading-relaxed font-mono italic">
                  {PREVIEW_COMPANIONS[activeCompanion].quote}
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase mt-2 pt-2 border-t border-slate-900">
                <span>Specialization:</span>
                <span className="text-slate-300">{PREVIEW_COMPANIONS[activeCompanion].specialty}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-850 rounded-2xl mt-4 text-[10px] text-slate-400 leading-relaxed italic text-center">
              💡 Register below to chat with them live about your customized planet state variables!
            </div>
          </div>
        </div>
      </section>

      {/* Action Footer Call-to-Action */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-tr from-slate-950 to-slate-900 border-4 border-slate-950 rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl flex flex-col items-center gap-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <Globe className="w-12 h-12 text-emerald-400 animate-spin" style={{ animationDuration: '15s' }} />

          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase drop-shadow-md">
            Claim Your Citizen Passport
          </h3>
          
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
            Join the eco federation today. Register your passport, select your customized element class, name your utopian planet, and start tracking your carbon footprints!
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onStart}
              className="px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-black uppercase rounded-xl border-3 border-slate-950 shadow-[3px_3px_0px_#000] hover:scale-105 active:scale-95 transition-all text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            >
              Register Passport (Free)
            </button>
            <button
              onClick={onLogin}
              className="px-8 py-3.5 bg-slate-900 border-2 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-black uppercase rounded-xl text-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            >
              Sign In To Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-4 py-8 border-t border-slate-950 text-center text-[10px] text-slate-600 font-medium">
        <p>© 2026 Green Odyssey & The Planetary Federation. All space rights reserved.</p>
        <p className="mt-1 font-mono">Designed for Gamified Sustainability, powered by Google Gemini 3.5 Flash.</p>
      </footer>
    </div>
  );
}

export default function App() {
  // --- Citizen User Auth State ---
  const [currentUser, setCurrentUser] = useState<CitizenUser | null>(() => {
    const saved = localStorage.getItem("citizen_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(() => {
    const saved = localStorage.getItem("citizen_user");
    return !saved;
  });
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState<string>("");
  const [authPassword, setAuthPassword] = useState<string>("");
  const [authUsername, setAuthUsername] = useState<string>("");
  const [authAvatar, setAuthAvatar] = useState<string>("🦊");
  const [authClass, setAuthClass] = useState<string>("Soil Guardian");
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState<boolean>(false);

  // --- Game State ---
  const [planetState, setPlanetState] = useState<PlanetState>({
    level: 1,
    xp: 0,
    xpNeeded: 100,
    carbonScore: 180, // tons CO2/year -> Target is <= 60
    biodiversity: 8, // 0-100%
    health: 12, // 0-100%
    happiness: 35, // 0-100%
    airQuality: 20, // 0-100%
    waterQuality: 15, // 0-100%
    renewablePercent: 0, // 0-100%
    carbonSaved: 0, // kg total
    ecoCoins: 200,
    gems: 10,
    credits: 0
  });

  const [activeTab, setActiveTab] = useState<"quests" | "store" | "galaxy" | "badges">("quests");
  const [marketCategory, setMarketCategory] = useState<"Nature" | "Wildlife" | "Infrastructure">("Nature");
  const [marketItems, setMarketItems] = useState<MarketItem[]>(INITIAL_MARKET_ITEMS);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [galaxyPlanets, setGalaxyPlanets] = useState<FriendPlanet[]>(SIMULATED_GALAXY_PLANETS);

  // --- Challenges State ---
  const [challengePool] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [challengeResult, setChallengeResult] = useState<{
    choiceText: string;
    description: string;
    co2Change: number;
    healthChange: number;
    biodiversityChange: number;
    xpGained: number;
    coinsGained: number;
  } | null>(null);

  // --- Dynamic Level Level-Bands helper info ---
  const getLevelTier = (lvl: number) => {
    if (lvl === 100) return { name: "COSMIC GUARDIAN OF EARTH 🏆", desc: "A flawless, perfect green paradise!", color: "text-emerald-400 bg-emerald-950/80 border-emerald-500", glow: "shadow-2xl shadow-emerald-500/30" };
    if (lvl >= 81) return { name: "Green Champion 🌟", desc: "Brilliant pure air, blue water & lush wildlife", color: "text-green-400 bg-green-950/60 border-green-700", glow: "" };
    if (lvl >= 51) return { name: "Planetary Hero 🚀", desc: "Clean power grids & beautiful solar grids", color: "text-cyan-300 bg-cyan-950/40 border-cyan-800", glow: "" };
    if (lvl >= 21) return { name: "Forest Ranger 🌲", desc: "First trees emerging & animals returning", color: "text-amber-400 bg-amber-950/40 border-amber-800", glow: "" };
    if (lvl >= 6) return { name: "First Sprouts 🌱", desc: "Water returning and soil recovering", color: "text-lime-400 bg-lime-950/40 border-lime-850", glow: "" };
    return { name: "Dusty rock 🏜️", desc: "Dry, hot terrain. Plant grass and clean up soot!", color: "text-red-400 bg-red-950/40 border-red-900/50", glow: "" };
  };

  // --- Custom Notification state ---
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "level" } | null>(null);

  const showToast = (message: string, type: "success" | "info" | "level" = "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // --- Sign Up a New Citizen ---
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword || !authUsername) {
      showToast("⚠️ Please fill in all fields!", "info");
      return;
    }

    const newUser: CitizenUser = {
      id: "u_" + Math.random().toString(36).substr(2, 9),
      username: authUsername,
      email: authEmail,
      avatar: authAvatar,
      characterClass: authClass,
      planetName: authUsername + "'s Utopia",
      joinedAt: new Date().toLocaleDateString(),
      customPassword: authPassword
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: newUser,
          state: planetState,
          items: marketItems
        })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(`⚠️ ${data.error || "Registration failed!"}`, "info");
        return;
      }

      localStorage.setItem("citizen_user", JSON.stringify(newUser));
      setCurrentUser(newUser);
      setIsLoaded(true);
      setAuthModalOpen(false);
      showToast(`🎉 Welcome to the federation, Citizen ${authUsername}! 🚀`, "success");
    } catch (err) {
      console.error("Signup error:", err);
      showToast("❌ Connection error during registration!", "info");
    }
  };

  // --- Log In Existing Citizen ---
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      showToast("⚠️ Email and password required!", "info");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: authEmail,
          password: authPassword
        })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(`❌ ${data.error || "Login failed!"}`, "info");
        return;
      }

      localStorage.setItem("citizen_user", JSON.stringify(data.profile));
      setCurrentUser(data.profile);
      setPlanetState(data.state);
      
      if (data.items && data.items.length > 0) {
        const updatedItems = INITIAL_MARKET_ITEMS.map((item) => {
          const dbItem = data.items.find((x: any) => x.id === item.id);
          return {
            ...item,
            purchasedCount: dbItem ? dbItem.purchasedCount : 0
          };
        });
        setMarketItems(updatedItems);
      } else {
        setMarketItems(INITIAL_MARKET_ITEMS);
      }

      setIsLoaded(true);
      setAuthModalOpen(false);
      showToast(`💚 Welcome back, Citizen ${data.profile.username}!`, "success");
    } catch (err) {
      console.error("Login error:", err);
      showToast("❌ Connection error during login!", "info");
    }
  };

  // --- Sign Out / Reset to Guest ---
  const handleLogout = () => {
    localStorage.removeItem("citizen_user");
    setCurrentUser(null);
    setIsLoaded(true);
    setPlanetState({
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
    });
    setMarketItems(INITIAL_MARKET_ITEMS);
    showToast("👋 Signed out successfully. Switched to Guest model.", "info");
  };

  // --- Fetch saved database state on mount if logged in ---
  useEffect(() => {
    if (currentUser && !isLoaded) {
      const fetchState = async () => {
        try {
          const res = await fetch(`/api/user/state/${currentUser.id}`);
          if (res.ok) {
            const data = await res.json();
            if (data) {
              setPlanetState(data.state);
              if (data.items && data.items.length > 0) {
                const updatedItems = INITIAL_MARKET_ITEMS.map((item) => {
                  const dbItem = data.items.find((x: any) => x.id === item.id);
                  return {
                    ...item,
                    purchasedCount: dbItem ? dbItem.purchasedCount : 0
                  };
                });
                setMarketItems(updatedItems);
              }
            }
          } else {
            console.error("Failed to load user state from DB, signing out.");
            localStorage.removeItem("citizen_user");
            setCurrentUser(null);
          }
        } catch (err) {
          console.error("Error loading user state from DB:", err);
        } finally {
          setIsLoaded(true);
        }
      };
      fetchState();
    }
  }, []);

  // --- State changes autosave mechanism with 1.5s debounce ---
  useEffect(() => {
    if (currentUser && isLoaded) {
      const delayDebounceFn = setTimeout(() => {
        const syncState = async () => {
          try {
            const itemsToSync = marketItems.map(itm => ({
              id: itm.id,
              purchasedCount: itm.purchasedCount
            }));
            await fetch("/api/user/sync", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: currentUser.id,
                state: planetState,
                items: itemsToSync
              })
            });
          } catch (err) {
            console.error("Failed to auto-sync state with database:", err);
          }
        };
        syncState();
      }, 1500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [planetState, marketItems, currentUser, isLoaded]);

  // --- Level Cheat System (Allows previewing different visual bands) ---
  const handleSetCheatLevel = (targetLvl: number) => {
    let params = {
      level: targetLvl,
      xp: 0,
      xpNeeded: 100, // keep the 100 xpNeeded standardized
      carbonScore: 180,
      biodiversity: 5,
      health: 12,
      happiness: 30,
      airQuality: 20,
      waterQuality: 15,
      renewablePercent: 0,
      carbonSaved: targetLvl * 1500,
      ecoCoins: planetState.ecoCoins + 500,
      gems: planetState.gems + 15,
      credits: 0
    };

    if (targetLvl >= 100) {
      params.carbonScore = 12;
      params.biodiversity = 99;
      params.health = 100;
      params.happiness = 98;
      params.airQuality = 99;
      params.waterQuality = 99;
      params.renewablePercent = 100;
      params.gems += 50;
    } else if (targetLvl >= 80) {
      params.carbonScore = 28;
      params.biodiversity = 85;
      params.health = 88;
      params.happiness = 85;
      params.airQuality = 89;
      params.waterQuality = 85;
      params.renewablePercent = 90;
    } else if (targetLvl >= 60) {
      params.carbonScore = 48;
      params.biodiversity = 70;
      params.health = 74;
      params.happiness = 75;
      params.airQuality = 75;
      params.waterQuality = 72;
      params.renewablePercent = 70;
    } else if (targetLvl >= 40) {
      params.carbonScore = 95;
      params.biodiversity = 45;
      params.health = 52;
      params.happiness = 58;
      params.airQuality = 55;
      params.waterQuality = 48;
      params.renewablePercent = 35;
    } else if (targetLvl >= 20) {
      params.carbonScore = 140;
      params.biodiversity = 25;
      params.health = 32;
      params.happiness = 45;
      params.airQuality = 35;
      params.waterQuality = 28;
      params.renewablePercent = 15;
    } else if (targetLvl >= 5) {
      params.carbonScore = 170;
      params.biodiversity = 12;
      params.health = 20;
      params.happiness = 38;
      params.airQuality = 25;
      params.waterQuality = 18;
    }

    setPlanetState(params);
    setCurrentChallengeIndex(Math.max(0, Math.min(challengePool.length - 1, targetLvl - 1)));
    showToast(`✨ Teleported! Planet ecosystem morphed into Stage ${targetLvl}!`, "level");
  };

  // --- Check Achievements Unlocked ---
  useEffect(() => {
    const newlyUnlocked: string[] = [];

    setAchievements((prev) => {
      let isChanged = false;
      const next = prev.map((ach) => {
        if (ach.unlocked) return ach;
        let triggered = false;

        if (ach.id === "a1" && marketItems.some((itm) => itm.purchasedCount > 0)) {
          triggered = true;
        }
        if (ach.id === "a2" && planetState.biodiversity >= 50) {
          triggered = true;
        }
        if (ach.id === "a3") {
          const infraCount = marketItems
            .filter((i) => i.category === "Infrastructure")
            .reduce((sum, item) => sum + item.purchasedCount, 0);
          if (infraCount >= 3) triggered = true;
        }
        if (ach.id === "a4" && planetState.carbonScore <= 60) {
          triggered = true;
        }
        if (ach.id === "a5" && planetState.level >= 40) {
          triggered = true;
        }
        if (ach.id === "a6" && planetState.level >= 100) {
          triggered = true;
        }

        if (triggered) {
          newlyUnlocked.push(ach.title);
          isChanged = true;
          return {
            ...ach,
            unlocked: true,
            unlockedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          };
        }
        return ach;
      });

      return isChanged ? next : prev;
    });

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach((title) => {
        showToast(`🏆 UNLOCKED BRAND NEW BADGE: ${title}!`, "success");
      });
    }
  }, [planetState.biodiversity, planetState.carbonScore, planetState.level, marketItems]);

  // --- Carbon score bounds on clean air & pure water ---
  useEffect(() => {
    const calculatedAir = Math.min(100, Math.round(Math.max(5, 100 - (planetState.carbonScore * 0.45) + (planetState.renewablePercent * 0.2))));
    const calculatedWater = Math.min(100, Math.round(Math.max(5, (planetState.health * 0.8) + (planetState.biodiversity * 0.2))));

    if (calculatedAir !== planetState.airQuality || calculatedWater !== planetState.waterQuality) {
      setPlanetState((prev) => ({
        ...prev,
        airQuality: calculatedAir,
        waterQuality: calculatedWater
      }));
    }
  }, [planetState.carbonScore, planetState.renewablePercent, planetState.health, planetState.biodiversity]);

  // --- Handle Choice Selection in Challenges ---
  const handleSelectChoice = (choice: any) => {
    const co2Reduction = Math.abs(choice.co2Impact);
    const newSavedCarbon = planetState.carbonSaved + (co2Reduction * 100);

    const updatedCarbon = Math.max(8, planetState.carbonScore + choice.co2Impact);
    const updatedHealth = Math.min(100, Math.max(1, planetState.health + choice.healthImpact));
    const updatedHappiness = Math.min(100, Math.max(5, planetState.happiness + choice.happinessImpact));
    const updatedBiodiversity = Math.min(100, Math.max(1, planetState.biodiversity + choice.biodiversityImpact));

    const newLevel = Math.min(100, planetState.level + 1);
    let newXp = planetState.xp + choice.xpReward;
    const targetXp = 100;
    if (newXp >= targetXp) {
      newXp = newXp % targetXp;
    }

    if (newLevel > planetState.level) {
      showToast(`🎈 HOORAY! Evolved to Stage ${newLevel}! Awesome job! 🌟`, "level");
    }

    setPlanetState((prev) => ({
      ...prev,
      level: newLevel,
      xp: newXp,
      xpNeeded: targetXp,
      carbonScore: updatedCarbon,
      health: updatedHealth,
      happiness: updatedHappiness,
      biodiversity: updatedBiodiversity,
      carbonSaved: newSavedCarbon,
      ecoCoins: prev.ecoCoins + choice.coinReward,
      gems: prev.gems + (choice.xpReward > 50 ? 2 : 0)
    }));

    setChallengeResult({
      choiceText: choice.text,
      description: choice.description,
      co2Change: choice.co2Impact,
      healthChange: choice.healthImpact,
      biodiversityChange: choice.biodiversityImpact,
      xpGained: choice.xpReward,
      coinsGained: choice.coinReward
    });
  };

  const nextChallenge = () => {
    setChallengeResult(null);
    setCurrentChallengeIndex(Math.max(0, Math.min(challengePool.length - 1, planetState.level - 1)));
  };

  // --- Handle Toy Store Purchasing ---
  const handleBuyMarketItem = (item: MarketItem) => {
    if (planetState.level < item.minLevel) {
      showToast(`🔒 Unlock at Stage ${item.minLevel}! Keep playing to get this cool item!`, "info");
      return;
    }

    let paymentBalance = planetState.ecoCoins;
    if (item.costType === "gems") paymentBalance = planetState.gems;

    if (paymentBalance < item.cost) {
      showToast(`😢 Oops! You need more ${item.costType === "ecoCoins" ? "Eco Coins 🪙" : "Gems 💎"}!`, "info");
      return;
    }

    setPlanetState((prev) => {
      const nextCoins = item.costType === "ecoCoins" ? prev.ecoCoins - item.cost : prev.ecoCoins;
      const nextGems = item.costType === "gems" ? prev.gems - item.cost : prev.gems;

      const nextHealth = Math.min(100, prev.health + item.healthBonus);
      const nextBiodiversity = Math.min(100, prev.biodiversity + item.biodiversityBonus);
      const nextCarbon = Math.max(8, prev.carbonScore - item.co2ReductionBonus);

      let nextRenewable = prev.renewablePercent;
      if (item.category === "Infrastructure") {
        nextRenewable = Math.min(100, prev.renewablePercent + 15);
      }

      return {
        ...prev,
        ecoCoins: nextCoins,
        gems: nextGems,
        health: nextHealth,
        biodiversity: nextBiodiversity,
        carbonScore: nextCarbon,
        renewablePercent: nextRenewable
      };
    });

    setMarketItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, purchasedCount: i.purchasedCount + 1 } : i))
    );

    showToast(`🥳 Placed ${item.name}! Look! Your planet got healthier and greener! 🌲`, "success");
  };

  // --- Simple Support Star Button for other planets ---
  const handleLikePlanet = (planetId: string) => {
    setGalaxyPlanets((prev) =>
      prev.map((pl) => {
        if (pl.id === planetId) {
          const alreadyLiked = pl.hasLiked;
          return {
            ...pl,
            likes: alreadyLiked ? pl.likes - 1 : pl.likes + 1,
            hasLiked: !alreadyLiked
          };
        }
        return pl;
      })
    );
    showToast("💖 Sent a happy support cheer to our galactic sibling! ✨", "success");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-400 selection:text-slate-900 overflow-x-hidden pb-12">
      {/* Cartoon Sky Sparkles Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.12),rgba(0,0,0,0))] pointer-events-none z-0" />

      {!currentUser ? (
        <LandingPage
          onStart={() => {
            setAuthMode("register");
            setAuthModalOpen(true);
          }}
          onLogin={() => {
            setAuthMode("login");
            setAuthModalOpen(true);
          }}
        />
      ) : (
        <>
          {/* Retro Game Header */}
          <header className="relative border-b-4 border-slate-950 bg-slate-900 sticky top-0 z-40 px-4 py-4 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-400 rounded-2xl border-4 border-slate-950 shadow-[4px_4px_0px_#000] flex items-center justify-center animate-bounce">
              <Globe className="w-7 h-7 text-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-wider text-emerald-400 uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  Green Odyssey
                </h1>
              </div>
              <p className="text-xs text-emerald-300/80 font-mono tracking-wide">
                Build and nurture your own thriving green planet! 🌍🌿
              </p>
            </div>
          </div>

          {/* Quick World jump selectors with labels */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              ✨ Teleport to visual stages:
            </span>
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-slate-950 rounded-xl border-2 border-slate-800">
              <button
                onClick={() => handleSetCheatLevel(1)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent ${
                  planetState.level <= 10 ? "bg-red-500 text-slate-950" : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                }`}
              >
                1. Dusty 🏜️
              </button>
              <button
                onClick={() => handleSetCheatLevel(15)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent ${
                  planetState.level === 15 ? "bg-lime-400 text-slate-950" : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                }`}
              >
                15. Sprout 🌱
              </button>
              <button
                onClick={() => handleSetCheatLevel(40)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent ${
                  planetState.level === 40 ? "bg-amber-400 text-slate-950" : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                }`}
              >
                40. Village 🏡
              </button>
              <button
                onClick={() => handleSetCheatLevel(65)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent ${
                  planetState.level === 65 ? "bg-cyan-400 text-slate-950" : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                }`}
              >
                65. Net-Zero 🚲
              </button>
              <button
                onClick={() => handleSetCheatLevel(100)}
                className={`px-3 py-1 text-xs font-bold rounded-lg text-emerald-400 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent ${
                  planetState.level === 100 ? "bg-emerald-400 text-slate-950" : "bg-slate-900 hover:bg-slate-850"
                }`}
              >
                🏆 100. Utopia 🌈
              </button>
            </div>
          </div>

          {/* Money and rewards pocket bags */}
          <div className="flex items-center flex-wrap gap-3">
            {/* Citizen Auth Profile Card */}
            <div className="flex items-center gap-2">
              {currentUser ? (
                <button
                  type="button"
                  onClick={() => setLogoutConfirmOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/80 border-3 border-emerald-500 rounded-2xl shadow-[3px_3px_0px_#000] cursor-pointer hover:bg-emerald-900 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  title="Click to sign out of your Citizen account"
                >
                  <span className="text-xl animate-pulse">{currentUser.avatar}</span>
                  <div className="text-left">
                    <p className="text-[7px] uppercase font-black text-emerald-400 tracking-wider">Citizen ID</p>
                    <p className="text-xs font-black text-emerald-200 max-w-[80px] truncate">{currentUser.username}</p>
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => { setAuthMode("login"); setAuthModalOpen(true); }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 hover:bg-slate-850 hover:text-emerald-400 text-slate-300 border-3 border-slate-850 rounded-2xl shadow-[3px_3px_0px_#000] cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  title="Click to Register or Sign In to save progress"
                >
                  <User className="w-5 h-5 text-slate-400" />
                  <div className="text-left">
                    <p className="text-[7px] uppercase font-black text-slate-500 tracking-wider">Citizen Account</p>
                    <p className="text-xs font-black uppercase text-slate-200">Sign In</p>
                  </div>
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-950 border-3 border-slate-850 rounded-2xl shadow-[3px_3px_0px_#000]">
              <Coins className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <div>
                <p className="text-[8px] uppercase font-bold text-slate-500">Eco-Coins 🪙</p>
                <p className="text-sm font-black font-mono text-amber-300">{planetState.ecoCoins}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-950 border-3 border-slate-850 rounded-2xl shadow-[3px_3px_0px_#000]">
              <Gem className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-[8px] uppercase font-bold text-slate-500">Gems 💎</p>
                <p className="text-sm font-black font-mono text-purple-300">{planetState.gems}</p>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Main Grid: Clean, Playful, and Spaced out beautifully */}
      <main className="w-full max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* ==========================================
            LEFT SIDE: THE WORLD VIEWER & TOY STATS (6 cols)
           ========================================== */}
        <section className="col-span-1 lg:col-span-6 flex flex-col gap-6" id="kids_screen_planet_view">
          <h2 className="sr-only">Planet Overview and Metrics</h2>
          
          {/* Unified Console Panel containing Canvas and Metrics */}
          <div className="bg-slate-900 border-4 border-slate-950 rounded-3xl p-5 shadow-[6px_6px_0px_#000] relative flex flex-col gap-5">
            
            {/* Round info ribbon */}
            <div className="flex justify-between items-center">
              <span className="bg-slate-950 border-2 border-slate-800 text-xs font-mono font-bold text-emerald-300 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[2px_2px_0px_#000]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ECO SYSTEM SPHERE
              </span>
              <span className="text-xs font-black text-amber-400 bg-slate-950 px-3 py-1 rounded-full border-2 border-slate-800 w-fit shrink-0">
                ⭐ Stage {planetState.level} / 100
              </span>
            </div>

            {/* Interactive rotatable sandbox stage */}
            <div className="h-[370px] w-full bg-slate-950 rounded-2xl relative overflow-hidden border-4 border-slate-950">
              <PlanetCanvas
                level={planetState.level}
                health={planetState.health}
                biodiversity={planetState.biodiversity}
                waterQuality={planetState.waterQuality}
                airQuality={planetState.airQuality}
                renewablePercent={planetState.renewablePercent}
                happiness={planetState.happiness}
                marketItems={marketItems}
              />
            </div>

            {/* Kid Friendly XP bar */}
            <div className="bg-slate-950 rounded-2xl p-4 border-2 border-slate-850">
              <div className="flex justify-between items-center text-xs font-bold text-slate-200 mb-1.5">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  Eco Progression Level-Up Point
                </span>
                <span className="font-mono text-amber-300">
                  {planetState.xp} / {planetState.xpNeeded} XP
                </span>
              </div>
              
              {/* Thick round loading progress bar */}
              <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden border-2 border-slate-950 shadow-[1px_1px_0px_rgba(255,255,255,0.05)]">
                <div
                  className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (planetState.xp / planetState.xpNeeded) * 100)}%` }}
                />
              </div>

              {/* Colorful active label */}
              <div className="mt-3 pt-3 border-t border-slate-900 flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">
                  Current Era Title:
                </span>
                <span className={`text-sm font-extrabold capitalize flex items-center gap-1.5 ${getLevelTier(planetState.level).color}`}>
                  {getLevelTier(planetState.level).name}
                </span>
                <p className="text-xs text-slate-400">
                  {getLevelTier(planetState.level).desc}
                </p>
              </div>
            </div>

            {/* Retro dashed separator to group the live metrics cleanly within the same console */}
            <div className="border-t-2 border-dashed border-slate-950/40 my-1 relative">
              <span className="absolute -top-2 left-4 bg-slate-900 px-2 text-[9px] uppercase font-bold tracking-wider text-slate-400">
                Atmosphere Core
              </span>
            </div>

            {/* Integrated Planet Eco Metrics */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-black tracking-widest uppercase text-slate-400 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                🌍 PLANET ECO METRICS
              </h3>

              <div className="grid grid-cols-2 gap-4">
                
                {/* Carbon Emissions index */}
                <div className="bg-slate-950 border-2 border-slate-850 rounded-2xl p-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-extrabold text-slate-500">
                      Smoke emissions 💨
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className={`text-2xl font-black font-mono ${planetState.carbonScore <= 60 ? "text-emerald-400" : planetState.carbonScore <= 120 ? "text-yellow-400" : "text-red-400"}`}>
                        {planetState.carbonScore.toFixed(0)}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">Tons/Year</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">
                    Make it <span className="text-emerald-400 font-bold font-mono">&lt;= 60</span> for happy clear weather!
                  </p>
                </div>

                {/* Total Carbon Saved */}
                <div className="bg-slate-950 border-2 border-slate-850 rounded-2xl p-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-extrabold text-slate-500">
                      CO2 Scrubbed 🍃
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black font-mono text-emerald-400">
                        {Math.round(planetState.carbonSaved).toLocaleString()}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">KG</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">
                    Total bad carbon locked away forever!
                  </p>
                </div>

                {/* Planet Health Progress Card */}
                <div className="bg-slate-950 border-2 border-slate-850 rounded-2xl p-3.5 col-span-2">
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <span className="text-slate-300 flex items-center gap-1.5">💚 Water & Land Health</span>
                    <span className="text-emerald-400">{planetState.health}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border-2 border-slate-950">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-350"
                      style={{ width: `${planetState.health}%` }}
                    />
                  </div>
                </div>

                {/* Biodiversity Index */}
                <div className="bg-slate-950 border-2 border-slate-850 rounded-2xl p-3.5 col-span-2">
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <span className="text-slate-300 flex items-center gap-1.5">🦋 Wildlife & Songbirds returning</span>
                    <span className="text-cyan-400">{planetState.biodiversity}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border-2 border-slate-950">
                    <div
                      className="bg-cyan-400 h-full rounded-full transition-all duration-350"
                      style={{ width: `${planetState.biodiversity}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Miniature Climate badges (Air, Water, Renewable percentage) */}
              <div className="pt-4 border-t border-slate-950 grid grid-cols-3 gap-2">
                
                <div className="text-center bg-slate-950 p-2.5 rounded-xl border border-slate-850 flex flex-col items-center">
                  <Wind className="w-5 h-5 text-sky-400 mb-1" />
                  <span className="text-[9px] text-slate-500 font-bold uppercase">Air Quality</span>
                  <p className="text-xs font-black text-slate-200 mt-0.5">{planetState.airQuality}%</p>
                </div>

                <div className="text-center bg-slate-950 p-2.5 rounded-xl border border-slate-850 flex flex-col items-center">
                  <Droplet className="w-5 h-5 text-blue-400 mb-1" />
                  <span className="text-[9px] text-slate-500 font-bold uppercase">Water Purity</span>
                  <p className="text-xs font-black text-slate-200 mt-0.5">{planetState.waterQuality}%</p>
                </div>

                <div className="text-center bg-slate-950 p-2.5 rounded-xl border border-slate-850 flex flex-col items-center">
                  <Zap className="w-5 h-5 text-yellow-400 animate-pulse mb-1" />
                  <span className="text-[9px] text-slate-500 font-bold uppercase">Green Power</span>
                  <p className="text-xs font-black text-slate-200 mt-0.5">{planetState.renewablePercent}%</p>
                </div>

              </div>

              {/* Overall citizen smile scale */}
              <div className="p-3 bg-slate-950 text-slate-200 rounded-2xl flex items-center justify-between border-2 border-slate-850">
                <div className="flex items-center gap-2">
                  <Smile className="w-6 h-6 text-yellow-400 shrink-0" />
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-200">Citizen Happiness</h4>
                    <p className="text-[10px] text-slate-400">Are they liking the planet climate?</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-yellow-300">{planetState.happiness}%</span>
                  <span className="block text-[8px] uppercase tracking-wide text-emerald-400 font-bold">
                    {planetState.happiness >= 80 ? "💖 Eco Paradise" : planetState.happiness >= 50 ? "🙂 Coexistence" : "😷 Sooty stress"}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ==========================================
            RIGHT SIDE: QUESTS, TOYSTORE, GALAXY & AVATARS (6 cols)
           ========================================== */}
        <section className="col-span-1 lg:col-span-6 flex flex-col gap-6" id="kids_screen_game_controls">
          <h2 className="sr-only">Ecosystem Dashboard & Quests</h2>
          
          {/* Main Playful Interactive Tab Switchers */}
          <div className="flex bg-slate-950 rounded-2xl p-1.5 border-4 border-slate-950 shadow-[4px_4px_0px_#000]">
            <button
              onClick={() => { setActiveTab("quests"); setChallengeResult(null); }}
              className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-black transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent ${
                activeTab === "quests" ? "bg-emerald-400 text-slate-950 shadow-[2px_2px_0px_#000]" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Leaf className="w-4 h-4 shrink-0" />
              Daily Quests 🧭
            </button>
            <button
              onClick={() => setActiveTab("store")}
              className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-black transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent ${
                activeTab === "store" ? "bg-amber-400 text-slate-950 shadow-[2px_2px_0px_#000]" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Trees className="w-4 h-4 shrink-0" />
              Eco Shop 🌲
            </button>
            <button
              onClick={() => setActiveTab("galaxy")}
              className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-black transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent ${
                activeTab === "galaxy" ? "bg-cyan-400 text-slate-950 shadow-[2px_2px_0px_#000]" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              Galaxy kids 🌟
            </button>
            <button
              onClick={() => setActiveTab("badges")}
              className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-black transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent ${
                activeTab === "badges" ? "bg-purple-400 text-slate-950 shadow-[2px_2px_0px_#000]" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Crown className="w-4 h-4 shrink-0" />
              Badges 🏆
            </button>
          </div>

          {/* ACTIVE TAB CONTENT WINDOW */}
          <div className="bg-slate-900 border-4 border-slate-950 rounded-3xl p-5 shadow-[6px_6px_0px_#000] min-h-[440px] flex flex-col">
            
            {/* TAB 1: DAILY QUESTS */}
            {activeTab === "quests" && (
              <div className="flex-1 flex flex-col justify-between">
                {!challengeResult ? (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                        QUEST DIRECTIVE
                      </span>
                      <span className="text-xs text-slate-400 font-bold">
                        Mission {currentChallengeIndex + 1} of {challengePool.length}
                      </span>
                    </div>

                    <h4 className="text-lg font-black text-slate-100 leading-snug drop-shadow-sm">
                      {challengePool[currentChallengeIndex].title}
                    </h4>

                    <p className="text-xs text-slate-200 mt-3 leading-relaxed bg-slate-950 border-l-4 border-emerald-400 p-4 rounded-xl shadow-inner">
                      {challengePool[currentChallengeIndex].prompt}
                    </p>

                    {/* Highly clickable options list for kids */}
                    <div className="mt-5 flex flex-col gap-3">
                      {challengePool[currentChallengeIndex].choices.map((choice, idx) => {
                        const isSafe = choice.co2Impact <= 0;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectChoice(choice)}
                            className="w-full text-left bg-slate-950/80 hover:bg-slate-950 hover:border-emerald-400 border-2 border-slate-855 p-4 rounded-2xl transition-all group active:scale-98 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                          >
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                              <span className="text-sm font-extrabold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-slate-800 text-center text-xs text-slate-400 leading-5">
                                  {idx + 1}
                                </span>
                                {choice.text}
                              </span>
                              
                              {/* Option indicators */}
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                                  isSafe ? "bg-emerald-950 text-emerald-400 border border-emerald-800/40" : "bg-red-950/80 text-red-400 border border-red-900/40"
                                }`}>
                                  Smoke: {choice.co2Impact > 0 ? "+" : ""}{choice.co2Impact} tons
                                </span>
                                <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                                  +{choice.coinReward} Coins
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-xs text-slate-400 mt-2.5 italic pl-7 border-l border-slate-850">
                              {choice.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // Result state
                  <div className="text-center py-6 flex-1 flex flex-col justify-center">
                    <div className="w-16 h-16 bg-emerald-950 border-4 border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 scale-up">
                      <CheckCircle2 className="w-8 h-8 animate-pulse" />
                    </div>

                    <span className="text-[10px] uppercase font-mono px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 inline-block mx-auto font-bold border border-emerald-900">
                      DECISION RECEIVED
                    </span>

                    <h4 className="text-base font-black text-slate-100 mt-3 leading-snug">
                      Your requested choice: &quot;{challengeResult.choiceText}&quot;
                    </h4>

                    <p className="my-4 bg-slate-950 p-4 rounded-2xl border-2 border-slate-850 text-xs text-slate-300 leading-relaxed max-w-lg mx-auto text-center">
                      {challengeResult.description}
                    </p>

                    {/* Stats display box */}
                    <div className="grid grid-cols-3 gap-3 p-3 bg-slate-950 rounded-2xl max-w-md mx-auto border border-slate-850 mb-6 shadow-md">
                      <div>
                        <span className="block text-[8px] uppercase tracking-wide text-slate-500 font-black">Emissions change</span>
                        <span className={`text-xs font-mono font-black ${challengeResult.co2Change <= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {challengeResult.co2Change > 0 ? "+" : ""}{challengeResult.co2Change.toFixed(1)} tons
                        </span>
                      </div>
                      
                      <div>
                        <span className="block text-[8px] uppercase tracking-wide text-slate-500 font-black">Planet Health</span>
                        <span className={`text-xs font-mono font-black ${challengeResult.healthChange >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {challengeResult.healthChange > 0 ? "+" : ""}{challengeResult.healthChange}%
                        </span>
                      </div>

                      <div>
                        <span className="block text-[8px] uppercase tracking-wide text-slate-500 font-black">Rewards Gained</span>
                        <span className="text-xs font-black text-amber-300 block">
                          +{challengeResult.coinsGained} Coins
                        </span>
                        <span className="text-[10px] text-yellow-400 font-black">
                          +{challengeResult.xpGained} XP Point
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={nextChallenge}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 text-xs font-extrabold rounded-2xl shadow-[4px_4px_0px_#000] active:translate-y-1 transition-all flex items-center justify-center gap-2 mx-auto focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    >
                      Retrieve Next Adventure!
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ECO TOY STORE */}
            {activeTab === "store" && (
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase font-black text-amber-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800 font-mono">
                    Eco Market Marketplace
                  </span>
                  <div className="flex gap-1.5 p-0.5 bg-slate-950 rounded-xl border border-slate-800">
                    {(["Nature", "Wildlife", "Infrastructure"] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setMarketCategory(cat)}
                        className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent ${
                          marketCategory === cat ? "bg-amber-400 text-slate-950 shadow-sm" : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid of clean store cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[380px] pr-1">
                  {marketItems
                    .filter((item) => item.category === marketCategory)
                    .map((item) => {
                      const isLocked = planetState.level < item.minLevel;
                      const hasPurchased = item.purchasedCount > 0;
                      
                      return (
                        <div
                          key={item.id}
                          className={`relative border-2 rounded-2xl p-4 bg-slate-950 flex flex-col justify-between transition-all ${
                            isLocked
                              ? "border-slate-900 opacity-60"
                              : "border-slate-800 hover:border-amber-400"
                          }`}
                        >
                          {/* Locked Shield indicator */}
                          {isLocked && (
                            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-center p-3 z-10">
                              <Lock className="w-6 h-6 text-slate-400 mb-1" />
                              <p className="text-[10px] uppercase font-black text-slate-300 font-mono">Planet Level {item.minLevel} required</p>
                              <p className="text-[9px] text-slate-500 mt-0.5">Solve more quests to gain permission!</p>
                            </div>
                          )}

                          {/* Item Icon Badge */}
                          <div className="flex justify-between items-start">
                            <span className="text-2xl">
                              {item.id.includes("tree") || item.id.includes("patch") ? "🌲" : 
                               item.id.includes("lake") ? "🏞️" : 
                               item.id.includes("coral") ? "🪸" : 
                               item.id.includes("vertical") ? "🏢" : 
                               item.id.includes("birds") ? "🐦" : 
                               item.id.includes("deer") ? "🦌" : 
                               item.id.includes("bees") ? "🐝" : 
                               item.id.includes("monarch") ? "🦋" : 
                               item.id.includes("whale") ? "🐋" : 
                               item.id.includes("solar") ? "☀️" : 
                               item.id.includes("wind") ? "🌀" : 
                               item.id.includes("recycle") ? "⚙️" : 
                               item.id.includes("algae") ? "🧪" : "🌟"}
                            </span>
                            
                            {hasPurchased && (
                              <span className="text-[9px] font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800">
                                Active toys: {item.purchasedCount}
                              </span>
                            )}
                          </div>

                          <div className="mt-2.5">
                            <h5 className="text-sm font-black text-slate-100">{item.name}</h5>
                            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                              {item.description}
                            </p>
                          </div>

                          {/* Bonuses applied when purchased */}
                          <div className="mt-3 pt-2 border-t border-slate-900 grid grid-cols-2 gap-1.5 text-[9px] font-bold text-slate-400">
                            <span className="text-emerald-400">❤️ Health bonus: +{item.healthBonus}%</span>
                            <span className="text-cyan-400">🦋 Wildlife: +{item.biodiversityBonus}%</span>
                            <span className="text-purple-400 col-span-2">🍃 Carbon scrubbed: -{item.co2ReductionBonus} tons/y</span>
                          </div>

                          {/* Click item buy action button */}
                          <button
                            onClick={() => handleBuyMarketItem(item)}
                            className="mt-4 w-full py-2 bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-amber-300 font-extrabold text-xs rounded-xl border-2 border-slate-800 hover:border-slate-950 active:scale-95 transition-all text-center flex items-center justify-center gap-1 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                          >
                            <span>Buy for:</span>
                            <span className="font-mono text-xs">{item.cost} {item.costType === "gems" ? "💎" : "🪙"}</span>
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* TAB 3: GALAXY INHABITANTS */}
            {activeTab === "galaxy" && (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-cyan-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800 font-mono">
                    Galaxy Kid ranking
                  </span>
                  
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed pl-1">
                    Send support rating stars across the cosmos! Other kids are trying hard to make their planets green too. 💫
                  </p>

                  <div className="mt-4 flex flex-col gap-2.5 max-h-[310px] overflow-y-auto pr-1">
                    {galaxyPlanets.map((pl) => (
                      <div
                        key={pl.id}
                        className="bg-slate-950 border border-slate-850 hover:border-cyan-400/50 p-3 rounded-2xl flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {pl.ranking === 1 ? "🥇" : pl.ranking === 2 ? "🥈" : pl.ranking === 3 ? "🥉" : "🌍"}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-xs font-black text-white">{pl.planetName}</h5>
                              <span className="text-[9px] uppercase font-bold text-slate-500 font-mono">by {pl.owner}</span>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-0.5 font-medium">
                              <span>Stage level: <strong className="text-slate-200">{pl.level}</strong></span>
                              <span>Smoke: <strong className="text-emerald-400">{pl.carbonScore} tons</strong></span>
                              <span>Health: <strong className="text-cyan-400">{pl.health}%</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* Send love dynamic button */}
                        <button
                          onClick={() => handleLikePlanet(pl.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent ${
                            pl.hasLiked
                              ? "bg-rose-950 border border-rose-500 text-rose-300"
                              : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-rose-400 hover:bg-rose-950/40"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${pl.hasLiked ? "fill-rose-500 text-rose-500 text-rose-400" : ""}`} />
                          <span className="font-mono">{pl.likes}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 text-center text-[10px] text-slate-400 italic">
                  🌟 Want to submit your planet? Upload scores automatically when hitting Level 100 on Odyssey!
                </div>
              </div>
            )}

            {/* TAB 4: MY BADGES / ACHIEVEMENTS */}
            {activeTab === "badges" && (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-purple-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800 font-mono">
                    My Trophy badges
                  </span>
                  
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed pl-1">
                    Complete milestones in Green Odyssey to showcase rare dynamic stamps on your display shelf!
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 overflow-y-auto max-h-[300px]">
                    {achievements.map((ach) => (
                      <div
                        key={ach.id}
                        className={`border-2 rounded-2xl p-3 flex flex-col items-center text-center justify-between transition-all ${
                          ach.unlocked
                            ? "bg-slate-950 border-purple-500 shadow-md shadow-purple-500/5 text-slate-100"
                            : "bg-slate-900/40 border-slate-850 text-slate-500"
                        }`}
                      >
                        <div className="text-3xl filter drop-shadow-md mb-2">
                          {ach.unlocked ? (
                            ach.id === "a1" ? "🌱" :
                            ach.id === "a2" ? "🦊" :
                            ach.id === "a3" ? "⚡" :
                            ach.id === "a4" ? "📉" :
                            ach.id === "a5" ? "🏡" : "🏆"
                          ) : (
                            "🔒"
                          )}
                        </div>

                        <h6 className="text-[11px] font-extrabold truncate w-full">{ach.title}</h6>
                        
                        <p className="text-[9px] text-slate-400 mt-1 leading-snug h-[45px] overflow-hidden">
                          {ach.description}
                        </p>

                        <div className="mt-2.5 w-full">
                          {ach.unlocked ? (
                            <span className="text-[8px] uppercase font-mono bg-purple-950 text-purple-300 border border-purple-900/50 px-2 py-0.5 rounded-md font-bold">
                              Unlocked at {ach.unlockedAt || "12:00"}
                            </span>
                          ) : (
                            <span className="text-[8px] uppercase font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded-md font-bold">
                              Locked
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total badge progress counter */}
                <div className="bg-slate-950 border border-slate-900/80 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Unlocked Badge Ratio:</span>
                  <span className="text-sm font-black font-mono text-purple-400">
                    {achievements.filter((a) => a.unlocked).length} / {achievements.length} Badges
                  </span>
                </div>
              </div>
            )}

          </div>

        </section>

      </main>
        </>
      )}

      {/* CITIZEN LOGIN & REGISTRATION MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div 
            className="w-full max-w-md bg-slate-900 border-4 border-slate-950 rounded-3xl p-6 shadow-[8px_8px_0px_#000] relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Tabs */}
            <div className="flex items-center gap-1.5 justify-between border-b-2 border-slate-950 pb-4 mb-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className={`px-3 py-1.5 text-xs font-black uppercase rounded-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent ${
                    authMode === "login" 
                      ? "bg-slate-800 text-emerald-400 border border-slate-700" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode("register")}
                  className={`px-3 py-1.5 text-xs font-black uppercase rounded-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent ${
                    authMode === "register" 
                      ? "bg-slate-800 text-emerald-400 border border-slate-700" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Register
                </button>
              </div>

              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-950 text-slate-400 hover:text-slate-200 border-2 border-slate-855 hover:border-slate-500 hover:bg-slate-900 transition-colors flex items-center justify-center font-bold text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              >
                ✕
              </button>
            </div>

            {/* Modal Description */}
            <div className="mb-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {authMode === "login" ? "Citizen Portal Identity" : "New Eco Registry"}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {authMode === "login" 
                  ? "Enter your credentials to reload your saved virtual worlds, items, and progression level."
                  : "Join the Eco Federation! Pick your class and avatar to claim your customized Citizen Passport."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={authMode === "login" ? handleLogin : handleSignup} className="space-y-4">
              {authMode === "register" && (
                <div>
                  <label htmlFor="auth-username" className="block text-[10px] uppercase font-black text-slate-400 tracking-wide mb-1">
                    Citizen Username
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      id="auth-username"
                      type="text"
                      required
                      placeholder="e.g. Hanna"
                      value={authUsername}
                      onChange={(e) => setAuthUsername(e.target.value)}
                      className="w-full bg-slate-950 border-2 border-slate-850 focus:border-transparent focus:ring-2 focus:ring-emerald-400 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 outline-none placeholder-slate-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="auth-email" className="block text-[10px] uppercase font-black text-slate-400 tracking-wide mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    id="auth-email"
                    type="email"
                    required
                    placeholder="hanna@odyssey.org"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full bg-slate-950 border-2 border-slate-850 focus:border-transparent focus:ring-2 focus:ring-emerald-400 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 outline-none placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="auth-password" className="block text-[10px] uppercase font-black text-slate-400 tracking-wide mb-1">
                  Access Code (Password)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500">
                    <Key className="w-4 h-4" />
                  </span>
                  <input
                    id="auth-password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-slate-950 border-2 border-slate-850 focus:border-transparent focus:ring-2 focus:ring-emerald-400 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 outline-none placeholder-slate-500"
                  />
                </div>
              </div>

              {authMode === "register" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="auth-avatar" className="block text-[10px] uppercase font-black text-slate-400 tracking-wide mb-1">
                      Choose Avatar
                    </label>
                    <select
                      id="auth-avatar"
                      value={authAvatar}
                      onChange={(e) => setAuthAvatar(e.target.value)}
                      className="w-full bg-slate-950 border-2 border-slate-850 focus:border-transparent focus:ring-2 focus:ring-emerald-400 rounded-xl p-2 text-xs text-slate-100 outline-none cursor-pointer"
                    >
                      <option value="🦊">🦊 Eco-Fox</option>
                      <option value="🦉">🦉 Wise Owl</option>
                      <option value="🌿">🌿 Sprout</option>
                      <option value="🤖">🤖 Eco-Bot</option>
                      <option value="👩‍🚀">👩‍🚀 Pioneer</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="auth-class" className="block text-[10px] uppercase font-black text-slate-400 tracking-wide mb-1">
                      Eco Class
                    </label>
                    <select
                      id="auth-class"
                      value={authClass}
                      onChange={(e) => setAuthClass(e.target.value)}
                      className="w-full bg-slate-950 border-2 border-slate-850 focus:border-transparent focus:ring-2 focus:ring-emerald-400 rounded-xl p-2 text-xs text-slate-100 outline-none cursor-pointer"
                    >
                      <option value="Soil Guardian">Soil Guardian</option>
                      <option value="Wind Weaver">Wind Weaver</option>
                      <option value="Solar Scribe">Solar Scribe</option>
                      <option value="Eco Chemist">Eco Chemist</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              >
                {authMode === "login" ? "Confirm Entry" : "Create Passport"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CITIZEN LOGOUT CONFIRMATION MODAL */}
      {logoutConfirmOpen && currentUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div 
            className="w-full max-w-md bg-slate-900 border-4 border-slate-950 rounded-3xl p-6 shadow-[8px_8px_0px_#000] relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-2 border-slate-950 pb-4 mb-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wide flex items-center gap-1.5">
                <LogOut className="w-4 h-4 text-red-400" />
                Sign Out Passport
              </h4>
              <button
                type="button"
                onClick={() => setLogoutConfirmOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-950 text-slate-400 hover:text-slate-200 border-2 border-slate-855 hover:border-slate-500 hover:bg-slate-900 transition-colors flex items-center justify-center font-bold text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                id="close-logout-confirm"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-850">
                <span className="text-3xl">{currentUser.avatar}</span>
                <div>
                  <p className="text-xs font-black text-white">{currentUser.username}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{currentUser.characterClass}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Are you sure you want to sign out and exit your virtual planet? Your achievements, coins, and structures are safely saved to the database.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setLogoutConfirmOpen(false)}
                className="flex-1 py-2.5 bg-slate-950 hover:bg-slate-850 text-slate-300 rounded-xl font-black text-xs uppercase tracking-wider border-2 border-slate-850 hover:border-slate-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                id="cancel-logout"
              >
                Keep Exploring
              </button>
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setLogoutConfirmOpen(false);
                }}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-400 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000] border-2 border-slate-950 hover:scale-102 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                id="confirm-logout"
              >
                Confirm Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Accessible Toast Notification Overlay */}
      {toast && (
        <div
          role="alert"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-2xl border-4 shadow-[4px_4px_0px_#000] flex items-center gap-3 transition-all duration-350 ${
            toast.type === "success"
              ? "bg-emerald-950/95 border-emerald-500 text-emerald-100"
              : toast.type === "level"
              ? "bg-purple-950/95 border-purple-500 text-purple-100"
              : "bg-slate-900/95 border-slate-700 text-slate-100"
          }`}
        >
          <span className="text-lg">
            {toast.type === "success" ? "🏆" : toast.type === "level" ? "🌟" : "ℹ️"}
          </span>
          <p className="text-xs font-black tracking-wide leading-relaxed font-sans">{toast.message}</p>
          <button
            onClick={() => setToast(null)}
            className="ml-auto text-[10px] uppercase font-black tracking-widest text-slate-500 hover:text-slate-200 cursor-pointer pl-2"
            aria-label="Dismiss notification"
          >
            Close
          </button>
        </div>
      )}

    </div>
  );
}
