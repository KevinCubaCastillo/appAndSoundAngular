import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniReproductorComponent } from './mini-reproductor.component';

describe('MiniReproductorComponent', () => {
  let component: MiniReproductorComponent;
  let fixture: ComponentFixture<MiniReproductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniReproductorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniReproductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
