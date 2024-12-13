import { Component, inject, Inject, Input } from '@angular/core';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { GenericService } from '../../../../core/services/generic.service';
import { CvTemplateComponent } from '../../../../shared/components/cv-template/cv-template.component';
import { ProposalModalComponent } from '../proposal-modal/proposal-modal.component';
import { CvthequeService } from '../../../services/cv/cvtheque.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-cv-item',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './cv-item.component.html',
  styleUrl: './cv-item.component.scss'
})
export class CvItemComponent {
  @Input() cvInfos: any ;
  @Input() filteredCvList: any;
  @Input() layoutStyle= 'grid';
  faDownload = faDownload;
  private modalService = inject(ModalService);
  private genericsService = inject(GenericService);
  private cvThequeServices = inject(CvthequeService)
  profilePic: string | ArrayBuffer | null = null;

  ngOnInit() {
    this.loadProfileImage(this.cvInfos?.profilePhotoUrl ?? '');
    // console.log(this.cvInfos);
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
        // console.log(this.cvInfos);
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


  downloadCv() {
    this.cvThequeServices.printCv(this.cvInfos.id).subscribe(
      (response: ArrayBuffer) => {
        // Convert ArrayBuffer to Blob
        const blob = new Blob([response], { type: 'application/pdf' });
  
        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(blob);
  
        // Create a link element to trigger the file download
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'cv.pdf';  // Set the file name
        a.click();  // Trigger the download
  
        // Clean up the URL object
        URL.revokeObjectURL(blobUrl);
      },
      (error) => {
        console.error('Error downloading CV', error);
      }
    );
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
