import { Component } from '@angular/core';
import { ServiceFetchService } from 'src/app/serviceFetch.service';
import { OnInit } from '@angular/core';
import { IProfile } from 'src/app/models/profile';
import { IExperience } from 'src/app/models/experience';
import { FullExperiences } from 'src/app/models/full-experiences';

@Component({
  selector: 'app-info-with-picture',
  templateUrl: './info-with-picture.component.html',
  styleUrls: ['./info-with-picture.component.scss'],
})
export class InfoWithPictureComponent {
  infoUser!: IProfile;
  allUsers!: IProfile[];
  formData: IExperience = {
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    area: '',
  };
  arrayEsperienze:FullExperiences[] = []

  constructor(private srv: ServiceFetchService) {}

  ngOnInit(): void {
    //questa è la get del singiolo profilo
    this.srv.metodoPerGet().subscribe((res) => {
      // console.log(res);
      this.infoUser = res as IProfile;
      console.log(this.infoUser);
    });
    //questa è la get di tutti i profili
    this.srv.metodoPerGetAll().subscribe((resAll) => {
      // console.log(res);
      this.allUsers = resAll as IProfile[];
      console.log(this.allUsers);
    });
    //qui sotto tentativo di chiamata per tutte espeirenze da cancellare perché il metodo completo èquelllo sotto
    this.srv.getEsperienze(this.infoUser._id).subscribe((resAll) => {
      console.log(resAll);
    });
  }

  //metodo gìper get tutte espeirnze

  getEsperienze() {
    this.srv.getEsperienze(this.infoUser._id).subscribe((resAll) => {
      console.log(resAll);
    });
  }
  //metodo per post esperienza
  save() {
    //parte la post
    this.srv.postEsperienza(this.infoUser._id, this.formData)
    .subscribe(res => this.arrayEsperienze.push(res as FullExperiences)

    )

  }
  //metodo per put esperienza  manca di fare un interfaccia con le esperienze e un array
  modify() {
    this.srv.putEsperienza(
      this.infoUser._id,
      this.arrayEsperienze._id,
      this.arrayEsperienze
    );
  }
}
