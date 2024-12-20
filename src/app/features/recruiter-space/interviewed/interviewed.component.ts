import { Component, inject, OnInit } from '@angular/core';
import { InterviewService } from '../../services/interview.service';

@Component({
  selector: 'app-interviewed',
  standalone: true,
  imports: [],
  templateUrl: './interviewed.component.html',
  styleUrl: './interviewed.component.scss'
})
export class InterviewedComponent implements OnInit{

  private interviewService = inject(InterviewService);
  ngOnInit(){
    this.fetchInterviewed();
  }

  fetchInterviewed(){

  }

}
