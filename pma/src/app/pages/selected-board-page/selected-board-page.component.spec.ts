import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBoardPageComponent } from './selected-board-page.component';

describe('SelectedBoardPageComponent', () => {
  let component: SelectedBoardPageComponent;
  let fixture: ComponentFixture<SelectedBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedBoardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
