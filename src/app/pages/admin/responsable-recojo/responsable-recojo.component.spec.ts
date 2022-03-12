import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableRecojoComponent } from './responsable-recojo.component';

describe('ResponsableRecojoComponent', () => {
  let component: ResponsableRecojoComponent;
  let fixture: ComponentFixture<ResponsableRecojoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableRecojoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsableRecojoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
