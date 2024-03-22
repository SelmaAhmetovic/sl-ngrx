import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import moment from 'moment';
import { tap } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { jwtDecode } from "jwt-decode";
import { CookieService } from "ngx-cookie-service";
import { LoginDataResponse } from "../../models/response-base";
@Injectable()
export class AuthService {

    url = environment.apiUrl + `/auth`;

    constructor(private http: HttpClient,
        public cookieService: CookieService) {

    }

    login(email:string, password:string ) {
        return this.http.post<LoginDataResponse>(this.url + '/login', {email, password}).pipe(
          tap(((res: LoginDataResponse) => this.setSession(res.data)))
            );     
    }
          
    private setSession(authResult: any) {
        const decodedJwt = this.getDecodedAccessToken(authResult.access_token)
      /*
        data: 
            email: "marklyan@gmail.com"
            name: "Mark Lyan"
            role: "ROLE_CUSTOMER"
            _id: "612e49eb345dcc333ac6cb47"
        exp
        iat
        
        */
        const expiresAt = moment().add(decodedJwt?.exp,'second');
        const role = decodedJwt.data.role
        this.cookieService.set('id_token', authResult.access_token);
        this.cookieService.set("expires_at", JSON.stringify(expiresAt.valueOf()));
    }     
    
    private getDecodedAccessToken(token: string): any {
        try {
          return jwtDecode(token);
        } catch(Error) {
          return null;
        }
      }

    logout() {
        this.cookieService.delete('id_token');
        this.cookieService.delete('expires_at');
    }

    public isLoggedIn() {
        const expiration = this.getExpiration()
        if(!expiration) return false;
        return moment().isBefore(expiration);
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
       const expiration = this.cookieService.get('expires_at');
       if(!expiration || expiration === '') return null;
        return moment(JSON.parse(expiration ? expiration: '{}'));
    }    
}