import { AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck, AfterViewInit, OnChanges {
  title = 'erp';
  isLogin = false;

  constructor(private authService: AuthService, private router:Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngDoCheck(): void {
    if (this.authService.checkTokenExpired()) {
      this.isLogin = false;
      // if (this.router.url != "/auth") this.router.navigate(['/auth']);
    }
    else this.isLogin = true;
  }
  ngOnInit(): void {
    if (this.authService.checkTokenExpired()) this.isLogin = false;
    else this.isLogin = true;

    if (this.isLogin) {
      //this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/auth']);
    }
  }
  ngAfterViewInit() {

  }

  logout() {
    localStorage.removeItem('token');
    this.isLogin = false;
    this.router.navigate(['/auth']);
  }
}
