import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoComponent } from './repo.component';

xdescribe('RepoComponent', () => {
  let component: RepoComponent;
  let fixture: ComponentFixture<RepoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepoComponent]
    });
    fixture = TestBed.createComponent(RepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    

    

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
