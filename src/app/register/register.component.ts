import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AppService } from '../app.service';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
    private appService: AppService) { }
  loading: Boolean;
  error;
  registerForm: FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32)
        ]
      }),
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)
        ]
      }),
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

  register() {
    this.loading = true;
    this.error = '';
    const data = {
      user_name: this.registerForm.value.username,
      name: this.registerForm.value.name,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
    };
    this.appService.register(data)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe(res => {
        this.router.navigate(['/login']);
      }, error => {
        console.log(error.error);
        this.error = error.error.error;
      });
  }


}
