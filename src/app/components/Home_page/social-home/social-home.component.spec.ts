import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialHomeComponent } from './social-home.component';

describe('SocialHomeComponent', () => {
  let component: SocialHomeComponent;
  let fixture: ComponentFixture<SocialHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
