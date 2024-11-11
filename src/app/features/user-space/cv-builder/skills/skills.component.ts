import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [MatIconModule,FontAwesomeModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;
}
