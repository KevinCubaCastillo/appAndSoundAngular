import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaCancionesComponent } from './biblioteca-canciones.component';

describe('BibliotecaCancionesComponent', () => {
  let component: BibliotecaCancionesComponent;
  let fixture: ComponentFixture<BibliotecaCancionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecaCancionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BibliotecaCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
