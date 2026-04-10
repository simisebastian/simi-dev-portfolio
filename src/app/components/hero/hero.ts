import { Component, OnInit, OnDestroy, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  displayedText = signal('');
  currentRoleIndex = signal(0);
  isDeleting = signal(false);
  isVisible = signal(false);
  roles = ['Frontend Developer','Angular Expert','React Developer','UI/UX Enthusiast','Full-Stack Developer'];
  private typewriterInterval: ReturnType<typeof setInterval> | null = null;
  private charIndex = 0;
  private pauseTimeout: ReturnType<typeof setTimeout> | null = null;
  stats = [
    { value: '6+', label: 'Years Experience' },
    { value: '30+', label: 'Projects Delivered' },
    { value: '10+', label: 'Happy Clients' },
    { value: '5', label: 'Technologies' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.isVisible.set(true), 100);
      setTimeout(() => this.startTypewriter(), 800);
    }
  }

  ngOnDestroy(): void {
    if (this.typewriterInterval) clearInterval(this.typewriterInterval);
    if (this.pauseTimeout) clearTimeout(this.pauseTimeout);
  }

  private startTypewriter(): void {
    this.typewriterInterval = setInterval(() => {
      const currentRole = this.roles[this.currentRoleIndex()];
      if (!this.isDeleting()) {
        this.charIndex++;
        this.displayedText.set(currentRole.substring(0, this.charIndex));
        if (this.charIndex === currentRole.length) {
          if (this.typewriterInterval) clearInterval(this.typewriterInterval);
          this.pauseTimeout = setTimeout(() => { this.isDeleting.set(true); this.startTypewriter(); }, 2000);
          return;
        }
      } else {
        this.charIndex--;
        this.displayedText.set(currentRole.substring(0, this.charIndex));
        if (this.charIndex === 0) {
          this.isDeleting.set(false);
          this.currentRoleIndex.update((i) => (i + 1) % this.roles.length);
          if (this.typewriterInterval) clearInterval(this.typewriterInterval);
          this.pauseTimeout = setTimeout(() => this.startTypewriter(), 300);
          return;
        }
      }
    }, this.isDeleting() ? 60 : 100);
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  }
}
