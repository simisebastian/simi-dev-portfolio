import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

interface Product { name: string; description: string; emoji: string; price: string; tags: string[]; gradient: string; }

@Component({
  selector: 'app-knotique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './knotique.html',
  styleUrl: './knotique.scss',
})
export class KnotiqueComponent implements AfterViewInit {
  products: Product[] = [
    { name: 'Boho Market Bag', description: 'Handcrafted open-weave tote in natural cotton twine. Perfect for grocery runs or beach days. Sturdy handles, roomy interior.', emoji: '👜', price: '₹850', tags: ['Cotton', 'Sustainable', 'Bestseller'], gradient: 'linear-gradient(135deg, #fde68a, #fdba74)' },
    { name: 'Amigurumi Plushies', description: 'Adorable handmade crochet stuffed animals — bunnies, bears, and foxes. Made with hypoallergenic stuffing. Perfect gifting option.', emoji: '🐰', price: '₹650', tags: ['Gift', 'Handmade', 'Cute'], gradient: 'linear-gradient(135deg, #fda4af, #f0abfc)' },
    { name: 'Aesthetic Plant Holders', description: 'Macramé-inspired crochet pot holders in pastel shades. Fits pots up to 15cm diameter. Add boho charm to your living space.', emoji: '🪴', price: '₹450', tags: ['Home Decor', 'Boho', 'Pastel'], gradient: 'linear-gradient(135deg, #86efac, #6ee7b7)' },
    { name: 'Custom Cardigan', description: 'Fully customisable crochet cardigan — choose your color, size, and sleeve length. Each piece takes 2–3 weeks to make with love.', emoji: '🧥', price: '₹3,500', tags: ['Custom', 'Fashion', 'Premium'], gradient: 'linear-gradient(135deg, #c4b5fd, #a78bfa)' },
    { name: 'Coaster Set (4 pcs)', description: 'Chunky round crochet coasters in coordinated color sets. Machine washable and sturdy. A thoughtful handmade housewarming gift.', emoji: '🧁', price: '₹380', tags: ['Home', 'Gifting', 'Set'], gradient: 'linear-gradient(135deg, #fdba74, #fda4af)' },
    { name: 'Summer Sun Hat', description: 'Floppy wide-brim crochet hat in raffia yarn. Lightweight and breathable for summer. Available in natural, sage, and blush.', emoji: '👒', price: '₹1,200', tags: ['Fashion', 'Summer', 'Raffia'], gradient: 'linear-gradient(135deg, #fde68a, #86efac)' },
  ];
  highlights = [
    { icon: '🤲', title: '100% Handmade', desc: 'Every piece made with care' },
    { icon: '🌿', title: 'Eco-Friendly', desc: 'Natural & sustainable yarns' },
    { icon: '🎁', title: 'Custom Orders', desc: 'Personalized to your taste' },
    { icon: '🚚', title: 'Ships Nationwide', desc: 'India-wide delivery' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object, private scrollAnim: ScrollAnimationService) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) this.scrollAnim.observe(document.querySelectorAll('#knotique .observe-animate'));
  }
}
