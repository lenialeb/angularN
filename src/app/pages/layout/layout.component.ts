import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { CategoryNavbarComponent } from '../../layout/category-navbar/category-navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent,CategoryNavbarComponent,FooterComponent,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
