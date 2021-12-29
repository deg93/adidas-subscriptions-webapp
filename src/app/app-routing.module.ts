import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionsFormComponent } from './components/subscriptions-form/subscriptions-form.component';
import { SubscriptionsListComponent } from './components/subscriptions-list/subscriptions-list.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionsFormComponent,
  },
  {
    path: 'users/:userAccessId',
    component: SubscriptionsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
