import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';

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
  onSubmit() {
    const formData = {
      to: this.to,
      from: this.from,
      subject: this.subject,
      text: this.text
    };
    console.log(formData);
  }


}
