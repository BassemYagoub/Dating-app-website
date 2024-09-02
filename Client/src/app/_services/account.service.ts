import { inject, Injectable, model, Signal, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http: HttpClient = inject(HttpClient);
  baseUrl: string = environment.apiUrl;
  currentUser = signal<User | null>(null);

  login(model : any): Observable<void>{
    return this.http.post<User>(this.baseUrl+"account/login", model).pipe(
      map(user => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  register(model : any): Observable<User>{
    return this.http.post<User>(this.baseUrl+"account/register", model).pipe(
      map(user => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    );
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

}
