import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentUploadFilesComponent } from './recent-upload-files.component';

describe('RecentUploadFilesComponent', () => {
  let component: RecentUploadFilesComponent;
  let fixture: ComponentFixture<RecentUploadFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentUploadFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentUploadFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
