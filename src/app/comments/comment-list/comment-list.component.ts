import { Component } from '@angular/core';
import { CommentsService } from '../../../services/comments/comments.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comment-list',
  imports: [NgIf, NgFor, CommentFormComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent {
  constructor(
    private commentService: CommentsService,
    private route: ActivatedRoute
  ) {}
  productId: string | null = null;
  commentList: any[] = [];
  showAll: boolean = false;
  displayedComments: any[] = [];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.getComments(this.productId);
    });
  }

  getComments(productId: string | null) {
    if (productId) {
      this.commentService.getComments(productId).subscribe(
        (response) => {
          console.log('Response:', response.comments); // Log the response
          this.commentList = response.comments.map((comment: { created_at: any }) => ({
            ...comment,
            formattedDate: this.parseDate(comment.created_at),
            // Parse the date
          }));
          this.displayedComments = this.commentList.slice(0, 3); // Display only the first 3 comments
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );
    }
  }

  parseDate(dateObj: any): string {
    if (dateObj && dateObj.year && dateObj.monthValue && dateObj.dayOfMonth) {
      // Create a date string in the format YYYY-MM-DD
      const formattedDate = `${String(dateObj.dayOfMonth).padStart(
        2,
        '0'
      )}-${String(dateObj.monthValue).padStart(2, '0')}-${dateObj.year}`;

      return formattedDate; // Return the formatted date
    } else {
      console.error('Invalid date object:', dateObj);
      return 'Invalid date';
    }
  }
  toggleShowMore() {
    this.showAll = !this.showAll;
    this.displayedComments = this.showAll
      ? this.commentList
      : this.commentList.slice(0, 3);
  }
}
