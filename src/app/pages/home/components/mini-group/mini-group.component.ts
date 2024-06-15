import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormGroup } from '@angular/forms';
import { IGroup } from '../../../../core/interfaces/igroup';
import { GroupsService } from '../../../../core/services/groups.service';


@Component({
  selector: 'app-mini-group',
  standalone: true,
  imports: [RouterLink, CommonModule, MatSlideToggleModule, MatTooltipModule],
  templateUrl: './mini-group.component.html',
  styleUrls: ['./mini-group.component.css'] 
})
export class MiniGroupComponent implements OnInit {

  @Input() miGroup!: IGroup

  participants: number = 8;

  
  @Input() value: number = 50; 
  colors = [
    '#FFF5EE', '#FFF0F5', '#F8C8DC', '#FADADD', '#FFE4E1', '#FFDAB9', '#FAFAD2', '#F5DEB3', '#F0E68C', '#E6E6FA','#D8BFD8', '#D3D3D3', '#E0FFFF', '#E0EEE0', '#E3F2FD', '#A7D9C9', '#A2D2F2', '#B0E0E6', '#DCC6E0', '#DDA0DD','#FFB6C1', '#E6E6FA', '#FFFACD', '#FFE4E1', '#E0FFFF', '#F0E68C', '#F5DEB3', '#F8C8DC', '#FAFAD2'
]


  miniGroupColor!: string;
  addUserButtonColor!: string;
  progressBarColor!: string;

  groupService = inject(GroupsService)
  activatedRouter = inject(ActivatedRoute);

  async ngOnInit(): Promise<void> {
  
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
