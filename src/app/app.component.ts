import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { CategoryNavbarComponent } from './layout/category-navbar/category-navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CardComponent } from './layout/card/card.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { HomeComponent } from './pages/home/home.component';
@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'home-apps';

  // constructor(private router: Router) {}

  // ngOnInit() {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       console.log('Navigated to:', event.url);
  //     }
  //   });
  // }
}