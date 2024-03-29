import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'menu', component: MenuComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'contactus', component: ContactComponent
  },
  {
    path: 'dishdetail/:id', component: DishdetailComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
      )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
