import { Comments } from './../../models/comments';
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
  comments!: Comments[];
  addedComment!: Comments;
  newComment: Comments = {
    comment: '',
    rate: '3',
    elementId: '',
  };

  constructor(private srv: ServiceFetchService) {}
  ngOnInit(): void {
    //prendo posts
    this.srv.getPosts().subscribe((res) => {
      this.posts = res.reverse();
      this.posts = this.posts.slice(0, 55);
      console.log(this.posts);
    });
  }

  //prendo commenti
  getCommenti(id: string) {
    this.srv.getComment(id).subscribe((res) => {
      this.comments = res.reverse();
      this.comments = this.comments.slice(0, 55);
      console.log(this.comments);
    });
  }
  //creo commento
  addComment(id: string, data: Comments) {
    this.newComment.elementId = id;
    this.srv.postComment(id, data).subscribe((res) => {
      this.addedComment = res as Comments;
      this.getCommenti(id);
    });
  }
}
