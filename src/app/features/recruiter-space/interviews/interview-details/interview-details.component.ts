import { Component } from '@angular/core';

@Component({
  selector: 'app-interview-details',
  standalone: true,
  imports: [],
  templateUrl: './interview-details.component.html',
  styleUrl: './interview-details.component.scss'
})
export class InterviewDetailsComponent {
  seeker: any;
  steps: any;
  data: any;

  ngOnInit() {
    this.seeker = this.data.seeker;
    this.steps = this.data.steps
    // console.log(data)
  }
}
