import * as core from "@actions/core";
import * as github from "@actions/github";
import lint from "@commitlint/lint";
import load from "@commitlint/load";
import { Options } from "conventional-commits-parser";

async function run(): Promise<void> {
  try {
    const configPath = core.getInput("config");
    const prTitle = github.context.payload.pull_request?.title;

    if (!prTitle) {
      core.setFailed("No pull request title found");
      return;
    }

    // Load the commitlint config
    const opts = await load({}, { file: configPath });

    // Lint the PR title
    const result = await lint(
      prTitle,
      opts.rules,
      opts.parserPreset
        ? {
            parserOpts: opts.parserPreset.parserOpts as Options,
          }
        : {}
    );

    if (!result.valid) {
      core.setFailed(
        `Invalid PR title: ${result.errors.map((e) => e.message).join(", ")}`
      );
      return;
    }

    core.info("PR title is valid");
    core.setOutput("valid", "true");
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unknown error occurred");
    }
  }
}

run();
