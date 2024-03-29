import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedevableComponent } from './redevable.component';

describe('RedevableComponent', () => {
  let component: RedevableComponent;
  let fixture: ComponentFixture<RedevableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedevableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedevableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
