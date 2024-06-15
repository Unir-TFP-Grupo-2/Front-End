import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  name = '';  
  email = '';
  message = '';
  onSubmit() {
    const formData = {
      name: this.name,
      email: this.email,
      message: this.message
    };
    console.log(formData);
  }


}
