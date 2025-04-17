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
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ProductUpdateFormComponent } from './admin/product-update-form/product-update-form.component';
import { ProductAddComponent } from './admin/product-add/product-add.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { DashGraphComponent } from './admin/dash-graph/dash-graph.component';
import { InvoiceComponent } from './admin/invoice/invoice.component';
import { TransactionListComponent } from './admin/transaction-list/transaction-list.component';
import { UserUpdateFormComponent } from './admin/user-update-form/user-update-form.component';
import { UserAddComponent } from './admin/user-add/user-add.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderComponent } from './admin/order/order.component';
import { SuccessComponent } from './pages/success/success.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { RelatedPostComponent } from './layout/related-post/related-post.component';
import { AuthComponent } from './pages/auth/auth.component';
// import { ImageUploadComponent } from './pages/image-upload/image-upload.component';

 export const routes: Routes = [
  {
path:'',redirectTo:'/login',pathMatch:'full'
  },
  {path:'',component:AuthComponent,children:[{path:'login',component:LoginComponent},
    {path: 'register', component: RegisterComponent},]},
  
 
  // {path: 'image', component: ImageUploadComponent},
  {
    path:'layout',component:LayoutComponent,
    children:
    [   
      {path: 'home', component: HomeComponent},
      {path: 'productDetails/:id', component: ProductDetailsComponent},
      {path: 'category', component: SingleCategoryComponent},
      {path: 'forms', component: FormsComponent},
      {path: 'post', component:SinglePostComponent },
      {path: 'contact', component: ContactUsComponent},
      {path: 'term-conditions', component: TermsAndConditionsComponent},
      {path: 'about', component: AboutComponent},
      {path:'cart',component:CartComponent},
      {path:'checkout',component:CheckoutComponent},
      {path:'order',component:OrderComponent },
      {path:'singlePost',component:SinglePostComponent},
      {path:'relatedPost',component:RelatedPostComponent},
      {path:'commentF',component:CommentFormComponent},
      {path:'commentL',component:CommentListComponent},
      {path: 'adminav', component: AdminNavComponent},
      {path: 'admin', component: AdminDashboardComponent},
      {path: 'updatePro/:id', component: ProductUpdateFormComponent},
      {path: 'updateUser/:id', component: UserUpdateFormComponent},
      {path: 'addUser', component: UserAddComponent},
      {path: 'addPro', component: ProductAddComponent},
      {path: 'proList', component: ProductListComponent},
      {path: 'userList', component: UserListComponent},
      {path: 'dashB', component: DashGraphComponent},
      {path: 'invoice', component: InvoiceComponent},
      {path: 'transaction', component: TransactionListComponent},
      {path: 'success', component: SuccessComponent},
    ]
  },
 
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }