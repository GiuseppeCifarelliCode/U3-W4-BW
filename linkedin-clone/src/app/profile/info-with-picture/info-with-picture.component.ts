import { Component } from '@angular/core';
import { ServiceFetchService } from 'src/app/serviceFetch.service';
import { OnInit } from '@angular/core';
import { IProfile } from 'src/app/models/profile';

@Component({
  selector: 'app-info-with-picture',
  templateUrl: './info-with-picture.component.html',
  styleUrls: ['./info-with-picture.component.scss'],
})
export class InfoWithPictureComponent {
  infoUser!:IProfile[]
  allUsers: any = [];
  constructor(private srv: ServiceFetchService) {}

  ngOnInit(): void {
    this.srv.metodoPerGet().subscribe((res) => {
      // console.log(res);
      this.infoUser.push(res)
      console.log(this.infoUser);
    });
    this.srv.metodoPerGetAll().subscribe((resAll) => {
      // console.log(res);
      this.allUsers.push(resAll);
      console.log(this.allUsers);
    });
  }
}
