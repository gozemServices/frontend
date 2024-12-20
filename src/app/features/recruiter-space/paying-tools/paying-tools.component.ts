import { Component } from '@angular/core';
import { UnderConstructionComponent } from '../../../shared/components/under-construction/under-construction.component';

@Component({
  selector: 'app-paying-tools',
  standalone: true,
  imports: [UnderConstructionComponent],
  templateUrl: './paying-tools.component.html',
  styleUrl: './paying-tools.component.scss'
})
export class PayingToolsComponent {
  underconstruction = true;

}
