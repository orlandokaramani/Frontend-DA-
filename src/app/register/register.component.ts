import { AlertifyService } from './../_services/alertify.service';
import { AuthService} from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Users } from '../_models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  html: string = `<img src="../../assets/images/idCard.jpg" alt="">`;
  user: Users;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private authService: AuthService, private alertify: AlertifyService, private builder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
    this.bsConfig = {
      containerClass: 'theme-red'
    };
  }

  passwordMatch(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  createRegisterForm() {
    this.registerForm = this.builder.group({
      username: ['', Validators.required],
      gjinia: ['male'],
      datelindja: [null, Validators.required],
      password:[{ value: this.getPassword(), disabled: false }, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      
    })
  }
  
  getPassword(): any {
    return Math.random().toString(36).substr(2, 10);
 
   } 
  
  register(){
    if(this.registerForm.valid){
     this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() =>{
      this.alertify.success("Registration successful");
    }, error => {
      this.alertify.error(error);
    },()=> {
      this.authService.login(this.user).subscribe(()=> {
        this.router.navigate(["/members"])
      })
    }); 
    }

    

  }

  cancel(){
    this.cancelRegister.emit(false);
    
  }
}
