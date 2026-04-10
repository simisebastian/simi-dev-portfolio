import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-knotique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './knotique.html',
  styleUrl: './knotique.scss',
})
export class KnotiqueComponent implements AfterViewInit {
  highlights = [
    { icon: '🧶', label: 'Handmade Products', desc: 'Every piece is lovingly handcrafted with premium yarns' },
    { icon: '🌍', label: 'Ships Worldwide', desc: 'Delivering to customers across Europe and beyond' },
    { icon: '💜', label: 'Made with Love', desc: 'Each order is packed with care and a personal touch' },
    { icon: '✨', label: 'Custom Orders', desc: 'Bespoke pieces tailored to your style and colour palette' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object, private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrollAnim.init();
    const elements = document.querySelectorAll('#knotique .observe-animate, #knotique .observe-animate-left, #knotique .observe-animate-right');
    this.scrollAnim.observe(elements);
  }
}
