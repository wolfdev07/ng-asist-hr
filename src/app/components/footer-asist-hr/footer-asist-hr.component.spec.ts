import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAsistHrComponent } from './footer-asist-hr.component';

describe('FooterAsistHrComponent', () => {
  let component: FooterAsistHrComponent;
  let fixture: ComponentFixture<FooterAsistHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterAsistHrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterAsistHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
