import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreorderCreateComponent } from './preorder-create.component';

describe('PreorderCreateComponent', () => {
  let component: PreorderCreateComponent;
  let fixture: ComponentFixture<PreorderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreorderCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreorderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
