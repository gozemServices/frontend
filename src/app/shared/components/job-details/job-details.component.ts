import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent implements OnInit{
  job: any; 
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  faArrowLeft = faArrowLeft;
  ngOnInit() : void {
    const heroId = this.route.snapshot.paramMap.get('id');
    // alert(heroId);
    this.fetchJobInfos(heroId);
  }


  fetchJobInfos(id: any) {

  }

  goBack() {
    this.location.back();
  }

}
