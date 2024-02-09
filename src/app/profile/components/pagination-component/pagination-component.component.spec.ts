import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationComponent } from './pagination-component.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    const activatedRouteStub = {
      queryParams: {
        subscribe: (fn: (value: any) => void) => fn({ page: 1, per_page: 10 }), 
      },
    };
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [HttpClientModule, FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        ApiService,
      ] 
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
