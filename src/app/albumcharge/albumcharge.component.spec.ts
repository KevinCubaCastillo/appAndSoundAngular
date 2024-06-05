import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumchargeComponent } from './albumcharge.component';

describe('AlbumchargeComponent', () => {
  let component: AlbumchargeComponent;
  let fixture: ComponentFixture<AlbumchargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumchargeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbumchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
