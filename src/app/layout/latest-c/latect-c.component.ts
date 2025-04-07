import { Component, Input } from '@angular/core';
interface Product{
  
  name: string;
  price: number;
 description: string;
  image: string;
  category: string;
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
