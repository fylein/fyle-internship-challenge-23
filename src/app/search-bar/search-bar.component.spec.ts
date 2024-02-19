import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { StoreModule } from '@ngrx/store';
import { reposReducer, userReducer } from '../state/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { appEffects } from '../state/app.effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports:[
        StoreModule.forRoot({user:userReducer,repos:reposReducer}),
        EffectsModule.forRoot([appEffects]),
        HttpClientModule,
        FormsModule
      ]
    });
    
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set perpage',()=>{
    component.setPerpage("25")
    expect(component.perpage).toBe("25")
  })

  it('should emit a number when method is called',()=>{
    const spiedEvent = spyOn(component.currentPageEmitter,'emit')
    component.query = "vaibhav"
    component.search()
    fixture.detectChanges()
    expect(spiedEvent).toHaveBeenCalledWith(1)

  })

  it('should emit a object when method is called',()=>{
    const spiedEvent = spyOn(component.dataEmitter,'emit')
    component.query = "vaibhav"
    component.perpage = "25"
    component.search()
    expect(spiedEvent).toHaveBeenCalledWith({query:"vaibhav",perpage:"25"})

  })

});
