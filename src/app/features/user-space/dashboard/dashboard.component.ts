import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Chart } from 'chart.js';
import { GenericService } from '../../../core/services/generic.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isLoading = false;
  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
    // this.createJobSearchChart();
    // this.createApplicationsChart();
    this.fetchCvInfos();
  }

  fetchCvInfos() {
    this.isLoading = true;
    this.genericService.fetchCvInfos().subscribe(
      (data) => {
        let cvInfos = data;
        if(cvInfos) {
          this.isLoading = false;
          this.genericService.saveCvDatas(cvInfos);
          console.log(cvInfos);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }


}

