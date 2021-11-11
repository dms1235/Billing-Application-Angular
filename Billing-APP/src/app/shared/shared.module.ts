import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '../../../node_modules/@angular/common';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
// import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
// import { SearchfilterPipe } from './pipes/searchfilter.pipe';
// import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
// import { TabDirective } from './directives/tab.directive';
// import { ReadMoreComponent } from './read-more/read-more.component';
 
@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    // PagenotfoundComponent,
    // SearchfilterPipe,
    // UnauthorizedComponent,
   HeaderComponent,
    // TabDirective,
    // ReadMoreComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    DemoNgZorroAntdModule,
    
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
      extend: true
    }),
  ],
  providers: [DatePipe],
  exports: [
    FooterComponent,
    SidebarComponent,
    //PagenotfoundComponent,
    HeaderComponent,
    //UnauthorizedComponent,
    TranslateModule,
    
    //TabDirective,
    //ReadMoreComponent
  ],
})
export class SharedModule {
  

}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json")
}

