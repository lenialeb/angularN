import { Component } from '@angular/core';
import { CardComponent } from "../../layout/card/card.component";
import { CommentFormComponent } from '../../comments/comment-form/comment-form.component';
import { CommentListComponent } from '../../comments/comment-list/comment-list.component';
import { SubscriptionFormComponent } from '../../subscription-form/subscription-form.component';

@Component({
  selector: 'app-single-post',
  imports: [CardComponent,CommentFormComponent,CommentListComponent,SubscriptionFormComponent],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent {

}
