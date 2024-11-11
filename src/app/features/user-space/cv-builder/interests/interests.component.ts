import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [MatIconModule,FontAwesomeModule],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent {
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;
}
