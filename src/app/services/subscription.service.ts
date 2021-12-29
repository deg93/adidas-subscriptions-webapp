import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubscriptionDTO } from '../models/subscription-dto';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private readonly resourceUrl: string;

  constructor(private httpClient: HttpClient) {
    this.resourceUrl = `${environment.apiUrl}/subscriptions`;
  }

  create(subscriptionDTO: SubscriptionDTO): Observable<SubscriptionDTO> {
    return this.httpClient.post<SubscriptionDTO>(
      `${this.resourceUrl}`,
      subscriptionDTO
    );
  }

  fetch(userAccessId: string): Observable<SubscriptionDTO[]> {
    return this.httpClient.get<SubscriptionDTO[]>(`${this.resourceUrl}`, {
      params: {
        userAccessId,
      },
    });
  }

  cancel(id: string): Observable<SubscriptionDTO[]> {
    return this.httpClient.delete<SubscriptionDTO[]>(
      `${this.resourceUrl}/${id}`
    );
  }
}
