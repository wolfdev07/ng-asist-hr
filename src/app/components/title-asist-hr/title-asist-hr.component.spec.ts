import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleAsistHrComponent } from './title-asist-hr.component';

describe('TitleAsistHrComponent', () => {
  let component: TitleAsistHrComponent;
  let fixture: ComponentFixture<TitleAsistHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleAsistHrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleAsistHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
