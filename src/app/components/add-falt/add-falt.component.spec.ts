import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaltComponent } from './add-falt.component';

describe('AddFaltComponent', () => {
  let component: AddFaltComponent;
  let fixture: ComponentFixture<AddFaltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFaltComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFaltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
