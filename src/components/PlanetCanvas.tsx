import React, { useRef, useEffect, useState } from "react";
import { MarketItem } from "../types";

interface PlanetCanvasProps {
  level: number;
  health: number;
  biodiversity: number;
  waterQuality: number;
  airQuality: number;
  renewablePercent: number;
  happiness: number;
  marketItems?: MarketItem[];
}

// 3D Point structure with depth sorting metadata
interface RenderableObject {
  type: "continent" | "lake" | "forest" | "fauna" | "village" | "renewable" | "cloud" | "soot_crack" | "purchased_item";
  valX: number;
  valY: number;
  valZ: number;
  lat: number;
  lon: number;
  size: number;
  color?: string;
  extra?: any;
}

export const PlanetCanvas: React.FC<PlanetCanvasProps> = ({
  level,
  health,
  biodiversity,
  waterQuality,
  airQuality,
  renewablePercent,
  happiness,
  marketItems = [],
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotYRef = useRef<number>(0.8);
  const rotXRef = useRef<number>(0.3);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [activeWeather, setActiveWeather] = useState<"clear" | "aurora" | "rain" | "dust">("clear");

  // Spin speed variables for natural continuous rotation
  const spinSpeed = useRef<number>(0.003);
  const autoRotate = useRef<boolean>(true);

  const updateLonIndicator = () => {
    const el = document.getElementById("planet_lon_indicator");
    if (el) {
      const degrees = Math.round((rotYRef.current * 180) / Math.PI) % 360;
      const normalizedDegrees = degrees < 0 ? degrees + 360 : degrees;
      el.innerText = `${normalizedDegrees}° Lon`;
    }
  };

  // Determine active atmosphere state based on score levels
  useEffect(() => {
    if (level <= 10) {
      setActiveWeather("dust");
    } else if (level >= 85) {
      setActiveWeather("aurora");
    } else if (airQuality < 45) {
      setActiveWeather("rain");
    } else {
      setActiveWeather("clear");
    }
  }, [level, airQuality, waterQuality]);

  // Handle Dragging / Rotating the planet with touch/mouse
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    autoRotate.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    rotYRef.current += dx * 0.005;
    rotXRef.current = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, rotXRef.current + dy * 0.005));
    updateLonIndicator();
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Slowly reactive auto-rotation after 3 seconds of inactiveness
    setTimeout(() => {
      if (!isDragging) autoRotate.current = true;
    }, 4000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    autoRotate.current = false;
    if (e.key === "ArrowLeft") {
      rotYRef.current -= 0.05;
    } else if (e.key === "ArrowRight") {
      rotYRef.current += 0.05;
    } else if (e.key === "ArrowUp") {
      rotXRef.current = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, rotXRef.current - 0.05));
    } else if (e.key === "ArrowDown") {
      rotXRef.current = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, rotXRef.current + 0.05));
    } else {
      return;
    }
    e.preventDefault();
    updateLonIndicator();
    setTimeout(() => {
      if (!isDragging) autoRotate.current = true;
    }, 4000);
  };

  // Safe deterministic pseudo-random number generator to place consistent objects on the planet coordinates
  const seededRandom = (seed: number) => {
    let state = seed;
    return () => {
      state = (state * 1664525 + 1013904223) % 4294967296;
      return state / 4294967296;
    };
  };

  // Generate robust lists of coordinate landmarks that don't shift when rendering
  const createLandmarks = () => {
    const landmarks: RenderableObject[] = [];
    
    // 1. Continents / Solid tectonic structures
    const rndCont = seededRandom(108);
    for (let i = 0; i < 18; i++) {
      landmarks.push({
        type: "continent",
        lat: (rndCont() - 0.5) * Math.PI * 0.9,
        lon: rndCont() * Math.PI * 2,
        size: 15 + rndCont() * 24,
        valX: 0, valY: 0, valZ: 0
      });
    }

    // 2. Volcanic / Sooty geological cracks for early low levels
    const rndCrack = seededRandom(552);
    for (let i = 0; i < 14; i++) {
      landmarks.push({
        type: "soot_crack",
        lat: (rndCrack() - 0.5) * Math.PI * 0.8,
        lon: rndCrack() * Math.PI * 2,
        size: 8 + rndCrack() * 12,
        valX: 0, valY: 0, valZ: 0
      });
    }

    // 3. Pristine Lakes / Blue core estuaries
    const rndLake = seededRandom(901);
    for (let i = 0; i < 12; i++) {
      landmarks.push({
        type: "lake",
        lat: (rndLake() - 0.5) * Math.PI * 0.85,
        lon: rndLake() * Math.PI * 2,
        size: 12 + rndLake() * 14,
        valX: 0, valY: 0, valZ: 0
      });
    }

    // 4. Forests / Lush thickets of botanical life
    const rndForest = seededRandom(337);
    for (let i = 0; i < 45; i++) {
      landmarks.push({
        type: "forest",
        lat: (rndForest() - 0.5) * Math.PI * 0.82,
        lon: rndForest() * Math.PI * 2,
        size: 6 + rndForest() * 10,
        valX: 0, valY: 0, valZ: 0
      });
    }

    // 5. Sustainable human modular cottages & ecological cities
    const rndVillage = seededRandom(443);
    for (let i = 0; i < 20; i++) {
      landmarks.push({
        type: "village",
        lat: (rndVillage() - 0.5) * Math.PI * 0.78,
        lon: rndVillage() * Math.PI * 2,
        size: 7 + rndVillage() * 5,
        valX: 0, valY: 0, valZ: 0
      });
    }

    // 6. Clean Power Grids / High Tech Solar and Wind generators
    const rndRenew = seededRandom(772);
    for (let i = 0; i < 16; i++) {
      landmarks.push({
        type: "renewable",
        lat: (rndRenew() - 0.5) * Math.PI * 0.75,
        lon: rndRenew() * Math.PI * 2,
        size: 7 + rndRenew() * 5,
        valX: 0, valY: 0, valZ: 0
      });
    }

    // 7. Atmospheric fluffy clouds
    const rndCloud = seededRandom(881);
    for (let i = 0; i < 12; i++) {
      landmarks.push({
        type: "cloud",
        lat: (rndCloud() - 0.5) * Math.PI * 0.7,
        lon: rndCloud() * Math.PI * 2,
        size: 18 + rndCloud() * 15,
        valX: 0, valY: 0, valZ: 0
      });
    }

    return landmarks;
  };

  const [precalculatedLandmarks] = useState<RenderableObject[]>(createLandmarks);

  // Memoize positions of purchased items to avoid raw string hashing/coordinate calculations inside requestAnimationFrame loop
  const purchasedItemLandmarks = React.useMemo(() => {
    const list: {
      lat: number;
      lon: number;
      size: number;
      extra: { itemId: string; index: number };
    }[] = [];

    marketItems.forEach((item) => {
      if (item.purchasedCount > 0) {
        const count = Math.min(15, item.purchasedCount);
        for (let i = 0; i < count; i++) {
          // Seeded deterministic pseudo-random generator
          let seed = 0;
          const str = item.id + "_" + i;
          for (let c = 0; c < str.length; c++) {
            seed = (seed * 31 + str.charCodeAt(c)) % 9999999;
          }
          const rnd = () => {
            seed = (seed * 1664525 + 1013904223) % 4294967296;
            return seed / 4294967296;
          };

          let lat = 0;
          let lon = rnd() * Math.PI * 2;
          if (item.category === "Nature") {
            lat = (rnd() - 0.5) * Math.PI * 0.55;
          } else if (item.category === "Wildlife") {
            lat = (rnd() - 0.5) * Math.PI * 0.8;
          } else {
            lat = (rnd() - 0.5) * Math.PI * 0.45;
          }

          list.push({
            lat,
            lon,
            size: 8 + rnd() * 6,
            extra: { itemId: item.id, index: i }
          });
        }
      }
    });
    return list;
  }, [marketItems]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let ticker = 0;

    // Twinkling background stars array (drawn as precise, elegant celestial anchors)
    const starSeed = seededRandom(993);
    const starField = Array.from({ length: 65 }, () => ({
      x: starSeed(),
      y: starSeed(),
      brightness: 0.3 + starSeed() * 0.7,
      size: 0.8 + starSeed() * 1.4,
      hue: starSeed() > 0.85 ? "rgba(147, 197, 253," : starSeed() > 0.7 ? "rgba(254, 215, 170," : "rgba(255, 255, 255,"
    }));

    const render = () => {
      ticker += 0.01;
      
      // Auto rotate if not dragged
      if (autoRotate.current) {
        rotYRef.current += spinSpeed.current;
        updateLonIndicator();
      }

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.36;

      ctx.clearRect(0, 0, w, h);

      // --- 1. PREMIUM DEEP SPACE GRAPHICS ---
      // Cosmic radial nebula
      const nebulaGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.7);
      nebulaGrad.addColorStop(0, "rgba(15, 23, 42, 0.95)");
      nebulaGrad.addColorStop(0.4, "rgba(8, 12, 30, 0.98)");
      nebulaGrad.addColorStop(1, "rgba(2, 4, 10, 1)");
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, w, h);

      // Dynamic space gas cloud shimmer
      ctx.save();
      const gasGrad = ctx.createRadialGradient(cx + Math.cos(ticker * 0.1) * 30, cy + Math.sin(ticker * 0.1) * 30, 50, cx, cy, r * 2.2);
      gasGrad.addColorStop(0, "rgba(52, 211, 153, 0.04)");
      gasGrad.addColorStop(0.5, "rgba(99, 102, 241, 0.03)");
      gasGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gasGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // Twinkling star anchors
      ctx.save();
      starField.forEach((star) => {
        const sx = star.x * w;
        const sy = star.y * h;
        // Twinkle factor using cosine
        const twinkle = star.brightness * (0.6 + 0.4 * Math.cos(ticker * 3 + star.x * 20));
        ctx.fillStyle = `${star.hue} ${twinkle})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Glisten lines for the brightest star diamonds
        if (star.size > 1.8 && twinkle > 0.8) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(sx - 5, sy);
          ctx.lineTo(sx + 5, sy);
          ctx.moveTo(sx, sy - 5);
          ctx.lineTo(sx, sy + 5);
          ctx.stroke();
        }
      });
      ctx.restore();

      // --- 2. ATMOSPHERE OUTER CHROMA GLOW ---
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r + 25, 0, Math.PI * 2);
      const outerGlow = ctx.createRadialGradient(cx, cy, r - 5, cx, cy, r + 28);
      
      // Compute colorful atmosphere spectrum matching current level and ecosystem
      if (level >= 90) {
        // Ethereal Emerald Green/Aurora glow
        outerGlow.addColorStop(0, "rgba(52, 211, 153, 0.25)");
        outerGlow.addColorStop(0.4, "rgba(16, 185, 129, 0.45)");
        outerGlow.addColorStop(0.7, "rgba(6, 182, 212, 0.15)");
        outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else if (level >= 60) {
        // Pristine Electric Cyan/Aqua
        outerGlow.addColorStop(0, "rgba(6, 182, 212, 0.25)");
        outerGlow.addColorStop(0.5, "rgba(14, 165, 233, 0.35)");
        outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else if (level >= 30) {
        // Healing Sage Green & Turquoise
        outerGlow.addColorStop(0, "rgba(20, 184, 166, 0.15)");
        outerGlow.addColorStop(0.6, "rgba(13, 148, 136, 0.2)");
        outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else if (level >= 11) {
        // Soft sky atmosphere
        outerGlow.addColorStop(0, "rgba(59, 130, 246, 0.08)");
        outerGlow.addColorStop(0.5, "rgba(29, 78, 216, 0.15)");
        outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        // Dusty dry orange/charcoal smog
        outerGlow.addColorStop(0, "rgba(239, 68, 68, 0.05)");
        outerGlow.addColorStop(0.4, "rgba(249, 115, 22, 0.15)");
        outerGlow.addColorStop(0.8, "rgba(120, 53, 4, 0.02)");
        outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = outerGlow;
      ctx.fill();
      ctx.restore();

      // --- 3. DYNAMIC SATELLITE ORBIT ---
      ctx.save();
      const satSpeed = ticker * 0.4;
      const satX = cx + Math.cos(satSpeed) * (r + 40);
      const satY = cy + Math.sin(satSpeed) * 0.35 * (r + 40);
      const satIsBehind = Math.sin(satSpeed) < 0;

      // Draw satellite orbit path dotted line (only the front part for depth)
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r + 40, (r + 40) * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw satellite only if it is in front of the planet sphere (or we depth-sort it)
      if (!satIsBehind) {
        ctx.fillStyle = level >= 70 ? "#34D399" : "#E2E8F0";
        ctx.beginPath();
        ctx.arc(satX, satY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Glistening digital transmission beam
        ctx.strokeStyle = "rgba(52, 211, 153, 0.25)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(satX, satY);
        ctx.lineTo(cx, cy + r * 0.4);
        ctx.stroke();

        // Little solar wing flaps
        ctx.fillStyle = "rgba(14, 165, 233, 0.8)";
        ctx.fillRect(satX - 8, satY - 1, 3, 2);
        ctx.fillRect(satX + 5, satY - 1, 3, 2);
      }
      ctx.restore();

      // --- 4. PLANET CORE DEFINITIONS ---
      // Define baseline colors for ocean/core terrain waterbeds
      let oceanBase = "#0b1329"; // Default abyssal space
      if (level >= 90) {
        oceanBase = "#062A35"; // Luminous teal aquatic bed
      } else if (level >= 60) {
        oceanBase = "#0A3D54"; // Turquoise oceanic
      } else if (level >= 30) {
        oceanBase = "#0E4B75"; // Vibrant deep blue
      } else if (level >= 11) {
        oceanBase = "#1A2E44"; // Shallow greyish waterbed
      } else {
        oceanBase = "#180D05"; // Scorched arid desert bed
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip(); // Bind all rendering tightly to the sphere viewport

      // Render actual ocean state
      ctx.fillStyle = oceanBase;
      ctx.fill();

      // Draw subtle wave shimmers on water surfaces
      if (level >= 11) {
        ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
          const waveY = cy - r + (r * 2 * (0.15 + i * 0.1));
          ctx.beginPath();
          ctx.moveTo(cx - r, waveY + Math.sin(ticker + i) * 6);
          ctx.bezierCurveTo(
            cx - r * 0.5, waveY - 8 + Math.cos(ticker + i) * 5,
            cx + r * 0.5, waveY + 8 - Math.sin(ticker + i) * 5,
            cx + r, waveY + Math.sin(ticker + i) * 6
          );
          ctx.stroke();
        }
      }

      // --- 5. DETAILED LANDMARK 3D SPHERICAL PROJECTION & DEPTH SORTING ---
      // 3D coordinates projection function (converts lat-lon to flat screen coords sorted by depth)
      const projectCoors = (lat: number, lon: number): { x: number; y: number; z: number } => {
        const effectiveLon = lon + rotYRef.current;
        const effectiveLat = lat + rotXRef.current;

        const cosLat = Math.cos(effectiveLat);
        const sinLat = Math.sin(effectiveLat);
        const cosLon = Math.cos(effectiveLon);
        const sinLon = Math.sin(effectiveLon);

        const x = r * cosLat * sinLon;
        const y = r * sinLat;
        const z = r * cosLat * cosLon; // Depth relative to planet grid center

        return { x: cx + x, y: cy - y, z };
      };

      // Populate renderable objects queue and filter only visible ones in the front hemisphere
      const renderQueue: RenderableObject[] = [];

      precalculatedLandmarks.forEach((obj) => {
        const projected = projectCoors(obj.lat, obj.lon);
        // Include if z > -r * 0.1 (partially wrapping around the horizon for premium realism)
        if (projected.z > -r * 0.2) {
          renderQueue.push({
            ...obj,
            valX: projected.x,
            valY: projected.y,
            valZ: projected.z
          });
        }
      });

      // Dynamically add purchased store items from memoized cache
      purchasedItemLandmarks.forEach((landmark) => {
        const projected = projectCoors(landmark.lat, landmark.lon);
        if (projected.z > -r * 0.2) {
          renderQueue.push({
            type: "purchased_item",
            valX: projected.x,
            valY: projected.y,
            valZ: projected.z,
            lat: landmark.lat,
            lon: landmark.lon,
            size: landmark.size,
            extra: landmark.extra
          });
        }
      });

      // Sort objects by their Z-depth to prevent visual overlap glitching entirely!
      renderQueue.sort((a, b) => a.valZ - b.valZ);

      // Render the visible landmarks onto the surface
      renderQueue.forEach((obj) => {
        const { type, valX, valY, valZ, size } = obj;

        // Size scaling based on visual distance projection (looks remarkably authentic)
        const depthScale = 0.4 + 0.6 * (valZ / r);
        const drawSize = size * depthScale;

        if (type === "continent") {
          // Dynamic land colors matching stage level
          let contColor = "#2D1D16"; // Scorched brown
          let beachColor = "#1C110C";
          if (level >= 90) {
            contColor = "#14532D"; // Rich emerald
            beachColor = "#4ADE80"; // Bright green neon shoreline
          } else if (level >= 60) {
            contColor = "#106B3B"; // Organic forest green
            beachColor = "#34D399";
          } else if (level >= 30) {
            contColor = "#166534"; // Recovering green land
            beachColor = "#86EFAC";
          } else if (level >= 11) {
            contColor = "#451A03"; // Dark clay land
            beachColor = "#A16207";
          }

          // Coastal shoreline glow ring
          ctx.fillStyle = beachColor;
          ctx.beginPath();
          ctx.arc(valX, valY, drawSize * 1.15, 0, Math.PI * 2);
          ctx.fill();

          // Main continent slab
          ctx.fillStyle = contColor;
          ctx.beginPath();
          ctx.arc(valX, valY, drawSize, 0, Math.PI * 2);
          ctx.fill();

          // Mountain peaks on top of continent
          ctx.fillStyle = level >= 50 ? "#064E3B" : "#3B2314";
          ctx.beginPath();
          ctx.moveTo(valX - drawSize * 0.3, valY + drawSize * 0.2);
          ctx.lineTo(valX, valY - drawSize * 0.5);
          ctx.lineTo(valX + drawSize * 0.3, valY + drawSize * 0.2);
          ctx.closePath();
          ctx.fill();
        }

        else if (type === "soot_crack" && level <= 20) {
          // Volcanic lava lines for dead/polluted stages
          ctx.strokeStyle = "rgba(239, 68, 68, 0.45)";
          ctx.lineWidth = 1.5 * depthScale;
          ctx.beginPath();
          ctx.moveTo(valX - drawSize * 0.7, valY - drawSize * 0.3);
          ctx.lineTo(valX + drawSize * 0.3, valY + drawSize * 0.5);
          ctx.stroke();

          // Little soot ember dots
          ctx.fillStyle = "rgba(249, 115, 22, 0.65)";
          ctx.beginPath();
          ctx.arc(valX + drawSize * 0.1, valY + drawSize * 0.2, 2.5 * depthScale, 0, Math.PI * 2);
          ctx.fill();
        }

        else if (type === "lake" && level >= 8) {
          // Pure freshwater lakes in green territories
          ctx.fillStyle = "#38BDF8"; // Crystal water
          ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(valX, valY, drawSize * 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }

        else if (type === "forest" && level >= 14) {
          // Beautiful high-detail trees (pinecones and foliage clusters)
          const limitCount = Math.floor(level / 2.2);
          // Limit actual forest rendering based on the biome progression levels
          const indexOffset = precalculatedLandmarks.filter(l => l.type === "forest").indexOf(obj);
          if (indexOffset < limitCount) {
            ctx.save();
            // Tree base shadow
            ctx.fillStyle = "rgba(0,0,0,0.15)";
            ctx.beginPath();
            ctx.ellipse(valX, valY + drawSize * 0.8, drawSize * 0.6, drawSize * 0.2, 0, 0, Math.PI * 2);
            ctx.fill();

            // Foliage multi-tiered triangle/pinecone shapes
            ctx.fillStyle = level >= 80 ? "#10B981" : "#15803D";
            ctx.beginPath();
            ctx.moveTo(valX, valY - drawSize * 0.9);
            ctx.lineTo(valX - drawSize * 0.7, valY + drawSize * 0.5);
            ctx.lineTo(valX + drawSize * 0.7, valY + drawSize * 0.5);
            ctx.closePath();
            ctx.fill();

            // Tree trunk
            ctx.fillStyle = "#78350F";
            ctx.fillRect(valX - drawSize * 0.15, valY + drawSize * 0.4, drawSize * 0.3, drawSize * 0.45);
            ctx.restore();
          }
        }

        else if (type === "village" && level >= 30) {
          const limitCount = Math.floor((level - 25) / 3.5);
          const indexOffset = precalculatedLandmarks.filter(l => l.type === "village").indexOf(obj);
          if (indexOffset < limitCount) {
            ctx.save();
            // Pristine eco housing huts (warm dome with solar roof)
            ctx.fillStyle = "#F3F4F6"; // Clean plaster wall
            ctx.beginPath();
            ctx.fillRect(valX - drawSize * 0.5, valY - drawSize * 0.1, drawSize, drawSize * 0.6);

            // Solar active glass roof (Cyan prism)
            ctx.fillStyle = "#06B6D4";
            ctx.beginPath();
            ctx.moveTo(valX - drawSize * 0.6, valY - drawSize * 0.1);
            ctx.lineTo(valX, valY - drawSize * 0.7);
            ctx.lineTo(valX + drawSize * 0.6, valY - drawSize * 0.1);
            ctx.closePath();
            ctx.fill();

            // Cozy window glow (increases as happiness improves)
            ctx.fillStyle = happiness >= 50 ? "#FBBF24" : "#4B5563";
            ctx.fillRect(valX - drawSize * 0.2, valY + drawSize * 0.1, drawSize * 0.4, drawSize * 0.25);
            ctx.restore();
          }
        }

        else if (type === "renewable" && level >= 44) {
          const limitCount = Math.floor((level - 40) / 3.2);
          const indexOffset = precalculatedLandmarks.filter(l => l.type === "renewable").indexOf(obj);
          if (indexOffset < limitCount) {
            ctx.save();
            const rotorSpeed = ticker * 4 + indexOffset;

            // Eco tower pillar
            ctx.strokeStyle = "rgba(226, 232, 240, 0.95)";
            ctx.lineWidth = 2 * depthScale;
            ctx.beginPath();
            ctx.moveTo(valX, valY);
            ctx.lineTo(valX, valY - drawSize * 1.5);
            ctx.stroke();

            // Rotating clean energy blades (delicate wind turbine propellers)
            ctx.strokeStyle = "rgba(16, 185, 129, 0.85)";
            ctx.lineWidth = 1.2 * depthScale;
            ctx.beginPath();
            const headY = valY - drawSize * 1.5;
            for (let b = 0; b < 3; b++) {
              const bAngle = rotorSpeed + (b * Math.PI * 2) / 3;
              ctx.moveTo(valX, headY);
              ctx.lineTo(valX + Math.cos(bAngle) * drawSize * 1.1, headY + Math.sin(bAngle) * drawSize * 1.1);
            }
            ctx.stroke();
            ctx.restore();
          }
        }

        else if (type === "cloud") {
          // Floating clouds layer (casts a subtle shadow to create exquisite height and volume)
          ctx.save();
          const cloudBounce = Math.sin(ticker * 0.4 + obj.lat * 5) * 4;
          const cx_final = valX + cloudBounce;
          const cy_final = valY + cloudBounce;

          // Soft ground cloud shadow offset
          ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
          ctx.beginPath();
          ctx.ellipse(cx_final + 8, cy_final + 12, drawSize * 1.2, drawSize * 0.4, 0, 0, Math.PI * 2);
          ctx.fill();

          // Fluffy white clean cloud bodies with dynamic transparency
          const cloudAlpha = level <= 20 ? "rgba(215, 205, 195, 0.35)" : "rgba(255, 255, 255, 0.82)";
          ctx.fillStyle = cloudAlpha;
          ctx.beginPath();
          ctx.arc(cx_final, cy_final, drawSize * 0.6, 0, Math.PI * 2);
          ctx.arc(cx_final - drawSize * 0.5, cy_final + drawSize * 0.1, drawSize * 0.45, 0, Math.PI * 2);
          ctx.arc(cx_final + drawSize * 0.5, cy_final + drawSize * 0.1, drawSize * 0.45, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        else if (type === "purchased_item" && obj.extra) {
          const { itemId, index } = obj.extra;
          ctx.save();
          
          if (itemId === "m_tree") {
            // Golden Grass patches
            ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
            ctx.beginPath();
            ctx.ellipse(valX, valY + drawSize * 0.5, drawSize * 0.6, drawSize * 0.2, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#A3E635"; // lime green
            ctx.beginPath();
            ctx.ellipse(valX, valY + drawSize * 0.4, drawSize * 0.7, drawSize * 0.25, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = "#FACC15"; // yellow-gold blades
            ctx.lineWidth = 1.5 * depthScale;
            ctx.beginPath();
            ctx.moveTo(valX - drawSize * 0.3, valY + drawSize * 0.4);
            ctx.lineTo(valX - drawSize * 0.45, valY - drawSize * 0.3);
            ctx.moveTo(valX, valY + drawSize * 0.4);
            ctx.lineTo(valX, valY - drawSize * 0.5);
            ctx.moveTo(valX + drawSize * 0.3, valY + drawSize * 0.4);
            ctx.lineTo(valX + drawSize * 0.45, valY - drawSize * 0.3);
            ctx.stroke();
          }
          
          else if (itemId === "m_patch") {
            // Pine Forest clump
            ctx.fillStyle = "rgba(0,0,0,0.18)";
            ctx.beginPath();
            ctx.ellipse(valX, valY + drawSize * 0.7, drawSize * 0.8, drawSize * 0.25, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#059669"; // emerald-600
            ctx.beginPath();
            ctx.moveTo(valX, valY - drawSize * 1.1);
            ctx.lineTo(valX - drawSize * 0.8, valY + drawSize * 0.4);
            ctx.lineTo(valX + drawSize * 0.8, valY + drawSize * 0.4);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = "#34D399"; // emerald-400 highlight
            ctx.beginPath();
            ctx.moveTo(valX, valY - drawSize * 1.0);
            ctx.lineTo(valX - drawSize * 0.5, valY + drawSize * 0.2);
            ctx.lineTo(valX + drawSize * 0.5, valY + drawSize * 0.2);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = "#78350F";
            ctx.fillRect(valX - drawSize * 0.15, valY + drawSize * 0.3, drawSize * 0.3, drawSize * 0.5);
          }
          
          else if (itemId === "m_lake") {
            // Freshwater Lake
            ctx.fillStyle = "#06B6D4"; // cyan
            ctx.strokeStyle = "#E0F2FE"; // sky light border
            ctx.lineWidth = 1 * depthScale;
            ctx.beginPath();
            ctx.ellipse(valX, valY, drawSize * 1.2, drawSize * 0.8, Math.PI / 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.beginPath();
            ctx.ellipse(valX - drawSize * 0.3, valY - drawSize * 0.2, drawSize * 0.3, drawSize * 0.15, Math.PI / 6, 0, Math.PI * 2);
            ctx.fill();
          }
          
          else if (itemId === "m_coral") {
            // Coral Reef Colony
            ctx.fillStyle = "#F43F5E"; // beautiful rose coral pink
            ctx.beginPath();
            for (let c = 0; c < 5; c++) {
              const ca = (c * Math.PI) / 4;
              const cl = drawSize * (0.6 + 0.4 * Math.sin(ticker*0.5 + index + c));
              ctx.lineTo(valX + Math.cos(ca) * cl, valY - Math.sin(ca) * cl);
            }
            ctx.closePath();
            ctx.fill();
            
            ctx.strokeStyle = "rgba(244, 63, 94, 0.5)";
            ctx.lineWidth = 1.5 * depthScale;
            ctx.stroke();
          }
          
          else if (itemId === "m_vertical") {
            // Vertical Megagardens
            ctx.fillStyle = "#F3F4F6"; // Futuristic ivory block
            ctx.beginPath();
            ctx.fillRect(valX - drawSize * 0.4, valY - drawSize * 1.4, drawSize * 0.8, drawSize * 1.8);
            
            // Ivy/Vine green stripes
            ctx.fillStyle = "#10B981";
            ctx.fillRect(valX - drawSize * 0.3, valY - drawSize * 1.2, drawSize * 0.2, drawSize * 1.6);
            ctx.fillRect(valX + drawSize * 0.1, valY - drawSize * 0.9, drawSize * 0.2, drawSize * 1.3);

            // Tech windows glowing golden yellow
            ctx.fillStyle = "#F59E0B";
            ctx.fillRect(valX - drawSize * 0.1, valY - drawSize * 0.5, drawSize * 0.2, drawSize * 0.25);
          }
          
          else if (itemId === "m_birds") {
            // Temperate Songbirds orbiting in the sky
            const orbitOffset = ticker * 0.05 + index * 1.2;
            const bx = valX + Math.cos(orbitOffset) * drawSize * 2.2;
            const by = valY - drawSize * 0.8 + Math.sin(orbitOffset * 1.5) * drawSize * 0.5;
            
            ctx.strokeStyle = "#F1F5F9";
            ctx.lineWidth = 1.8 * depthScale;
            ctx.beginPath();
            const wingFlap = Math.sin(ticker * 0.4 + index);
            ctx.moveTo(bx - drawSize * 0.4, by + wingFlap * drawSize * 0.3);
            ctx.lineTo(bx, by - drawSize * 0.1);
            ctx.lineTo(bx + drawSize * 0.4, by + wingFlap * drawSize * 0.3);
            ctx.stroke();
          }
          
          else if (itemId === "m_deer") {
            // Highland Deer Pack
            ctx.fillStyle = "#B45309"; // Deer body brown
            ctx.beginPath();
            ctx.ellipse(valX, valY + drawSize * 0.2, drawSize * 0.6, drawSize * 0.3, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Neck & Head
            ctx.beginPath();
            ctx.ellipse(valX - drawSize * 0.4, valY - drawSize * 0.1, drawSize * 0.2, drawSize * 0.4, Math.PI/4, 0, Math.PI * 2);
            ctx.fill();
            
            // Antlers
            ctx.strokeStyle = "#F59E0B";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(valX - drawSize * 0.5, valY - drawSize * 0.4);
            ctx.lineTo(valX - drawSize * 0.7, valY - drawSize * 0.7);
            ctx.moveTo(valX - drawSize * 0.4, valY - drawSize * 0.4);
            ctx.lineTo(valX - drawSize * 0.5, valY - drawSize * 0.8);
            ctx.stroke();

            // Legs
            ctx.strokeStyle = "#B45309";
            ctx.lineWidth = 1.2 * depthScale;
            ctx.beginPath();
            ctx.moveTo(valX - drawSize * 0.3, valY + drawSize * 0.4);
            ctx.lineTo(valX - drawSize * 0.4, valY + drawSize * 0.9);
            ctx.moveTo(valX + drawSize * 0.3, valY + drawSize * 0.4);
            ctx.lineTo(valX + drawSize * 0.4, valY + drawSize * 0.9);
            ctx.stroke();
          }
          
          else if (itemId === "m_bees") {
            // Aero Honeybee Sanctuary sparkles hovering around
            ctx.fillStyle = "#FBBF24"; // Bright gold honeybee swarm
            for (let b = 0; b < 4; b++) {
              const ba = ticker * 0.15 + (b * Math.PI) / 2 + index;
              const bx = valX + Math.cos(ba) * drawSize * 0.9;
              const by = valY + Math.sin(ba * 0.8) * drawSize * 0.9;
              ctx.beginPath();
              ctx.arc(bx, by, 1.5 * depthScale, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          
          else if (itemId === "m_monarch") {
            // Monarch Migration Wave flutter
            ctx.fillStyle = "#EA580C"; // Monarch flutter bright orange
            const fl = Math.sin(ticker * 0.3 + index) > 0;
            ctx.beginPath();
            ctx.ellipse(valX - (fl ? 2 : 4), valY, drawSize * 0.3, drawSize * 0.5, Math.PI/8, 0, Math.PI * 2);
            ctx.ellipse(valX + (fl ? 2 : 4), valY, drawSize * 0.3, drawSize * 0.5, -Math.PI/8, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = "#000"; // Black trim body
            ctx.beginPath();
            ctx.arc(valX, valY, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
          
          else if (itemId === "m_whale") {
            // Bioluminescent Whales swimming in oceans
            const wetX = valX + Math.sin(ticker * 0.05 + index) * drawSize * 1.5;
            const wetY = valY + Math.cos(ticker * 0.05 + index) * drawSize * 0.6;
            
            ctx.fillStyle = "#0E7490"; // Oceanic biolum-teal
            ctx.strokeStyle = "#38BDF8";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(wetX, wetY, drawSize * 1.6, drawSize * 0.6, Math.PI/12, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(wetX - drawSize * 1.4, wetY);
            ctx.lineTo(wetX - drawSize * 2.2, wetY - drawSize * 0.6);
            ctx.lineTo(wetX - drawSize * 2.2, wetY + drawSize * 0.6);
            ctx.closePath();
            ctx.fill();
          }
          
          else if (itemId === "m_solar") {
            // Solar Energy Farm
            ctx.fillStyle = "#1E3A8A"; // deep slate blue panels
            ctx.strokeStyle = "#94A3B8"; // silver frames
            ctx.lineWidth = 1 * depthScale;
            
            for (let p = 0; p < 2; p++) {
              const px = valX + (p - 0.5) * drawSize * 1.2;
              const py = valY;
              ctx.beginPath();
              ctx.moveTo(px - drawSize * 0.5, py + drawSize * 0.2);
              ctx.lineTo(px, py - drawSize * 0.4);
              ctx.lineTo(px + drawSize * 0.5, py - drawSize * 0.3);
              ctx.lineTo(px, py + drawSize * 0.3);
              ctx.closePath();
              ctx.fill();
              ctx.stroke();
            }
          }
          
          else if (itemId === "m_wind") {
            // Breeze Energy Turbines
            const rotorSpeed = ticker * 0.1 + index * 1.5;
            // Pole
            ctx.strokeStyle = "#F1F5F9";
            ctx.lineWidth = 2 * depthScale;
            ctx.beginPath();
            ctx.moveTo(valX, valY);
            ctx.lineTo(valX, valY - drawSize * 1.6);
            ctx.stroke();

            // Rotors
            ctx.strokeStyle = "#10B981"; // Renewable green energy blades
            ctx.lineWidth = 1.5 * depthScale;
            ctx.beginPath();
            const headY = valY - drawSize * 1.6;
            for (let b = 0; b < 3; b++) {
              const bAngle = rotorSpeed + (b * Math.PI * 2) / 3;
              ctx.moveTo(valX, headY);
              ctx.lineTo(valX + Math.cos(bAngle) * drawSize * 1.2, headY + Math.sin(bAngle) * drawSize * 1.2);
            }
            ctx.stroke();
          }
          
          else if (itemId === "m_recycle") {
            // Circular Recycling Hub
            ctx.fillStyle = "rgba(16, 185, 129, 0.4)"; // soft emerald dome
            ctx.strokeStyle = "#34D399";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(valX, valY, drawSize * 0.9, Math.PI, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            // Twin circular recycling recycling arrows orbiting
            ctx.strokeStyle = "#10B981";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(valX, valY - drawSize * 0.2, drawSize * 1.2, ticker * 0.05, ticker * 0.05 + Math.PI * 1.5);
            ctx.stroke();
          }
          
          else if (itemId === "m_algae") {
            // Algae Air purification Tank
            ctx.fillStyle = "rgba(4, 120, 87, 0.85)"; // deep green algae tube
            ctx.strokeStyle = "#A7F3D0";
            ctx.lineWidth = 1 * depthScale;
            ctx.beginPath();
            ctx.fillRect(valX - drawSize * 0.4, valY - drawSize * 1.3, drawSize * 0.35, drawSize * 1.3);
            ctx.fillRect(valX + drawSize * 0.05, valY - drawSize * 1.3, drawSize * 0.35, drawSize * 1.3);
            ctx.stroke();
          }
          
          else if (itemId === "m_capture") {
            // Tropospheric Carbon Capture Array
            ctx.fillStyle = "#334155"; // Slate structure
            ctx.fillRect(valX - drawSize * 0.7, valY - drawSize * 1.2, drawSize * 1.4, drawSize * 1.1);
            
            // Circular fan duct cutout
            ctx.fillStyle = "#0F172A"; // dark pit
            ctx.beginPath();
            ctx.arc(valX, valY - drawSize * 0.6, drawSize * 0.45, 0, Math.PI * 2);
            ctx.fill();
            
            // Spinning fan blade spokes
            ctx.strokeStyle = "#94A3B8";
            ctx.lineWidth = 2 * depthScale;
            const fanAngle = ticker * 0.2 + index;
            ctx.beginPath();
            for (let f = 0; f < 4; f++) {
              const fa = fanAngle + (f * Math.PI) / 2;
              ctx.moveTo(valX, valY - drawSize * 0.6);
              ctx.lineTo(valX + Math.cos(fa) * drawSize * 0.4, valY - drawSize * 0.6 + Math.sin(fa) * drawSize * 0.4);
            }
            ctx.stroke();
          }
          
          else if (itemId === "m_elevator") {
            // Orbital Space Elevator!
            ctx.strokeStyle = "rgba(45, 212, 191, 0.4)"; // glowing turquoise high tension wire
            ctx.lineWidth = 1 * depthScale;
            ctx.beginPath();
            ctx.moveTo(valX, valY);
            ctx.lineTo(valX + (valX - w/2) * 5, valY - h * 1.8); // Shoot straight up
            ctx.stroke();
            
            // Base launch station pad
            ctx.fillStyle = "#1E293B";
            ctx.strokeStyle = "#2DD4BF";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.ellipse(valX, valY, drawSize * 1.6, drawSize * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }

          ctx.restore();
        }
      });

      // --- 6. REALISTIC SHADOW LINE & INTERIOR ATMOSPHERE RIM ---
      // Radial specular highlight overlay (glistening light reflection on ocean glass)
      const specularGrad = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, 10, cx - r * 0.35, cy - r * 0.35, r * 1.5);
      specularGrad.addColorStop(0, "rgba(255, 255, 255, 0.18)");
      specularGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.0)");
      specularGrad.addColorStop(1, "rgba(0, 0, 0, 0.0)");
      ctx.fillStyle = specularGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric limb rim outline glow (creates massive curvature realism)
      const rimGrad = ctx.createRadialGradient(cx, cy, r - 15, cx, cy, r);
      rimGrad.addColorStop(0, "rgba(14, 165, 233, 0.0)");
      rimGrad.addColorStop(0.7, "rgba(56, 189, 248, 0.08)");
      rimGrad.addColorStop(1, "rgba(16, 185, 129, 0.38)");
      ctx.fillStyle = rimGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Realistic spherical shadow shroud (The dark night hemisphere)
      const shadeGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.4, cx + r * 0.25, cy + r * 0.25, r * 1.25);
      shadeGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      shadeGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.22)");
      shadeGrad.addColorStop(0.82, "rgba(0, 0, 0, 0.85)");
      shadeGrad.addColorStop(1, "rgba(0, 0, 0, 0.98)");
      ctx.fillStyle = shadeGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // NIGHT LIGHTS: Glowing golden city grid showing where human settlements are facing away from the star
      if (level >= 30) {
        ctx.save();
        renderQueue.forEach((obj) => {
          if ((obj.type === "village" || obj.type === "renewable") && obj.valZ > 10) {
            // Check proximity to the dark side (approximate using visual position)
            const isDarkSide = (obj.valX - cx > r * 0.15) || (obj.valY - cy > r * 0.15);
            if (isDarkSide) {
              const lightAlpha = 0.4 + 0.6 * Math.sin(ticker * 2.5 + obj.lat * 10);
              ctx.fillStyle = `rgba(251, 191, 36, ${lightAlpha * 0.85})`;
              ctx.beginPath();
              ctx.arc(obj.valX, obj.valY, 3, 0, Math.PI * 2);
              ctx.fill();

              // Clean energy grid lines (light lines interconnecting settlements)
              if (level >= 75) {
                ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(obj.valX, obj.valY);
                ctx.lineTo(cx + r * 0.5, cy + r * 0.4);
                ctx.stroke();
              }
            }
          }
        });
        ctx.restore();
      }

      ctx.restore(); // Exit sphere clipping bounds

      // --- 7. WEATHER SPECTRUMS & SCREEN PARTICLES ---
      if (activeWeather === "dust") {
        // High quality brown air pollution storm overlays
        ctx.save();
        ctx.fillStyle = "rgba(245, 158, 11, 0.06)";
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = "rgba(120, 53, 4, 0.12)";
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 6; i++) {
          const dstY = (ticker * 85 + i * h / 6) % h;
          ctx.beginPath();
          ctx.moveTo(0, dstY);
          ctx.bezierCurveTo(w * 0.3, dstY + 30, w * 0.7, dstY - 30, w, dstY);
          ctx.stroke();
        }
        ctx.restore();
      } else if (activeWeather === "aurora") {
        // Shimmering wavy solar polar lights
        ctx.save();
        const polarGrad = ctx.createLinearGradient(0, 0, w, h);
        polarGrad.addColorStop(0, "rgba(52, 211, 153, 0.05)");
        polarGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.07)");
        polarGrad.addColorStop(1, "rgba(56, 189, 248, 0.05)");
        ctx.fillStyle = polarGrad;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      } else if (activeWeather === "rain") {
        // Smooth transparent rainfall lines slipping over the spatial stage
        ctx.save();
        ctx.strokeStyle = "rgba(14, 165, 233, 0.18)";
        ctx.lineWidth = 0.8;
        for (let i = 0; i < 28; i++) {
          const rx = (i * docRand(i) * w + ticker * 200) % w;
          const ry = (i * docRand(i + 1) * h + ticker * 500) % h;
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx - 2, ry + 12);
          ctx.stroke();
        }
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    // Quick helper for predictable sequence values
    const docRand = (num: number) => {
      const x = Math.sin(num) * 10000;
      return x - Math.floor(x);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [level, activeWeather, health, biodiversity, happiness, marketItems]);

  // Handle auto-resizing of canvas viewport to prevent layout distortion
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight || 400;
      }
    };
    handleResize();

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (canvasRef.current?.parentElement) {
      resizeObserver.observe(canvasRef.current.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center select-none bg-slate-950/40 rounded-2xl border border-slate-800/40 overflow-hidden shadow-inner">
      {/* Absolute Backdrop Nebulous Star Elements */}
      <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-slate-950/90 to-transparent flex justify-between items-center z-10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
            ORBIT SYSTEM TELEMETRY
          </span>
          <h4 className="text-xs font-semibold text-slate-300 drop-shadow-sm">
            {level === 100 ? "🏆 Cosmic Paradise Hub" : `Sovereign Stage ${Math.ceil(level / 10)}`}
          </h4>
        </div>
        <div className="flex gap-1.5">
          <span
            className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wide ${
              activeWeather === "aurora"
                ? "bg-purple-950/80 text-purple-300 border border-purple-800/50"
                : activeWeather === "dust"
                ? "bg-amber-950/80 text-amber-300 border border-amber-800/50 animate-pulse"
                : activeWeather === "rain"
                ? "bg-blue-950/80 text-blue-300 border border-blue-800/50"
                : "bg-slate-900/90 text-slate-400 border border-slate-800/60"
            }`}
          >
            🌤️ Atmos: {activeWeather}
          </span>
          <span id="planet_lon_indicator" className="text-[9px] bg-slate-900/90 border border-slate-800/60 text-emerald-400 px-2 py-0.5 rounded font-mono">
            46° Lon
          </span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing max-h-[460px] focus:outline-none focus:ring-4 focus:ring-emerald-400/50 rounded-2xl"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        id="green_odyssey_planet_canvas"
        role="img"
        aria-label={`Interactive 3D Planet Evolution sphere. Current stage: ${level} out of 100. Planetary Health: ${health}%, Biodiversity: ${biodiversity}%, Water quality: ${waterQuality}%, Air quality: ${airQuality}%, Clean power grid: ${renewablePercent}%, Citizen Happiness: ${happiness}%. Use arrow keys to rotate the view.`}
      >
        Interactive 3D Planet Evolution sphere. Current stage: {level} out of 100. Planetary Health: {health}%, Biodiversity: {biodiversity}%, Water quality: {waterQuality}%, Air quality: {airQuality}%, Clean power grid: {renewablePercent}%, Citizen Happiness: {happiness}%. Use arrow keys to rotate the view.
      </canvas>

      {/* Elegant rotation guideline overlay */}
      <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none drop-shadow-md z-10">
        <p className="text-[9px] text-slate-400 bg-slate-950/90 rounded-full px-4 py-1 inline-block border border-slate-800/80 font-mono tracking-wide shadow-lg">
          🕹️ Left-click + drag or use Arrow keys to spin the planetary viewport
        </p>
      </div>
    </div>
  );
};
