import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Users } from '../_models/User';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'


@Injectable()
export class UserService {
    baseUrl = environment.apiUrl

constructor(private http: Http) {}

getUsers(): Observable<Users[]>{
    return this.http.get(this.baseUrl + 'users', this.jwt())
    .map(response => <Users[]>response.json())
    .catch(this.handleError);
    
}
private jwt() {
    let token = localStorage.getItem('token');
    if(token){
        let headers = new Headers({'Authorization': 'Bearer ' + token});
        headers.append('Content-type', 'application/json');
        return new RequestOptions({headers: headers});
    }
}
getUser(id): Observable<Users>{
    return this.http
    .get(this.baseUrl + 'users/' + id)
    .map(response => <Users>response.json())
    .catch(this.handleError);
}

private handleError(error: any) {

    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
        return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
        for (const key in serverError) {
            if (serverError[key]) {
                modelStateErrors += serverError[key] + '\n';
            }
        }
        return Observable.throw(
            modelStateErrors || 'Server error'
        );
    }
}

}