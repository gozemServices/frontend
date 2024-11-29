import { Component, inject, Inject, Input } from '@angular/core';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { GenericService } from '../../../../core/services/generic.service';
import { CvTemplateComponent } from '../../../../shared/components/cv-template/cv-template.component';
import { ProposalModalComponent } from '../proposal-modal/proposal-modal.component';

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
  profilePic: string | ArrayBuffer | null = null;

  ngOnInit() {
    this.loadProfileImage(this.cvInfos?.profilePhotoUrl ?? '');
  }

  loadProfileImage(fileName: string) {
    this.genericsService.getImageRessource(fileName).subscribe(
      (data) => {
        // Convert the Blob to a URL and display it
        this.profilePic = URL.createObjectURL(data);
        this.cvInfos = {
          ...this.cvInfos,
          profilePic: this.profilePic
        }
        console.log(this.cvInfos);
      },
      (error) => {
        console.error('Error fetching image', error);
        this.profilePic = null
      }
    );
  }
    
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

  openProposeModal(cvId: number) {
    this.modalService.open(ProposalModalComponent, {
      size: {
        width: '80%',
        padding: '1rem'
      },
      data: {
        selectedCv: cvId,
      }
    }).then((data) => {

      });
  }

}
