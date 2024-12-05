const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const path = require("path");
const journeys = require("../app/data/journeys");

const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "_")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const ensureDirectoryExists = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

const setupBrowser = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  return { browser, page };
};

const captureStep = async (page, journeyDir, step, journeyIndex, stepIndex) => {
  const url = `http://localhost:3000${step.url}?journey=${journeyIndex}&step=${stepIndex}`;
  const stepNumber = (stepIndex + 1).toString().padStart(2, "0");
  const filename = `${stepNumber}_${step.url.replace(/\//g, "_")}.png`;
  const filePath = path.join(journeyDir, filename);

  try {
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: filePath,
      fullPage: true,
    });
    console.log(`  Captured step ${stepIndex + 1}: ${step.url}`);
  } catch (error) {
    console.error(`  Failed to capture step ${stepIndex + 1}: ${step.url}`);
    console.error(error);
  }
};

const processJourney = async (screenshotsDir, journey, journeyIndex) => {
  const { browser, page } = await setupBrowser();

  try {
    console.log(`Taking screenshots for journey: ${journey.name}`);
    const journeyDir = path.join(screenshotsDir, createSlug(journey.name));
    await ensureDirectoryExists(journeyDir);

    for (let stepIndex = 0; stepIndex < journey.steps.length; stepIndex++) {
      await captureStep(
        page,
        journeyDir,
        journey.steps[stepIndex],
        journeyIndex,
        stepIndex,
      );
    }
  } finally {
    await browser.close();
  }
};

const takeScreenshots = async () => {
  const screenshotsDir = path.join(__dirname, "../screenshots");
  await ensureDirectoryExists(screenshotsDir);

  // Process all journeys in parallel
  await Promise.all(
    journeys.map((journey, index) =>
      processJourney(screenshotsDir, journey, index),
    ),
  );

  console.log("Screenshot capture complete!");
};

const { spawn } = require("child_process");
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startServer = async () => {
  const server = spawn("npm", ["run", "dev"], {
    stdio: "ignore",
    detached: true,
  });

  // Wait for server to start
  for (let i = 0; i < 30; i++) {
    try {
      const response = await fetch("http://localhost:3000");
      if (response.ok) {
        return server;
      }
    } catch {
      await wait(1000);
    }
  }
  throw new Error("Server failed to start");
};

const main = async () => {
  let server;
  try {
    server = await startServer();
    await takeScreenshots();
  } finally {
    if (server) {
      try {
        process.kill(-server.pid); // The leading minus kills the whole process group
      } catch (err) {
        // Ignore ESRCH errors
        // ESRCH = "no such process" error, safe to ignore if process already terminated
        if (err.code !== "ESRCH") {
          throw err;
        }
      }
    }
  }
};

if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}
