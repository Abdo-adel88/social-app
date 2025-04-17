import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingHomeComponent } from './loading-home.component';

describe('LoadingHomeComponent', () => {
  let component: LoadingHomeComponent;
  let fixture: ComponentFixture<LoadingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
