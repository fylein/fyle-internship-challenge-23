import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MainBodyComponent } from './main-body.component';
import { DebugElement } from '@angular/core';
import { ApiService } from '../services/api.service';
import { repositoriesOfUser } from '../services/mock-data/mock-repos';
import { By } from '@angular/platform-browser';
import { users } from '../services/mock-data/users';
import { FormsModule } from '@angular/forms';

describe('MainBodyComponent', () => {
  let component: MainBodyComponent;
  let apiService: ApiService;
  let fixture: ComponentFixture<MainBodyComponent>;
  let el: DebugElement;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainBodyComponent],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MainBodyComponent);
      el = fixture.debugElement;
      component = fixture.componentInstance;
      httpTestingController = TestBed.inject(HttpTestingController);
      apiService = TestBed.inject(ApiService);
      spyOn(component, 'mainFunctionality').and.callThrough();
      fixture.detectChanges();
    });
  })
  )

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the input', () => {
    const ipElem = el.query(By.css('input')).nativeElement;
    ipElem.value = 'meghasharma0';
    expect(ipElem.value).toBe(component.searchVal);
  });

  it('should display the result when click', () => {
    const searchBtn = el.query(By.css('button'));
    const searchValue = 'user1';
    searchBtn.triggerEventHandler('click');
    fixture.detectChanges();
    let obj: any;
    for (const key of Object.keys(users)) {
      if (key === searchValue) {
        obj = users[key];
      }
    }
    expect(obj.avatarUrl).toBe('someUrl one');
    expect(obj.repos.length).toBe(3);
  });

  it('should call the function when page reloads', () => {
    expect(component.mainFunctionality).toHaveBeenCalled();
  });

  it('should call the function when user search', () => {
    const username = 'johnpapa';
    const val = 10;
    component.clickSearch(username);
    expect(component.searchVal).toBe(username);
    expect(component.mainFunctionality).toHaveBeenCalled();
    expect(component.selectedValue).toBe(val);
  });

  // it('should work with mainFunctionality', async() => {
  //   apiService.getUser('meghasharma0').subscribe((res: any) => {
  //     expect(res).toBeTruthy();
  //   });
  //   const mockReq = httpTestingController.expectOne(`https://api.github.com/users/meghasharma0`);
  //   expect(mockReq.request.method).toEqual('GET');
  //   mockReq.flush(Object.values(users));
  // });

  it('should set logic of displaying no of repositories per page', () => {
    const curr = 2;
    const totalRepos = 25;
    const { si, ei } = component.reposPerPage(curr, totalRepos);
    const expectedSi = (curr - 1) * 10;
    const expectedEi = Math.min(expectedSi + 10, totalRepos);
    expect(si).toBe(expectedSi);
    expect(ei).toBe(expectedEi);
  });

  it('should bind selectedValue to ngModel', () => {
    component.loader = false;
    fixture.detectChanges();
    // const selectElement = el.query(By.css('select')).nativeElement;
    const testValue = 10; 
    expect(component.selectedValue).toBe(testValue);
    // expect(selectElement.value).toBe(testValue);
  });

  it('should work for user select the no of pages', () => {
    component.loader = false;
    fixture.detectChanges();
    const selectElement = el.query(By.css('select'));
    spyOn(component, 'onSelectChange'); 
    selectElement.triggerEventHandler('change', { target: selectElement.nativeElement });
    fixture.detectChanges();
    expect(component.onSelectChange).toHaveBeenCalled();
  });

  it('should work prev btn', () => {
    apiService.getLanguages('meghasharma0', 'CSS-small-projects').subscribe((res: any) => {
      expect(res).toBeTruthy();
      component.repos = users;
      let newArr: any = [];
      res.forEach((item: any) => {
        newArr.push(item);
      });
      expect(newArr).toEqual(res);
      component.loader = false;
      fixture.detectChanges();
      const prevA = el.query(By.css('.prevBtn'));
      let curr = 2;
      const totalRepos = 25;
      prevA.triggerEventHandler('click');
      fixture.detectChanges();
      curr--;
      expect(curr).toBe(1);
      expect(component.currPage).toBe(1);
      const { si, ei } = component.reposPerPage(curr, totalRepos);
      const expectedSi = (curr - 1) * 10;
      const expectedEi = Math.min(expectedSi + 10, totalRepos);
      expect(si).toBe(expectedSi);
      expect(ei).toBe(expectedEi);

      const prevData = repositoriesOfUser.slice(0, 10);
      expect(res.slice(si, ei)).toEqual(prevData);
    });
    const mockReq = httpTestingController.expectOne(`https://api.github.com/repos/meghasharma0/CSS-small-projects/languages`);
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(repositoriesOfUser);
  });

  it('should work next btn', () => {
    apiService.getLanguages('meghasharma0', 'CSS-small-projects').subscribe((res: any) => {
      expect(res).toBeTruthy();
      component.loader = false;
      fixture.detectChanges();
      const prevA = el.query(By.css('.nextBtn'));
      let curr = 1;
      const totalRepos = 25;
      prevA.triggerEventHandler('click');
      fixture.detectChanges();
      curr++;
      expect(component.currPage).toBe(1);
      expect(component.currPage * 10).toBeLessThan(totalRepos);
      const { si, ei } = component.reposPerPage(curr, totalRepos);
      const prevData = repositoriesOfUser.slice(10, 20);
      expect(res).toEqual(repositoriesOfUser);
      expect(res.slice(si, ei)).toEqual(prevData);
    });
    const mockReq = httpTestingController.expectOne(`https://api.github.com/repos/meghasharma0/CSS-small-projects/languages`);
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(repositoriesOfUser);
  });

  it('should return start repo index', () => {
    expect(component.getStartRepoIndex(2)).toBe(10);
  });

  it('should return end repo index', () => {
    expect(component.getEndRepoIndex(1, 2)).toBe(2);
    expect(component.getEndRepoIndex(1, 200)).toBe(10);
  });

  it('should return keys', () => {
    expect(component.objectKeys({ Java: 2001, Python: 1212 })).toEqual(['Java', 'Python']);
  });
});
