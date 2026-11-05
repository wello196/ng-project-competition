import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from './services/dashboard-service';
import { DashboardModel } from './model/dashboardModel';
import { delay } from 'rxjs';
import { Loader } from '../../shared/components/loader/loader';

@Component({
  imports: [Loader],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit{
  whenReady=signal(false);
  private dashboardService=inject(DashboardService);
  data=signal<DashboardModel>(
    {
      totalUsers:0,
      totalCompetitions:0,
      ongoingCompetitions:0,
      completedCompetitions:0,
      upcomingCompetitions:0,
      totalProjectSubmissions:0,
      pendingSubmissions:0,
      approvedSubmissions:0,
      rejectedSubmissions:0,
      winnersDeclared:0
    }
  );
  errorMessage=signal('');
  ngOnInit(){
    this.dashboardService.getSummary().pipe(delay(2000)).subscribe({
      next:(response:DashboardModel)=>{
        this.data.set(response);
        this.whenReady.set(true);
      },
      error:()=>{
        this.errorMessage.set('Error fetching data');
      }
    });
  }
}
