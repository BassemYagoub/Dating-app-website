import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HasRoleDirective } from '../_directives/has-role.directive';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, BsDropdownModule, HasRoleDirective],
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
      //error: err => { console.log(err); this.toastr.error(err.error); }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}