import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  Renderer2,
  Inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './../../core/services/token.service';
import { TranslateService } from '@ngx-translate/core';
// Import environment file
import { environment } from '../../../environments/environment';
import { UserflagService } from '../UserFlag/userflag.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  isMenuOpen = false;
  isActive = false;
  text: any = '';
  getRolePage: any[] = [];
  username: string = '';
  userprofilePath: any = '';
  userrole: string = '';
  @Input() sidebarOpen!: boolean;
  localLang = localStorage.getItem('locale');
  language = this.localLang == 'en' ? 'AR' : 'EN';
  appVersion: any;
  angularVersion: any;
  borderID: string = '';
  borderName: string = '';
  @ViewChild('rla') rla!: ElementRef;
  
  
  constructor(
    private router: Router,
    @Inject(DOCUMENT) document: any,
    private renderar: Renderer2,
    private httpClient: HttpClient,
    private token: TokenService,
    public translate: TranslateService,
    private userflag: UserflagService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.angularVersion = environment.version;
    if (localStorage.getItem('API_Version') !== null) {
      this.appVersion = localStorage.getItem('API_Version');
    }
    var getUSerCode = this.token.getUser();
    if(getUSerCode){
      this.username = getUSerCode.UserName;
    }
    this.userprofilePath = '../../../assets/images/menuuser.svg';
  }
  ngOnChanges(changes: SimpleChanges) {
    const value = changes['sidebarOpen'];

    if (value.currentValue === true) {
      this.isMenuOpen = false;
    } else {
      this.isActive = false;
      this.isMenuOpen = false;
    }
  }
  closeNav() {
    this.isMenuOpen = false;
    this.isActive = false;
  }

  openNav() {
    this.isMenuOpen = true;
    this.isActive = true;
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleMenu($event: any) {
    $event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
    this.isActive = !this.isActive;
  }

  // Logout function
  onLogout() {
    localStorage.removeItem('loggedIn');
    this.userflag.changeValue(true);
    this.router.navigate(['/']);
    this.renderar.removeClass(document.body, 'login-body');
  }

  isVisibleMenu(menuName: string): boolean {
    return true;
  }

  downloadCofig($event: any) {
    $event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
    this.isActive = !this.isActive;
    this.spinner.show();
      
  }
  // Append date and time to download file
  getFormattedTime() {
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    var h = today.getHours();
    var mi = today.getMinutes();
    var s = today.getSeconds();
    return y + '-' + m + '-' + d + '_' + h + '-' + mi + '-' + s;
  }
}
