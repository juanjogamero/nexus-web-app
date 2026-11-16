import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NexusItem, isOferta } from '../../models/nexus-item';
import { Producto } from '../../models/producto';
import { Oferta } from '../../models/oferta';
import { UtilsService } from '../../services/utils-service';
import { ImageService } from '../../services/image-service';
import { FavoritesService } from '../../services/favorites-service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: NexusItem;
  constructor(
    readonly favorites: FavoritesService,
    private utils: UtilsService,
    private imageService: ImageService
  ) {}
  isOferta(item: NexusItem): item is Oferta { return isOferta(item); }
  getImageUrl(item: NexusItem): string {
    return this.imageService.getImageOrPlaceholder(item.imagenPrincipal, isOferta(item) ? 'oferta' : 'producto');
  }
  getPrice(item: NexusItem): string {
    return this.utils.formatPrice(isOferta(item) ? item.precioOferta : item.precio);
  }
  getOriginalPrice(item: NexusItem): string | null {
    return isOferta(item) && item.precioOriginal > item.precioOferta
      ? this.utils.formatPrice(item.precioOriginal) : null;
  }
  getDiscount(item: NexusItem): number {
    return isOferta(item) ? this.utils.calculateDiscount(item.precioOriginal, item.precioOferta) : 0;
  }
  getSellerName(item: NexusItem): string {
    return isOferta(item) ? item.tienda || 'Tienda' : item.publicador?.user || 'Vendedor';
  }
  getDetailUrl(item: NexusItem): string {
    return isOferta(item) ? '/oferta/' + item.id : '/producto/' + item.id;
  }
  toggleFavorite(): void { this.favorites.toggle(this.product); }
}
