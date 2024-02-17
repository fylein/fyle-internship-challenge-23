import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-util-user-profile-loader',
  templateUrl: './util-user-profile-loader.component.html',
})
export class UtilUserProfileLoaderComponent implements OnChanges {
  // Input property to set the theme of the component.
  @Input() appTheme: string = 'light';

  // Background color property based on the selected theme.
  bgColor: string = '#000';

  // Theme object for defining the profile loader's background styles.
  skeletonTheme: any;

  // Theme object for defining the circular profile loader's background styles.
  skeletonThemeCircle: any;

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
   * @details Sets the background color and profile loader themes accordingly.
   */
  private updateTheme() {
    if (this.appTheme === 'dark') {
      this.bgColor = '#fff';
    } else {
      this.bgColor = '#fff';
    }

    // Define the profile loader theme based on the updated background color.
    this.skeletonTheme = {
      'background-color': this.bgColor,
      height: '20px',
      width: '100%',
      'border-radius': '20px',
    };

    // Define the circular profile loader theme based on the updated background color.
    this.skeletonThemeCircle = {
      'background-color': this.bgColor,
      height: '100px',
      width: '100px',
      'border-radius': '50%',
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
