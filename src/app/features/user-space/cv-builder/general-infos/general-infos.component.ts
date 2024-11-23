import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EditGeneralInfosComponent } from '../actions/edit-general-infos/edit-general-infos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { GeneralInfosService } from '../../../services/cv/general-infos.service';
import { GenericService } from '../../../../core/services/generic.service';

@Component({
  selector: 'app-general-infos',
  standalone: true,
  imports: [
    TranslateModule, 
    EditGeneralInfosComponent,
    FontAwesomeModule
  ],
  templateUrl: './general-infos.component.html',
  styleUrl: './general-infos.component.scss'
})
export class GeneralInfosComponent implements OnInit{
  
  @Input()cvId!: number;
  generalInfos:any;
  isEditVisible = false;
  loading = false;
  faEdit = faEdit;

  constructor(
    private generalInfosService: GeneralInfosService, 
    private genericsService: GenericService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.generalInfos = this.generalInfosService.getCvGeneralInfos();
    this.fetchGeneralInfos();
  }
  EditInfos() {
    this.isEditVisible = true;
  }

  fetchGeneralInfos() {
    this.loading = true;
    this.generalInfosService.getGeneralInfo().subscribe(
      (data) => {
        // console.log(data);
        let cvInfos = data;
        if(cvInfos) {
          this.loading = false;
          // this.generalInfos = cvInfos;
          // console.log(this.generalInfos);
          this.genericsService.saveCvDatas(cvInfos);
          this.generalInfos = this.genericsService.getCvDatas();
        }
        this.loading = false;
      },
      (error) => {
        console.log('error fetching general infos');
        console.log(error);
      }
    );
  }


  onModalClose() {
    this.isEditVisible = false; 
  }
}
