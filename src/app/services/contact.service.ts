import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  // Replace these with your actual EmailJS credentials
  private readonly SERVICE_ID = 'YOUR_SERVICE_ID';
  private readonly TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  private readonly PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

  async sendEmail(form: ContactForm): Promise<void> {
    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
      to_name: 'Simi Sebastian',
    };
    await emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY);
  }
}
