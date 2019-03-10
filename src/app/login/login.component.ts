import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AppService } from '../app.service';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
    private appService: AppService) { }
  loading: Boolean;
  error;
  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32)
        ]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32)
        ]
      })
    });
  }
  login(): void {
    this.loading = true;
    this.error = '';
    const data = { user_name: this.loginForm.value.username, password: this.loginForm.value.password };
    this.appService.login(data)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe(res => {
        this.router.navigate(['/user']);
      }, error => {
        console.log(error.error);
        this.error = error.error.error;
      });
  }
}
