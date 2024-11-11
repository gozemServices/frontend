import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor() { }

  ngOnInit(): void {
    this.createJobSearchChart();
    this.createApplicationsChart();
  }

  createJobSearchChart() {
    new Chart('applicationsChart', {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Applications per Day',
          data: [2, 3, 4, 3, 5, 4, 2],
          fill: false,
          borderColor: '#6366f1',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }
    });
  }

  createApplicationsChart() {
    new Chart('applicationsChart', {
      type: 'pie',
      data: {
        labels: ['Sent', 'Remaining'],
        datasets: [{
          label: 'Application Status',
          data: [18, 7],
          backgroundColor: ['#4ade80', '#e4e4e7'],
          borderColor: ['#4ade80', '#e4e4e7'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }
    });
  }

}

