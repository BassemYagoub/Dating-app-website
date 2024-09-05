import { Component, OnInit, inject } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-member-list',
    standalone: true,
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.css',
    imports: [MemberCardComponent, PaginationModule, FormsModule, ButtonsModule]
})
export class MemberListComponent implements OnInit {
  memberService = inject(MembersService);
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];

  ngOnInit(): void {    
    if (!this.memberService.paginatedResult()){
      this.loadMembers();
    }
  }

  loadMembers() {
    this.memberService.getMembers();
  }

  resetFilters() {
    this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged($event: PageChangedEvent) {
   if(this.memberService.userParams().pageNumber != $event.page)  {
    this.memberService.userParams().pageNumber = $event.page;
    this.loadMembers();
   }
  }
}