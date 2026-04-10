import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollAnimationService {
  private observer: IntersectionObserver | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            const staggerChildren = entry.target.querySelectorAll('[data-stagger]');
            staggerChildren.forEach((child, index) => {
              (child as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
              child.classList.add('animated');
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
  }

  observe(elements: NodeListOf<Element> | Element[]): void {
    if (!this.observer) this.init();
    elements.forEach((el) => this.observer?.observe(el));
  }

  disconnect(): void {
    this.observer?.disconnect();
  }
}
