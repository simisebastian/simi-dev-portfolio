import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent implements OnInit, AfterViewInit {
  interests = [
    { icon: '⚡', label: 'Clean Code', desc: 'SOLID principles & best practices' },
    { icon: '🎨', label: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces' },
    { icon: '🌍', label: 'Open to Relocation', desc: 'Germany & remote opportunities' },
    { icon: '🧶', label: 'Crochet Business', desc: 'Knotique — creative side hustle' },
  ];
  tools = ['VS Code', 'Git', 'Figma', 'Docker', 'Jira', 'Postman', 'Nx', 'Webpack'];

  constructor(@Inject(PLATFORM_ID) private platformId: object, private scrollAnim: ScrollAnimationService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) this.scrollAnim.init();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const elements = document.querySelectorAll('#about .observe-animate, #about .observe-animate-left, #about .observe-animate-right');
      this.scrollAnim.observe(elements);
    }
  }
}
