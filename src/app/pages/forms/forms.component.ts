import { Component } from '@angular/core';
import {FormsModule } from '@angular/forms'
@Component({
  selector: 'app-forms',
  imports: [FormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
userObj:any ={
  firstName:'',
  lastName:'',
  zipCode:'',
  state:'',
  userName:'',
  city:'',
  isTerm:false,
}
onSubmit(){
  const form=this.userObj;
  console.log(form)
}
}
