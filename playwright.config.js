// @ts-check
const { defineConfig, devices } = require('@playwright/test');
import dotenv from 'dotenv';
import {generateCustomLayoutAsync} from "./my_custom_layout";
import { LogLevel } from '@slack/web-api';

dotenv.config({
  path: './env/.env.stg',
  // path: './env/.env.prod'
})
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // globalSetup: "./global-setup",
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    // [
    //   "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
    //   {
    //     slackWebHookUrl: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
    //     channels: ["automation_for_testing_only"],
    //     sendResults: "always", // "always" , "on-failure", "off"
    //   },
    // ],
    // [
    //   "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
    //   {
    //     channels: ["automation_for_testing_only"], // provide one or more Slack channels
    //     sendResults: "always", // "always" , "on-failure", "off"
    //     layout: generateCustomLayoutAsync,
    //     maxNumberOfFailuresToShow: 10,
    //     meta: [
    //         // {
    //         //     key: 'BUILD_NUMBER',
    //         //     value: '323332-2341',
    //         // },
    //         // {
    //         //     key: 'WHATEVER_ENV_VARIABLE',
    //         //     value: process.env.SOME_ENV_VARIABLE, // depending on your CI environment, this can be the branch name, build id, etc
    //         // },
    //         {
    //             key: 'HTML Results',
    //             value: '<https://your-build-artifacts.my.company.dev/pw/23887/playwright-report/index.html|📊>',
    //         },
    //     ],
    //     slackOAuthToken: process.env.oathToken,
    //     slackLogLevel: LogLevel.DEBUG,
    //     disableUnfurl: true,
    //     showInThread: true,
    //   },

    // ],
    ['json', { outputFile: 'results.json' }],
    ["html"], // other reporters
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium_stg',
      use: { ...devices['Desktop Chrome'],
      baseURL: process.env.URL,
     },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

