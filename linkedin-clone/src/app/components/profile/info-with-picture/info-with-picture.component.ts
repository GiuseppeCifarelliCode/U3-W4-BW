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
  arrayEsperienze: FullExperiences[] = [];
  saveModify:string = "Save"
  i!:number

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
  }

  //metodo gìper get tutte espeirnze

  getEsperienze() {
    this.srv.getEsperienze(this.infoUser._id).subscribe((resAll) => {
      console.log(resAll);
    });
  }
  //metodo per post esperienza
  save(expId?:string, i?:number) {
    if(this.saveModify === 'Save'){
    //parte la post
    this.srv.postEsperienza(this.infoUser._id, this.formData)
    .subscribe(res => this.arrayEsperienze.push(res as FullExperiences)
    )}
    else this.modify(this.arrayEsperienze[this.i]._id, this.i)
  }
  //metodo per put esperienza  manca di fare un interfaccia con le esperienze e un array

  textModify(index:number){
    this.saveModify = 'Save Changes'
    this.i = index

  }

  modify(expId:string, i:number) {
    this.srv.putEsperienza(
      this.infoUser._id,
      expId,
      this.formData
    ).subscribe(res => this.arrayEsperienze[i] = res as FullExperiences
    )
    this.saveModify = "Save"
  }
}
