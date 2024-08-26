import { Routes } from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {path: 'members', component: MemberListComponent},
            {path: 'members/:username', component: MemberDetailComponent, },
                //resolve: {member: memberDetailedResolver}},
            // {path: 'member/edit', component: MemberEditComponent, 
            //     canDeactivate: [preventUnsavedChangesGuard]},
            {path: 'lists', component: ListsComponent},
            {path: 'messages', component: MessagesComponent},
            //{path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard]}
        ]
    },
    // {path: 'errors', component: TestErrorsComponent},
    // {path: 'not-found', component: NotFoundComponent},
    // {path: 'server-error', component: ServerErrorComponent},
    {path: '**', component: HomeComponent, pathMatch: 'full'},
];
