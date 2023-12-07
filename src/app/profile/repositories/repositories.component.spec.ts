import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RepositoriesComponent } from './repositories.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { ApiService } from 'src/app/services/api.service';

describe('RepositoriesComponent', () => {
  let component: RepositoriesComponent;
  let fixture: ComponentFixture<RepositoriesComponent>;

  beforeEach(() => {
    const activatedRouteStub = {
      queryParams: {
        subscribe: (fn: (value: any) => void) => fn({ page: 1, per_page: 10 }), // Provide default values if needed
      },
    };

    TestBed.configureTestingModule({
      declarations: [RepositoriesComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        ApiService,
      ],
    });
    fixture = TestBed.createComponent(RepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
