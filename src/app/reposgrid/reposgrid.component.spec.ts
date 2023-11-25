import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposgridComponent } from './reposgrid.component';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';

describe('ReposgridComponent', () => {
  let component: ReposgridComponent;
  let fixture: ComponentFixture<ReposgridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReposgridComponent],
      imports: [MatGridListModule]
      // providers: [
      //   {provide: MatGridList, useClass: MatGridListStub}
      // ]
    });
    fixture = TestBed.createComponent(ReposgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// class MatGridListStub {}
