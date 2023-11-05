// Import necessary modules from '@angular/core', '@angular/forms', and '@angular/router'.
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page', // Selector used to insert this component into the HTML template.
  templateUrl: './home-page.component.html', // Template file for this component.
  styleUrls: ['./home-page.component.css'] // CSS styles for this component.
})
export class HomePageComponent implements OnInit {
  githubUsername: any; // A variable to store user input for a GitHub username.

  constructor(private route: Router) { // Constructor for the 'HomePageComponent' that injects the 'Router' service.
  }

  ngOnInit(): void {
    // ngOnInit is a lifecycle hook that can be used for initialization when the component is created.
  }

  // Function to handle keypress events, such as pressing the Enter key.
  onKeypressEvent(event) {
    if (event.charCode == 13) {
      console.log(this.githubUsername); // Log the user's input to the console.
      this.route.navigate([this.githubUsername + '/Dashboard']); // Use the 'Router' to navigate to a specific route based on user input.
    }
  }
}
