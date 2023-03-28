import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UplaodedFilesComponent } from './uplaoded-files.component';

describe('UplaodedFilesComponent', () => {
  let component: UplaodedFilesComponent;
  let fixture: ComponentFixture<UplaodedFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UplaodedFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UplaodedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
