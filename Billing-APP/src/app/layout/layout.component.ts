 import { DOCUMENT } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
  Inject,
} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isSidebarMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  constructor(@Inject(DOCUMENT) document: any, r: Renderer2) {
    if (localStorage.getItem('loggedIn')) {
      r.addClass(document.body, 'login-body');
    } else {
      r.addClass(document.body, '');
    }
  }


  ngOnInit(): void {
  }

  toggleMenu($event: any) {
    let isOpenLength = document.getElementsByClassName('isOpen').length;
    if (isOpenLength === 1) {
      $event.stopPropagation();
      this.isSidebarMenuOpen = !this.isSidebarMenuOpen;
    } else {
      this.isSidebarMenuOpen = false;
    }
  }

}
