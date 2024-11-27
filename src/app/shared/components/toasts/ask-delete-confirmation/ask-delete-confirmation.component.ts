import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { ModalService } from '../../modal/modal.service';

@Component({
  selector: 'app-ask-delete-confirmation',
  standalone: true,
  imports: [FontAwesomeModule, TranslateModule],
  templateUrl: './ask-delete-confirmation.component.html',
  styleUrl: './ask-delete-confirmation.component.scss'
})
export class AskDeleteConfirmationComponent {
  faDanger = faExclamationTriangle;
  itemToDelete!: any;
  type!: any;
  private modalService = inject(ModalService);
  onRemove() {
    this.modalService.close(true);
  }

  onCancel(){
      this.modalService.close(false);
  }


}
