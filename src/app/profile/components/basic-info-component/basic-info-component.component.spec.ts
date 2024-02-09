import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicInfoComponent } from './basic-info-component.component';
import { ApiService } from 'src/app/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BasicInfoComponent', () => {
  let component: BasicInfoComponent;
  let fixture: ComponentFixture<BasicInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicInfoComponent],
      providers: [ApiService],
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(BasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});