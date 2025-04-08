import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../../../services/comments/comments.service';

@Component({
  selector: 'app-comment-form',
  imports: [FormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {
  productId: string | null = null;
  // userName: string = '';
  // content: string = '';
  constructor(private route: ActivatedRoute,private commentService:CommentsService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id']; 
      console.log("Product ID from route:", this.productId); // Log the product ID to the console
  });
}
comment={
userName:'',
content:''
}
submitComment() {
if(this.productId){
  this.commentService.postComments(this.productId,this.comment).subscribe((res:any)=>{
    alert(res.message);
    console.log("Comment posted successfully", res);
   
},
(error:any)=>{
  console.error("Comment posting failed", error);
});
}
}}
