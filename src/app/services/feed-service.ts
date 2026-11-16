import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductoService } from './producto-service';
import { OfertaService } from './oferta-service';
import { NexusItem, isOferta } from '../models/nexus-item';
import { Producto } from '../models/producto';
import { Oferta } from '../models/oferta';
import { environment } from '../../environments/enviroment';
import { demoOfertas, demoProductos } from '../data/demo-data';

export type FeedFilter = 'all' | 'deals' | 'secondhand' | 'favorites';

@Injectable({ providedIn: 'root' })
export class FeedService {
  constructor(private productos: ProductoService, private ofertas: OfertaService) {}

  getUnifiedFeed(): Observable<NexusItem[]> {
    if (environment.demoMode) return of([...demoOfertas, ...demoProductos]);

    return forkJoin({
      productos: this.productos.getDisponibles(),
      ofertas: this.ofertas.getActivas()
    }).pipe(map(({ productos, ofertas }) => [...ofertas, ...productos]));
  }

  getProductosFeed(): Observable<Producto[]> {
    return environment.demoMode ? of([...demoProductos]) : this.productos.getDisponibles();
  }

  getOfertasFeed(): Observable<Oferta[]> {
    return environment.demoMode ? of([...demoOfertas]) : this.ofertas.getActivas();
  }

  filterFeed(items: NexusItem[], filter: FeedFilter, query = '', categoria = ''): NexusItem[] {
    const term = query.trim().toLocaleLowerCase('es-ES');
    return items.filter(item => {
      if (filter === 'deals' && !isOferta(item)) return false;
      if (filter === 'secondhand' && isOferta(item)) return false;
      if (term && ![item.titulo, item.descripcion, item.categoria ?? '']
          .some(value => value.toLocaleLowerCase('es-ES').includes(term))) return false;
      if (categoria && (item.categoria ?? '').toLocaleLowerCase('es-ES') !== categoria.toLocaleLowerCase('es-ES')) return false;
      return true;
    });
  }
}
