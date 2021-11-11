import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        
        // {
        //   path: 'unauthorized',
        //   component: UnauthorizedComponent,
        // },
        { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
        // { path: '**', component: PagenotfoundComponent },
      ],
    },
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class LayoutRoutingModule {}