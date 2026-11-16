import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NexusService } from '../../services/nexus-service';
import { NexusItem, isOferta } from '../../models/nexus-item';
import { UtilsService } from '../../services/utils-service';
import { ImageService } from '../../services/image-service';
import { FavoritesService } from '../../services/favorites-service';
import { environment } from '../../../environments/enviroment';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetailComponent implements OnInit {
  item: NexusItem | null = null;
  loading = true;
  error = false;
  readonly isDemo = environment.demoMode;
  selectedImageIndex = 0;
  allImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private nexusService: NexusService,
    private utils: UtilsService,
    private images: ImageService,
    readonly favorites: FavoritesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const tipo = this.route.snapshot.routeConfig?.path?.startsWith('oferta/') ? 'oferta' : 'producto';
      this.loading = true;
      this.error = false;
      this.item = null;
      this.allImages = [];
      this.selectedImageIndex = 0;
      if (!Number.isInteger(id) || id <= 0) {
        this.loading = false;
        this.error = true;
        return;
      }
      const request: Observable<NexusItem> = tipo === 'oferta'
        ? this.nexusService.getOfertaById(id)
        : this.nexusService.getProductoById(id);
      request.subscribe({
        next: data => {
          this.item = data;
          this.allImages = [
            data.imagenPrincipal || this.images.getImageOrPlaceholder(null, tipo),
            ...(data.galeriaImagenes ?? [])
          ].filter(Boolean);
          this.loading = false;
        },
        error: () => { this.error = true; this.loading = false; }
      });
    });
  }

  get esOferta(): boolean { return !!this.item && isOferta(this.item); }
  get currentImage(): string { return this.allImages[this.selectedImageIndex] ?? ''; }
  get canNavigateImages(): boolean { return this.allImages.length > 1; }
  get precio(): string {
    if (!this.item) return '';
    return this.utils.formatPrice(isOferta(this.item) ? this.item.precioOferta : this.item.precio);
  }
  get precioAntes(): string | null {
    return this.item && isOferta(this.item) && this.item.precioOriginal > this.item.precioOferta
      ? this.utils.formatPrice(this.item.precioOriginal) : null;
  }
  get vendedor(): string {
    if (!this.item) return '';
    return isOferta(this.item) ? this.item.tienda || 'Tienda' : this.item.publicador?.user || 'Vendedor';
  }
  get categoria(): string { return this.item?.categoria ?? 'General'; }
  get estado(): string {
    if (!this.item) return '';
    if (isOferta(this.item)) return 'OFERTA';
    return this.item.estadoProducto;
  }
  get externalOfferUrl(): string | null {
    if (!this.item || !isOferta(this.item) || this.isDemo) return null;
    try {
      const url = new URL(this.item.urlOferta);
      return url.protocol === 'https:' ? url.href : null;
    } catch { return null; }
  }
  selectImage(index: number): void {
    if (index >= 0 && index < this.allImages.length) this.selectedImageIndex = index;
  }
  previousImage(): void {
    if (this.allImages.length) this.selectedImageIndex = (this.selectedImageIndex - 1 + this.allImages.length) % this.allImages.length;
  }
  nextImage(): void {
    if (this.allImages.length) this.selectedImageIndex = (this.selectedImageIndex + 1) % this.allImages.length;
  }
  async shareItem(): Promise<void> {
    if (!this.item) return;
    const data = { title: this.item.titulo, text: 'Mira esta ficha en Nexus', url: window.location.href };
    if (!await this.utils.share(data)) await this.copyLink();
  }
  async copyLink(): Promise<void> {
    const copied = await this.utils.copyToClipboard(window.location.href);
    if (!copied) window.prompt('Copia este enlace:', window.location.href);
  }
}
