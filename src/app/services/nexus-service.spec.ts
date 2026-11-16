import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { NexusService } from './nexus-service';

describe('Fichas Nexus', () => {
  let service: NexusService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(NexusService);
  });
  it('devuelve una ficha de producto en modo demostración', () => {
    service.getProductoById(101).subscribe(item => expect(item.titulo).toBe('Auriculares inalámbricos'));
  });
  it('devuelve una oferta de muestra', () => {
    service.getOfertaById(201).subscribe(item => expect(item.precioOferta).toBe(79));
  });
  it('notifica un error si el producto no existe', () => {
    service.getProductoById(99999).subscribe({
      next: () => fail('Se esperaba un error'),
      error: error => expect(error.message).toContain('no encontrado')
    });
  });
});
