import { Component, inject } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faCheckCircle,faExclamationCircle,faExclamationTriangle,faInfoCircle, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Toast } from '../../../core/models/common.model';



@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  private modalService = inject(ModalService);
  toast!: Toast ;

  ngOnInit() {
    setTimeout(() => {
      this.removeToast();
    },this.toast.timeout ?? 1000);
  }
  private typeToIconMap: { [key in Toast['type']]: IconDefinition } = {
    success: faCheckCircle,
    error: faExclamationCircle,
    warning: faExclamationTriangle,
    info: faInfoCircle
  };


  removeToast() {
    this.modalService.close();
  }


    /**
   * Get the appropriate icon for the toast type.
   */
    getIcon(type: Toast['type']): IconDefinition {
      return this.typeToIconMap[type];
    }

}
