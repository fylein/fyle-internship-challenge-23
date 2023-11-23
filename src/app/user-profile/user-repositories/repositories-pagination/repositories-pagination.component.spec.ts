import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriesPaginationComponent } from './repositories-pagination.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

describe('RepositoriesPaginationComponent', () => {
  let component: RepositoriesPaginationComponent;
  let fixture: ComponentFixture<RepositoriesPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoriesPaginationComponent],
      imports: [ToastrModule.forRoot(), FormsModule],
    });
    fixture = TestBed.createComponent(RepositoriesPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
