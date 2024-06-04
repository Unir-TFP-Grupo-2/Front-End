import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormGroup } from '@angular/forms';
import { IGroup } from '../../../../interfaces/igroup';

@Component({
  selector: 'app-mini-group',
  standalone: true,
  imports: [RouterLink, CommonModule, MatSlideToggleModule, MatTooltipModule],
  templateUrl: './mini-group.component.html',
  styleUrls: ['./mini-group.component.css'] 
})
export class MiniGroupComponent implements OnInit {

  @Input() miGroup!: IGroup

  
  @Input() value: number = 50; 
  colors = [
    'rgb(150, 206, 255)','rgb(255, 183, 197)','rgb(255, 255, 186)','rgb(186, 255, 201)',
    'rgb(255, 223, 186)'
  ];

  miniGroupColor!: string;
  addUserButtonColor!: string;
  progressBarColor!: string;

  ngOnInit() {
    this.miniGroupColor = this.getRandomColor();
    this.addUserButtonColor = this.getRandomColor();
  }

  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  showPopup: boolean = false;

  onMouseEnter() {
    this.showPopup = true;
  }

  onMouseLeave() {
    this.showPopup = false;
  }
}
