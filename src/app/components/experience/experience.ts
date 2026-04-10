import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

interface Experience {
  company: string; role: string; period: string; duration: string;
  location: string; description: string; achievements: string[];
  tags: string[]; color: string; icon: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class ExperienceComponent implements AfterViewInit {
  experiences: Experience[] = [
    { company: 'TechCorp Solutions', role: 'Senior Frontend Developer', period: '2022 – Present', duration: '2+ years', location: 'Remote', description: 'Leading frontend development for enterprise-grade SaaS applications. Architect and implement complex Angular features while mentoring junior developers.', achievements: ['Reduced initial load time by 45% through lazy loading and code splitting', 'Led migration from Angular 8 to Angular 17 across 3 products', 'Established coding standards and component library used by team of 12', 'Built real-time notification system handling 10,000+ concurrent users'], tags: ['Angular', 'TypeScript', 'NgRx', 'RxJS', 'Jest'], color: '#8b5cf6', icon: '🚀' },
    { company: 'Innova Digital', role: 'Frontend Developer', period: '2020 – 2022', duration: '2 years', location: 'Hybrid', description: 'Developed responsive React and Angular applications for clients across fintech, healthcare, and e-commerce. Collaborated closely with UI/UX designers.', achievements: ['Delivered 8 client projects on time with zero critical bugs', 'Integrated third-party APIs including Stripe, Twilio, and Google Maps', 'Improved Lighthouse performance scores from 60 to 95+', 'Built reusable component library reducing development time by 30%'], tags: ['React', 'Angular', 'Node.js', 'PostgreSQL', 'Sass'], color: '#f43f5e', icon: '💼' },
    { company: 'StartUp Labs', role: 'Junior Frontend Developer', period: '2018 – 2020', duration: '2 years', location: 'On-site', description: 'Started career as a junior developer, contributing to various web applications. Rapidly grew skills in Angular and modern JavaScript ecosystem.', achievements: ['Built and deployed 5 production-ready web applications', 'Learned Angular deeply — from basics to advanced patterns', 'Collaborated in agile team using Scrum methodology', 'Received “Rising Star” award for exceptional growth'], tags: ['Angular', 'JavaScript', 'HTML/CSS', 'Bootstrap', 'Git'], color: '#d946ef', icon: '🌱' },
  ];
  education = [{ degree: 'Bachelor of Technology — Computer Science', institution: 'APJ Abdul Kalam Technological University', period: '2014 – 2018', grade: 'First Class with Distinction', icon: '🎓' }];

  constructor(@Inject(PLATFORM_ID) private platformId: object, private scrollAnim: ScrollAnimationService) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) this.scrollAnim.observe(document.querySelectorAll('#experience .observe-animate'));
  }
}
