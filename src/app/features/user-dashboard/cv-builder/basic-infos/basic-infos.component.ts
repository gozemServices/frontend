import { Component } from '@angular/core';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'
import { MatCheckboxModule } from '@angular/material/checkbox';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-basic-infos',
  standalone: true,
  imports: [  
    MatFormFieldModule,
    MatInputModule,
    MatPseudoCheckboxModule,
    MatIconModule,
    MatCheckboxModule,
    FontAwesomeModule
  ],
  templateUrl: './basic-infos.component.html',
  styleUrl: './basic-infos.component.scss'
})
export class BasicInfosComponent {
  faCoffe = faCoffee

}
