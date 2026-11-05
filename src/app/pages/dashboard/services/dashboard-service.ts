import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../../core/constants/Api.constant';
import { HttpClient } from '@angular/common/http';
import { DashboardModel } from '../model/dashboardModel';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
     private http=inject(HttpClient)
    getSummary(){
        return this.http.get<DashboardModel>(`${API_CONFIG.API}/GetDashboardSummary`);
    }
}
