import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  to = '';  
  from = '';
  subject = '';
  text = '';

  constructor(private messageService: MessageService) {}

  onSubmit() {
    const formData = {
      to: this.to,
      from: this.from,
      subject: this.subject,
      text: this.text
    };
    
    this.messageService.sendMessage(formData).subscribe({
      next: (response) => console.log('Mensaje enviado con éxito', response),
      error: (error) => console.error('Error al enviar mensaje', error)
    });
  }
}
