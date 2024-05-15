import { Component } from '@angular/core';
import { HomeComponentSliderComponent } from '../../home-component-slider/home-component-slider.component';
import { HomeComponentGrid2Component } from '../../home-component-grid2/home-component-grid2.component';
import { HomeComponentCaracteristicasComponent } from '../../home-component-caracteristicas/home-component-caracteristicas.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [HomeComponentSliderComponent, HomeComponentGrid2Component, HomeComponentCaracteristicasComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
