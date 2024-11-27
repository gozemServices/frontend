import { Component, inject, Inject, Input } from '@angular/core';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { GenericService } from '../../../../core/services/generic.service';
import { CvTemplateComponent } from '../../../../shared/components/cv-template/cv-template.component';

@Component({
  selector: 'app-cv-item',
  standalone: true,
  imports: [],
  templateUrl: './cv-item.component.html',
  styleUrl: './cv-item.component.scss'
})
export class CvItemComponent {
  @Input() cvInfos: any ;

  private modalService = inject(ModalService);
  private genericsService = inject(GenericService);


    
  openCvTemplate(cv: any) {
    // alert("opened");
    this.modalService.open(CvTemplateComponent, {
      size: {
        width: '80%',
        padding: '1rem'
      },
      data: {
        selectedCv: cv,
      }
    }).then((data) => {

      });
  }

}
