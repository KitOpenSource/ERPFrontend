import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    console.log(this.form.value);
    this.authService.loginUser(this.form.value).subscribe(
      (token:any) => {
        console.log(token);
        const tokenString = token?.token;
        if (tokenString) {
          localStorage.setItem('token', tokenString);
          this.router.navigate(['/dashboard']);
        } else {
          this.error="no token";
        }     
      },
      (error) => {
        this.error = "Login not success";
      }
    )
    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
    // }
  }
  @Input()
  error!: string | null;

  @Output() submitEM = new EventEmitter();
}
