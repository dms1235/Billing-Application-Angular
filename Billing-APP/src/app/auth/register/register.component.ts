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
import {IUserDetails,IUserLogIn,iUserLogIn,iUserDetails, iUserRegister, IUserRegisters} from './../../shared/models/userdetails';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm!: FormGroup;
  submitted = false;
  language = '';
  localLang = localStorage.getItem('locale');
  siteKey: any = environment.siteKey;
  reCaptcha: boolean = false;
  captchaText: any = '';
  isCaptchaEnable: any = data.isCaptchaEnable == 'true' ? true : false;
  constructor( private formBuilder: FormBuilder,
    private router: Router,
    public translate: TranslateService,
    public authService: AuthService,
    public tokenService: TokenService,
    private spinner: NgxSpinnerService,
    private renderar: Renderer2,
    private userflag: UserflagService,
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    this.renderar.removeClass(document.body, 'login-body');
    this.RegisterForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email:['',Validators.required],
      Mnumber:['',Validators.required],
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

    if (!this.isCaptchaEnable) {
      this.captchaText = '';
    } else {
      this.captchaText = this.makeid();
    }

  }

  captchaValidationRule() {
    const captchaValidation = this.RegisterForm.get('recaptcha');

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
      this.RegisterForm.value.recaptcha = captchaResponse;
    }
  }

  get f() {
    return this.RegisterForm.controls;
  }
  onRegister() {
    this.submitted = true;
    this.captchaValidationRule();
    // stop here if form is invalid

    if (this.RegisterForm.invalid) {
      return;
    } else {
      this.spinner.show();
      let userregister: IUserRegisters = new iUserRegister();
      userregister.username = this.RegisterForm.controls['username'].value;
      userregister.password = this.RegisterForm.controls['password'].value;
      userregister.email = this.RegisterForm.controls['email'].value;
      userregister.Name = this.RegisterForm.controls['username'].value;
      userregister.MobileNumber = this.RegisterForm.controls['Mnumber'].value;
      userregister.IsActive = true;
      this.authService.registeruser(userregister).subscribe(
        (result: any) => {
          this.spinner.hide();
          if (result.Result.Entity != null) {
            this.router.navigate(['/']);
          }
          else{
            Swal.fire({
              text:
                this.translate.instant(result.Result.MessageEnglish),
              icon: 'error',
              confirmButtonText:
                 this.translate.instant('back'),
            });
          }
        },
        (error) => {
          this.spinner.hide();
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
  makeid() {
    var text = '';
    var possible =
      '0123456789';
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
