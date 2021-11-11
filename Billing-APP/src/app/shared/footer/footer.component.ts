import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserflagService } from '../UserFlag/userflag.service';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  angularVersion!: string;
  apiVersion!: string | null;
  isLoggedIn: boolean = true;
  env = environment.env;
  isProduction = environment.production;

  constructor(   @Inject(DOCUMENT) private _document: Document,
  private userflag: UserflagService,
  private router: Router,
  public translate: TranslateService,
  private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.translate.use('en');
    // read version from environment file
    this.angularVersion = environment.version;

    if (localStorage.getItem('API_Version') !== null) {
      this.apiVersion = localStorage.getItem('API_Version');
    }

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // your code will goes here
        if (event.url === '/') {
          this.isLoggedIn = true;
        } else {
          this.userflag.currentValue.subscribe((val) => {
            this.isLoggedIn = val;
          });
        }
      }
    });
  }



// Shows and hides the loading spinner during RouterEvent changes
navigationInterceptor(event: RouterEvent): void {
  if (event instanceof NavigationStart) {
    this.spinner.show();
  }
  if (event instanceof NavigationEnd) {
    this.spinner.hide();
  }

  // Set loading state to false in both of the below events to hide the spinner in case a request fails
  if (event instanceof NavigationCancel) {
    this.spinner.hide();
  }
  if (event instanceof NavigationError) {
    this.spinner.hide();
  }

}
  
  
}

