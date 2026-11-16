import { Oferta } from '../models/oferta';
import { Producto, EstadoProducto, TipoOferta } from '../models/producto';
import { Usuario, Empresa } from '../models/actor';

/** Datos ilustrativos, no anuncios ni precios verificados de comercios reales. */
const avatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop';
const publicador: Usuario = {
  id: 1, user: 'Nexus Demo', email: 'demo@example.invalid',
  esVerificado: false, avatar, ubicacion: 'España'
};
const tienda: Empresa = { id: 2, user: 'Tienda ficticia', email: 'tienda@example.invalid', cif: '' };

export const demoProductos: Producto[] = [
  {
    id: 101, titulo: 'Auriculares inalámbricos', descripcion: 'Artículo de demostración. Auriculares over-ear con estuche de transporte. Estado de ejemplo: disponible.',
    precio: 85, tipoOferta: TipoOferta.VENTA, estadoProducto: EstadoProducto.DISPONIBLE,
    imagenPrincipal: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&fit=crop',
    publicador, categoria: 'Tecnología', fechaPublicacion: '2026-11-02'
  },
  {
    id: 102, titulo: 'Cámara fotográfica', descripcion: 'Artículo ilustrativo para explorar la interfaz del marketplace. No está a la venta.',
    precio: 320, tipoOferta: TipoOferta.VENTA, estadoProducto: EstadoProducto.DISPONIBLE,
    imagenPrincipal: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&fit=crop',
    publicador, categoria: 'Fotografía', fechaPublicacion: '2026-11-03'
  },
  {
    id: 103, titulo: 'Zapatillas urbanas', descripcion: 'Producto ficticio para demostrar el filtrado por categoría y las fichas.',
    precio: 42, tipoOferta: TipoOferta.VENTA, estadoProducto: EstadoProducto.DISPONIBLE,
    imagenPrincipal: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&fit=crop',
    publicador, categoria: 'Moda', fechaPublicacion: '2026-11-04'
  },
  {
    id: 104, titulo: 'Silla de diseño', descripcion: 'Anuncio de ejemplo. Una silla contemporánea para el hogar o el estudio.',
    precio: 75, tipoOferta: TipoOferta.VENTA, estadoProducto: EstadoProducto.DISPONIBLE,
    imagenPrincipal: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=1000&fit=crop',
    publicador, categoria: 'Hogar', fechaPublicacion: '2026-11-05'
  }
];

export const demoOfertas: Oferta[] = [
  {
    id: 201, titulo: 'Teclado mecánico compacto', descripcion: 'Oferta ilustrativa, no vinculada a una promoción real.',
    precioOriginal: 120, precioOferta: 79, tienda: 'Tienda ficticia', actor: tienda,
    imagenPrincipal: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&fit=crop',
    urlOferta: '', fechaExpiracion: '2028-12-31', categoria: 'Tecnología',
    fechaPublicacion: '2026-11-06'
  },
  {
    id: 202, titulo: 'Altavoz portátil', descripcion: 'Precio de ejemplo para presentar el diseño de las ofertas.',
    precioOriginal: 90, precioOferta: 59, tienda: 'Tienda ficticia', actor: tienda,
    imagenPrincipal: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1000&fit=crop',
    urlOferta: '', fechaExpiracion: '2028-12-31', categoria: 'Sonido',
    fechaPublicacion: '2026-11-07'
  },
  {
    id: 203, titulo: 'Reloj clásico', descripcion: 'Ficha ficticia con descuento simulado, sin enlace de compra.',
    precioOriginal: 150, precioOferta: 99, tienda: 'Tienda ficticia', actor: tienda,
    imagenPrincipal: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&fit=crop',
    urlOferta: '', fechaExpiracion: '2028-12-31', categoria: 'Accesorios',
    fechaPublicacion: '2026-11-08'
  },
  {
    id: 204, titulo: 'Lámpara de escritorio', descripcion: 'Ejemplo visual de producto para el catálogo.',
    precioOriginal: 65, precioOferta: 39, tienda: 'Tienda ficticia', actor: tienda,
    imagenPrincipal: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&fit=crop',
    urlOferta: '', fechaExpiracion: '2028-12-31', categoria: 'Hogar',
    fechaPublicacion: '2026-11-09'
  }
];
