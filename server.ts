import express, { Request, Response, NextFunction } from "express";
import path from "path";

import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { initDB, getUserByEmail, getUserState, registerUser, syncUserState, hashPassword } from "./db.js";
import { validateEmail, validateUsername, validatePassword, validatePlanetState } from "./validation.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Security Headers Middleware (including strict Content-Security-Policy, HSTS, and Permissions-Policy)
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: ; connect-src 'self' https://generativelanguage.googleapis.com;"
  );
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

// Lightweight rate limiting implementation to prevent brute force / flooding
const rateLimits = new Map<string, { count: number; resetTime: number }>();
function rateLimiter(limit: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = (req.ip || req.headers["x-forwarded-for"] || "127.0.0.1").toString();
    const now = Date.now();
    const limitInfo = rateLimits.get(ip);

    if (!limitInfo || now > limitInfo.resetTime) {
      rateLimits.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    limitInfo.count++;
    if (limitInfo.count > limit) {
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }
    next();
  };
}

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } catch (err) {
    console.error("Failed to initialize Gemini AI client:", err);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined. AI companion will run in simulated mode.");
}

// API Route for companion advice
app.post("/api/companion", rateLimiter(30, 60000), async (req, res) => {
  const { companion, message, planetState } = req.body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "Valid message string is required." });
  }

  if (message.length > 1000) {
    return res.status(400).json({ error: "Message exceeds length limit." });
  }

  if (planetState && !validatePlanetState(planetState)) {
    return res.status(400).json({ error: "Invalid planet state parameters." });
  }

  const validCompanions = ["Panda", "Turtle", "Fox", "Penguin", "Eco-9"];
  if (companion && !validCompanions.includes(companion)) {
    return res.status(400).json({ error: "Invalid companion identifier." });
  }

  // Fallback if AI client not initialized (no API key provided yet)
  if (!ai) {
    let fallbackText = "";
    if (companion === "Panda") {
      fallbackText = `*Munching bamboo slowly* Oh, hello! Did you know trees absorb carbon so softly? At Level ${planetState?.level || 1}, let's plant more forests together! Try taking a quick walk or selecting Bicycles next time!`;
    } else if (companion === "Turtle") {
      fallbackText = `*Blinks ocean-wise eyes* Water... is the mirror of our soul. At Level ${planetState?.level || 1}, we need crystal-clear lakes. Reduce plastic waste today to save my marine friends!`;
    } else if (companion === "Fox") {
      fallbackText = `*Yips with snappy excitement* Rusty here! Sleek work on keeping carbon at ${planetState?.carbonScore || 100} tons! Did you know riding a bicycle preserves XP and cuts emissions to zero? Clever choice!`;
    } else if (companion === "Penguin") {
      fallbackText = `*Flaps flippers with concern* Keep the climate cool, please! If carbon hits ${planetState?.carbonScore || 100} tons, our glaciers start weeping. We must expand renewable grids immediately. Can we use solar energy?`;
    } else {
      fallbackText = `[ECO-9 ONLINE] System diagnostics show planetary health is currently ${planetState?.health || 20}%. Integrating clean energy infrastructure will improve efficiency by 34.2%. Awaiting further inputs, Space Guardian!`;
    }
    return res.json({ text: fallbackText });
  }

  try {
    const systemPrompt = `You are ${companion || 'a cute eco companion'} inside Green Odyssey (a 100-level carbon footprint planet evolution game).
Your user's planet state is:
- Level: ${planetState?.level || 1}
- Carbon Footprint Score: ${planetState?.carbonScore || 100} tons CO2eq/year
- Biodiversity Index: ${planetState?.biodiversity || 10}%
- Planet Health: ${planetState?.health || 20}%
- Citizen Happiness: ${planetState?.happiness || 50}%

Convey your advice reflecting your specific character persona:
1. Panda (Moso): Gentle, bamboo-loving, wise, warns about deforested areas and agricultural choices. Speaks warmly, loves naps and trees. Writes like "*yawn, munching on bamboo* Hm..."
2. Turtle (Bramble): Slow-paced, oceanic, warns about water quality and marine trash. Speaks gently with pauses. Loves beaches and clean seas.
3. Fox (Rusty): Clever, snappy, energetic forest-dwellers. Gives smart shortcuts, focuses on public transit, smart grid, clever carbon hacks.
4. Penguin (Chilly): Highly sensitive to warming temperatures, talks about icebergs melting, carbon footprint direct consequences, renewable energies.
5. Robot (Eco-9): Analytical, highly futuristic, talks in metric quantities, carbon-capture formulas, solar configuration, clean energy efficiency.

Answer the user's message in 2 to 3 concise, highly readable, engaging, and action-oriented sentences. Make sure to suggest a quick eco-friendly challenge or tip that is relevant! Keep it encouraging and friendly!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
      }
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: "Error communicating with AI Companion",
      details: error.message || error
    });
  }
});

// MySQL Auth & Game State APIs
app.post("/api/auth/register", rateLimiter(10, 60000), async (req, res) => {
  const { profile, state, items } = req.body;
  if (!profile || !profile.email || !profile.customPassword || !profile.username) {
    return res.status(400).json({ error: "Invalid registration profile." });
  }

  // Format validations
  if (!validateEmail(profile.email)) {
    return res.status(400).json({ error: "Invalid email address format." });
  }
  if (!validateUsername(profile.username)) {
    return res.status(400).json({ error: "Username must be alphanumeric and between 2 to 30 characters." });
  }
  if (!validatePassword(profile.customPassword)) {
    return res.status(400).json({ error: "Password must be between 6 and 128 characters." });
  }
  if (state && !validatePlanetState(state)) {
    return res.status(400).json({ error: "Invalid initial planet state metrics." });
  }

  try {
    const existing = await getUserByEmail(profile.email);
    if (existing) {
      return res.status(400).json({ error: "Email is already registered!" });
    }
    await registerUser(profile, state, items || []);
    return res.json({ success: true, profile });
  } catch (error: any) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Failed to register user.", details: error.message });
  }
});

app.post("/api/auth/login", rateLimiter(20, 60000), async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required!" });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email address format." });
  }
  try {
    const user = await getUserByEmail(email);
    if (!user || user.password !== hashPassword(password, email)) {
      return res.status(400).json({ error: "Incorrect email or password!" });
    }
    const fullData = await getUserState(user.id);
    return res.json(fullData);
  } catch (error: any) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Failed to login user.", details: error.message });
  }
});

app.get("/api/user/state/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await getUserState(userId);
    if (!data) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.json(data);
  } catch (error: any) {
    console.error("Error fetching user state:", error);
    return res.status(500).json({ error: "Failed to fetch user state.", details: error.message });
  }
});

app.post("/api/user/sync", rateLimiter(100, 60000), async (req, res) => {
  const { userId, state, items } = req.body;
  if (!userId || !state || !items) {
    return res.status(400).json({ error: "Missing sync parameters." });
  }
  if (typeof userId !== "string" || userId.trim().length === 0) {
    return res.status(400).json({ error: "Invalid user ID." });
  }
  if (!validatePlanetState(state)) {
    return res.status(400).json({ error: "Invalid sync state parameters." });
  }
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "Sync items must be an array." });
  }
  try {
    await syncUserState(userId, state, items);
    return res.json({ success: true });
  } catch (error: any) {
    console.error("Error syncing user state:", error);
    return res.status(500).json({ error: "Failed to sync state.", details: error.message });
  }
});

// Global error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled API Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "An unhandled error occurred on the server."
  });
});

// Setup Vite or Production build
async function setupServer() {
  try {
    await initDB();
  } catch (dbError) {
    console.error("Failed to initialize database on server startup:", dbError);
    process.exit(1);
  }

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Green Odyssey server running on port ${PORT}`);
  });
}

if (!process.env.VERCEL) {
  setupServer();
}

export default app;
