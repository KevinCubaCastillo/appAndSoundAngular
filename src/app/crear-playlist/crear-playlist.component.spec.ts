import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPlaylistComponent } from './crear-playlist.component';

describe('CrearPlaylistComponent', () => {
  let component: CrearPlaylistComponent;
  let fixture: ComponentFixture<CrearPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPlaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
