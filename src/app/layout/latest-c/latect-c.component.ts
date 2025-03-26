import { Component, Input } from '@angular/core';
interface Product{
  
  name: string;
  price: number;
 
}
@Component({
  selector: 'app-latect-c',
  imports: [],
  templateUrl: './latect-c.component.html',
  styleUrl: './latect-c.component.css'
})
export class LatectCComponent {
@Input () product:Product | undefined
}
