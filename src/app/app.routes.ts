import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutComponent } from './pages/about/about.component';
import { NgModule } from '@angular/core';

import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { FormsComponent } from './pages/forms/forms.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { RegisterComponent } from './pages/register/register.component';

 export const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {path: 'register', component: RegisterComponent},

  {
    path:'layout',component:LayoutComponent,
    children:[   {path: '', component: HomeComponent},
      {path: 'category', component: SingleCategoryComponent},
      {path: 'forms', component: FormsComponent},
      {path: 'post', component:SinglePostComponent },
      {path: 'contact', component: ContactUsComponent},
      {path: 'term-conditions', component: TermsAndConditionsComponent},
      {path: 'about', component: AboutComponent},
      
      {
        path:'singlePost',component:SinglePostComponent
      },
      {
        path:'commentF',component:CommentFormComponent
      },
      {
        path:'commentL',component:CommentListComponent
      }]
  },
 
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }