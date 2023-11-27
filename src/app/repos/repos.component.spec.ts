import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ReposComponent } from './repos.component';
import { ApiService } from '../services/api.service';

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    //a spy object for ApiService with a 'getLanguages' method
    const spy = jasmine.createSpyObj('ApiService', ['getLanguages']);

    // Configure the testing module
    TestBed.configureTestingModule({
      declarations: [ReposComponent],
      imports: [HttpClientTestingModule], 
      providers: [{ provide: ApiService, useValue: spy }],
    });

    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and populate languages array', () => {
    // Mock response from the getLanguages method
    const mockLanguages = { lang1: 100, lang2: 50, lang3: 30 };

    component.languages_url = 'fake-url';

    component.ngOnInit();

    fixture.detectChanges();

    expect(apiService.getLanguages).toHaveBeenCalledWith('fake-url');
    
    // Modify this expectation to match the expected structure of your component.languages array
    expect(component.languages.length).toBe(3);
    expect(component.languages).toEqual(['lang1', 'lang2', 'lang3']);
  });
});
