import { IPostForHome } from './../../models/postForHome';
import { Component, OnInit } from '@angular/core';
import { ServiceFetchService } from 'src/app/serviceFetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts!: IPostForHome[];
  constructor(private srv: ServiceFetchService) {}
  ngOnInit(): void {
    this.srv.getPosts().subscribe((res) => {
      this.posts = res.reverse();
      this.posts = this.posts.slice(0, 55);
      console.log(this.posts);
    });
  }
}
