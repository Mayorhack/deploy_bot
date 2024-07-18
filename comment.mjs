// import { Octokit } from "octokit";
// import { context } from "@actions/github";

// const token = process.env.GITHUB_TOKEN;
// const octokit = new Octokit({
//   auth: token,
// });

// async function run() {
//   const contex = context;
//   const prNumber = contex.payload.pull_request.number;
//   const owner = contex.repo.owner;
//   const repo = contex.repo.repo;

//   const deployedUrl = `test`;

//   if (
//     contex.eventName === "pull_request" &&
//     contex.payload.action !== "closed"
//   ) {
//     await octokit.issues.create({
//       owner,
//       repo,
//       issue_number: prNumber,
//       body: `Your changes have been deployed! You can view the deployed environment [here](${deployedUrl}).`,
//     });
//   } else if (
//     contex.eventName === "pull_request" &&
//     contex.payload.action === "closed"
//   ) {
//     console.log(`Cleaning up resources for bdh PR #${prNumber}...`);
//   }
// }

// run().catch((error) => {
//   console.error(error);
//   process.exit(1);
// });
import { Octokit } from "octokit";
import * as github from "@actions/github";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.TOKEN;

const octokit = new Octokit({
  auth: token,
});

async function run() {
  // Mock context for local testing

  const context = {
    eventName: "pull_request",
    payload: {
      pull_request: {
        number: 1, // replace with an actual PR number for testing
      },
      action: "opened", // or 'closed' for testing
    },
    repo: {
      owner: "Mayorhack",
      repo: "lsp",
    },
  };

  const prNumber = context.payload.pull_request.number;
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  // Replace with your deployed environment URL
  const deployedUrl = `https://your-deployed-environment.com/pr-${prNumber}`;

  if (
    context.eventName === "pull_request" &&
    context.payload.action !== "closed"
  ) {
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: `Your changes have been deployed! You can view the deployed environment dddd [here](${deployedUrl}).`,
    });
  } else if (
    context.eventName === "pull_request" &&
    context.payload.action === "closed"
  ) {
    console.log(`Cleaning up resources for PR #${prNumber}...`);
    // Add your cleanup logic here
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
