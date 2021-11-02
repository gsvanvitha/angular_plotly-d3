import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynccursorComponent } from './synccursor.component';

describe('SynccursorComponent', () => {
  let component: SynccursorComponent;
  let fixture: ComponentFixture<SynccursorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynccursorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynccursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
