import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SidebarModule } from 'ng-sidebar';
import { registerLocaleData } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UserflagService } from './shared/UserFlag/userflag.service';
import { AppversionService } from './shared/appVersion/appversion.service';
import { AuthModule } from './auth/auth.module';
import { LayoutModules } from './layout/layout.modules';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { SearchItemComponent } from './ItemMaster/ItemMaster/search-item/search-item.component';
import { CreateItemComponent } from './ItemMaster/ItemMaster/create-item/create-item.component';
 
@NgModule({
  declarations: [
    AppComponent,
    SearchItemComponent,
    CreateItemComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    ModalModule.forRoot(),
    SidebarModule.forRoot(),
    NgxSpinnerModule,
    LayoutModules,
    SharedModule,
    DemoNgZorroAntdModule,
   
  ],
  providers: [UserflagService,AppversionService,TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
