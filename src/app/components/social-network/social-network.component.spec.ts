import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNetworkComponent } from './social-network.component';

describe('SocialNetworkComponent', () => {
  let component: SocialNetworkComponent;
  let fixture: ComponentFixture<SocialNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
