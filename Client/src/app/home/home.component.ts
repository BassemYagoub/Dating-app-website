import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  users: any;
  http = inject(HttpClient);
  apiUrl = "https://localhost:5001/api";

  ngOnInit(): void {
    this.getUsers();
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

  registerToggle() {
      this.registerMode = !this.registerMode;
  }

  getUsers(): void {
    this.http.get(`${this.apiUrl}/users`).subscribe({
      next: (response) => {this.users = response},
      error: (err) => {console.log(err);},
      complete: () => {console.log("complete");}
    });
  }
}
