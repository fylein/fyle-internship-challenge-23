// Import necessary modules from '@angular/core' and '@angular/router'.
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header', // Selector used to insert this component into the HTML template.
  templateUrl: './header.component.html' // Template file for this component.
})
export class HeaderComponent implements OnInit {
  searchtext: any; // A variable to store user input for searching.

  constructor(private route: Router) { // Constructor for the 'HeaderComponent' that injects the 'Router' service.
  }

  ngOnInit(): void {
    // ngOnInit is a lifecycle hook that can be used for initialization when the component is created.
  }

  // Function to handle keypress events, such as pressing the Enter key.
  onKeypressEvent(event) {
    if (event.charCode == 13) {
      console.log(this.searchtext); // Log the user's input to the console.
      this.route.navigate([this.searchtext + '/Dashboard']); // Use the 'Router' to navigate to a specific route based on user input.
    }
  }
}
