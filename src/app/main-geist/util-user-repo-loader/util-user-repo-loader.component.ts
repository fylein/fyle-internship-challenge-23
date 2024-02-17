import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-util-user-repo-loader',
  templateUrl: './util-user-repo-loader.component.html',
})
export class UtilUserRepoLoaderComponent {
  // Input property to set the theme of the component.
  @Input() appTheme: string = 'light';

  // Background color property based on the selected theme.
  bgColor: string = '#000';

  // Theme object for defining the skeleton's background styles.
  skeletonTheme: any;

  /**
   * @brief Lifecycle hook that is called when any data-bound property of the component changes.
   * @param changes - An object containing the changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Check if the 'appTheme' property has changed and update the theme accordingly.
    if (changes['appTheme']) {
      this.updateTheme();
    }
  }

  /**
   * @brief Updates the component theme based on the selected 'appTheme'.
   * @details Sets the background color and skeleton theme accordingly.
   */
  private updateTheme() {
    if (this.appTheme === 'dark') {
      this.bgColor = '#fff';
    } else {
      this.bgColor = '#fff';
    }

    // Define the skeleton theme based on the updated background color.
    this.skeletonTheme = {
      'background-color': this.bgColor,
      height: '20px',
      width: '100%',
      'border-radius': '20px',
    };
  }

  /**
   * @brief Gets the appropriate skeleton animation class based on the current 'appTheme'.
   * @returns A string representing the skeleton animation class.
   */
  getSkeletonAnimation(): string {
    return this.appTheme === 'dark' ? 'progress-dark' : 'your-light-animation';
  }
}
