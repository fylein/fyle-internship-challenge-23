import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReposComponent } from './repos.component';

describe('ReposComponent', () => {
  let component: ReposComponent;

  beforeEach(() => {
    component = new ReposComponent();
  });

  it('should trim the description to 120 characters', () => {
    const longDescription =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua shubham swarnkar completing the Challenges';
    const expectedResult =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliq.';

    expect(expectedResult).toBe(expectedResult);
  });
});
