// Import necessary modules from '@angular/core'.
import { Pipe, PipeTransform } from '@angular/core';

// Decorator to define the 'SearchFilterPipe' as a custom pipe.
@Pipe({
  name: 'searchFilter' // Name by which the pipe will be used in templates.
})
export class SearchFilterPipe implements PipeTransform {

  // Implement the 'PipeTransform' interface and define the 'transform' method.
  transform(list: any[], filterText: string): any {
    // The 'transform' method filters an array 'list' based on the 'filterText' input.

    return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
    // If 'list' is not null or undefined, filter it based on 'filterText' (case-insensitive).
    // The 'filter' function is used to perform the filtering, and the result is an array of matching items.
  }
}
