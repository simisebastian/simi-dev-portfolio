import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  navLinks = [
    { label: 'Home', href: '#home' }, { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' }, { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' }, { label: 'Knotique', href: '#knotique' },
    { label: 'Contact', href: '#contact' },
  ];
  socials = [
    { label: 'GitHub', href: 'https://github.com/simisebastian', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/simisebastian', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:simi@example.com', icon: 'email' },
  ];
  scrollToSection(href: string, event: Event): void {
    event.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  }
  scrollToTop(): void { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
