import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NEWSLETTERS } from 'src/app/constants/newsletters';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-subscriptions-form',
  templateUrl: './subscriptions-form.component.html',
  styleUrls: ['./subscriptions-form.component.scss'],
})
export class SubscriptionsFormComponent implements OnInit {
  subscriptionForm: FormGroup;

  // Dummy newsletters set
  newsletters = NEWSLETTERS;

  mode: 'READY' | 'LOADING' | 'SUCCESS' = 'READY';

  constructor(
    private matSnackBar: MatSnackBar,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.subscriptionForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null),
      gender: new FormControl(null),
      birthDate: new FormControl(null, Validators.required),
      newsletterId: new FormControl(null, Validators.required),
      consent: new FormControl(null, Validators.required),
    });
  }

  createSubscription() {
    this.mode = 'LOADING';
    this.subscriptionForm.disable();

    this.subscriptionService.create(this.subscriptionForm.value).subscribe({
      next: () => {
        this.mode = 'SUCCESS';
      },
      error: (error: HttpErrorResponse) => {
        this.mode = 'READY';
        this.subscriptionForm.enable();
        this.showErrorMessage(error.status === 409);
      },
    });
  }

  returnToForm() {
    this.initForm();
    this.mode = 'READY';
  }

  showErrorMessage(alreadySubscribed: boolean) {
    const message = alreadySubscribed
      ? `Seems that you are already subscribed to "${this.subscriptionForm.value.newsletterId}"`
      : 'Ops... Something went wrong';
    this.matSnackBar.open(message, 'Accept');
  }
}
