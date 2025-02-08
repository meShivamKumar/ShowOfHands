import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCandidatesComponent } from './admin/add-event/add-candidates/add-candidates.component';
import { AddEventComponent } from './admin/add-event/add-event.component';
import { CreateComponent } from './admin/add-event/create/create.component';
import { AddProposalComponent } from './admin/add-proposal/add-proposal.component';
import { CreateProposalComponent } from './admin/add-proposal/create-proposal/create-proposal.component';
import { AddTaskComponent } from './admin/add-task/add-task.component';
import { CreateTaskComponent } from './admin/add-task/create-task/create-task.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { MyProfileComponent } from './admin/my-profile/my-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetServiceComponent } from './get-service/get-service.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserComponent } from './user/user.component';
import { EventDetailsComponent } from './user/view-event/event-details/event-details.component';
import { ViewEventComponent } from './user/view-event/view-event.component';
import { ViewProposalComponent } from './user/view-proposal/view-proposal.component';
import { DetailsComponent } from './user/view-task/details/details.component';
import { ViewTaskComponent } from './user/view-task/view-task.component';
import { ViewEventAdminComponent } from './admin/add-event/view-event-admin/view-event-admin.component';
import { ViewTaskAdminComponent } from './admin/add-task/view-task-admin/view-task-admin.component';
import { ViewProposalAdminComponent } from './admin/add-proposal/view-proposal-admin/view-proposal-admin.component';
import { ViewProposalDetailComponent } from './user/view-proposal/view-proposal-detail/view-proposal-detail.component';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"getService",
    component:GetServiceComponent
  },
  {
    path:"user",
    component:UserComponent,
  children:[{
    path:"viewEvent",
    component:ViewEventComponent
  },
  {
    path:"viewProposal",
    component:ViewProposalComponent
  },
  {
    path:"viewTask",
    component:ViewTaskComponent
  },
  {
    path:"profile",
    component:ProfileComponent
  },
  {
    path:"userDashboard",
    component: UserDashboardComponent
  },
  {
    path:"detail",
    component:DetailsComponent
  },
  {
    path:"eventDetail",
    component:EventDetailsComponent
  },
  {
    path:"viewProposalDetail",
    component:ViewProposalDetailComponent
  },

] }
,{
  path:"admin",
  component:AdminComponent,
children:[{
  path:"addEvent",
  component:AddEventComponent
},
{
  path:"addProposal",
  component:AddProposalComponent
},
{
  path:"addTask",
  component:AddTaskComponent
},
{
  path:"profile",
  component: MyProfileComponent
},
{
  path:"adminDashboard",
  component: AdminDashboardComponent
},
{
  path:"create",
  component: CreateComponent
},
{
  path:"addCandidate",
  component: AddCandidatesComponent
},

{
  path:"viewEvent",
  component: ViewEventAdminComponent
},

{
  path:"createTask",
  component: CreateTaskComponent
},

{
  path:"createProposal",
  component: CreateProposalComponent
},

{
  path:"viewTaskAdmin",
  component: ViewTaskAdminComponent
},

{
  path:"viewProposalAdmin",
  component: ViewProposalAdminComponent
}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
