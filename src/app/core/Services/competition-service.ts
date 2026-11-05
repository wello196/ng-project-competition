import { HttpClient } from '@angular/common/http';
import { inject,Injectable } from '@angular/core';
import { API_CONFIG } from '../constants/Api.constant';
import { CompetitionResponse, CreateCompetition } from '../models/competiton-model';

@Injectable({
    providedIn: 'root',
})
export class CompetitionService {
    private http=inject(HttpClient)
    
    createCompetition(value:CreateCompetition){
        return this.http.post<CompetitionResponse>(`${API_CONFIG.API}/competition`,value);
    }

    getCompetition(){
        return this.http.get<CompetitionResponse[]>(`${API_CONFIG.API}/GetAllCompetition`);
    }
    getCompetitionById(id:number){
        return this.http.get<CompetitionResponse>(`${API_CONFIG.API}/competition/${id}`);
    }

  deleteCompetition(compId: number | string) {
    return this.http.delete(`${API_CONFIG.API}/delete/${compId}`);
}

updateCompetition(compId: number | string, value: CreateCompetition) {
    return this.http.put<CompetitionResponse>(`${API_CONFIG.API}/update/${compId}`, value);
}
 submitProject(value:any){
      return this.http.post(`${API_CONFIG.API}/project`,value);
    }
}
