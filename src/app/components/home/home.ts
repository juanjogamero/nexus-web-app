import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeroComponent } from '../hero/hero';
import { ProductCardComponent } from '../product-card/product-card';
import { FeedService, FeedFilter } from '../../services/feed-service';
import { FavoritesService } from '../../services/favorites-service';
import { NexusItem } from '../../models/nexus-item';
import { environment } from '../../../environments/enviroment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroComponent, ProductCardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  readonly isDemo = environment.demoMode;
  activeFilter: FeedFilter = 'all';
  allItems: NexusItem[] = [];
  searchQuery = '';
  categoria = '';
  sort: 'relevance' | 'price-low' | 'price-high' = 'relevance';
  isLoading = true;
  loadError = false;

  constructor(
    private feedService: FeedService,
    private route: ActivatedRoute,
    private router: Router,
    readonly favorites: FavoritesService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const filter = params.get('tipo');
      this.activeFilter = filter === 'deals' || filter === 'secondhand' || filter === 'favorites' ? filter : 'all';
      this.searchQuery = params.get('q') ?? '';
      this.categoria = params.get('categoria') ?? '';
    });
    this.cargarFeed();
  }

  cargarFeed(): void {
    this.isLoading = true;
    this.loadError = false;
    this.feedService.getUnifiedFeed().subscribe({
      next: data => { this.allItems = data; this.isLoading = false; },
      error: () => { this.loadError = true; this.isLoading = false; }
    });
  }

  get categorias(): string[] {
    return [...new Set(this.allItems.map(item => item.categoria).filter((v): v is string => !!v))].sort();
  }

  get filteredProducts(): NexusItem[] {
    const filter = this.activeFilter === 'favorites' ? 'all' : this.activeFilter;
    let items = this.feedService.filterFeed(this.allItems, filter, this.searchQuery, this.categoria);
    if (this.activeFilter === 'favorites') items = items.filter(item => this.favorites.has(item));
    if (this.sort === 'price-low') return [...items].sort((a,b) => this.price(a) - this.price(b));
    if (this.sort === 'price-high') return [...items].sort((a,b) => this.price(b) - this.price(a));
    return items;
  }

  setFilter(filter: FeedFilter): void {
    this.router.navigate(['/'], { queryParams: { tipo: filter === 'all' ? null : filter }, queryParamsHandling: 'merge' });
  }
  setCategory(categoria: string): void {
    this.router.navigate(['/'], { queryParams: { categoria: categoria || null }, queryParamsHandling: 'merge' });
  }
  setSort(value: string): void {
    if (value === 'price-low' || value === 'price-high' || value === 'relevance') this.sort = value;
  }
  clearFilters(): void {
    this.sort = 'relevance';
    this.router.navigate(['/']);
  }
  private price(item: NexusItem): number {
    return 'precioOferta' in item ? item.precioOferta : item.precio;
  }
}
