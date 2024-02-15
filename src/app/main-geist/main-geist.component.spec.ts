import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MainGeistComponent } from './main-geist.component';
import { GithubApiService } from '../services/github-api.service';
import { of } from 'rxjs';
import { UserInputComponent } from './user-input/user-input.component';
import { FormsModule } from '@angular/forms';

// Mock GitHubApiService
const githubServiceMock = {
  getUserInfo: () => of({ public_repos: 5 } as any),
  getUserRepos: () => of([{ name: 'Repo 1' }, { name: 'Repo 2' }] as any),
};

describe('MainGeistComponent', () => {
  let component: MainGeistComponent;
  let fixture: ComponentFixture<MainGeistComponent>;
  let githubService: GithubApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainGeistComponent, UserInputComponent],
      providers: [{ provide: GithubApiService, useValue: githubServiceMock }],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(MainGeistComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubApiService);

    // Trigger ngOnInit
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user information on successful user search', fakeAsync(() => {
    spyOn(githubService, 'getUserInfo').and.returnValue(
      of({ public_repos: 5 } as any)
    );
    component.searchUser({ username: 'test' });
    tick();
    expect(component.isValidUser).toBeTruthy();
    expect(component.totalRepoCount).toBe(5);
  }));

  it('should update repositories on successful repository search', fakeAsync(() => {
    spyOn(githubService, 'getUserRepos').and.returnValue(
      of([{ name: 'Repo 1' }, { name: 'Repo 2' }] as any)
    );
    component.searchUser({ username: 'test' });
    tick();
    expect(component.repos.length).toBe(2);
  }));
});
