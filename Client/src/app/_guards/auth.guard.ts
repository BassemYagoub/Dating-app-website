import { inject } from '@angular/core';
import { AccountService } from './../_services/account.service';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService: AccountService = inject(AccountService);
  const toastr: ToastrService = inject(ToastrService);

  if(accountService.currentUser()){
    return true;
  }
  else {
    toastr.error("NOPE");
    return false;
  }
};
