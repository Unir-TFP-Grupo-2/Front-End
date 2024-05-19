import { Component } from '@angular/core';
import { HomeComponentSliderComponent } from '../../components/home-component-slider/home-component-slider.component';
import { HomeComponentGrid2Component } from '../../components/home-component-grid2/home-component-grid2.component';
import { HomeComponentCaracteristicasComponent } from '../../components/home-component-caracteristicas/home-component-caracteristicas.component';
import { HomeComponentFuncionComponent } from '../../components/home-component-funcion/home-component-funcion.component';
import { ComponentFaqsComponent } from '../../components/component-faqs/component-faqs.component';
import { LogicaComponent } from '../../components/logica/logica.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [HomeComponentSliderComponent, HomeComponentGrid2Component, HomeComponentCaracteristicasComponent, HomeComponentFuncionComponent, ComponentFaqsComponent,LogicaComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
