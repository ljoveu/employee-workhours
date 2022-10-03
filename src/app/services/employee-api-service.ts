import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../classes/employee';


@Injectable()
export class EmployeeAPIService {
  static getEmployee() {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) { }


  //Kreiramo funkciju koja vraca podatke sa API-a kad se pozove
  getEmployee(): Observable<any> {
    return this.httpClient.get('https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==')
  }
}