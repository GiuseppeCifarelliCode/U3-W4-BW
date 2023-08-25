import { Component } from '@angular/core';
import { ServiceFetchService } from 'src/app/serviceFetch.service';
import { OnInit } from '@angular/core';
import { IProfile } from 'src/app/models/profile';
import { IExperience } from 'src/app/models/experience';
import { FullExperiences } from 'src/app/models/full-experiences';
import { map } from 'rxjs';
import { IPost } from 'src/app/models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-with-picture',
  templateUrl: './info-with-picture.component.html',
  styleUrls: ['./info-with-picture.component.scss'],
})
export class InfoWithPictureComponent {
  infoUser!: IProfile;
  allUsers!: IProfile[];
  formDataProfile: Partial<IProfile> = {
    area: '',
    bio: '',
    title: '',
    email: '',
  };

  formData: IExperience = {
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    area: '',
  };
  arrayEsperienze: FullExperiences[] = [];
  saveModify: string = 'Save';
  i!: number;
  post!: IPost;
  newPost: IPost = {
    text: '',
    username: '',
    createdAt: '',
    updatedAt: '',
    _v: 0,
  };
  //prova css
  backgroundImage: string = '';
  constructor(private srv: ServiceFetchService, private router:Router) {}

  ngOnInit(): void {
    //questa è la get del singiolo profilo
    this.srv.metodoPerGet().subscribe((res) => {
      // console.log(res);
      this.infoUser = res as IProfile;
      this.formDataProfile = this.infoUser;
      this.getEsperienze();
      console.log(this.infoUser);
    });
    //questa è la get di tutti i profili
    this.srv.metodoPerGetAll().subscribe((resAll) => {
      // console.log(res);
      this.allUsers = resAll as IProfile[];
      console.log(this.allUsers);
    });

    this.srv.getPosts().subscribe((res) => {
      this.post = res[res.length - 1];
      console.log(this.post);
    });
  }

  getProfile() {
    this.srv.metodoPerGet().subscribe((res) => {
      this.infoUser = res as IProfile;
      this.formDataProfile = this.infoUser;
    });
  }
  //metodo gìper get tutte espeirnze

  modifyProfile(modifica: Partial<IProfile>) {
    this.srv.metodoPerPut(modifica).subscribe((res) => {
      console.log(res);
    });
  }
  getEsperienze() {
    this.arrayEsperienze = [];
    this.srv.getEsperienze(this.infoUser._id).subscribe((resAll) => {
      this.arrayEsperienze = resAll;
      console.log(resAll);
    });
  }
  //metodo per post esperienza
  save(expId?: string, i?: number) {
    if (this.saveModify === 'Save') {
      //parte la post
      this.srv
        .postEsperienza(this.infoUser._id, this.formData)
        .subscribe((res) => this.arrayEsperienze.push(res as FullExperiences));
    } else this.modify(this.arrayEsperienze[this.i]._id, this.i);
  }
  //metodo per put esperienza  manca di fare un interfaccia con le esperienze e un array

  resetExperienceList() {
    if (this.saveModify === 'Save Changes') this.getEsperienze();
  }

  resetTextButton() {
    this.saveModify = 'Save';
    this.formData = {
      role: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      area: '',
    };
  }

  textModify(index: number) {
    this.saveModify = 'Save Changes';
    this.i = index;
    this.formData = this.arrayEsperienze[this.i];
  }

  modify(expId: string, i: number) {
    this.srv
      .putEsperienza(this.infoUser._id, expId, this.formData)
      .subscribe((res) => {
        this.arrayEsperienze[i] = res as FullExperiences;
        this.saveModify = 'Save';
        this.getEsperienze();
      });
  }

  delete() {
    this.srv
      .deleteEsperienza(this.infoUser._id, this.arrayEsperienze[this.i]._id)
      .subscribe(() => this.getEsperienze());
  }

  savePost() {
    this.srv
      .postPost(this.newPost)
      .subscribe((res) => {
        this.post = res as IPost
        this.router.navigate(['/home'])});
  }
}
