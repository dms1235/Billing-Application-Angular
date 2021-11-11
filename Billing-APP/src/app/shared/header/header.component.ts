import { Component,OnInit, Inject,AfterViewInit,Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import {NavigationEnd,Router,ActivatedRoute,RoutesRecognized,NavigationStart,ActivatedRouteSnapshot} from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { variable } from '@angular/compiler/src/output/output_ast';
import { UserflagService } from '../UserFlag/userflag.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    
  isHeaderVisible: boolean = true;
  title: string = '';
  balance: number = 0;
  userRole: any = null;
  isFinanceRole: boolean = false;
  constructor(public translate: TranslateService,
    @Inject(DOCUMENT) private _document: Document,
    public router: Router,
    public route: ActivatedRoute,
    titleService: Title,
    private userflag: UserflagService,
    private renderar: Renderer2 ) {
      router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          var gettitle = this.getTitle(
            router.routerState,
            router.routerState.root
          ).join('-');
          if (gettitle) {
            this.isHeaderVisible = gettitle === 'printpolicy' ? false : true;
            this.title = translate.instant(gettitle);
            let secondChar = this.title.charAt(1);
  
            if (secondChar === secondChar.toUpperCase()) {
              this.title = translate.instant(gettitle);
            } else {
              let myTitle = String(gettitle);
              translate.get(myTitle).subscribe((res: any) => {
                this.title = res;
              });
            }
          } else {
            this.title = '';
          }
        }
      });

     }

  ngOnInit(): void {
  }
  getTitle(state: any, parent: any): any {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.pageName) {
      data.push(parent.snapshot.data.pageName);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
  onLogout() {
    localStorage.removeItem('loggedIn');
    this.userflag.changeValue(true);
    this.router.navigate(['/']);
    this.renderar.removeClass(document.body, 'login-body');
  }
}
