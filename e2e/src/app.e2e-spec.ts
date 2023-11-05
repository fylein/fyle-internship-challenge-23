// Importing the 'AppPage' class from the './app.po' file and the 'browser' and 'logging' modules from 'protractor'.
import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

// This 'describe' block defines a test suite for the 'workspace-project App'.
describe('workspace-project App', () => {
  let page: AppPage; // Declaring a variable to hold an instance of the 'AppPage' class.

  // This 'beforeEach' block sets up the test by creating a new instance of 'AppPage' before each test case.
  beforeEach(() => {
    page = new AppPage();
  });

  // This 'it' block defines a test case that checks if a welcome message is displayed.
  it('should display a welcome message', () => {
    page.navigateTo(); // Navigating to a specific page or URL.
    // Asserting that the text displayed on the page matches the expected text.
    expect(page.getTitleText()).toEqual('fyle-internship-challenge-23-manav app is running!');
  });

  // This 'afterEach' block runs after each test case and checks for browser logs.
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser.
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    // Asserting that the logs do not contain any log entries with 'level' as 'SEVERE'.
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
