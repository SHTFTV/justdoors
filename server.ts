import { reviewHardware } from "./hardware-review.js";
import { registerQuoteRoutes } from "./quote-handler";
import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "3mb" }));

// Built-in, sector-aware door specification advisory (no external AI service).
function buildDoorAdvisory(sector?: string): string {
  return `**Door project planning:**\n\nFor ${sector || 'your'} project, collect the opening IDs, dimensions, door and frame condition, requested hardware, drawings and any specified fire or acoustic ratings. Exact product listings and applicable project requirements need review by the supplier and project professional.\n\nThis is a general checklist, not a code assessment or an AI-generated specification. Contact rambowallceiling@gmail.com or 778-773-2790 with your project details.`;
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

const evaluateHardwareCompatibility = (input: HardwareValidationRequest): HardwareValidationResponse => reviewHardware(input);

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
registerQuoteRoutes(app);

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
