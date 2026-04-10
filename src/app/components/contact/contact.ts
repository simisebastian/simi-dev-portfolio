import { Component, AfterViewInit, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { ContactService, ContactForm } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent implements AfterViewInit {
  formData: ContactForm = { name: '', email: '', subject: '', message: '' };
  status = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  contactLinks = [
    {
      icon: '✉️',
      label: 'Email',
      value: 'simi@example.com',
      href: 'mailto:simi@example.com',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/simisebastian',
      href: 'https://linkedin.com/in/simisebastian',
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'github.com/simisebastian',
      href: 'https://github.com/simisebastian',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Frankfurt, Germany',
      href: null,
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private scrollAnim: ScrollAnimationService,
    private contactService: ContactService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrollAnim.init();
    const elements = document.querySelectorAll('#contact .observe-animate, #contact .observe-animate-left, #contact .observe-animate-right');
    this.scrollAnim.observe(elements);
  }

  async onSubmit(): Promise<void> {
    if (this.status() === 'sending') return;
    this.status.set('sending');
    try {
      await this.contactService.sendEmail(this.formData);
      this.status.set('success');
      this.formData = { name: '', email: '', subject: '', message: '' };
      setTimeout(() => this.status.set('idle'), 5000);
    } catch {
      this.status.set('error');
      setTimeout(() => this.status.set('idle'), 5000);
    }
  }
}
