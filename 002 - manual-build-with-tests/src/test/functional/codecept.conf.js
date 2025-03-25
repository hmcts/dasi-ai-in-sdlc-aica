const isHeadless = true;
import { setHeadlessWhen } from '@codeceptjs';

setHeadlessWhen(isHeadless);

export const config = {
  name: 'functional',
  gherkin: {
    features: './features/*.feature',
    steps: './steps/**/*.ts',
  },
  helpers: {
    Playwright: {
      url: config.TEST_URL,
      show: !isHeadless,
      browser: 'chromium',
      windowSize: '1300x800',
      waitForTimeout: config.WaitForTimeout,
      waitForAction: 1000,
      waitForNavigation: 'networkidle0',
      ignoreHTTPSErrors: true,
      timeout: 20000,
    },
  },
  tests: './src/test/functional/features-codecept-test',
  plugins: {
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy',
    },
    pauseOnFail: {
      enabled: !isHeadless,
    },
    retryFailedStep: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true,
    },
  },
};
