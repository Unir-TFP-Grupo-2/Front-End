import { Component } from '@angular/core';
import { HomeComponentSliderComponent } from '../../home-component-slider/home-component-slider.component';
import { HomeComponentGrid2Component } from '../../home-component-grid2/home-component-grid2.component';
import { HomeComponentCaracteristicasComponent } from '../../home-component-caracteristicas/home-component-caracteristicas.component';
import { HomeComponentFuncionComponent } from '../../home-component-funcion/home-component-funcion.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [HomeComponentSliderComponent, HomeComponentGrid2Component, HomeComponentCaracteristicasComponent, HomeComponentFuncionComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
