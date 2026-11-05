import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../core/Services/user-service';
import { ViewCompetitions } from '../competition/view-competitions/view-competitions';
import { CompetitionService } from '../../core/Services/competition-service';
import { CompetitionResponse } from '../../core/models/competiton-model';
import { delay } from 'rxjs';
import { Loader } from '../../shared/components/loader/loader';

@Component({
  imports: [RouterLink, ViewCompetitions, Loader],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private userService=inject(UserService);
  private competitionService=inject(CompetitionService);
  isLoggedIn=this.userService.isLoggedIn;
  toggleSection=signal(false);
  whenReady=signal(false);
  showCompetition=signal<CompetitionResponse[]>([]);


  showCompetitions(){
    this.toggleSection.set(!this.toggleSection());
    this.getAllCompetitions();
  }

  getAllCompetitions(){
    this.competitionService.getCompetition().pipe(delay(2000)).subscribe({
      next:(response:CompetitionResponse[])=>{
        this.showCompetition.set(response);
        this.whenReady.set(true);
        
      }
    });
  }
  
}
