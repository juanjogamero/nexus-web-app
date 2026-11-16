import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { FeedService } from './feed-service';
import { demoProductos, demoOfertas } from '../data/demo-data';

describe('Catálogo Nexus', () => {
  let service: FeedService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(FeedService);
  });
  it('combina productos y ofertas de muestra', () => {
    service.getUnifiedFeed().subscribe(items => {
      expect(items.length).toBe(demoProductos.length + demoOfertas.length);
    });
  });
  it('filtra por texto y tipo', () => {
    const items = [...demoProductos, ...demoOfertas];
    expect(service.filterFeed(items, 'deals').length).toBe(demoOfertas.length);
    expect(service.filterFeed(items, 'secondhand').length).toBe(demoProductos.length);
    expect(service.filterFeed(items, 'all', 'cámara').length).toBe(1);
    expect(service.filterFeed(items, 'all', '', 'Hogar').length).toBe(2);
  });
});
