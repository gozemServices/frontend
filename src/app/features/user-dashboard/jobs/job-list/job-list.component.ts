import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent {

  @Input() layout: String = 'list';
  jobs = [
    { title: 'Web Designer', location: 'Yaounde', salary: '$50-30k', posted: '1 hour ago' },
    { title: 'Web Designer', location: 'Yaounde', salary: '$50-30k', posted: '1 hour ago' },
    { title: 'Web Designer', location: 'Yaounde', salary: '$50-30k', posted: '1 hour ago' },
  ];

}
