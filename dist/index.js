const core = require("@actions/core");
const github = require("@actions/github");

async function runPa11y(port) {
  const url = `http://localhost:${port}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${url}. Status: ${response.status} ${response.statusText}`
      );
    }
    console.log(`Successfully fetched ${url}.`);
  } catch (error) {
    console.error("Error fetching URL:", error);
    throw error;
  }
}

try {
  const port = core.getInput("port") || 3000;
  console.log(`Hello Joaquin your port is: ${port}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
  console.log("Running Pa11y...");
  runPa11y(port);
  console.log("Pa11y completed successfully.");
} catch (error) {
  core.setFailed(error.message);
}
