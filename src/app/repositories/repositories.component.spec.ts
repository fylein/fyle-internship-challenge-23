import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoriesComponent } from './repositories.component';

describe('RepositoriesComponent', () => {
  let component: RepositoriesComponent;
  let fixture: ComponentFixture<RepositoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoriesComponent]
    });

    fixture = TestBed.createComponent(RepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render repository items when userRepos input is provided', () => {
    const mockUserRepos = [
      {
        name: 'test-repo-1',
        updated_at: '2023-11-08T19:38:23.123Z',
        description: 'This is a test repository.',
        html_url: 'https://github.com/test-user/test-repo-1',
        homepage: 'https://test-repo-1.com',
        forks_count: 10,
        stargazers_count: 20,
        languages: {
          JavaScript: 1,
          HTML: 1,
          CSS: 1
        }
      },
      {
        name: 'test-repo-2',
        updated_at: '2023-11-07T18:23:45.678Z',
        description: 'Another test repository.',
        html_url: 'https://github.com/test-user/test-repo-2',
        homepage: 'https://test-repo-2.com',
        forks_count: 5,
        stargazers_count: 15,
        languages: {
          TypeScript: 1,
          HTML: 1,
          CSS: 1
        }
      }
    ];

    component.userRepos = mockUserRepos;
    fixture.detectChanges();

    const repositoryItems = fixture.nativeElement.querySelectorAll('.bg-gray-100.border.shadow-lg.rounded-xl.p-4.text-xs.flex.flex-col.justify-between');
    expect(repositoryItems.length).toBe(2);

    const firstRepositoryItem = repositoryItems[0];
    expect(firstRepositoryItem.querySelector('h3').textContent).toBe('test-repo-1');
    expect(firstRepositoryItem.querySelector('p.text-gray-500').textContent).toBe('November 8, 2023');
    expect(firstRepositoryItem.querySelector('p.text-gray-700').textContent).toBe('This is a test repository.');
    expect(firstRepositoryItem.querySelector('a.text-blue-500').textContent).toBe('test-repo-1.com');
    expect(firstRepositoryItem.querySelector('p.font-semibold').textContent).toBe('Forks: 10');
    expect(firstRepositoryItem.querySelector('p.font-semibold + p.font-semibold').textContent).toBe('Stars: 20');

    const languagesContainer = firstRepositoryItem.querySelector('.flex.flex-wrap');
    expect(languagesContainer.querySelectorAll('.bg-blue-500.text-white').length).toBe(3);
    expect(languagesContainer.querySelector('.bg-blue-500.text-white').textContent).toBe('JavaScript');
    expect(languagesContainer.querySelector('.bg-blue-500.text-white + .bg-blue-500.text-white').textContent).toBe('HTML');
    expect(languagesContainer.querySelector('.bg-blue-500.text-white:last-child').textContent).toBe('CSS');
  });

  it('should emit updateItemsPerPageChange event when itemsPerPageChange method is called', () => {
    const spy = jasmine.createSpy();
    component.updateItemsPerPageChange.subscribe(spy);

    component.setItemsPerPageChange(25);

    expect(spy).toHaveBeenCalledOnceWith(25);
  });
});
