import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  imports: [NgClass,NgIf],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css'
})
export class AdminNavComponent {
  router=inject(Router)
  navigate(){
    
      this.router.navigate(['/layout/home']); // This will navigate to the home route defined in layout
   
  }
  isDarkMode = false;
  isSidebarVisible = false;
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;

    if (this.isDarkMode) {
      body.style.backgroundColor = '#1a202c'; // Dark background
      body.style.color = '#cbd5e0'; // Light text
    } else {
      body.style.backgroundColor = ''; // Reset to default
      body.style.color = ''; // Reset to default
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    console.log(this.isSidebarVisible);
  }
}
  
