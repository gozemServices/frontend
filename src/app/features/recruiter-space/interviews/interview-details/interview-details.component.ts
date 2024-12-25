import { Component, inject } from '@angular/core';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-interview-details',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './interview-details.component.html',
  styleUrl: './interview-details.component.scss'
})
export class InterviewDetailsComponent {
  seeker: any;
  steps: any;
  data: any;

  private modalService = inject(ModalService);
  ngOnInit() {
    this.seeker = this.data.seeker;
    this.steps = this.data.steps
    console.log(this.data);
  }


  onClose() {
    this.modalService.close();
  }
}
