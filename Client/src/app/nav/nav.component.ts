import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  accountService: AccountService = inject(AccountService);
  private router: Router = inject(Router);
  private toastr: ToastrService = inject(ToastrService);
  model: any = {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response: any) => {
        this.router.navigateByUrl('/members');
      },
      error: (err: any) => { this.toastr.error(err); }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}