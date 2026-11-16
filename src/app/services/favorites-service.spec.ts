import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites-service';
import { demoProductos, demoOfertas } from '../data/demo-data';

describe('Favoritos Nexus', () => {
  let service: FavoritesService;
  beforeEach(() => {
    localStorage.removeItem('nexus-portfolio-favorites');
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });
  it('guarda y elimina artículos diferenciando su tipo', () => {
    const producto = demoProductos[0];
    const oferta = demoOfertas[0];
    expect(service.has(producto)).toBe(false);
    service.toggle(producto);
    service.toggle(oferta);
    expect(service.has(producto)).toBe(true);
    expect(service.has(oferta)).toBe(true);
    expect(service.favorites().length).toBe(2);
    service.toggle(producto);
    expect(service.has(producto)).toBe(false);
    expect(service.favorites().length).toBe(1);
  });
});
