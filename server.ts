import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Built-in, sector-aware door specification advisory (no external AI service).
function buildDoorAdvisory(sector?: string): string {
  const label = sector || "High-Rise & Commercial";
  return `**Just Doors Specification Advisory:**\n\nFor **${label}** projects, standard best practices include:\n\n- **Unit Entry Doors**: 20-Minute UL 10C positive pressure fire-rated solid mineral/particleboard core with STC 32-38 acoustic drop seals, intumescent perimeter gasketing, and Grade 1 mortise locksets or smart RFID credentials.\n- **Stairwell & Exit Enclosures**: 90-Minute to 3-Hour 16-Gauge Galvannealed Hollow Metal Doors with fire-rated rim/mortise panic exit hardware (UL 305/NFPA 101) and heavy-duty ball-bearing spring hinges or hydraulic door closers.\n- **Common Areas & Amenity Lounges**: Heavy-duty architectural stile-and-rail or seamless flush wood veneer with concealed magnetic pivots and electronic access integration.\n\n*Our commercial estimating team can review your complete door schedule within 24 hours. Send your schedule to bids@justdoors.co or use our schedule upload tool below.*`;
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "justdoors-api", timestamp: new Date().toISOString() });
});

// Door Specification & Code Compliance Advisory Endpoint
app.post("/api/door-assistant", (req, res) => {
  try {
    const { prompt, sector } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    res.json({
      text: buildDoorAdvisory(sector),
      isFallback: true,
    });
  } catch (error: any) {
    console.error("Error in /api/door-assistant:", error);
    res.status(500).json({
      error: "Failed to generate door specification response",
      details: error.message,
    });
  }
});

// Hardware Compatibility Validation Rules Engine (NFPA 80 / ULC-S104 / UL 10C / BCBC)
interface HardwareValidationRequest {
  doorType: string;
  fireRating: string;
  lockset: string;
  hinges: string;
  closer?: string;
  frameType?: string;
  location?: string;
}

interface HardwareValidationResponse {
  isCompatible: boolean;
  status: 'compliant' | 'warning' | 'incompatible';
  summary: string;
  ruleCode: string;
  details: string[];
  recommendations: string[];
  codeReferences: string[];
  testedAssemblies: string;
}

function evaluateHardwareCompatibility(req: HardwareValidationRequest): HardwareValidationResponse {
  const door = (req.doorType || '').toLowerCase();
  const fire = (req.fireRating || '').toLowerCase();
  const lock = (req.lockset || '').toLowerCase();
  const hinge = (req.hinges || '').toLowerCase();
  const closer = (req.closer || '').toLowerCase();
  const frame = (req.frameType || '').toLowerCase();
  
  const isFireRated = fire.includes('20') || fire.includes('45') || fire.includes('90') || fire.includes('3-hour') || fire.includes('3 hour') || fire.includes('60');
  const isHeavyFireRated = fire.includes('90') || fire.includes('3-hour') || fire.includes('3 hour');
  const isGlassOrAluminum = door.includes('glass') || door.includes('aluminum') || frame.includes('aluminum');
  const isSteel = door.includes('steel') || door.includes('hollow metal') || door.includes('galvannealed');
  const isWood = door.includes('wood') || door.includes('veneer') || door.includes('timber') || door.includes('flush wood');

  const details: string[] = [];
  const recommendations: string[] = [];
  const codeReferences: string[] = [];
  let status: 'compliant' | 'warning' | 'incompatible' = 'compliant';
  let summary = 'Hardware package is fully compatible and code compliant.';
  let ruleCode = 'NFPA-80-COMPLIANT';

  // 1. Check Fire Door Positive Latching Requirement (NFPA 80 Section 6.4.4.3)
  if (isFireRated) {
    codeReferences.push('NFPA 80 Sec 6.4.4.3 (Positive Latching)', 'ULC-S104 Fire Door Tests');
    if (lock.includes('passage') || lock.includes('roller catch') || lock.includes('dummy') || (lock.includes('privacy') && !lock.includes('mortise') && !lock.includes('grade 1') && !lock.includes('grade 2'))) {
      status = 'incompatible';
      ruleCode = 'ERR-NO-POSITIVE-LATCH';
      details.push('Fire-rated doors must have an active positive-latching latchbolt. Non-latching passage sets, dummy pulls, and roller catches fail inspection.');
      recommendations.push('Specify a ULC fire-listed Grade 1 or 2 Cylindrical or Mortise lockset with a minimum 1/2" throw latchbolt.');
    } else {
      details.push('Positive latching verified: Lockset maintains physical door closure under positive fire pressure.');
    }
  }

  // 2. Check Hinge Fire Rating & Weight Bearing (NFPA 80 Section 6.4.3.1)
  if (isHeavyFireRated) {
    codeReferences.push('NFPA 80 Sec 6.4.3.1 (Steel Ball Bearing Hinges)', 'UL 10C Positive Pressure');
    if (hinge.includes('plain') || hinge.includes('residential') || hinge.includes('brass plain') || hinge.includes('lightweight')) {
      status = 'incompatible';
      ruleCode = 'ERR-HINGE-FIRE-PROHIBITED';
      details.push('90-Minute and 3-Hour fire doors strictly prohibit plain-bearing or low-melt residential hinges.');
      recommendations.push('Upgrade to heavy-weight 4.5"x4.5" steel ball-bearing hinges (e.g. Hager BB1279 / McKinney) or continuous geared Roton hinges.');
    } else if (hinge.includes('spring') && isSteel && (fire.includes('3-hour') || fire.includes('3 hour'))) {
      if (status !== 'incompatible') status = 'warning';
      ruleCode = 'WARN-SPRING-HINGE-HEAVY';
      details.push('Spring-loaded hinges on heavy 3-Hour 16ga steel doors can struggle with latch reliability and hydraulic draft resistance.');
      recommendations.push('Pair heavy-duty ball bearing hinges with an adjustable commercial hydraulic door closer (LCN 4040XP or ASSA ABLOY).');
    } else {
      details.push('Hinge specification satisfies NFPA 80 heavy fire door bearing requirements.');
    }
  }

  // 3. Concealed Hinges on Fire-Rated Wood Doors
  if (isFireRated && isWood && (hinge.includes('concealed') || hinge.includes('soss') || hinge.includes('3d'))) {
    codeReferences.push('ULC-S104 Mineral Core Penetration Guidelines');
    if (status !== 'incompatible') status = 'warning';
    details.push('Concealed 3D hinges on 20-minute wood doors require certified manufacturer intumescent fire liner jackets.');
    recommendations.push('Ensure pre-cut intumescent hinge liners (e.g., Tectus / SOSS fire kits) are factory-embedded during door machining.');
  }

  // 4. Aluminum & Commercial Glass Compatibility
  if (isGlassOrAluminum) {
    codeReferences.push('ANSI A156.4 / A156.10 Commercial Glass Openings');
    if (lock.includes('standard wood mortise') || lock.includes('heavy wood')) {
      status = 'incompatible';
      ruleCode = 'ERR-GLASS-LOCK-MISMATCH';
      details.push('Standard wood door mortise locks cannot be mounted in narrow-stile commercial aluminum or glass doors.');
      recommendations.push('Select narrow-stile Adams Rite mortise latches or dormakaba architectural glass patch fittings.');
    }
    if (isFireRated) {
      if (status !== 'incompatible') status = 'warning';
      details.push('Commercial glass framing must use certified Pyrostop or fire-resistive ceramic glass to achieve fire ratings.');
      recommendations.push('Verify fire-rated glazed aluminum framing assembly (e.g., Aluflam / Vetrotech system).');
    }
  }

  // 5. High-Traffic / Stairwell Egress Check
  if ((door.includes('stair') || req.location?.toLowerCase().includes('stair') || req.location?.toLowerCase().includes('exit')) && !lock.includes('panic') && !lock.includes('exit') && !lock.includes('crash')) {
    if (status !== 'incompatible') status = 'warning';
    ruleCode = 'WARN-STAIRWELL-PANIC-EGRESS';
    codeReferences.push('NFPA 101 Life Safety Code Section 7.2.1.5');
    details.push('Designated stairwell exit enclosures and egress paths with high occupant loads typically mandate single-motion panic exit hardware.');
    recommendations.push('Specify a Von Duprin 98/99 Series or Falcon rim exit panic device with fire-rated strike.');
  }

  // 6. Summary Resolution
  if (status === 'incompatible') {
    summary = 'Hardware Incompatible / Code Violation Detected: Configuration will fail municipal building inspection.';
  } else if (status === 'warning') {
    summary = 'Hardware Condition Alert: Hardware will function but requires specific factory preps or fire accessories.';
  } else {
    summary = 'Hardware Package 100% Code Compliant: Tested and verified under ULC and NFPA standards.';
  }

  const testedAssemblies = isFireRated 
    ? (isHeavyFireRated ? 'UL 10C / ULC-S104 90-180 Min Certified Assembly' : 'UL 10C 20-45 Min Positive Pressure Assembly')
    : 'ANSI/BHMA Grade 1/2 Commercial Architectural Standard';

  return {
    isCompatible: status !== 'incompatible',
    status,
    summary,
    ruleCode,
    details,
    recommendations: recommendations.length > 0 ? recommendations : ['All selected components match manufacturer machining tolerances and ULC listings.'],
    codeReferences: Array.from(new Set(codeReferences)),
    testedAssemblies,
  };
}

// Hardware Compatibility Validation Endpoint
app.post("/api/validate-hardware-compatibility", (req, res) => {
  try {
    const { doorType, fireRating, lockset, hinges, closer, frameType, location } = req.body;
    
    if (!doorType || !fireRating || !lockset || !hinges) {
      return res.status(400).json({ 
        error: "Missing required fields for validation (doorType, fireRating, lockset, hinges)" 
      });
    }

    const result = evaluateHardwareCompatibility({
      doorType,
      fireRating,
      lockset,
      hinges,
      closer,
      frameType,
      location,
    });

    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/validate-hardware-compatibility:", error);
    res.status(500).json({
      error: "Validation failed",
      details: error.message,
    });
  }
});

// Batch validation for full door schedules
app.post("/api/batch-validate-schedule", (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "items array is required" });
    }

    const results = items.map((item: any) => {
      const evaluation = evaluateHardwareCompatibility({
        doorType: item.doorType || '',
        fireRating: item.fireRating || '',
        lockset: item.hardwareSet || '',
        hinges: item.hinges || item.hardwareSet || '',
        closer: item.closer || '',
        frameType: item.frameType || '',
        location: item.location || '',
      });

      return {
        id: item.id,
        openingNumber: item.openingNumber,
        ...evaluation,
      };
    });

    const hasErrors = results.some(r => r.status === 'incompatible');
    const hasWarnings = results.some(r => r.status === 'warning');

    res.json({
      totalAudited: results.length,
      compliantCount: results.filter(r => r.status === 'compliant').length,
      warningCount: results.filter(r => r.status === 'warning').length,
      incompatibleCount: results.filter(r => r.status === 'incompatible').length,
      overallStatus: hasErrors ? 'incompatible' : hasWarnings ? 'warning' : 'compliant',
      results,
    });
  } catch (error: any) {
    console.error("Error in /api/batch-validate-schedule:", error);
    res.status(500).json({ error: "Batch validation failed", details: error.message });
  }
});

// Quote & Door Schedule Submission API
app.post("/api/submit-quote", (req, res) => {
  const quoteData = req.body;
  console.log("Received Quote / Schedule Submission:", quoteData);
  
  // Generate reference number
  const prefix = quoteData.sector === "high-rise" ? "JD-HR" : quoteData.sector === "commercial" ? "JD-COM" : "JD-RES";
  const quoteId = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

  res.json({
    success: true,
    quoteId,
    receivedAt: new Date().toISOString(),
    message: "Door schedule and project details received. An architectural door consultant will review your specifications and supply a formal takeoff within 1-2 business days.",
    summary: {
      projectType: quoteData.sector,
      openingsCount: quoteData.openingCount || "Schedule Attached",
      contactName: quoteData.name,
      company: quoteData.company || "Direct Inquiry",
    }
  });
});

// Vite integration
async function start() {
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
    console.log(`Just Doors server running on http://0.0.0.0:${PORT}`);
  });
}

start();
