import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-general-infos',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './general-infos.component.html',
  styleUrl: './general-infos.component.scss'
})
export class GeneralInfosComponent {

  @Input()cvId!: number;

}
