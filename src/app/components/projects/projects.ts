import { Component, AfterViewInit, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

interface Project {
  title: string; description: string; tags: string[];
  gradient: string; icon: string; liveUrl?: string; githubUrl?: string; featured: boolean;
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
  filters = ['All', 'Angular', 'React', 'Full-Stack', 'Node.js'];

  projects: Project[] = [
    { title: 'Enterprise HR Management Platform', description: 'A large-scale Angular application for HR operations with role-based access control, performance tracking, payroll management, and real-time notifications. Built for 500+ employees.', tags: ['Angular', 'NgRx', 'TypeScript', 'REST API', 'PostgreSQL'], gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: '🏢', featured: true, liveUrl: '#', githubUrl: '#' },
    { title: 'E-Commerce Dashboard', description: 'React-based admin dashboard for an e-commerce platform with real-time sales analytics, inventory management, and order processing. Integrated with Stripe and multiple payment gateways.', tags: ['React', 'Redux', 'Node.js', 'PostgreSQL', 'Stripe'], gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', icon: '🛒', featured: true, liveUrl: '#', githubUrl: '#' },
    { title: 'Healthcare Patient Portal', description: 'Secure patient-doctor portal built with Angular. Features include appointment scheduling, medical records, prescription history, and real-time chat with healthcare providers.', tags: ['Angular', 'TypeScript', 'WebSocket', 'Express', 'JWT'], gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: '🏥', featured: true, liveUrl: '#', githubUrl: '#' },
    { title: 'Real Estate Listing Platform', description: 'Full-stack Next.js application for property listings with advanced search filters, map integration, mortgage calculator, and virtual tour features.', tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Google Maps'], gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', icon: '🏠', featured: false, liveUrl: '#', githubUrl: '#' },
    { title: 'Social Media Analytics Tool', description: 'React application for tracking and visualizing social media metrics with interactive D3.js charts, automated reporting, and competitor analysis features.', tags: ['React', 'TypeScript', 'D3.js', 'Node.js', 'MongoDB'], gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', icon: '📊', featured: false, liveUrl: '#', githubUrl: '#' },
    { title: 'Task Management App (Kanban)', description: 'Collaborative task management tool inspired by Trello, built with Angular and real-time updates via WebSockets. Supports drag & drop, labels, deadlines, and team collaboration.', tags: ['Angular', 'NgRx', 'WebSocket', 'Express', 'PostgreSQL'], gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', icon: '📋', featured: false, liveUrl: '#', githubUrl: '#' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object, private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollAnim.observe(document.querySelectorAll('#projects .observe-animate'));
    }
  }

  get filteredProjects(): Project[] {
    const f = this.activeFilter();
    if (f === 'All') return this.projects;
    return this.projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes(f.toLowerCase())));
  }

  setFilter(filter: string): void { this.activeFilter.set(filter); }
}
