import { Component, HostListener, signal, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

interface NavItem { label: string; href: string; }

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent implements OnInit {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  activeSection = signal('home');

  navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Knotique', href: '#knotique' },
    { label: 'Contact', href: '#contact' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) this.setupScrollSpy();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) this.isScrolled.set(window.scrollY > 20);
  }

  scrollToSection(href: string, event: Event): void {
    event.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
    this.isMobileMenuOpen.set(false);
  }

  toggleMobileMenu(): void { this.isMobileMenuOpen.update((v) => !v); }

  private setupScrollSpy(): void {
    const sections = ['home','about','skills','projects','experience','knotique','contact'];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) this.activeSection.set(e.target.id); }),
      { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
  }
}
