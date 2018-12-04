import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilProvider } from "../../providers/util/util";


@IonicPage()
@Component({
  selector: 'page-auth-forgot',
  templateUrl: 'auth-forgot.html',
})
export class AuthForgotPage {
  forgotForm: FormGroup;

  constructor(private authProvider: AuthProvider, private fb: FormBuilder, private utilProvider: UtilProvider) {
    this.forgotForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  forgotPassword() {
    const data = this.forgotForm.value;

    if (!data.email) return;

    this.authProvider.resetPassword(data.email)
      .then(() => this.utilProvider.presentToast(`Sent reset email to ${data.email}.`),
        error => this.utilProvider.presentToast(`Error sending email to ${data.email}.`));

  }

}
