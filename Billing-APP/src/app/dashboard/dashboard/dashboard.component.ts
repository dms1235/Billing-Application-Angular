import { Component, OnInit, TemplateRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import * as configData from '../../../assets/configuration/configuration.json';
 
import Swal from 'sweetalert2';
import { interval, timer, Observable, Subscriber } from 'rxjs';
 
import { TokenService } from './../../core/services/token.service';
 
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isEnable: any = '';
  localLang = localStorage.getItem('locale');
  language = this.localLang == 'en' ? 'AR' : 'EN';
  
  pendingBalance: any = 0;
  blockAmount: any = 0;
  lstPendingTransaction: any = [];
  isDashboardVisible: boolean = false;
  st = interval(Number(configData.refreshInterval));
  subscribe: any;
  dailyAutomated: any;
  dailyManual: any;
  isSuperVisor: any = false;
  salesSummaryReport: any = [];
  isDailyTransactionVisible: any = true;

  constructor(
    public translate: TranslateService,
    @Inject(DOCUMENT) private _document: Document,
   
    private tService: TokenService,
   
  ) {}

  ngOnInit(): void {
    let userData = parseInt(this.tService.getUser().UserTypeCode);
     
  }

   
}
