import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, inject, input, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService: AccountService = inject(AccountService);
  private toastr = inject(ToastrService);

  cancelRegister = output<boolean>(); 
  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: err => { this.toastr.error(err); }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
