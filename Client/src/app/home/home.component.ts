import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.accountService.redirectToMembersIfConnected();
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

  registerToggle() {
      this.registerMode = !this.registerMode;
  }
}
