import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mind-fire-test-frontend';
  constructor(
    private appService: AppService,
    private router: Router) {
    this.appService.isLogined().subscribe(res => {
      if (!res) {
        router.navigate(['/login']);
      } else {
        router.navigate(['/user']);
      }
    }, err => {
      router.navigate(['/login']);
    });
  }
}
