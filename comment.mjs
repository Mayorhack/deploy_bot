import { Octokit } from "octokit";
import { context } from "@actions/github";

const token = process.env.GITHUB_TOKEN;
const octokit = new Octokit({
  auth: token,
});

async function run() {
  const contex = context;
  const prNumber = contex.payload.pull_request.number;
  const owner = contex.repo.owner;
  const repo = contex.repo.repo;

  const deployedUrl = `test`;

  if (
    contex.eventName === "pull_request" &&
    contex.payload.action !== "closed"
  ) {
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: `Your changes have been deployed! You can view the deployed environment [here](${deployedUrl}).`,
    });
  } else if (
    contex.eventName === "pull_request" &&
    contex.payload.action === "closed"
  ) {
    console.log(`Cleaning up resources for bdh PR #${prNumber}...`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
