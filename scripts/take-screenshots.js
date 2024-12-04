const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const journeys = require('../app/data/journeys');

async function takeScreenshots() {
  // Create screenshots directory if it doesn't exist
  const screenshotsDir = path.join(__dirname, '../screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  // Start the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({
    width: 1280,
    height: 800
  });

  // For each journey
  for (let journeyIndex = 0; journeyIndex < journeys.length; journeyIndex++) {
    const journey = journeys[journeyIndex];
    console.log(`Taking screenshots for journey: ${journey.name}`);
    
    // Create journey directory
    const journeyDir = path.join(screenshotsDir, journey.name.replace(/[^a-z0-9]/gi, '_').toLowerCase());
    if (!fs.existsSync(journeyDir)) {
      fs.mkdirSync(journeyDir);
    }

    // For each step in the journey
    for (let stepIndex = 0; stepIndex < journey.steps.length; stepIndex++) {
      const step = journey.steps[stepIndex];
      const url = `http://localhost:3000${step.url}?journey=${journeyIndex}&step=${stepIndex}`;
      
      try {
        await page.goto(url, { waitUntil: 'networkidle0' });
        
        // Take screenshot
        const filename = `${stepIndex + 1}_${step.url.replace(/\//g, '_')}.png`;
        await page.screenshot({
          path: path.join(journeyDir, filename),
          fullPage: true
        });
        
        console.log(`  Captured step ${stepIndex + 1}: ${step.url}`);
      } catch (error) {
        console.error(`  Failed to capture step ${stepIndex + 1}: ${step.url}`);
        console.error(error);
      }
    }
  }

  await browser.close();
  console.log('Screenshot capture complete!');
}

// First check if the prototype kit server is running
const checkServer = async () => {
  try {
    const response = await fetch('http://localhost:3000');
    if (response.ok) {
      await takeScreenshots();
    }
  } catch (error) {
    console.error('Error: Please start the prototype kit server first (npm run dev)');
    process.exit(1);
  }
};

checkServer();
