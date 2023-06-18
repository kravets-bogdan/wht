// * Base
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

// * Types
import { catsBreeds } from '../types/catsBreeds.types';
import { Items } from '../types/item.types';

@Injectable()
export default class CatApiService {
  // * Inject
  private readonly http = inject(HttpClient);
  // * local
  private API = 'https://api.thecatapi.com/v1';
  private apiKey =
    'live_zLcsBvEqsvrROa5WHv4UKfhH7FdQMB2m1uurlzgR3RKe5YrSjXVkFmquDW0nUsjx';

  getBreeds() {
    return this.http.get<catsBreeds[]>(`${this.API}/breeds`);
  }

  getItems(limit: number, breed: string) {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('breed_ids', breed);
    return this.http.get<Items[]>(`${this.API}/images/search?`, {
      headers,
      params,
    });
  }
}
