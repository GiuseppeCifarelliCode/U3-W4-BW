import { Component } from '@angular/core';
import { ServiceFetchService } from 'src/app/serviceFetch.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-info-with-picture',
  templateUrl: './info-with-picture.component.html',
  styleUrls: ['./info-with-picture.component.scss'],
})
export class InfoWithPictureComponent {
  constructor(private srv: ServiceFetchService) {}

  ngOnInit(): void {
    this.srv.metodoPerGet().subscribe((res) => {
      console.log(res);
    });
  }
}
