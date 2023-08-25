import { Comments } from './../../models/comments';
import { IPostForHome } from './../../models/postForHome';
import { Component, OnInit } from '@angular/core';
import { ServiceFetchService } from 'src/app/serviceFetch.service';
import { CommentComplete } from 'src/app/models/CommentComplete';
import { IProfile } from 'src/app/models/profile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  infoUser!: IProfile;
  posts!: IPostForHome[];
  comments!: CommentComplete[];
  addedComment!: Comments;
  newComment: Comments = {
    comment: '',
    rate: '3',
    elementId: '',
  };

  constructor(private srv: ServiceFetchService) {}
  ngOnInit(): void {
    this.srv.metodoPerGet().subscribe((res) => {
      // console.log(res);
      this.infoUser = res as IProfile;
    })
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
  deleteComment(id: string) {
    this.srv.deleteComment(id).subscribe(() => {
      this.getCommenti(id);
    });
  }
}
