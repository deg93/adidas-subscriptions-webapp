import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionDTO } from 'src/app/models/subscription-dto';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
  styleUrls: ['./subscriptions-list.component.scss'],
})
export class SubscriptionsListComponent implements OnInit {
  userAccessId: string;

  subscriptions: SubscriptionDTO[];

  mode: 'LOADING' | 'READY' | 'CANCELING' = 'LOADING';

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private matSnackBar: MatSnackBar,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    // Read URL parameters
    this.userAccessId = this.activatedRoute.snapshot.params['userAccessId'];
    const cancelId = this.activatedRoute.snapshot.queryParamMap.get('cancel');

    // Retrieve subscriptions (and cancel specified subscription if present)
    this.subscriptionService
      .fetch(this.userAccessId)
      .subscribe((subscriptions) => {
        this.subscriptions = subscriptions;
        this.mode = 'READY';
        if (
          cancelId &&
          this.subscriptions.some(
            (subscription) => cancelId === subscription.id
          )
        ) {
          this.cancelSubscription(
            this.subscriptions.find(
              (subscription) => cancelId === subscription.id
            )
          );
        }
      });
  }

  cancelSubscription(subscription: SubscriptionDTO) {
    // Prevent parallel cancelations
    if (this.mode === 'CANCELING') {
      return;
    }
    this.mode = 'CANCELING';

    this.document.body.style.cursor = 'wait';
    this.subscriptionService.cancel(subscription.id).subscribe(() => {
      this.subscriptions = this.subscriptions.filter(
        (sub) => subscription.id !== sub.id
      );
      this.document.body.style.cursor = 'auto';
      this.mode = 'READY';
      this.matSnackBar.open(
        `Subscription to "${subscription.newsletterId}" cancelled successfully`,
        'Great!'
      );
    });
  }
}
