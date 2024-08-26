import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  accountService: AccountService = inject(AccountService);
  model: any = {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response: any) => {
        console.log(response);
        //this.router.navigateByUrl('/members');
      },
      error: (err: any) => {console.log(err); }
    })
  }

  logout() {
    this.accountService.logout();
    //this.router.navigateByUrl('/');
  }
}