import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

interface Skill { name: string; level: number; color: string; }
interface SkillCategory { title: string; icon: string; skills: Skill[]; }
interface Tech { name: string; icon: string; }

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class SkillsComponent implements AfterViewInit {
  categories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'Angular', level: 95, color: '#dd0031' },
        { name: 'React', level: 85, color: '#61dafb' },
        { name: 'TypeScript', level: 92, color: '#3178c6' },
        { name: 'HTML / CSS', level: 98, color: '#e34f26' },
        { name: 'Tailwind CSS', level: 88, color: '#06b6d4' },
      ],
    },
    {
      title: 'Backend & Tools',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 72, color: '#339933' },
        { name: 'RxJS', level: 88, color: '#b7178c' },
        { name: 'REST / GraphQL', level: 80, color: '#e535ab' },
        { name: 'Git & CI/CD', level: 85, color: '#f05032' },
        { name: 'Docker', level: 65, color: '#2496ed' },
      ],
    },
  ];

  techs: Tech[] = [
    { name: 'Angular', icon: '🅰️' },
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'RxJS', icon: '🔄' },
    { name: 'NgRx', icon: '🗃️' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'SCSS', icon: '💅' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Figma', icon: '🖌️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Jest', icon: '🃏' },
    { name: 'Nx', icon: '🏗️' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object, private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrollAnim.init();
    const elements = document.querySelectorAll('#skills .observe-animate, #skills .observe-animate-left, #skills .observe-animate-right');
    this.scrollAnim.observe(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll<HTMLElement>('.skill-bar-inner');
            bars.forEach((bar) => bar.classList.add('animate-width'));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    const section = document.getElementById('skills');
    if (section) observer.observe(section);
  }
}
