import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminUrl = environment.apiUrl+"admin";
  private http = inject(HttpClient);

  getUserWithRoles() {
    return this.http.get<User[]>(this.adminUrl + '/users-with-roles');
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post<string[]>(this.adminUrl + '/edit-roles/' 
      + username + '?roles=' + roles, {});
  }
}