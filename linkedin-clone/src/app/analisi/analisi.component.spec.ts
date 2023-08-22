import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisiComponent } from './analisi.component';

describe('AnalisiComponent', () => {
  let component: AnalisiComponent;
  let fixture: ComponentFixture<AnalisiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalisiComponent]
    });
    fixture = TestBed.createComponent(AnalisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
