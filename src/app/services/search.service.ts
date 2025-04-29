import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private api = 'https://help-search-api-prod.herokuapp.com/search';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any> {
    return this.http.get(`${this.api}?query=${query}`);
  }
}
