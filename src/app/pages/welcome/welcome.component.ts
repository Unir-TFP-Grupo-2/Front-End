import { Component } from '@angular/core';
import { HomeComponentSliderComponent } from '../../home-component-slider/home-component-slider.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [HomeComponentSliderComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
