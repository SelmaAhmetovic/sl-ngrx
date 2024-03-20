import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import moment from 'moment';
import { tap } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { jwtDecode } from "jwt-decode";


@Injectable()
export class AuthService {

    url = environment.apiUrl + `/auth`;

    constructor(private http: HttpClient) {

    }

    login(email:string, password:string ) {
        return this.http.post<any>(this.url + '/login', {email, password}).pipe(
          tap(((res: any) => this.setSession(res.data)))
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

        localStorage.setItem('id_token', authResult.access_token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }     
    
    private getDecodedAccessToken(token: string): any {
        try {
          return jwtDecode(token);
        } catch(Error) {
          return null;
        }
      }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration ? expiration: '');
        return moment(expiresAt);
    }    
}