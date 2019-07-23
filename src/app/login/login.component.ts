import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AuthService, private router: Router) {
  }

  submit() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe((isLogedIn) => {
        if (isLogedIn) {
          this.router.navigate(['reports']);
        }
      });
    }
  }
}
