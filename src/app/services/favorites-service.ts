import { Injectable, signal } from '@angular/core';
import { NexusItem, isOferta } from '../models/nexus-item';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly key = 'nexus-portfolio-favorites';
  readonly favorites = signal<string[]>(this.read());

  keyFor(item: NexusItem): string {
    return `${isOferta(item) ? 'oferta' : 'producto'}:${item.id}`;
  }

  has(item: NexusItem): boolean {
    return this.favorites().includes(this.keyFor(item));
  }

  toggle(item: NexusItem): void {
    const key = this.keyFor(item);
    const next = this.has(item)
      ? this.favorites().filter(id => id !== key)
      : [...this.favorites(), key];
    this.favorites.set(next);
    try { localStorage.setItem(this.key, JSON.stringify(next)); } catch { /* modo privado */ }
  }

  private read(): string[] {
    try {
      const value = JSON.parse(localStorage.getItem(this.key) ?? '[]');
      return Array.isArray(value) ? value.filter((key): key is string => typeof key === 'string') : [];
    } catch { return []; }
  }
}
