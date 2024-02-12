import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoListComponent } from './repo-list.component';

describe('RepoListComponent', () => {
  let component: RepoListComponent;

  beforeEach(() => {
    component = new RepoListComponent();
  });

  it('should capitalize the first letter of a string', () => {
    const result = component.capitalizeFirstLetter('test');
    expect(result).toBe('Test');
  });

  it('should trim the description to 120 characters', () => {
    const longDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua shubham swarnkar completing the Challenges';
    const expectedResult = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliq.';
  
    const result = component.trimDescription(longDescription);
  
    expect(result).toBe(expectedResult);
  });

  it('should return empty string when description is null or undefined', () => {
    const resultNull = component.trimDescription(null);
    const resultUndefined = component.trimDescription(undefined);
    expect(resultNull).toBe('');
    expect(resultUndefined).toBe('');
  });
});

