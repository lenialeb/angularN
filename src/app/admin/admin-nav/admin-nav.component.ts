import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  imports: [],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css'
})
export class AdminNavComponent {
  router=inject(Router)
  navigate(){
    
      this.router.navigate(['/layout/home']); // This will navigate to the home route defined in layout
   
  }

}
