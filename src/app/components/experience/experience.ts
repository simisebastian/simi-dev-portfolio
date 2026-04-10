import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  current?: boolean;
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
    {
      role: 'Senior Frontend Developer',
      company: 'TechCorp GmbH',
      period: '2022 – Present',
      location: 'Frankfurt, Germany',
      description: 'Lead frontend development for a suite of enterprise SaaS products used by 50,000+ users. Architecting scalable Angular applications with NgRx state management.',
      highlights: [
        'Reduced bundle size by 40% through code-splitting and lazy loading',
        'Led a team of 4 developers using agile/scrum methodology',
        'Migrated legacy AngularJS codebase to Angular 15+',
        'Implemented CI/CD pipelines with GitHub Actions',
      ],
      current: true,
    },
    {
      role: 'Frontend Developer',
      company: 'Digital Agency Berlin',
      period: '2020 – 2022',
      location: 'Berlin, Germany',
      description: 'Delivered 15+ client projects ranging from marketing sites to complex web applications using React and Angular.',
      highlights: [
        'Improved Lighthouse performance scores from ~50 to 95+',
        'Built reusable component library used across 10 projects',
        'Collaborated closely with UX/UI designers in Figma',
        'Mentored 2 junior developers',
      ],
    },
    {
      role: 'Junior Frontend Developer',
      company: 'StartUp Ventures',
      period: '2018 – 2020',
      location: 'Mumbai, India',
      description: 'Started my career building responsive web interfaces and learning modern frontend practices. Worked across the full stack with Angular and Node.js.',
      highlights: [
        'Built the company\'s customer-facing dashboard from scratch',
        'Integrated third-party APIs including Stripe, Twilio, and Google Maps',
        'Achieved 100% test coverage for critical payment flows',
      ],
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object, private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrollAnim.init();
    const elements = document.querySelectorAll('#experience .observe-animate, #experience .observe-animate-left');
    this.scrollAnim.observe(elements);
  }
}
