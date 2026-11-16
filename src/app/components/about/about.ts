import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/enviroment';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="about-page container">
      <div class="eyebrow">NEXUS / EL PROYECTO</div>
      <h1>Un marketplace.<br><span>Dos formas de descubrir.</span></h1>
      <p class="lead">Nexus Web App reúne en un mismo frontend Angular artículos de segunda mano y ofertas de tiendas. Su arquitectura está preparada para consumir una API REST externa.</p>
      <div class="about-grid">
        <article><span class="number">01</span><h2>Marketplace</h2><p>Catálogo unificado, búsqueda, filtros, fichas de producto y favoritos guardados en el navegador.</p></article>
        <article><span class="number">02</span><h2>Angular 21</h2><p>Componentes independientes, TypeScript, servicios HTTP, modelos tipados y navegación con Angular Router.</p></article>
        <article><span class="number">03</span><h2>Estado del proyecto</h2><p>{{ statusText }}</p></article>
      </div>
      <div class="about-note">
        <strong>Qué funciona aquí</strong><p>Explorar el catálogo, buscar, aplicar filtros, guardar favoritos y abrir fichas. Los datos de demostración no son artículos a la venta. No se realizan pagos ni se contacta a vendedores.</p>
        <strong>Qué necesita el backend</strong><p>Inicio de sesión, registro, publicación de anuncios, mensajería, reservas y transacciones. El repositorio actual contiene el frontend, no esos sistemas operativos.</p>
      </div>
      <div class="about-links">
        <a routerLink="/" class="btn-nexus-primary">Explorar Nexus ↗</a>
        <a href="https://github.com/juanjogamero/nexus-web-app" target="_blank" rel="noopener noreferrer" class="btn-nexus-glass">Código en GitHub ↗</a>
      </div>
    </section>
  `,
  styles: [`
    :host{display:block}.about-page{padding:85px 24px 110px;max-width:1200px}
    .eyebrow{font-size:.75rem;letter-spacing:.18em;color:var(--nexus-blue);font-weight:800}
    h1{font-family:var(--font-display);font-size:clamp(3rem,7vw,6.2rem);line-height:1.07;letter-spacing:-.065em;margin:22px 0}
    h1 span{color:var(--nexus-pink)}.lead{font-size:1.12rem;color:var(--text-secondary);max-width:780px;line-height:1.7}
    .about-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:60px}
    article{background:var(--bg-surface);border:1px solid var(--bg-glass-border);border-radius:14px;padding:25px}
    .number{color:var(--nexus-purple);font-weight:800;font-size:.79rem}
    h2{font-size:1.32rem;margin:20px 0 9px}article p,.about-note p{color:var(--text-muted);line-height:1.7}
    .about-note{margin-top:25px;padding:30px;border:1px solid var(--bg-glass-border);background:#0c0e12;border-radius:14px}
    .about-note strong{display:block;margin:10px 0 6px}.about-note p{margin-bottom:20px}
    .about-links{display:flex;gap:12px;flex-wrap:wrap;margin-top:25px}.about-links a{text-decoration:none}
    @media(max-width:700px){.about-grid{grid-template-columns:1fr}.about-page{padding:50px 18px}}
  `]
})
export class AboutComponent {
  readonly statusText = environment.demoMode
    ? 'Vista de portfolio con datos de ejemplo. No necesita una API para explorar el diseño y sus interacciones.'
    : 'Modo conectado a la API configurada. La disponibilidad depende del servidor y sus servicios.';
}
