import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DebateResponse } from '../debate-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DebateService {
  private readonly apiUrl = environment.apiUrl + '/debate';
  private readonly http = inject(HttpClient);

  startDebate(input: string, exchanges: number): Observable<DebateResponse[]> {
    return this.http.post<DebateResponse[]>(
      `${this.apiUrl}/${exchanges}`,
      input,
    );
  }
}
