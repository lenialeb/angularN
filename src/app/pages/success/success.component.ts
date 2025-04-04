import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-success',
  imports: [RouterLink],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
router=inject(Router)
clicked(){
  this.router.navigateByUrl('layout/home')
}
}
