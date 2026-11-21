import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PagesComponent } from './pages.component';
import { authGuard } from './auth.guard';
export const routes:Routes=[
 {path:'',component:HomeComponent},
 {path:'dashboard',component:HomeComponent},
 {path:'login',component:PagesComponent,data:{page:'login'}},
 {path:'profile',component:PagesComponent,data:{page:'profile'},canActivate:[authGuard]},
 {path:'register',component:PagesComponent,data:{page:'register'}},
 {path:'cart',component:PagesComponent,data:{page:'cart',roles:['CUSTOMER']},canActivate:[authGuard],},
 {path:'checkout',component:PagesComponent,data:{page:'checkout',roles:['CUSTOMER']},canActivate:[authGuard],},
 {path:'orders',component:PagesComponent,data:{page:'orders',roles:['CUSTOMER']},canActivate:[authGuard],},
 {path:'supplier/items',component:PagesComponent,data:{page:'supplier-items',roles:['ADMIN','SUB_ADMIN']},canActivate:[authGuard]},
 {path:'supplier/orders',component:PagesComponent,data:{page:'supplier-orders',roles:['ADMIN','SUB_ADMIN']},canActivate:[authGuard]},
 {path:'supplier/users',component:PagesComponent,data:{page:'supplier-users',roles:['ADMIN']},canActivate:[authGuard]},
 {path:'supplier/company',component:PagesComponent,data:{page:'supplier-company',roles:['ADMIN']},canActivate:[authGuard]},
 {path:'ai',component:PagesComponent,data:{page:'ai'}},
 {path:'**',redirectTo:''}
];
