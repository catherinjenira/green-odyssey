import { Challenge, MarketItem, FriendPlanet, WeeklyEvent, Achievement } from "./types";

export interface CompactChallengeSeed {
  title: string;
  category: "Transportation" | "Food" | "Energy" | "Waste" | "Water" | "Biodiversity" | "Housing" | "Agriculture" | "Industry" | "Infrastructure";
  prompt: string;
  options: [string, string, string, string];
  details: [string, string, string, string];
}

const SEED_DATA: CompactChallengeSeed[] = [
  {
    title: "The Commute Dilemma",
    category: "Transportation",
    prompt: "You need to travel 10 km to the main eco-village hub today. What mode of transit do citizens utilize?",
    options: ["Petrol Motorbike", "Standard Electric Bike", "Smart Transit Magnetic Train", "Direct Bicycle Ride"],
    details: [
      "Produces 2.3 kg of direct carbon emission and loud combustion noise.",
      "Uses clean electric grid. Offsets transport carbon significantly.",
      "Highly fast autonomous magnetic rail with zero friction.",
      "Pure physical effort. Zero exhaust. Improves public stamina."
    ]
  },
  {
    title: "Midday Meal Provisioning",
    category: "Food",
    prompt: "A massive biological harvest festival is being prepared for 100,000 citizens. What will the primary feast derive from?",
    options: ["Relational Meat Barbecue", "Local Poultry & Cheese Board", "Vertical Hydroponic Salads", "Forest Foraged Plant Stews"],
    details: [
      "Methane footprint from livestock increases planetary warmth.",
      "Moderately resource intensive but uses local dairy products.",
      "Grown in vertical towers. Uses 95% less water and solar base.",
      "Hand-harvested wild vegetables and organic tubers. Enhances soil."
    ]
  },
  {
    title: "Powering the Manufacturing Sector",
    category: "Energy",
    prompt: "Industrial factories demand 400 Terajoules of power. How will we sustain this energetic load?",
    options: ["Coal Fired Stations", "Natural Gas Vault Grid", "Molten Salt Fission Reactor", "Concentrated Solar Mirrors"],
    details: [
      "Massive carbon soot release. Darkens planetary stratosphere.",
      "Cleaner fossil fuel, but triggers localized gas venting issues.",
      "Zero carbon emissions. Highly reliable closed energy base.",
      "High tracking silicon mirrors. Unlimited daylight clean collection."
    ]
  },
  {
    title: "The Plastic Surge",
    category: "Waste",
    prompt: "Citizen consumption has triggered a 20-ton single-use plastic waste crisis in the eastern ocean. How do we treat it?",
    options: ["Landfill Deep Burying", "Incinerate with Heat Capture", "Mechanical Sort & Recycle", "Mycelium Bio-Degradation"],
    details: [
      "Microplastics slowly leach into deep aquifer layers.",
      "Produces quick electricity but emits toxic aerial residue.",
      "Reshapes polymers into building beams. Erases virgin demand.",
      "Engineered fungal spores consume polymers, creating soil mulch."
    ]
  },
  {
    title: "Residential Lighting Standard",
    category: "Energy",
    prompt: "A massive influx of residential eco-quarters are coming online. What lighting standard is strictly enforced?",
    options: ["Classic Filament Bulbs", "Standard CFL Spirals", "Ultra Efficient LED Panels", "Bioluminescent Ivy Cells"],
    details: [
      "High grid friction. Brief lifespan and low thermal efficiency.",
      "Acceptable energy draw but contains mercury, complicating disposal.",
      "Reduces grid load by 80%. Operates cool with 10-year lifespan.",
      "Self-glowing vascular moss. Purifies room air and draws zero power."
    ]
  },
  {
    title: "Coral Reef Warming Crisis",
    category: "Biodiversity",
    prompt: "Marine sensors indicate a 1.5°C ocean temperature spike is bleach-damaging the Southern Barrier Reef. What is your intervention?",
    options: ["Chemical Reef Protectors", "Artificial Sun Shade Mats", "Micro-Bubbler Coolers", "Heat-Resilient Coral Nursery"],
    details: [
      "Unproven chemicals. Might cause unpredictable toxic accumulation.",
      "Blocks UV rays locally but limits phytosphere light.",
      "Injects deep cold-current ocean water. High pumping energy.",
      "Breeds warm-tolerant coral colonies. Restores ocean biodiversity."
    ]
  },
  {
    title: "Urban Wastewater Purification",
    category: "Water",
    prompt: "Metropolitan greywater output has doubled, threatening clean river currents. How do we process this surge?",
    options: ["Chlorine Filtration Tanks", "Sand & Gravel Filter Beds", "Active Carbon Scrubbers", "Constructed Wetlands Ecology"],
    details: [
      "Sterilizes path of all bacteria but introduces active chemicals.",
      "Basic mechanical layout. Low cost, but lets trace chemicals pass.",
      "Porous carbon pores absorb heavy toxins. Needs filter replacement.",
      "Utilizes marsh reeds and bio-soil to recycle wastewater into streams."
    ]
  },
  {
    title: "Soil Nitrogen Revitalization",
    category: "Agriculture",
    prompt: "Over-cropping has depleted active nitrates in our equatorial agricultural valleys. How do we fertilize?",
    options: ["Synthetic Nitrogen Spray", "Manure Compound Mix", "Compost Tea Irrigation", "Legume Crop-Rotation Cycles"],
    details: [
      "Fast crop yield, but causes nitrogen runoff into water tables.",
      "Traditional organic manure. Smelly and contains local pathogens.",
      "Liquid organic humus nutrient boost. Safely feeds soil microbes.",
      "Plating clover and soy locks nitrogen natively. Blocks soil erosion."
    ]
  },
  {
    title: "High-Rise Garden Integration",
    category: "Housing",
    prompt: "Concrete heat absorption is making metropolitan towers dangerously hot. How do we cool them?",
    options: ["Heavy Air Conditioning Unit", "Reflective Ceramic Painting", "Rooftop Vertical Moss Farms", "Integrated Bio-Vascular Shells"],
    details: [
      "Cools rooms inside, but dumps waste heat into urban air.",
      "Low impact, reflects daylight well. Cost-effective but dry.",
      "Heavy soil containers on rooftops. Cools via evapotranspiration.",
      "Drapes climbing ivy over facades. Direct air quality and cooling gain."
    ]
  },
  {
    title: "Aero Honeybee Colony Loss",
    category: "Biodiversity",
    prompt: "Electromagnetic interference is disrupting pollinator navigation. How do we restore bee counts?",
    options: ["Robotic Insect Drones", "Pesticide Ban Zones", "Wildflower Roadside Strips", "EM-Shielded Bio-Sanctuaries"],
    details: [
      "Slightly pollinates but high manufacture costs and zero bio value.",
      "Limits chemical damage, giving native hives a fighting chance.",
      "Creates floral pathways along transport roads for wild bees.",
      "Generates natural field quiet zones with pristine bio-nests."
    ]
  },
  {
    title: "Smart Grid Peak Draw",
    category: "Energy",
    prompt: "Evening cooking and cooling surges are straining the battery storage nodes. How do we handle peak load?",
    options: ["Fossil Gas Quick Burners", "Load Shedding Blackouts", "Dynamic Smart Pricing", "Pumped-Hydro Reservoir Release"],
    details: [
      "Reliable backup but burns fossil hydrocarbons, emitting carbon.",
      "Enforces power cuts, causing significant citizen distress.",
      "Automatically alerts appliances to shift heavy tasks to night.",
      "Releases high-altitude stored water. Highly stable grid backup."
    ]
  },
  {
    title: "Server Farm Cooling Cycle",
    category: "Energy",
    prompt: "The planetary climate mainframe is radiating 50 Megawatts of thermal heat. How should it be cooled?",
    options: ["Refrigerant Chil-Units", "Evaporative Cooling Towers", "Deep Ocean Water Piping", "District Heating Recapture Loop"],
    details: [
      "Uses high amounts of electricity and synthetic chemical coolants.",
      "Wastes massive volumes of water through high evaporation rates.",
      "Pipes icy ocean water to absorb heat, but slightly warms local seas.",
      "Redirects mainframe heat directly to provide warm water for houses."
    ]
  },
  {
    title: "E-Waste Dismantling Center",
    category: "Waste",
    prompt: "Obsolete computing cores are pile-accumulating in cargo docks. What is your processing strategy?",
    options: ["Acid Bath Metal Strip", "Incinerate to Scrap Slag", "Industrial Shred & Magnet", "Manual Disassembly Hubs"],
    details: [
      "Extracts precious gold, but acids produce dangerous toxic runoff.",
      "Burns out plastic insulation. Creates high toxic metallic smoke.",
      "Crushes electronics, sorting ferrous metals with massive magnets.",
      "Creates skilled jobs. Safely harvests working chips for rebuilds."
    ]
  },
  {
    title: "Monarch Butterfly Migration Route",
    category: "Biodiversity",
    prompt: "Urban expansion has fragmented the vital 3,000 km monarch butterfly route. How do we secure their flight?",
    options: ["Indoor Greenhouses", "Green Highway Overpasses", "Backyard Milkweed Incentives", "Continuous Wilderness Corridors"],
    details: [
      "Protects small counts, but isolates butterflies from the biosphere.",
      "Provides wild flora paths over highways. Safe for larger fauna too.",
      "Rewards citizens for planting larval host milkweeds on balconies.",
      "Protects a contiguous zone of native vegetation from development."
    ]
  },
  {
    title: "Fossil Fuel Subsidies Phaseout",
    category: "Energy",
    prompt: "Old coal lobby contracts are locking capital away from clean grids. How do we transition?",
    options: ["Maintain Contracts safely", "Gradual Tax Increase", "Sudden Legal Cancellation", "Direct Repurposing to Solargrid"],
    details: [
      "Avoids legal fights but keeps heavy emissions going for years.",
      "Encourages slower adoption of fossil fuels over a long decade.",
      "Immediate cut, but triggers sudden energy price hikes and lawsuits.",
      "Instantly converts subsidy payments into grants for clean energy."
    ]
  },
  {
    title: "Community Compost Initiative",
    category: "Waste",
    prompt: "Kitchen scraps make up 40% of standard trash bins, creating landfill methane. How do we intercept it?",
    options: ["Central Bio-Gas Digester", "Curbside Compost collection", "Community Garden composters", "Home Bokashi Kits"],
    details: [
      "Processes waste at high temperature. Generates useful natural gas.",
      "Collects scraps weekly. High fuel and truck emission footprint.",
      "Saves transport cost. Converts waste to organic soil in neighborhoods.",
      "Ferments food scraps indoors with microbes, zero smell, rich fertilizer."
    ]
  },
  {
    title: "Electric Bus Fleet Conversion",
    category: "Transportation",
    prompt: "City buses are emitting diesel soot near elementary schools. What is your fleet upgrade path?",
    options: ["Diesel Exhaust Filters", "Hybrid Electric retrofit", "Inductive-Charging Buses", "High-Volume Light Trolleys"],
    details: [
      "Slightly lowers toxic soot, but still burns diesel hydrocarbons.",
      "Improves fuel economy by 30%. Keeps mechanical complexity.",
      "Charges wirelessly at bus stops. High initial grid cost.",
      "Draws power from clean electric overhead cables. Zero batteries."
    ]
  },
  {
    title: "Desalination Brine Disposal",
    category: "Water",
    prompt: "The coastal desalination station is discharging dense saline brine, killing marine life. What is your cure?",
    options: ["Deep Ocean Pipe Outlets", "Evaporation Salt Drying", "Sulfide Extraction Lab", "Benthic Diffuser Arrays"],
    details: [
      "Dumps brine farther out, but still creates salt death zones.",
      "Pumps brine to open pans. Yields commercial salt but takes space.",
      "Extracts valuable lithium and magnesium. High energy requirements.",
      "Splits waste brine into tiny streams, mixing it harmlessly with sea currents."
    ]
  },
  {
    title: "Rare Earth Mining Ethics",
    category: "Industry",
    prompt: "Neodymium mining for wind turbines is creating acidic tailings. How do we protect water runoffs?",
    options: ["Reinforced Clay Tailings Dams", "Deep Underground injection", "Bio-Mining Bacteria", "Refurbished Neodymium Recycling"],
    details: [
      "Standard containment. Vulnerable to storm and flood damage.",
      "Pumps acid waste under high pressure. Risk of fracturing aquifer.",
      "Uses customized microbes to leach minerals cleanly with low acid.",
      "Recycles rare earth raw metals from discarded hard-drives and motors."
    ]
  },
  {
    title: "Rainwater Harvesting Mandate",
    category: "Water",
    prompt: "Seasonal monsoons create massive storm runoff while summers face severe dry spells. How do we store water?",
    options: ["Concrete Storage Reservoirs", "High-Rise Cistern Mandate", "Permeable Urban Asphalt", "Subsurface Sand Aquifer Recharge"],
    details: [
      "Centralized reservoirs. Expensive and subject to algae blooms.",
      "Requires all towers to capture rainwater. Good for local use.",
      "Absorbs heavy rainfall through roads, reducing street flooding.",
      "Directs storm flows underground, replenishing dry water aquifers."
    ]
  },
  {
    title: "Urban Heat Island Mitigation",
    category: "Housing",
    prompt: "Concrete structures absorb daytime heat, making summer nights unbearable. What is your policy?",
    options: ["Provide Free AC Units", "Install Cool Roof coatings", "Urban Pocket Forests", "Permaculture Water Channels"],
    details: [
      "Increases grid stress and dumps more hot air outside.",
      "Reflects 85% of solar energy. Cheap, but does not add biological health.",
      "Plants dense miniature forests, dropping neighborhood temperatures by 4°C.",
      "Weaves cool stream channels through public parks and pathways."
    ]
  },
  {
    title: "Geothermal Fracture Tapping",
    category: "Energy",
    prompt: "A massive thermal deposit is discovered 4 km beneath the volcanic rift. How do we extract clean heat?",
    options: ["Open Hydro-Frack Loop", "Closed Triple-Coaxial Pipes", "Steam Vent Turbine", "Binary Fluid Heat Exchanger"],
    details: [
      "Fractures rocks with water. Risk of triggering small earth tremors.",
      "Pipes fluid in closed circuits, ensuring zero chemical water leak.",
      "Extracts direct dry steam. Releases trace volcanic sulfur/CO2.",
      "Uses volatile working fluids for lower heat zones, zero emission."
    ]
  },
  {
    title: "Ocean Microplastics Filter",
    category: "Waste",
    prompt: "Nursery bays are contaminated with plastic micro-particles. What is your marine filtering method?",
    options: ["Fine Mesh Trawl Nets", "Active Sand Filters", "Centrifugal Vortices", "Aero-Bubble Curtains"],
    details: [
      "Clogs easily and traps vital marine zooplankton and fry.",
      "Effective but demands high pumping energy on ocean shores.",
      "Separates particles via spiral gravity. Highly energy intensive.",
      "Blows a barrier of tiny bubbles that floats plastic particles to top collectors."
    ]
  },
  {
    title: "Subsidized Organic Farming",
    category: "Agriculture",
    prompt: "Conventional farms use glyphosate sprays, poisoning local insect life. How do we shift agriculture?",
    options: ["Heavy Chemical Bans", "Glyphosate High Taxes", "Organic Humus Subsidies", "Regenerative Agroforestry Grants"],
    details: [
      "Triggers instant farmer protests and potential crop yield drops.",
      "Forces transition but increases food prices for poor families.",
      "Pays farmers to enrich soil with clean organic manure and compost.",
      "Integrates fruit trees and diverse bushes. Restores insect ecology."
    ]
  },
  {
    title: "Volcanic Ash Soil Fertilizer",
    category: "Agriculture",
    prompt: "An ancient basalt flow has left mineral-rich ash beds nearby. How do we process it for agriculture?",
    options: ["Sulfate Chemical Enriched Mix", "Crude Ash Spreading", "Humic Acid Compost Blend", "Mycorrhizal Inoculated Minerals"],
    details: [
      "Turns ash into quick chemical fertilizer but kills soil biology.",
      "Dusty and can blow away into waterways, clogging streams.",
      "Mixes mineral-rich ash with organic compost, anchoring nutrients safely.",
      "Combines ash with beneficial root fungi to boost plant mineral take-up."
    ]
  },
  {
    title: "High-Speed Maglev Rail Layout",
    category: "Transportation",
    prompt: "A new inter-city rail layout threatens a critical ancient oak forest habitat. How do we build?",
    options: ["Standard Ground Level Cut", "Elevated Concrete Viaduct", "Subterranean Tunneling", "High-Suspension Forest Bridges"],
    details: [
      "Destroys a 10 km wide swath of forest, displacing rare species.",
      "Raises rail 10 meters high, allowing deer and smaller wildlife to pass.",
      "Bores deep underground. Highly expensive but leaves forest intact.",
      "Hangs lightweight transit tubes above tree line with low ground footprint."
    ]
  },
  {
    title: "School Lunches Nutrition Balance",
    category: "Food",
    prompt: "Municipal schools are serving processed frozen food with high carbon packaging. What is your reform?",
    options: ["Enforce Recyclable Trays", "Introduce vegetarian days", "Sustain Local farm contracts", "School-Ground Permaculture Kitchens"],
    details: [
      "Reduces immediate waste but food still has high carbon count.",
      "Cuts carbon footprint by 40% but meets parental resistance.",
      "Saves transport energy by buying fresh produce from nearby farms.",
      "Students grow organic vegetables on-site, eating fresh whole foods."
    ]
  },
  {
    title: "Smart Home Thermostats",
    category: "Housing",
    prompt: "Grid demand fluctuates wildly because citizens use heating and cooling inefficiently. What is the solution?",
    options: ["Introduce Peak Surge Fees", "Subsidize Insulation", "AI Smart Thermostat Grant", "Passive Solar Wall retrofits"],
    details: [
      "Reduces peak demand but penalizes lower-income households.",
      "Reduces heat loss. Highly effective long-term but slow to install.",
      "Uses smart algorithms to pre-cool houses during solar peak.",
      "Heats homes naturally using triple-gazed thermal mass walls."
    ]
  },
  {
    title: "Pulp & Paper Cleansing Loop",
    category: "Industry",
    prompt: "A packaging mill is dumping chlorinated organic compounds into the central lake. How do we upgrade it?",
    options: ["Dilute Waste Pipeline", "Oxygen Bleaching Conversion", "Activated Microbial Silt", "Closed-Loop Zero Discharge System"],
    details: [
      "Fails to remove toxins, only spreading the chemical load.",
      "Replaces toxic chlorine with ozone, dramatically reducing emissions.",
      "Uses bacteria to eat wood pulp fibers, but leaves liquid chemicals.",
      "Recycles 100% of water and organic wood lignin inside the mill."
    ]
  },
  {
    title: "Mangrove Swamp Restorations",
    category: "Biodiversity",
    prompt: "Severe ocean swells are eroding coastal soils. How do we defend the eastern coastline?",
    options: ["Concrete Breakwater Walls", "Rubble Mound Barriers", "Mangrove Forest Replanting", "Structured Bamboo Reefs"],
    details: [
      "Stops waves but destroys coastal habitats and beach life.",
      "Expensive. Shifts erosion problems further down the beach.",
      "Reconstructs natural mangrove roots, trapping sediment and carbon.",
      "Anchors coastal soil with bio-degradable wooden frames."
    ]
  },
  {
    title: "Acoustic Noise Pollution Barrier",
    category: "Transportation",
    prompt: "Heavy highway transport noise is causing mental fatigue and stress in songbirds. What is your choice?",
    options: ["Concrete Noise Walls", "Install speed limits", "Thick Evergreen Hedges", "Replace Highway Asphalt with Bio-Gum"],
    details: [
      "Ugly visual barrier. Highly carbon intensive to build.",
      "Slightly lowers noise but increases shipping travel times.",
      "Dampens sound waves naturally while creating nesting habitats.",
      "Uses rubberized silent asphalt, dropping decibel stress by 70%."
    ]
  },
  {
    title: "Aero-Wind Turbine Location",
    category: "Energy",
    prompt: "Proposed wind farms on coastal ridges may disrupt bird migration pathways. Where do you place them?",
    options: ["Proceed with Coast Ridge", "Low-Profile Rotor Turbines", "Offshore Deep-Floaters", "Bladeless Aerodynamic Pillars"],
    details: [
      "Generates cheap energy but causes high mortality in raptors.",
      "Slower rotation limits bird strikes, but drops power yield by 40%.",
      "Puts turbines far out at ocean, capitalizing on strong steady winds.",
      "Pluck power from vibration of wind-spires. 100% bird safe."
    ]
  },
  {
    title: "River Basin Silt Dredging",
    category: "Water",
    prompt: "Erosion from agricultural tilling is clogging river channels with thick clay silt. How do we clear it?",
    options: ["Mechanical Diesel Dredge", "Silt Deflecting Fences", "Riparian Soil Buffer Zones", "Bioremediating Willow Plantations"],
    details: [
      "Clears riverbed quickly but muddy sediment plumes kill local fish.",
      "Blocks silt temporarily but requires frequent manual clearing.",
      "Plants dense native grass strips along farms to trap runoff soil.",
      "Plants water-loving willow trees, securing muddy river banks."
    ]
  },
  {
    title: "Public Carbon Ledger",
    category: "Infrastructure",
    prompt: "Large corporations hide their raw manufacturing carbon footprint. What transparency policy is set?",
    options: ["Voluntary Eco-Labels", "Standard Annual Audits", "Real-Time Block Metering", "Strict Supply-Chain Traceability"],
    details: [
      "Easy to greenwash. Most heavy polluters skip label disclosures.",
      "Identifies major leaks, but audit data is often years out of date.",
      "Requires active logging of grid and raw material data on public ledger.",
      "Exposes exact carbon and water trail of all commercial products."
    ]
  },
  {
    title: "Eco-Tourism Sanctuary",
    category: "Biodiversity",
    prompt: "An ancient jungle cave species has become popular with travel bloggers, risking habitat ruin. How do you protect it?",
    options: ["Charge Cave Entry Fees", "Install Concrete Pathways", "Restrict Access / Smart Cameras", "Virtual-Reality Cave Tour Hubs"],
    details: [
      "Limits crowds slightly but encourages rich tourists to enter.",
      "Keeps visitors on trail but ruins cave microclimate and humidity.",
      "Restricts physical entry. Monitors bat populations via audio sensors.",
      "Creates immersive 3D simulations. Keeps cave pristine and silent."
    ]
  },
  {
    title: "Deep Aquifer Depletion",
    category: "Water",
    prompt: "Subterranean aquifers are dropping 2 meters per year due to commercial farming. What agricultural policy goes into law?",
    options: ["Cap farm water quotas", "Subsidize Drip Irrigation", "Ban intensive water crops", "Implement aquifer recharge basins"],
    details: [
      "Fast water saving but triggers high organic produce pricing.",
      "Pipes water directly to plant roots, halving water consumption.",
      "Bans high-water crops in dry fields, encouraging arid grains.",
      "Channels surface rain into sandy basins to refill empty aquifers."
    ]
  },
  {
    title: "Solar Concentrator Mirrors",
    category: "Energy",
    prompt: "Concentrated Solar thermal towers are singeing passing mountain birds. How do we upgrade them?",
    options: ["Turn off Solar Towers", "Paint towers fluorescent colors", "Install Active Bird Radar Detractors", "De-focus mirrors during bird migratory weeks"],
    details: [
      "Stops energy production during crucial energy growth months.",
      "Ineffective under bright desert glare conditions.",
      "Uses smart radar to emit high-frequency acoustic warning signals.",
      "Slight energy drop, but clears hot points during key flight weeks."
    ]
  },
  {
    title: "Mycelium Packaging Growth",
    category: "Waste",
    prompt: "Polystyrene shipping foam is cluttering harbor bins. How do we support bio-packaging?",
    options: ["Bans Polystyrene Boxes", "Subsidize Plastic Recycling", "Establish organic mushroom tissue plant", "Introduce biological packaging taxes"],
    details: [
      "Reduces plastic foam but leaves packers without cushioning options.",
      "Struggles to process low-density foams, resulting in landfill clogging.",
      "Grows strong shock-absorbent packaging blocks from agricultural waste and fungi.",
      "Makes plastic foam expensive, promoting cardboard transition."
    ]
  },
  {
    title: "Tidal Wave Current Generator",
    category: "Energy",
    prompt: "A narrow coastal rocky channel has extreme tidal waves. How do we harvest this kinetic gravity cleanly?",
    options: ["Build Concrete Estuary Wall", "High Speed Seabed Turbines", "Oscillating Water Columns", "Low-Impact Floating Tide Mats"],
    details: [
      "Major change. Alters local coastal salinity and estuary habitats.",
      "Generates massive power but spinning blades risk seabed life.",
      "Squeezes air through shoreline chambers. Low impact, safe.",
      "Harnesses surface swell wave movement. Zero marine life impact."
    ]
  },
  {
    title: "Industrial Heat Recovery Loop",
    category: "Industry",
    prompt: "Foundry chimneys are releasing waste steam at 300°C. How do we capture this energy leak?",
    options: ["Vent steam to sky safely", "Install Thermoelectric Tiles", "Organic Rankine Cycle Engines", "Construct Local Hot Water Grids"],
    details: [
      "Wastes highly thermodynamic energy resource completely.",
      "Low mechanical wear but very low conversion efficiency of 5%.",
      "Converts waste steam back into 10 Megawatts of clean electricity.",
      "Heats thousands of family homes with clean waste radiator loop."
    ]
  },
  {
    title: "Clover Roadside Pollinator Belts",
    category: "Biodiversity",
    prompt: "Urban lawns are mowed to bare dirt, starving native wild bees. What is your urban land mandate?",
    options: ["Artificial Flowers in parks", "Reduce mowing schedules", "Mandated clover and daisy planting", "Reward lawns converted to mini meadow gardens"],
    details: [
      "Useless for bees. Emits micro-plastics under daylight UV rays.",
      "Lowers council fuel costs, but weeds can grow out of control.",
      "Sows highly hearty clover in parkways, raising pollen count by 300%.",
      "Gives citizens cash refunds for trading turf for native floral soil."
    ]
  },
  {
    title: "Biogas Sewer Vault Harvest",
    category: "Energy",
    prompt: "Main municipal sewage lines emit methane fumes. How do we capitalize on this bio-gas?",
    options: ["Burn gas at vent stack", "Flush with high chemical soap", "Sealed Anaerobic digesters", "Methane capturing algae tubes"],
    details: [
      "Flaring reduces absolute methane heat impact but releases direct CO2.",
      "Temporarily hides organic odors while introducing chemicals.",
      "Filters waste into secure bio-gas spheres, providing clean cooking fuel.",
      "Uses algae to absorb municipal organic nitrogen, yielding lipid bio-fuel."
    ]
  },
  {
    title: "Low-Flow Domestic Aerators",
    category: "Water",
    prompt: "Residential toilets and showers draw 300 liters per citizen daily. How do we conserve fresh reservoir reserves?",
    options: ["Implement Water Rationing", "Install Greywater recycling", "Free aerated flow faucet attachments", "Smart ultrasonic leak sensors"],
    details: [
      "Triggers high citizen frustration and water hoarding.",
      "Recycles water. Effective but has high building plumbing costs.",
      "Mixes air into streams, cutting shower water usage by 50% cleanly.",
      "Finds hidden cracks in household pipe connections within minutes."
    ]
  },
  {
    title: "Supercomputer Quantum Energy",
    category: "Energy",
    prompt: "The new global climate AI requires immense power for processing planetary models. What is the grid design?",
    options: ["Traditional Diesel backup", "Dedicated Nuclear Battery", "Silicon Solar Roof Shell", "Cryogenic Hydrogen Core"],
    details: [
      "Cheap but has high carbon emissions and noise pollution.",
      "Continuous reliable base load. Highly stable but creates fission waste.",
      "Offsets daytime computer loads but leaves server farm dark at night.",
      "Heats liquid hydrogen to fuel supercomputers, releasing water vapor."
    ]
  },
  {
    title: "Steel Foundry Arc Upgrade",
    category: "Industry",
    prompt: "Ancient metallurgical coke ovens are injecting dark soot plumes into our valleys. How do we upgrade steel mills?",
    options: ["Install Baghouse Smoke Filters", "Electric Arc Heating Furnace", "Green Hydrogen Direct Reduction", "Bio-Char Coal Replacement"],
    details: [
      "Vastly cuts soot particles but does not remove carbon dioxide gas.",
      "Melts scrap metal cleanly using massive solar-grid electricity.",
      "Uses hydrogen fuel to purify iron ore, emitting only pure water steam.",
      "Burns organic charcoal instead of coal. Good, but takes crop land."
    ]
  },
  {
    title: "Deforestation Sat Surveillance",
    category: "Biodiversity",
    prompt: "Illegal loggings are thinning remote mountain forests. How do we protect these critical carbon sinks?",
    options: ["Hire park ranger squads", "Construct barbed wire borders", "Acoustic AI Rainforest Listeners", "Satellite Radar Imaging"],
    details: [
      "Rangers face danger and struggle to patrol massive forest zones.",
      "Very high infrastructure cost and disrupts wilderness routes.",
      "Pins smart phones to trees to hear chainsaws, reporting loggers immediately.",
      "Captures thick cloud-piercing radar maps daily, reporting tree removals."
    ]
  },
  {
    title: "Urban Rooftop Gardens Policy",
    category: "Housing",
    prompt: "Hot concrete rooftops sit baking in empty solar light. What is the community urban standard?",
    options: ["Subsidize AC installations", "Paint roofs white", "Rooftop Veggie Allotments", "Solar Panel Canopy Mandate"],
    details: [
      "Worsens global warming and municipal grid load problems.",
      "Reduces heat absorption, but does not provide edible nutrition.",
      "Nourishes local families and cools rooftops by 5°C organically.",
      "Structures solar panels over roofs, creating cool shaded playgrounds."
    ]
  },
  {
    title: "Hydroelectric Bypass Channels",
    category: "Energy",
    prompt: "The regional river dam blocks migratory fish swimming upstream to lay eggs. How do we restore trout counts?",
    options: ["Demolish the hydro dam", "Set up artificial fish trucks", "Construct stepped water canals", "Ultrasonic Migratory Sirens"],
    details: [
      "Stops clean electricity generation, causing fossil fuel return.",
      "Extremely labor intensive and stresses fish heavily.",
      "Enables fish to jump up step canals naturally past the hydro dam.",
      "Acoustically warns fish away from dangerous turbine fan blades."
    ]
  },
  {
    title: "Algae Fuel Production Tanks",
    category: "Energy",
    prompt: "Aviation engines require liquid fuel. How do we produce liquid fuel with zero fossil carbon?",
    options: ["Traditional Corn Ethanol", "Used Cooking Oil refining", "Coastal glass algae tube farm", "Air-Captured Carbon kerosene"],
    details: [
      "Saves carbon but consumes valuable agricultural food crops.",
      "Extremely clean bio-fuel but feedstock supplies are highly limited.",
      "Cultivates marine algae, harvesting rich vegetable lipid oils naturally.",
      "Sucks carbon from wind, converting it into high-energy fuels."
    ]
  },
  {
    title: "Aluminium Can Recovery",
    category: "Waste",
    prompt: "Primary bauxite smelting consumes massive electricity. How do we improve aluminium cycles?",
    options: ["Subsidize virgin mines", "Automated sorting scanner", "Reverse Vending Cash Machine", "Eco-Can Design Mandates"],
    details: [
      "Increases strip mining and toxic red-mud waste basins.",
      "Uses smart lasers to pick aluminium from conveyor belts.",
      "Pays citizens instant cash rewards for inserting cans, hitting 98% returns.",
      "Standardizes material thickness, reducing raw smelting load by 15%."
    ]
  },
  {
    title: "Smart Traffic Signals Loop",
    category: "Transportation",
    prompt: "Idling cars at empty red lights waste thousands of fuel gallons daily. How do we optimize flow?",
    options: ["Remove traffic lights", "Timed signal cycles", "AI Camera Intersection Grid", "Build roundabout circles"],
    details: [
      "Causes high crash rates, posing severe hazard to pedestrians.",
      "Slight improvement but fails to adapt to real-time grid traffic surges.",
      "Dynamically switches lights based on active camera vehicle counts.",
      "Eliminates traffic lights entirely, maintaining quiet fluid movement."
    ]
  },
  {
    title: "Wetlands Sewage Bio-Filter",
    category: "Water",
    prompt: "Chemical discharge from laundry detergents is foaming up the canal beds. How do we filter chemicals?",
    options: ["Inject high chlorine dose", "Friction skimming filters", "Weave natural wetlands loops", "Mandate Bio-Degradable Soap ONLY"],
    details: [
      "Destroys flora and chemical molecules but yields chlorinated residues.",
      "Mechanically lifts foam sludge, but leaves dissolved compounds.",
      "Directs wastewater through cat-tail reed beds, neutralizing phosphates.",
      "Bans synthetic chemical soaps, restoring river water health natively."
    ]
  },
  {
    title: "Kelp Forest Coastal Seeding",
    category: "Biodiversity",
    prompt: "Overpopulated sea urchins are stripping the rocky ocean floor into desert barrens. How do we restore kelp?",
    options: ["Chemical Urchin Poison", "Mechanical Scuba Urchin Crushing", "Sea Otter Species Sanctuary", "Spore-Injected Clay Seeds"],
    details: [
      "Unpredictable toxins damage starfish and coral colonies.",
      "Requires massive diver team. Slow and extremely tiring.",
      "Re-establishes sea otters, which hunt urchins, reviving kelp naturally.",
      "Seeds ocean beds with fast-growing giant kelp spore pods."
    ]
  },
  {
    title: "Eco-Concrete Carbon Capture",
    category: "Infrastructure",
    prompt: "Cement manufacturing produces 8% of planetary carbon emissions. What structural standard is set?",
    options: ["Traditional Limestone cement", "Fly ash blend cement", "CO2-Injected Mineral Concrete", "Ancient Hemp-Lime Block Construction"],
    details: [
      "High temperature baking releases immense geogenic CO2.",
      "Uses charcoal-plant residue, dropping concrete carbon by 30%.",
      "Injects gaseous carbon into wet concrete mixture, locking it as stone.",
      "Fills walls with organic industrial hemp, capturing carbon natively."
    ]
  },
  {
    title: "Public Hydration Fountains",
    category: "Water",
    prompt: "Sultry citizen walks generate millions of discarded plastic water bottles. How do we provide hydration?",
    options: ["Double bottle recycling taxes", "Install water vending counters", "Filtered municipal tap water arches", "Incentivize reusable thermal flasks"],
    details: [
      "Raises state cash reserves, but fails to stop raw plastic sales.",
      "Dispenses cold drinks, but still creates container packaging footprint.",
      "Provides ice-cold pure mountain water taps across public square lanes.",
      "Gives matching smart metal flasks to all citizens during health festivals."
    ]
  },
  {
    title: "Heavy Metal Soil Chelation",
    category: "Agriculture",
    prompt: "Silt from old chemical factories has poisoned soil crop beds with cadmium. How do we extract heavy metals?",
    options: ["Excavate and dump in landfill", "Soil washing chemical acids", "Phyto-Mining Sunflower Fields", "Chelating Soil Bacteria Mix"],
    details: [
      "Moves toxic soil to another site. Ruins soil structures entirely.",
      "Strips soil minerals, yielding highly toxic washing chemical fluids.",
      "Sunflowers suck heavy cadmium through roots. Can be processed for metal.",
      "Injects microbes that lock metals as insoluble minerals, safe from plant roots."
    ]
  },
  {
    title: "Local Farmers Co-op Logistics",
    category: "Food",
    prompt: "Small biological farms waste fuel transport driving individually to local food markets. How do we coordinate?",
    options: ["Establish Central Wholesale Hub", "Provide Farm Fuel grants", "Shared Electric Logistics App", "Co-op Packaging Hubs"],
    details: [
      "Forces lower pricing on farmers, squeezing family margins.",
      "Makes burning diesel fuel cheaper, worsening shipping emissions.",
      "Coordinates joint electric cargo truck loops, cutting food miles by 60%.",
      "Packs fresh produce in standardized boxes, simplifying dispatch."
    ]
  },
  {
    title: "High-Speed Cargo Zeppelins",
    category: "Transportation",
    prompt: "Air shipping cargo holds produce intensive greenhouse gas exhaust. How do we fly freight cleanly?",
    options: ["Jet fuel carbon offsets", "High-Speed Maglev routes", "Hydrogen Cargo Zeppelins", "Slow Oceanic Sailing Freighters"],
    details: [
      "Pays for trees elsewhere, but does not stop active troposphere soot.",
      "Very fast land-transit but cannot cross oceans or rocky trenches.",
      "Large solar-skin airships move cargo quietly utilizing thin wind paths.",
      "Extremely low carbon but transport times take up to three weeks."
    ]
  },
  {
    title: "Urban Canopy Coverage Boost",
    category: "Biodiversity",
    prompt: "Industrial sectors lack trees, leaving low-income citizens under extreme sun exposure. What is your tree target?",
    options: ["Install green canvas tarps", "Plant non-native decorative palms", "Urban Miyawaki Dense Forests", "Mandated Sidewalk Canopy Rows"],
    details: [
      "Ugly, non-organic visual. Creates plastic trash when torn under wind.",
      "Provide very little shade and consume precious regional groundwater.",
      "Creates pocket biomes that grow 10x faster and absorb more carbon.",
      "Requires developers to reserve 35% of sidewalk spaces for shade trees."
    ]
  },
  {
    title: "Sustainable Wild Salmon Harvest",
    category: "Food",
    prompt: "Commercial netting is collapsing salmon counts in major rivers. How do we regulate active seafood?",
    options: ["Establish land-locked fish farms", "Implement sea netting fines", "Restricted seasonal quota tags", "Build Traditional Indigenous Fish Weirs"],
    details: [
      "Prevents wild netting but creates highly toxic concentrated fish waste.",
      "Hard to monitor. Smugglers bypass coastal border vessels easily.",
      "Limits commercial season to 10 days yearly, keeping fish levels safe.",
      "Traps fish selectively in woven wooden fences, releasing spawners."
    ]
  },
  {
    title: "Fibre-Optic Solar Skylights",
    category: "Housing",
    prompt: "Deep interior office rooms have no windows, consuming high fluorescent light power. How do we light them?",
    options: ["Install brighter LEDs", "Provide worker daylight breaks", "Fiber-Optic Solar Pipe cables", "Subsurface Light Wells"],
    details: [
      "Improves focus slightly but keeps electrical grid stress elevated.",
      "Keeps work hours short but doesn't solve baseline energy draw.",
      "Tracks sun with rooftop lenses, beaming pure light down flexible pipes.",
      "Cuts deep architectural shafts to let direct daylight flow downwards."
    ]
  },
  {
    title: "Carbon-neutral Data Storage",
    category: "Energy",
    prompt: "Our citizen storage servers are drawing 100 Megawatts. Where should the mainframe relocate?",
    options: ["Keep servers in town grid", "Desert Solar Power Cells", "Geothermal Mountain Vaults", "Deep Glacier Fjord Hubs"],
    details: [
      "Strains community grid, which is still phasing out coal reserves.",
      "Excellent solar supply but intense heat requires extra cooling energy.",
      "Powered by continuous volcanic heat, deep in protected stone chambers.",
      "Cooled naturally by icy waters. Zero electrical cooling footprint."
    ]
  },
  {
    title: "Industrial Wastewater Treatment",
    category: "Water",
    prompt: "Fabric dye houses release highly concentrated sulfur chemical fluids. How do do we filter them?",
    options: ["Pour into local sewers", "Heavy chemical flocculants", "Ozone Electro-Coagulation", "Wetland Bio-Char Sinks"],
    details: [
      "Corrodes sewer pumps and pollutes municipal water streams.",
      "Binds dyes into sludge but requires complex disposal of toxic ash.",
      "Shatters hard dye molecules with electric charges, recovering 98% pure water.",
      "Filters black dye water through organic charcoal, recycling fibers."
    ]
  },
  {
    title: "Eco-Labeling Product Laws",
    category: "Infrastructure",
    prompt: "Citizens are confused by greenwash advertisements claiming products are '100% Eco-Pure'. What is the law?",
    options: ["Ban eco ads completely", "Require standard product labels", "Blockchain Material Verification", "Independent Citizen Review Boards"],
    details: [
      "Stops greenwashing but prevents real green firms from advertising.",
      "Requires independent verified product tags on all store boxes.",
      "Logs every step of extraction and factory build transparently.",
      "Empowers citizen science teams to test and rank active green products."
    ]
  },
  {
    title: "High-Capacity Sodium Batteries",
    category: "Energy",
    prompt: "Lithium storage cells require intensive cobalt mining. What grid-battery technology is adopted?",
    options: ["Stick with traditional Lead-Acid", "Imports expensive Lithium cells", "Sodium-Ion Molten Salt cells", "Solid State Iron battery"],
    details: [
      "Heavy and toxic. Short lifespan with low grid energy density.",
      "High power density but relies on scarce cobalt and lithium.",
      "Uses abundant sea-salt minerals. 100% recyclable and safe.",
      "Extremely long life, low fire risk. Ideal for fixed grid backup."
    ]
  },
  {
    title: "Tundra Permafrost Preservation",
    category: "Biodiversity",
    prompt: "Global warming is melting ancient permafrost muds, releasing metric megatons of methane gas. What is your choice?",
    options: ["Sprinkle white sand cover", "Carbon-neutral grazing cattle", "Triple-barrier freeze pipes", "Reintroduce Siberian megafauna"],
    details: [
      "Extremely high transport cost. Blown away by arctic winds quickly.",
      "Slow grazing, has minimal footprint over freezing mudscapes.",
      "Uses artificial coolant loops. High grid power drain on north shores.",
      "Tramples insulating snow. Locks winter freeze cycle into tundra mud."
    ]
  },
  {
    title: "Glass Recyclables Melting Kiln",
    category: "Waste",
    prompt: "Traditional bottle smelting kilns burn natural gas at 1500°C. How do we sanitize glass cleanly?",
    options: ["Landfill glass bottles", "Heavy chemical wash and reuse", "Electric Hydrogen Heat Kiln", "Pounding glass into building sand"],
    details: [
      "Stops energy draw but glass fills valuable landfill spaces forever.",
      "Sterilizes bottles with caustic wash. Low energy but chemical runoff.",
      "Melts and reshapes glass using green electric arc heat, zero fossil burn.",
      "Crushes bottles into fine silica sand, replenishing erosion beach dunes."
    ]
  },
  {
    title: "Electric Delivery Fleet Grids",
    category: "Transportation",
    prompt: "Cargo delivery trucks are roaring through residential neighborhoods, emitting fine carbon soot. How do we upgrade?",
    options: ["Issue soot particle filters", "Subsidize hybrid delivery vans", "Smart Electric Distribution Hub", "Cargo Bike Delivery network"],
    details: [
      "Lowers soot output by 40% but maintains baseline fossil fuel emissions.",
      "Lowers fuel consumption slightly, but still creates noise and soot.",
      "Switches highway cargo to electric vans at city borders.",
      "Replaces delivery vans with cargo bikes, ensuring quiet streets."
    ]
  },
  {
    title: "Aquaponics Urban Sheds",
    category: "Food",
    prompt: "Our city regions have no local soil space to harvest fresh fish and greens. What facility do we build?",
    options: ["Pipes seafood from oceans", "Build chemical growth tanks", "Dual Aquaponics Glass houses", "Insect Bio-Protein sheds"],
    details: [
      "Requires intensive flight cargo fuel, lowering food freshness values.",
      "Fast production of synthetic cells but highly artificial nutrient trace.",
      "Combines fish ponds with lettuce beds, recycling fish waste as fertilizer.",
      "Grows high-protein fly pupae on waste compost. Safe, but unusual food."
    ]
  },
  {
    title: "Smart Water Grid Leak Alarms",
    category: "Water",
    prompt: "Old pipeline cracks are leaking 20% of municipal fresh clean drinking water. How do we locate the leaks?",
    options: ["Manually excavate roads", "Acoustic AI Leak sensors", "Add colored botanical dye", "Water pressure drop controls"],
    details: [
      "Extremely disruptive. Tears up streets and blocks clean transit lanes.",
      "Injects smart water bots that listen for quiet cracks, reporting locations.",
      "Highlights leak points visually, but turns river waters deep emerald green.",
      "Drops pipeline pressure to reduce loss, but citizen showers lose force."
    ]
  },
  {
    title: "Vertical-Axis Wind Spinners",
    category: "Energy",
    prompt: "Standard wind turbine blades are dangerous to mountain bats and take up wide expanses. What energy upgrade is built?",
    options: ["Decommission Ridge Wind", "Solar Thermal Panels", "Vertical Helix Spinners", "Solar Bio-Leaf canvases"],
    details: [
      "Vastly drops renewable grid generation, causing fossil fuel return.",
      "Good daylight backup but requires wide horizontal spaces in hills.",
      "Rotates on vertical poles. Compact, 100% safe for birds, works in any wind.",
      "Captures light through clean organic fluid sheet. Experimental."
    ]
  },
  {
    title: "Textile Hemp Harvest Shift",
    category: "Industry",
    prompt: "Synthetic polyester clothes shed millions of plastic microfibers into laundry drains. How do we shift clothes standards?",
    options: ["Install microfiber sewer traps", "Subsidize chemical cotton farms", "Mandate industrial hemp clothing", "Establish localized sheep wool mills"],
    details: [
      "Catches 70% of fibers but traps clog and require regular cleaning.",
      "Cotton uses high insecticide volumes and severe water draw.",
      "Generates incredibly sturdy, biological cloth. Grows with zero spray.",
      "Produces organic wool cardigans. Carbon-neutral, warm and fully biodegradable."
    ]
  },
  {
    title: "Biodiversity Habitat Passages",
    category: "Biodiversity",
    prompt: "High-speed highway lanes split migration tracks of deer and mountain foxes. How do we bridge the path?",
    options: ["Under-highway culvert tunnels", "Overhead vegetated wild bridges", "Electric livestock fences", "Scent Deterrent Sprays"],
    details: [
      "Deer avoid dark concrete tunnels, making them highly ineffective.",
      "Creates wide, dirt-covered bridges with native trees for animals.",
      "Blocks animals from crossing entirely, limiting pool breeding.",
      "Sprays predator markings to scare deer. Disturbs natural behavior."
    ]
  },
  {
    title: "Deep Sea Vent Mining Guard",
    category: "Biodiversity",
    prompt: "Commercial robotic submarines seek to mine dense mineral crusts near active volcanics. What is your policy?",
    options: ["Allow mining with taxes", "Enforce localized sea buffer zones", "Complete abyssal marine sanctuary", "Establish smart submarine audits"],
    details: [
      "Destroys rare benthic blind crabs and pristine deep ocean water life.",
      "Protects small areas but submarine silt plumes travel for kilometers.",
      "Bans all industrial submersibles, keeping ancient deep vents pristine.",
      "Requires miners to log acoustic sensors. Hard to enforce 4 km down."
    ]
  },
  {
    title: "Greywater Re-routing Pipes",
    category: "Water",
    prompt: "Sultry clean drinking water is wasted flushing toilets and watering lawns. What plumbing reform is put in law?",
    options: ["Double chemical water prices", "Require dual pipe plumbing", "Install simple garden barrels", "Subsidize water tap timers"],
    details: [
      "Triggers quick public protests, penalizing humble families.",
      "Forces builders to pipe bath wastewater directly into home toilets.",
      "Catches roof rainwater for plants. Highly cost-effective but dry.",
      "Shuts off tap automatically but does not recycle flowing water."
    ]
  },
  {
    title: "Bamboo Scaffold Engineering",
    category: "Infrastructure",
    prompt: "Heavy steel and aluminum scaffolding grids draw massive energy for blast smelting. What framework do we use?",
    options: ["Traditional steel grids", "High-Carbon plastics", "Structural bamboo scaffolding", "Pre-Cast Concrete frames"],
    details: [
      "Strong and familiar, but carries a high industrial carbon footprint.",
      "Lightweight but degrades under ultraviolet rays, creating microplastics.",
      "Grows 1 meter daily, capturing carbon. Incredibly strong and flexible.",
      "Saves assembly steps but concrete frames are heavy and static."
    ]
  },
  {
    title: "Smart Trash Can Sorter",
    category: "Waste",
    prompt: "Citizens are incorrectly sorting recyclables into organic food trash bins. How do we fix sorting?",
    options: ["Fine non-sorting families", "Install smart optical sort cans", "Educate school children with workshops", "Pay deposit refunds on all trash"],
    details: [
      "Requires invasive trash inspections, angering communities.",
      "Uses smart optical cameras to route cardboard, can, or food into bins.",
      "Improves sorting habits over a decade. Positive but very slow.",
      "Highly effective, but requires vast financial auditing networks."
    ]
  },
  {
    title: "Urban Forest Permaculture",
    category: "Biodiversity",
    prompt: "Public parks contain only concrete seats and mown turf lawns. How do we upgrade park designs?",
    options: ["Install more visual fountains", "Plant exotic palm rows", "Weave natural wild foraging paths", "Build concrete sports fields"],
    details: [
      "Looks beautiful, but consumes high pumping power and water supplies.",
      "Creates clean tidy pathways but provides zero food or wild bird cover.",
      "Integrates apple bushes, nut trees, and herbal paths for citizens.",
      "Provides recreational spaces but covers organic soil with cement."
    ]
  },
  {
    title: "Solar Glass Pane Installation",
    category: "Housing",
    prompt: "Office windows receive sun all day but cannot capture electric power. What building code is added?",
    options: ["Install shade canvas sheets", "Subsidize window air-conditioners", "Mandate solar-active glass panels", "Install solar window film sheets"],
    details: [
      "Blocks summer heat and light completely, requiring office lamps.",
      "Cools rooms but draws immense power, stressing the clean grid.",
      "Embeds microscopic solar-capture bands inside standard transparent glass.",
      "Cheap film sheets block heat well, but capture very little power."
    ]
  },
  {
    title: "Hydrogen Tank Logistics Fuel",
    category: "Transportation",
    prompt: "Mining excavators and sea cargo vessels require days of non-stop high torque. How do to we fuel them?",
    options: ["Diesel Combustion engines", "Heavy lithium battery packs", "Compressed Green Hydrogen cells", "High-Speed cable links"],
    details: [
      "Highly reliable but releases high carbon soot directly into pristine zones.",
      "Batteries are extremely heavy, reducing raw ship cargo capacity by 50%.",
      "Combines green hydrogen with oxygen in clean fuel cells, releasing water.",
      "Requires copper overhead cables. Impossible to build across open oceans."
    ]
  },
  {
    title: "Oyster Reef Coastal Safeguard",
    category: "Biodiversity",
    prompt: "Ocean acid values are eroding soft coastal banks and dunes. How do we defend the shoreline?",
    options: ["Pour chemical lime blocks", "Pile stone armor blocks", "Seed biological oyster reef bases", "Anchor synthetic turf mats"],
    details: [
      "Buffers waves but toxic lime blocks alter ocean mineral balances.",
      "Very expensive. Shifts erosion problems further down the coast.",
      "Restores self-healing native oyster dunes. Cleans ocean waters.",
      "Looks neat initially but degrades into toxic microplastic beach dust."
    ]
  },
  {
    title: "Methane Burner Cattle Feed",
    category: "Food",
    prompt: "Agricultural cattle emit massive methane gas through digestion. How do we cut livestock carbon?",
    options: ["Tax meat dishes heavily", "Confine cattle to inside barns", "Inoculated Red Seaweed cattle feed", "Shift herds to high dry hills"],
    details: [
      "Reduces meat consumption but triggers massive rural farmer protests.",
      "Enables gas capture hoods, but cattle face low-welfare conditions.",
      "Adding a seaweed sprinkle block cuts cow methane releases by 90%.",
      "Slightly cuts hoof dampness but has zero impact on stomach gas."
    ]
  },
  {
    title: "Public Bicycles Share Docking",
    category: "Transportation",
    prompt: "Sultry commuting vehicles are filling inner lanes with smog trails. What parkway standard is set?",
    options: ["Double petrol car fuel taxes", "Enforce clean car days weekly", "Establish shared municipal solar bikes", "Build massive parking tower centers"],
    details: [
      "Triggers extreme civil stress, raising urban commuting costs.",
      "Clears street lanes on weekends but does not solve work transport.",
      "Structures a grid of free solar-charged electric bikes across lanes.",
      "Keeps cars parked inside but keeps active roads congested and slow."
    ]
  },
  {
    title: "Paperless Municipal Offices",
    category: "Waste",
    prompt: "Town halls buy 15 million sheets of luxury paper quarterly, consuming forest wood. How do we shift work?",
    options: ["Buy recycled paper only", "Double municipal print taxes", "Mandated paperless tablet workflows", "Establish office wood-pulp tree farm"],
    details: [
      "Saves trees but still draws water and chemical chlorine to bleach fibers.",
      "Raises printing costs slightly but fails to change digital habits.",
      "Digitizes all forms on zero-carbon tablets, eliminating filing cabinets.",
      "Saves paper buying budget, but takes up open wild park lands."
    ]
  },
  {
    title: "Dry Toilet Water Conservation",
    category: "Water",
    prompt: "Remote wild reserve camp cabins consume fresh river water flushing toilets. What sewer system is standard?",
    options: ["Deep pit sewer toilet latrine", "Pipes sewage to river basins", "Microbial composting dry toilets", "Chemical septic holding vaults"],
    details: [
      "Triggers deep fecal pathogen leakages into groundwater aquifers.",
      "Destroys aquatic health of river valleys, creating active bacteria.",
      "Uses dry sawdust to compost waste bio-natively into soil fertilizer.",
      "Locks sewage in tanks. Enforces heavy pumping truck fuel emissions."
    ]
  },
  {
    title: "Lithium Battery Recycling Lab",
    category: "Waste",
    prompt: "Old electric car batteries are stacking up in salvage zones. How do we reclaim minerals cleanly?",
    options: ["Dump batteries in deep ocean", "Smelt batteries in coke furnaces", "Hydrometallurgical extraction lab", "Direct manual battery cell repair"],
    details: [
      "Leaches heavy cobalt, lead, and acid salts into marine food chains.",
      "Reclaims active metals but releases immense toxic black vapor plumes.",
      "Dissolves batteries in mild organic acids to recover 99% pure lithium.",
      "Tests and builds working battery packs for school solar grids."
    ]
  },
  {
    title: "Reforestation Quad-Drones",
    category: "Biodiversity",
    prompt: "Massive mountain slopes are inaccessible to human tree planting crews. How do we reseed them?",
    options: ["Airplane seed dump flights", "Leave lands bare to recover slowly", "Aero reforestation quad-drones", "Establish mountain foot paths"],
    details: [
      "Easy seeding but 95% of seeds are eaten by birds or wash down cliffs.",
      "Takes up to 80 years for ancient forest canopies to return.",
      "Launches drone vectors that fire seed pellets directly into soil crevices.",
      "Demands years of dangerous foot labor across steep unstable rocks."
    ]
  },
  {
    title: "Smart Street Lights Sensors",
    category: "Energy",
    prompt: "Street lamps burn high-voltage sodium bulbs all night along empty country roads. What is your choice?",
    options: ["Turn street lights off completely", "Install solar panels on poles", "AI motion sensor LED lamps", "Reflective roadside markers"],
    details: [
      "Increases night vehicle crash risks and makes citizens feel unsafe.",
      "Creates daylight power but street lights still draw night power grids.",
      "Lamps dim to 10% brightness, glowing to 100% when vehicles or pedestrians approach.",
      "Saves electrical power but fails to provide personal urban security."
    ]
  },
  {
    title: "Eco-Friendly Dry Cleaning",
    category: "Industry",
    prompt: "Dry cleaning shops use toxic perchloroethylene solvent, threating aquifer health. What solvent is mandated?",
    options: ["Voluntary solvent warnings", "Install toxic vent filter caps", "Liquid Carbon Dioxide solvents", "Liquid silicone eco-solvents"],
    details: [
      "Most shops skip warnings and continue using the cheap dirty solvent.",
      "Catches 50% of airborne fumes but fails to stop sludge spills.",
      "Cleans silk and wool safely using pressurized liquid CO2, zero waste.",
      "Uses liquid sand extract. Fully bio-degradable, safe and soft."
    ]
  },
  {
    title: "Sustainable Cocoa Orchards",
    category: "Food",
    prompt: "Commercial cocoa farming causes rainforest clearings in equatorial zones. How do we yield chocolate cleanly?",
    options: ["Ban cocoa crop imports", "Subsidize vertical cocoa sheds", "Adjoint Agroforestry shadegrown cocoa", "Synthetic chocolate flavor labs"],
    details: [
      "Creates black market smuggling lanes and ruins farmer livelihoods.",
      "Very high electrical construction costs, making chocolate unaffordable.",
      "Grows cocoa trees under wide tropical jungle canopy trees natively.",
      "Generates artificial chocolate bars from yeasts. Low carbon but dry."
    ]
  },
  {
    title: "Underground Heat Reservoirs",
    category: "Energy",
    prompt: "Winter freezing cycles require massive electricity grids to heat homes. Where do we store summer heat?",
    options: ["Build more nuclear grid power", "Pipes summer heat underground", "Install thick home gas fire blocks", "Provide free electric space heaters"],
    details: [
      "Provides steady winter power but incurs high capital startup costs.",
      "Pumps summer solar hot water into deep clay, pumping it up in winter.",
      "Burns heavy wood fuel pellets, dumping carbon and smoke into towns.",
      "Highly inefficient, spikes peak grid demand on coldest days."
    ]
  },
  {
    title: "Farmed Seaweed Kelp Chips",
    category: "Food",
    prompt: "Massive potato farming consumes immense chemical spray and land space. What bio-snack alternatives are developed?",
    options: ["Import corn snacks", "Synthetic bio-nutrient wafers", "Farmed Seaweed Kelp snack bars", "Subsidize local potato greenhouse towers"],
    details: [
      "Requires high shipping and diesel transport networks globally.",
      "Highly medical look. Meets heavy negative consumer reviews.",
      "Grows seaweed offshore with zero land, water, or fertilizer. Highly nutritious.",
      "Grows potatoes vertically. Highly expensive, clean but resource-taxing."
    ]
  },
  {
    title: "Electric Ferry Coastal Transport",
    category: "Transportation",
    prompt: "Coastal ferry boats burn heavy marine sulfur fuel, darkening harbor waters. What engine standard is set?",
    options: ["Install harbor smoke scrubbers", "Hybrid electric marine drives", "Inductive charging electric ferries", "Traditional trade sail-ships"],
    details: [
      "Catches large soot clumps but leaks sulfur acids into seawater basins.",
      "Saves 35% of fuel but still dumps dirty combusted exhaust in harbor.",
      "Charges ferry cables at passenger docks, sailing silent on pure lithium.",
      "Low impact but ocean ferry schedules become highly dependent on storms."
    ]
  },
  {
    title: "Natural Clay Wall Plasters",
    category: "Housing",
    prompt: "Chemical paints and gypsum wallboards release formaldehyde gas into modern homes. What building standard is added?",
    options: ["Enforce room ventilation fan runs", "Carbon wall filters", "Natural clay & lime plasters", "Solid pine timber walls Only"],
    details: [
      "Vents chemical gas but increases building heating grid losses.",
      "Sucks odor chemicals but filter blocks require constant disposal.",
      "Seals walls with ancient natural clays. Controls indoor humidity naturally.",
      "Warm and visual, but logging tall pines depletes sensitive forests."
    ]
  },
  {
    title: "Methane Trap Dairy Farming",
    category: "Agriculture",
    prompt: "Manure storage ponds release intense methane gas directly into agricultural valleys. How do we seal them?",
    options: ["Chemical spray treatment", "Aeration bubble spray", "Floating cover bio-gas capture", "Dehydrate manure immediately"],
    details: [
      "Inhibits microbes but leaves chemical salts, ruining manure as crop food.",
      "Stops methane formation but releases intensive nitrous oxide gas.",
      "Covers ponds with thick synthetic hoods, piping biomethane to grid.",
      "Consumes immense electrical energy drying manure under heat fans."
    ]
  },
  {
    title: "Eco-Friendly Burial Greenery",
    category: "Biodiversity",
    prompt: "Formaldehyde chemical embalmings and lacquered wood casket burials poison forest soils. What is your alternative?",
    options: ["Mandate high-temp cremation", "Traditional stone block vaults", "Organic mycelium pod forest burials", "Concrete memorial parks"],
    details: [
      "Vaporizes casket wood, but consumes immense natural gas energy.",
      "Locks caskets in dry stone vaults, isolating decay indefinitely.",
      "Buries citizens in bio-degradable mushroom pods, growing oak trees.",
      "Ugly concrete walls have very high industrial cement carbon footprints."
    ]
  },
  {
    title: "Low-Carbon Wine Production",
    category: "Agriculture",
    prompt: "Glass bottles and chemical fertilizers dominate classic vineyard carbon footprints. What is your green wine reform?",
    options: ["Enforce wine bottle recycling", "Subsidize organic clay amphoras", "Lightweight box packaging & organic vines", "Restrict wine trade to local markets"],
    details: [
      "Saves raw glass bottles but does not resolve mineral fertilizer runs.",
      "Looks historical but clay vessels are extremely heavy to ship.",
      "Eliminates heavy glass transport costs. Restores vineyard soil biology.",
      "Limits commercial exports, hurting rural vineyard jobs."
    ]
  },
  {
    title: "Subway Brake KERS Systems",
    category: "Transportation",
    prompt: "Subway trains dump metric megawatts of kinetic heat into underground tunnels when braking. How do we recapture it?",
    options: ["Install massive ventilation fans", "Porous tunnel insulation tiles", "Subway Flywheel KERS grids", "Supercapacitor platform buffers"],
    details: [
      "Pushes hot air to streets, drawing excessive grid fan electrical power.",
      "Absorbs noise vibrations but fails to harvest kinetic energy waste.",
      "Stores braking friction kinetic energy in train flywheels for rapid takeoff.",
      "Stores braking power in station batteries to run platform lighting grids."
    ]
  },
  {
    title: "Plank Wood Megastructures",
    category: "Infrastructure",
    prompt: "Fossil steel girders make modern structures highly greenhouse-active. What green materials does city construction use?",
    options: ["Recycled steel frameworks", "Bamboo composite boards", "Engineered cross-laminated timber", "Clay block constructions"],
    details: [
      "Reduces mineral mining slightly, but smelting scrap still draws high power.",
      "Strong but composite binders contain high chemical aldehyde resins.",
      "Crafts towering sky structures from engineered wood, securing carbon.",
      "Low carbon but clay bricks have low earthquakes resistance values."
    ]
  },
  {
    title: "Planetary Fusion Ignition",
    category: "Energy",
    prompt: "Stage 100 Utopia. Scientists seek to trigger secure deuterium-helium laser fusion to retire all older grid structures. Design the ignition:",
    options: ["High-power uranium hybrid reactor", "Laser inert magnetic confinement fusion", "Superconducting tokamak toroidal ring", "Aero atmospheric solar space harvest"],
    details: [
      "Provides abundant power but leaves a complex toxic fission waste load.",
      "Fires lasers at seawater hydrogen ice targets, ignition of pure star energy.",
      "Sustains hot helium plasma layers. High magnetic maintenance power.",
      "Launches solar-beams from orbits. Excellent, but creates orbital clutter."
    ]
  }
];

// Map Compact Seeds to proper Challenge format!
export const INITIAL_CHALLENGES: Challenge[] = SEED_DATA.map((seed, idx) => {
  const categoriesMap: Record<string, number> = {
    "Transportation": -1.5,
    "Food": -1.2,
    "Energy": -2.0,
    "Waste": -1.5,
    "Water": -1.3,
    "Biodiversity": -1.6,
    "Housing": -1.2,
    "Agriculture": -1.4,
    "Industry": -1.8,
    "Infrastructure": -2.2
  };
  const baseCo2 = categoriesMap[seed.category] || -1.5;

  return {
    id: `c_${idx + 1}`,
    title: seed.title,
    category: seed.category,
    prompt: seed.prompt,
    choices: [
      {
        text: seed.options[0],
        co2Impact: Math.round((baseCo2 * -1.8 + 1.2) * 10) / 10, // positive or minor reduction (bad)
        healthImpact: -3,
        happinessImpact: -1,
        biodiversityImpact: -2,
        xpReward: 10,
        coinReward: 20,
        description: seed.details[0]
      },
      {
        text: seed.options[1],
        co2Impact: Math.round((baseCo2 * 0.4) * 10) / 10,
        healthImpact: 1,
        happinessImpact: 2,
        biodiversityImpact: 0,
        xpReward: 30,
        coinReward: 40,
        description: seed.details[1]
      },
      {
        text: seed.options[2],
        co2Impact: Math.round((baseCo2 * 0.9) * 10) / 10,
        healthImpact: 3,
        happinessImpact: 3,
        biodiversityImpact: 2,
        xpReward: 50,
        coinReward: 65,
        description: seed.details[2]
      },
      {
        text: seed.options[3],
        co2Impact: Math.round((baseCo2 * 1.5) * 10) / 10, // ultimate (very good negative)
        healthImpact: 5,
        happinessImpact: 5,
        biodiversityImpact: 4,
        xpReward: 80,
        coinReward: 90,
        description: seed.details[3]
      }
    ]
  };
});


export const INITIAL_MARKET_ITEMS: MarketItem[] = [
  // NATURE CATEGORY
  {
    id: "m_tree",
    name: "Golden Grass patches",
    category: "Nature",
    description: "Hearty dry-grass colonies that synthesize basic nitrogen and carbon into fertile topsoil layers.",
    cost: 50,
    costType: "ecoCoins",
    minLevel: 1,
    healthBonus: 2,
    biodiversityBonus: 2,
    co2ReductionBonus: 0.5,
    purchasedCount: 0
  },
  {
    id: "m_patch",
    name: "Pine Forest clump",
    category: "Nature",
    description: "Sturdy boreal pines that form highly resilient carbon-sink structures and hold groundwater reservoirs.",
    cost: 120,
    costType: "ecoCoins",
    minLevel: 5,
    healthBonus: 5,
    biodiversityBonus: 6,
    co2ReductionBonus: 1.5,
    purchasedCount: 0
  },
  {
    id: "m_lake",
    name: "Freshwater Lake",
    category: "Nature",
    description: "A gorgeous crystal-clear aquifer reservoir that feeds rivers and creates cloud moisture systems.",
    cost: 250,
    costType: "ecoCoins",
    minLevel: 9,
    healthBonus: 10,
    biodiversityBonus: 8,
    co2ReductionBonus: 2.0,
    purchasedCount: 0
  },
  {
    id: "m_coral",
    name: "Coral Reef Colony",
    category: "Nature",
    description: "Deep sea structure supporting marine balance, stabilizing pH, and providing massive blue Carbon capture.",
    cost: 400,
    costType: "ecoCoins",
    minLevel: 15,
    healthBonus: 15,
    biodiversityBonus: 18,
    co2ReductionBonus: 4.5,
    purchasedCount: 0
  },
  {
    id: "m_vertical",
    name: "Vertical Megagardens",
    category: "Nature",
    description: "Magnificent high-rise botanic clusters that wrap surrounding buildings to naturally filter urban air currents.",
    cost: 15,
    costType: "gems",
    minLevel: 25,
    healthBonus: 20,
    biodiversityBonus: 12,
    co2ReductionBonus: 6.0,
    purchasedCount: 0
  },

  // WILDLIFE CATEGORY
  {
    id: "m_birds",
    name: "Temperate Songbirds",
    category: "Wildlife",
    description: "Pollinators and insect controllers. Their beautiful morning chorus boosts citizen happiness index.",
    cost: 80,
    costType: "ecoCoins",
    minLevel: 11,
    healthBonus: 2,
    biodiversityBonus: 8,
    co2ReductionBonus: 0.2,
    purchasedCount: 0
  },
  {
    id: "m_deer",
    name: "Highland Deer Pack",
    category: "Wildlife",
    description: "Graceful herbivores that maintain forest grasslands. Strengthens food-web stability.",
    cost: 160,
    costType: "ecoCoins",
    minLevel: 18,
    healthBonus: 4,
    biodiversityBonus: 12,
    co2ReductionBonus: 0.1,
    purchasedCount: 0
  },
  {
    id: "m_bees",
    name: "Aero Honeybee Sanctuary",
    category: "Wildlife",
    description: "Critical agricultural pollinators. Improves total crop harvests and triggers lush plant propagation.",
    cost: 200,
    costType: "ecoCoins",
    minLevel: 22,
    healthBonus: 6,
    biodiversityBonus: 16,
    co2ReductionBonus: 1.0,
    purchasedCount: 0
  },
  {
    id: "m_monarch",
    name: "Monarch Migration Wave",
    category: "Wildlife",
    description: "Stunning orange-clad lepidoptera that float past green highways, pollinating fields continuously.",
    cost: 8,
    costType: "gems",
    minLevel: 30,
    healthBonus: 8,
    biodiversityBonus: 15,
    co2ReductionBonus: 0.5,
    purchasedCount: 0
  },
  {
    id: "m_whale",
    name: "Bioluminescent Whales",
    category: "Wildlife",
    description: "Legendary massive ocean giants that redistribute marine nutrients and carry massive carbon locked deep under.",
    cost: 25,
    costType: "gems",
    minLevel: 50,
    healthBonus: 18,
    biodiversityBonus: 25,
    co2ReductionBonus: 8.0,
    purchasedCount: 0
  },

  // INFRASTRUCTURE CATEGORY
  {
    id: "m_solar",
    name: "Solar Energy Farm",
    category: "Infrastructure",
    description: "High-grade photovoltaic glass arrays that capture radiant starlight and feed renewable batteries.",
    cost: 300,
    costType: "ecoCoins",
    minLevel: 12,
    healthBonus: 12,
    biodiversityBonus: -1,
    co2ReductionBonus: 5.0,
    purchasedCount: 0
  },
  {
    id: "m_wind",
    name: "Breeze Energy Turbines",
    category: "Infrastructure",
    description: "Slow-spinning thermal wind carbonless turbines that feed local eco-homes day and night.",
    cost: 350,
    costType: "ecoCoins",
    minLevel: 16,
    healthBonus: 14,
    biodiversityBonus: -1,
    co2ReductionBonus: 6.5,
    purchasedCount: 0
  },
  {
    id: "m_recycle",
    name: "Circular Recycling Hub",
    category: "Infrastructure",
    description: "Completely automated sorting station that returns elements into construction fabrics cleanly.",
    cost: 450,
    costType: "ecoCoins",
    minLevel: 20,
    healthBonus: 15,
    biodiversityBonus: 2,
    co2ReductionBonus: 8.0,
    purchasedCount: 0
  },
  {
    id: "m_algae",
    name: "Algae Air purification Tank",
    category: "Infrastructure",
    description: "Industrial glass columns growing high-speed chlorella algae, breathing in CO2 10 times quicker than standard land foliage.",
    cost: 12,
    costType: "gems",
    minLevel: 32,
    healthBonus: 18,
    biodiversityBonus: 5,
    co2ReductionBonus: 12.0,
    purchasedCount: 0
  },
  {
    id: "m_capture",
    name: "Tropospheric Carbon Capture Array",
    category: "Infrastructure",
    description: "High-power fans running solid-amine molecular filters that lock carbon into mineral block structures.",
    cost: 30,
    costType: "gems",
    minLevel: 45,
    healthBonus: 22,
    biodiversityBonus: 1,
    co2ReductionBonus: 25.0,
    purchasedCount: 0
  },
  {
    id: "m_elevator",
    name: "Orbital Space Elevator",
    category: "Infrastructure",
    description: "Legendary level-100 zero-emission vertical carbon-fiber tether that launches cosmic missions clean of rocket fuel.",
    cost: 150,
    costType: "credits",
    minLevel: 75,
    healthBonus: 30,
    biodiversityBonus: 10,
    co2ReductionBonus: 50.0,
    purchasedCount: 0
  }
];

export const INITIAL_WEEKLY_EVENTS: WeeklyEvent[] = [
  {
    id: "e1",
    name: "🔥 Wildfire Recovery",
    icon: "Flame",
    description: "Unprecedented regional warmth sparked active brush forest fires. Help direct smoke ventilation and biological seeding!",
    challengeText: "The Western Pine region is burning. Smoke is polluting the air index. Choose your response strategy:",
    choices: [
      {
        text: "Chemical Fire Retardant",
        co2Impact: 2.0,
        healthImpact: 2,
        happinessImpact: 2,
        biodiversityImpact: -4,
        xpReward: 30,
        coinReward: 50,
        description: "Quenches fires immediately but chemicals leach into surrounding forest soil, harming fauna."
      },
      {
        text: "Liquid Water Air-Bomber",
        co2Impact: 0.5,
        healthImpact: 4,
        happinessImpact: 3,
        biodiversityImpact: 1,
        xpReward: 50,
        coinReward: 80,
        description: "Utilizes pristine lake water. Successfully saves the forest habitat without dangerous toxins."
      },
      {
        text: "Controlled Counter-Burning",
        co2Impact: -1.0,
        healthImpact: 5,
        happinessImpact: 4,
        biodiversityImpact: 4,
        xpReward: 80,
        coinReward: 120,
        description: "Professional eco-clearing stops fire spreading. Ashes nourish future generations of flora naturally."
      }
    ]
  },
  {
    id: "e2",
    name: "🌊 Great Ocean Cleanup",
    icon: "Waves",
    description: "An ancient shipping container of medical relics has split, threatening the local nesting coral reef ecosystem.",
    challengeText: "Floating trash is choking reef channels. Reef health is dropping. Direct our response team:",
    choices: [
      {
        text: "Direct Human Net Trawling",
        co2Impact: 1.0,
        healthImpact: 2,
        happinessImpact: 2,
        biodiversityImpact: 1,
        xpReward: 32,
        coinReward: 60,
        description: "Pulls up most garbage but diesel motor boats disturb sensitive marine migration patterns."
      },
      {
        text: "Passive Oceanic Barrier Net",
        co2Impact: -0.5,
        healthImpact: 4,
        happinessImpact: 4,
        biodiversityImpact: 3,
        xpReward: 60,
        coinReward: 90,
        description: "Employs natural sea currents to bundle plastics into recovery lanes safely without disturbing marine life."
      },
      {
        text: "Enzymatic Marine Cleaners",
        co2Impact: -2.0,
        healthImpact: 6,
        happinessImpact: 5,
        biodiversityImpact: 5,
        xpReward: 90,
        coinReward: 150,
        description: "Releases tailored biological proteins which safely consume polymers and purify seawater mineral trace."
      }
    ]
  },
  {
    id: "e3",
    name: "🌳 Global Reforestation Initiative",
    icon: "Trees",
    description: "A unified league of galaxy partners has agreed to plant 2 billion seeds if your planet demonstrates soil health.",
    challengeText: "How should citizens prioritize planting 2 billion seeds today?",
    choices: [
      {
        text: "Standard Fast Growing Pines",
        co2Impact: -2.0,
        healthImpact: 3,
        happinessImpact: 3,
        biodiversityImpact: 1,
        xpReward: 40,
        coinReward: 70,
        description: "Provides basic swift shade and logs carbon but creates a bio-monoculture prone to pest damage."
      },
      {
        text: "Diverse Quad-Species Planting",
        co2Impact: -3.5,
        healthImpact: 5,
        happinessImpact: 5,
        biodiversityImpact: 5,
        xpReward: 75,
        coinReward: 110,
        description: "Unlocks bird nests and soil recovery. Extremely resilient biome forms with stunning orange foliage."
      }
    ]
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "a1",
    title: "🌱 Cosmic Planter",
    description: "Purchased your very first element of Nature from the eco marketplace.",
    unlocked: false,
    icon: "Trees"
  },
  {
    id: "a2",
    title: "🦊 Wildlife Sanctuary",
    description: "Maintain a Biodiversity Index of over 50% to trigger wildlife sanctuary status.",
    unlocked: false,
    icon: "Heart"
  },
  {
    id: "a3",
    title: "⚡ Renewable Pioneer",
    description: "Invest in 3 or more green infrastructure assets (Solar, Wind, Algae columns).",
    unlocked: false,
    icon: "Zap"
  },
  {
    id: "a4",
    title: "📉 Carbon Shredder",
    description: "Reduce your annual Carbon Footprint Score to below 60 tons.",
    unlocked: false,
    icon: "ShieldAlert"
  },
  {
    id: "a5",
    title: "🏗️ Master Architect",
    description: "Ascend to Level 40 and establish a self-sustaining eco-village for citizens.",
    unlocked: false,
    icon: "Building"
  },
  {
    id: "a6",
    title: "🏆 Guardian of Earth",
    description: "Reach the legendary Level 100 on Green Odyssey and trigger your planet's green core bloom.",
    unlocked: false,
    icon: "Crown"
  }
];

export const SIMULATED_GALAXY_PLANETS: FriendPlanet[] = [
  {
    id: "fp_1",
    ranking: 1,
    owner: "CosmicGroot",
    planetName: "Elysium-9",
    level: 98,
    carbonScore: 12,
    health: 98,
    likes: 3144,
  },
  {
    id: "fp_2",
    ranking: 2,
    owner: "SolarSurfer",
    planetName: "Helios Prime",
    level: 79,
    carbonScore: 35,
    health: 89,
    likes: 1984,
  },
  {
    id: "fp_3",
    ranking: 3,
    owner: "NebulaNate",
    planetName: "Pristine-B",
    level: 54,
    carbonScore: 68,
    health: 72,
    likes: 720,
  },
  {
    id: "fp_4",
    ranking: 4,
    owner: "StarGuard_Jen",
    planetName: "Gaia Restored",
    level: 32,
    carbonScore: 110,
    health: 54,
    likes: 242,
  },
  {
    id: "fp_5",
    ranking: 5,
    owner: "Astra_Rider",
    planetName: "Borealis Hub",
    level: 14,
    carbonScore: 148,
    health: 28,
    likes: 91,
  }
];
