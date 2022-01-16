import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Parameter } from 'src/app/models/common/parameter';
import { AuthService } from 'src/app/shared/services/security/auth.service';
import { UserTokenSessionService } from 'src/app/shared/services/security/user-token-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formUser: FormGroup;

  constructor(private _fb: FormBuilder,
    private _auth: AuthService,
    private _userTokenSessionService: UserTokenSessionService,
    private _router: Router) {
    this.formUser = _fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  

  auth() {
    let parametro: Parameter = new Parameter();
    parametro.request = 'POST';
    parametro.data = this.formUser.value;
    parametro.url = '/login';
    parametro.useToken = false;
    this._auth.auth(parametro).subscribe(
      value => {
        console.log(value);
        this._userTokenSessionService.setToken(JSON.stringify(value.data.data));
        this._router.navigate(['/admin/upload']);
      }
    );
  }
}
