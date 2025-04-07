// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminServiceService {

//   constructor() { }
//   private selectedComponentSource = new BehaviorSubject<string>('products'); // Default to 'products'
//   selectedComponent$ = this.selectedComponentSource.asObservable();

//   selectComponent(component: string) {
//     this.selectedComponentSource.next(component);
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private componentSource = new BehaviorSubject<string>('dashboard'); // Default component
  selectedComponent$ = this.componentSource.asObservable();

  setComponent(component: string) {
    this.componentSource.next(component);
  }

  // Optionally, if you want to access the current component directly
  get component(): string {
    return this.componentSource.getValue();
  }
}