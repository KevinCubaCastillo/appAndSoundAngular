import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorarNovedadesComponent } from './explorar-novedades.component';

describe('ExplorarNovedadesComponent', () => {
  let component: ExplorarNovedadesComponent;
  let fixture: ComponentFixture<ExplorarNovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorarNovedadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExplorarNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
