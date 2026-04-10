import { Component, AfterViewInit, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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
  errorMessage = signal('');

  contactInfo = [
    { icon: '📧', label: 'Email', value: 'simi@example.com', href: 'mailto:simi@example.com', bg: '#ede9fe' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/simisebastian', href: 'https://linkedin.com/in/simisebastian', bg: '#dbeafe' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/simisebastian', href: 'https://github.com/simisebastian', bg: '#f1f5f9' },
    { icon: '📍', label: 'Location', value: 'Kerala, India (Open to Relocate)', href: null, bg: '#fff1f2' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object, private scrollAnim: ScrollAnimationService, private contactService: ContactService) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) this.scrollAnim.observe(document.querySelectorAll('#contact .observe-animate'));
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) return;
    this.status.set('sending');
    this.errorMessage.set('');
    try {
      await this.contactService.sendEmail(this.formData);
      this.status.set('success');
      form.resetForm();
      this.formData = { name: '', email: '', subject: '', message: '' };
      setTimeout(() => this.status.set('idle'), 6000);
    } catch {
      this.status.set('error');
      this.errorMessage.set('Something went wrong. Please try emailing me directly.');
      setTimeout(() => this.status.set('idle'), 6000);
    }
  }
}
