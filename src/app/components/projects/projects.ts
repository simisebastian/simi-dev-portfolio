import { Component, AfterViewInit, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

interface Project {
  title: string;
  description: string;
  tags: string[];
  emoji: string;
  gradient: string;
  featured?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent implements AfterViewInit {
  activeFilter = signal('All');

  filters = ['All', 'Angular', 'React', 'Full-Stack'];

  projects: Project[] = [
    {
      title: 'Enterprise Dashboard',
      description: 'A large-scale analytics dashboard built with Angular 17 and NgRx. Features real-time data streaming via WebSockets, customisable widgets, and role-based access control.',
      tags: ['Angular', 'NgRx', 'RxJS', 'TypeScript'],
      emoji: '📊',
      gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
      featured: true,
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack shopping platform with React frontend, Node.js backend, and Stripe payments. Includes a CMS for product management and automated email notifications.',
      tags: ['React', 'Full-Stack', 'Node.js', 'Stripe'],
      emoji: '🛒',
      gradient: 'linear-gradient(135deg, #d946ef, #9333ea)',
      featured: true,
    },
    {
      title: 'Knotique Web Shop',
      description: 'Custom storefront for my crochet business built with Angular. Features product galleries, shopping cart, Instagram feed integration, and a custom CMS.',
      tags: ['Angular', 'SCSS', 'TypeScript'],
      emoji: '🧶',
      gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)',
    },
    {
      title: 'Component Library',
      description: 'An open-source Angular UI component library with 40+ components, full theming support, accessibility-first design, and comprehensive Storybook documentation.',
      tags: ['Angular', 'TypeScript', 'Storybook'],
      emoji: '🎨',
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    },
    {
      title: 'Real-Time Chat App',
      description: 'A React-based chat application with Socket.io for real-time messaging, user authentication, file sharing, and message history with infinite scroll.',
      tags: ['React', 'Full-Stack', 'Socket.io'],
      emoji: '💬',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
    },
    {
      title: 'Portfolio Website',
      description: 'This very portfolio! Built with Angular 21 and Tailwind CSS. Features scroll animations, a typewriter effect, and a responsive design optimised for all devices.',
      tags: ['Angular', 'TypeScript', 'Tailwind'],
      emoji: '🚀',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    },
  ];

  get filteredProjects(): Project[] {
    const f = this.activeFilter();
    if (f === 'All') return this.projects;
    return this.projects.filter((p) => p.tags.some((t) => t === f));
  }

  constructor(@Inject(PLATFORM_ID) private platformId: object, private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrollAnim.init();
    const elements = document.querySelectorAll('#projects .observe-animate');
    this.scrollAnim.observe(elements);
  }
}
