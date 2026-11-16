import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { Producto } from '../models/producto';
import { Oferta } from '../models/oferta';
import { demoOfertas, demoProductos } from '../data/demo-data';

@Injectable({ providedIn: 'root' })
export class NexusService {
  private productoEndpoint = `${environment.apiUrl}/producto`;
  private ofertaEndpoint = `${environment.apiUrl}/oferta`;
  constructor(private http: HttpClient) {}

  getProductoById(id: number): Observable<Producto> {
    if (environment.demoMode) {
      const item = demoProductos.find(p => p.id === id);
      return item ? of(item) : throwError(() => new Error('Producto no encontrado'));
    }
    return this.http.get<Producto>(`${this.productoEndpoint}/${id}`);
  }

  getOfertaById(id: number): Observable<Oferta> {
    if (environment.demoMode) {
      const item = demoOfertas.find(p => p.id === id);
      return item ? of(item) : throwError(() => new Error('Oferta no encontrada'));
    }
    return this.http.get<Oferta>(`${this.ofertaEndpoint}/${id}`);
  }

  searchAll(query: string): Observable<{ productos: Producto[]; ofertas: Oferta[] }> {
    if (environment.demoMode) {
      const search = query.toLocaleLowerCase('es-ES');
      return of({
        productos: demoProductos.filter(p => p.titulo.toLocaleLowerCase('es-ES').includes(search)),
        ofertas: demoOfertas.filter(p => p.titulo.toLocaleLowerCase('es-ES').includes(search))
      });
    }
    return this.http.get<{ productos: Producto[]; ofertas: Oferta[] }>(
      `${environment.apiUrl}/buscar?q=${encodeURIComponent(query)}`
    );
  }
}
