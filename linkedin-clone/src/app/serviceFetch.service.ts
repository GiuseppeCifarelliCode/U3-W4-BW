import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { IProfile } from './models/profile';
import { IExperience } from './models/experience';
import { FullExperiences } from './models/full-experiences';
@Injectable({
  providedIn: 'root',
})
export class ServiceFetchService {
  // userId:
  password: string = environment.apiKey;
  url: string = 'https://striveschool-api.herokuapp.com/api/profile/';
  postUrl:string = 'https://striveschool-api.herokuapp.com/api/posts/'
  constructor(private http: HttpClient) {}
  //qui famo la fetch get
  //possiamo dare id come parametro della get

  //crud per profilo
  //get profilo me
  metodoPerGet() {
    return this.http.get(this.url + 'me', {
      headers: { Authorization: this.password },
    });
  }
  //get lista completa profili
  metodoPerGetAll() {
    return this.http.get<[]>(this.url, {
      headers: { Authorization: this.password },
    });
  }
  //put per modifica profilo
  metodoPerPut(modifica: string) {
    return this.http.put(this.url + modifica, {
      headers: {
        Authorization: this.password,
      },
    });
  }

  //url endpoint esperienze

  //crud per esperienze
  //get tutte esprienze
  getEsperienze(id: string) {
    return this.http.get<[]>(
      this.url + id  + '/experiences',
      {
        headers: { Authorization: this.password },
      }
    );
  }
  //aggiungere una nuova esperienza
  postEsperienza(id: string, data: IExperience) {
    return this.http.post(
      this.url +  id + '/experiences', data,
      {
        headers: { Authorization: this.password },
      }
    );
  }
  // put esperienza per modifica
  putEsperienza(id: string, expId: string, data: IExperience) {
    return this.http.put(
      this.url + id + '/experiences/' + expId, data,
      {
        headers: { Authorization: this.password },
      }
    );
  }

  deleteEsperienza(id:string, expId:string ){
    return this.http.delete(
      this.url + id + '/experiences/' + expId,
      {
        headers: { Authorization: this.password },
        responseType: 'text'
      }
    );
  }

  getPosts() {
    return this.http.get<[]>(
      this.postUrl,
      {
        headers: { Authorization: this.password },
      }
    );
  }
}
