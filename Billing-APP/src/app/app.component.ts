import { Component, OnInit, TemplateRef, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { AppversionService } from './shared/appVersion/appversion.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Billing Application';
  opened: boolean = false;
  isLoggedIn: any;

  constructor(
    public translate: TranslateService,
    @Inject(DOCUMENT) private _document: Document,
    private appversionservice: AppversionService
  ) {}
  ngOnInit(): void {
    // Getting API version
    this.appversionservice.getVersion().subscribe((response: any) => {
      localStorage.setItem('API_Version', response && response.Entity);
    });
  }
  toggleSidebar() {
    this.opened = !this.opened;
  }
}
