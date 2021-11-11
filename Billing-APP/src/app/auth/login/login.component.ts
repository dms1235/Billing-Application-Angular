import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from './../../core/services/auth.service';
import { TokenService } from './../../core/services/token.service';
import { TranslateService } from '@ngx-translate/core';
import data from '../../../../src/assets/configuration/configuration.json';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserflagService } from 'src/app/shared/UserFlag/userflag.service';
import { environment } from '../../../environments/environment';
import {IUserDetails,IUserLogIn,iUserLogIn,iUserDetails} from './../../shared/models/userdetails';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  language = '';
  localLang = localStorage.getItem('locale');
  siteKey: any = environment.siteKey;
  reCaptcha: boolean = false;
  captchaText: any = '';
  isCaptchaEnable: any = data.isCaptchaEnable == 'true' ? true : false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public translate: TranslateService,
    public authService: AuthService,
    public tokenService: TokenService,
    private spinner: NgxSpinnerService,
    private renderar: Renderer2,
    private userflag: UserflagService,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit() {
    this.renderar.removeClass(document.body, 'login-body');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: [''],
    });

    if (this.localLang != null) {
      this.translate.use(this.localLang);
      localStorage.setItem('locale', this.localLang);
      this.language = this.localLang === 'en' ? 'AR' : 'EN';
    } else {
      this.translate.use('en');
      localStorage.setItem('locale', 'en');
      this.language = 'AR';
    }

    let checkLogin = this.tokenService.isTokenExpire();
    if (!checkLogin) {
      this.router.navigate(['/dashboard']);
    }

    if (!this.isCaptchaEnable) {
      this.captchaText = '';
    } else {
      this.captchaText = this.makeid();
    }
    //this.captchaValidationRule();
  }

  captchaValidationRule() {
    const captchaValidation = this.loginForm.get('recaptcha');

    if (!this.isCaptchaEnable) {
      // this.captchaText = '';
      captchaValidation?.clearValidators();
    } else {
      //this.captchaText = this.makeid();
      captchaValidation?.setValidators(Validators.required);
      captchaValidation?.setValidators(this.validateCaptcha());
    }
    captchaValidation?.updateValueAndValidity();
  }

  // Captcha method starts here
  resolved(captchaResponse: any) {
    if (captchaResponse !== null) {
      this.reCaptcha = true;
      this.loginForm.value.recaptcha = captchaResponse;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.captchaValidationRule();
    // stop here if form is invalid

    if (this.loginForm.invalid) {
      return;
    } else {
      this.spinner.show();
      let userLogin: IUserLogIn = new iUserLogIn();
      userLogin.username = this.loginForm.controls['username'].value;
      userLogin.password = this.loginForm.controls['password'].value;
      this.authService.authenticateUserService(userLogin).subscribe(
        (result: any) => {
          this.spinner.hide();
          if (result.Token != null) {
            localStorage.setItem('loggedIn', 'true');
            this.userflag.changeValue(false);
            this.tokenService.saveToken(result.Token);
            this.tokenService.saveUser(result.Data);
            this.router.navigate(['/dashboard']);
          } else {
            Swal.fire({
              text:
                  this.translate.instant('wrongCredentials'),
              icon: 'error',
              confirmButtonText:
                this.translate.instant('back'),
            });
            localStorage.removeItem('loggedIn');
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.spinner.hide();
          // console.log('err: ', error);
          Swal.fire({
            text:
                this.translate.instant('wrongCredentials'),
            icon: 'error',
            confirmButtonText:
               this.translate.instant('back'),
          });
        }
      );
    }
  }

  changeLang(language: string) {
    if (this._document.defaultView)
      this._document.defaultView.location.reload();

    this.language = language == 'EN' ? 'AR' : 'EN';
    this.translate.use(language.toLowerCase());
    localStorage.setItem('locale', language.toLowerCase());
  }

  makeid() {
    var text = '';
    var possible =
      //'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      '0123456789';
    //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  validateCaptcha(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let forbidden = true;
      if (control.value) {
        if (control.value === this.captchaText) forbidden = false;
      }
      return forbidden ? { inValidExt: true } : null;
    };
  }
  refreshCaptcha() {
    this.captchaText = this.makeid();
  }
}
