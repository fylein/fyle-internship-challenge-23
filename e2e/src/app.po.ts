// Importing necessary modules and elements from the 'protractor' library.
import { browser, by, element } from 'protractor';

// Creating a class named 'AppPage' to define page interaction methods.
export class AppPage {
  // Method to navigate to the application's base URL.
  // Returns a Promise that resolves when navigation is complete.
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  // Method to retrieve the text content of an element on the page.
  // Returns a Promise that resolves to a string containing the element's text.
  getTitleText(): Promise<string> {
    // Using the 'element' and 'by' objects to locate an element with a specific CSS selector.
    // Then, calling the 'getText' method on that element to get its text content.
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
