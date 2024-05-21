import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mini-group',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './mini-group.component.html',
  styleUrls: ['./mini-group.component.css'] 
})
export class MiniGroupComponent implements OnInit {
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
}
