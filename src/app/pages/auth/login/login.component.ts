import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/models/auth/user-token';
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
        const userToken: UserToken = value.data;
        this._userTokenSessionService.setToken(JSON.stringify(userToken));
        console.log("TOKEN SUCCESS");
        console.log(JSON.stringify(value.data));
        if(userToken.userBD.id_perfil==1){
          this._router.navigate(['/admin/usuario']);
        }else{
          this._router.navigate(['/admin/responsable-recojo']);
        }
      }
    );
  }
}
