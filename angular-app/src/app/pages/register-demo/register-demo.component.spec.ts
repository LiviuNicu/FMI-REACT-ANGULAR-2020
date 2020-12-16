import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDemoComponent } from './register-demo.component';

describe('RegisterDemoComponent', () => {
  let component: RegisterDemoComponent;
  let fixture: ComponentFixture<RegisterDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
