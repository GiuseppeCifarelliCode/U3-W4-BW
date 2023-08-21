import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { IProfile } from './models/profile';
@Injectable({
  providedIn: 'root',
})
export class ServiceFetchService {
  // userId:
  password: string = environment.apiKey;
  url: string = 'https://striveschool-api.herokuapp.com/api/profile/';
  constructor(private http: HttpClient) {}
  //qui famo la fetch get
  //possiamo dare id come parametro della get

  metodoPerGet() {
    return this.http.get(this.url + 'me', {
      headers: { Authorization: this.password },
    });
  }
  metodoPerGetAll(): Observable<[]> {
    return this.http.get<[]>(this.url, {
      headers: { Authorization: this.password },
    });
  }
  metodoPerPut(modifica: string) {
    return this.http.put(this.url + modifica, {
      headers: {
        Authorization: this.password,
      },
    });
  }
  //qui famo la fetch put
}
