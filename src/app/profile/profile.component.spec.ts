import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent]
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render profile details when userDetails input is provided', () => {
    const mockUserDetails = {
      avatar_url: 'https://avatars3.githubusercontent.com/u/123456789?v=4',
      name: 'John Doe',
      html_url: 'https://github.com/johndoe',
      login: 'johndoe',
      email: 'johndoe@example.com',
      bio: 'This is a test bio.',
      followers: 100,
      following: 50,
      blog: 'https://johndoe.com',
      twitter_username: 'johndoe',
      location: 'San Francisco, CA'
    };

    component.userDetails = mockUserDetails;
    fixture.detectChanges();

    const profileContainer = fixture.nativeElement.querySelector('.flex.flex-col.md:flex-row.items-center.mb-4.justify-center.gap-8');
    expect(profileContainer).toBeTruthy();

    const avatarImage = profileContainer.querySelector('.rounded-full.shadow-2xl.p-2 img');
    expect(avatarImage).toBeTruthy();
    expect(avatarImage.src).toBe('https://avatars3.githubusercontent.com/u/123456789?v=4');

    const userDetailsSection = profileContainer.querySelector('.md:mr-4');
    expect(userDetailsSection).toBeTruthy();

    const nameElement = userDetailsSection.querySelector('.mb-2 p.text-2xl.font-semibold');
    expect(nameElement).toBeTruthy();
    expect(nameElement.textContent).toBe('John Doe');

    const loginElement = userDetailsSection.querySelector('.mb-2 p.text-slate-800 a');
    expect(loginElement).toBeTruthy();
    expect(loginElement.textContent).toBe('johndoe');
    expect(loginElement.href).toBe('https://github.com/johndoe');

    const emailElement = userDetailsSection.querySelector('.mb-2 p');
    expect(emailElement).toBeTruthy();
    expect(emailElement.textContent).toBe('johndoe@example.com');

    const bioElement = userDetailsSection.querySelector('.text-gray-800.text-base');
    expect(bioElement).toBeTruthy();
    expect(bioElement.textContent).toBe('This is a test bio.');

    const followersElement = userDetailsSection.querySelector('.font-semibold');
    expect(followersElement).toBeTruthy();
    expect(followersElement.textContent).toBe('Followers: 100');

    const followingElement = userDetailsSection.querySelector('.mb-1.font-semibold');
    expect(followingElement).toBeTruthy();
    expect(followingElement.textContent).toBe('Following: 50');

    const blogElement = userDetailsSection.querySelector('p *ngIf="userDetails.blog" a');
    expect(blogElement).toBeTruthy();
    expect(blogElement.textContent).toBe('https://johndoe.com');
    expect(blogElement.href).toBe('https://johndoe.com');

    const twitterElement = userDetailsSection.querySelector('p *ngIf="userDetails.twitter_username" a');
    expect(twitterElement).toBeTruthy();
    expect(twitterElement.textContent).toBe('@johndoe');
    expect(twitterElement.href).toBe('https://twitter.com/johndoe');

    const locationElement = userDetailsSection.querySelector('p');
    expect(locationElement).toBeTruthy();
    expect(locationElement.textContent).toBe('San Francisco, CA');
  });
});
