import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/enviroment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  readonly isDemo = environment.demoMode;
  searchText = '';
  menuOpen = false;
  readonly navLinks = [
    { label: 'Explorar', query: '' },
    { label: 'Ofertas', query: 'deals' },
    { label: 'Segunda mano', query: 'secondhand' },
    { label: 'Favoritos', query: 'favorites' }
  ];
  constructor(private router: Router) {}

  search(): void {
    this.router.navigate(['/'], { queryParams: { q: this.searchText.trim() || null } });
    this.menuOpen = false;
  }
  navigateToFilter(filter: string): void {
    this.router.navigate(['/'], { queryParams: { tipo: filter || null } });
    this.menuOpen = false;
  }
}
