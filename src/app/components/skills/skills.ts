import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

interface Skill { name: string; level: number; color: string; }
interface SkillCategory { title: string; icon: string; color: string; bgColor: string; skills: Skill[]; }

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class SkillsComponent implements AfterViewInit {
  skillCategories: SkillCategory[] = [
    {
      title: 'Frontend', icon: '🎨', color: '#8b5cf6', bgColor: '#ede9fe',
      skills: [
        { name: 'Angular', level: 95, color: 'linear-gradient(90deg, #dd0031, #c3002f)' },
        { name: 'React', level: 88, color: 'linear-gradient(90deg, #61dafb, #282c34)' },
        { name: 'Next.js', level: 82, color: 'linear-gradient(90deg, #000, #333)' },
        { name: 'TypeScript', level: 92, color: 'linear-gradient(90deg, #3178c6, #235a97)' },
        { name: 'Tailwind CSS', level: 90, color: 'linear-gradient(90deg, #06b6d4, #0284c7)' },
        { name: 'RxJS', level: 85, color: 'linear-gradient(90deg, #b7178c, #e011a8)' },
      ],
    },
    {
      title: 'Backend', icon: '⚙️', color: '#f43f5e', bgColor: '#fff1f2',
      skills: [
        { name: 'Node.js', level: 80, color: 'linear-gradient(90deg, #339933, #256b25)' },
        { name: 'Express.js', level: 78, color: 'linear-gradient(90deg, #404040, #202020)' },
        { name: 'PostgreSQL', level: 75, color: 'linear-gradient(90deg, #336791, #1e3f5a)' },
        { name: 'REST APIs', level: 88, color: 'linear-gradient(90deg, #ff6b6b, #ee5a24)' },
        { name: 'GraphQL', level: 65, color: 'linear-gradient(90deg, #e10098, #b8007c)' },
      ],
    },
    {
      title: 'DevOps & Tools', icon: '🚀', color: '#d946ef', bgColor: '#fae8ff',
      skills: [
        { name: 'Git & GitHub', level: 92, color: 'linear-gradient(90deg, #f05032, #c0392b)' },
        { name: 'Docker', level: 70, color: 'linear-gradient(90deg, #2496ed, #1976d2)' },
        { name: 'CI/CD', level: 72, color: 'linear-gradient(90deg, #0096d6, #005ea7)' },
        { name: 'Vercel / Netlify', level: 88, color: 'linear-gradient(90deg, #000, #333)' },
        { name: 'Nx Monorepo', level: 78, color: 'linear-gradient(90deg, #143055, #0e1f38)' },
      ],
    },
  ];

  techIcons = [
    { name: 'Angular', icon: '🔴', bg: '#fff1f2' },
    { name: 'React', icon: '⚛️', bg: '#e0f7fe' },
    { name: 'TypeScript', icon: '🔷', bg: '#e8f0fe' },
    { name: 'Node.js', icon: '🟢', bg: '#f0fdf4' },
    { name: 'Next.js', icon: '⬛', bg: '#f8f9fa' },
    { name: 'PostgreSQL', icon: '🐘', bg: '#ede9fe' },
    { name: 'Docker', icon: '🐳', bg: '#e0f0fe' },
    { name: 'GraphQL', icon: '◈', bg: '#fdf4ff' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object, private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const elements = document.querySelectorAll('#skills .observe-animate');
      this.scrollAnim.observe(elements);
      const skillBars = document.querySelectorAll('.skill-bar-inner');
      const barObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const bar = entry.target as HTMLElement;
              bar.style.setProperty('--progress-width', `${bar.dataset['width'] || 80}%`);
              bar.classList.add('animate-width');
              barObserver.unobserve(bar);
            }
          });
        },
        { threshold: 0.3 }
      );
      skillBars.forEach((bar) => barObserver.observe(bar));
    }
  }
}
