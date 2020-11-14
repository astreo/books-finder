import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {
  }

  public getItems(text: string): Observable<any> {
    console.log('api:', 'https://books.googleapis.com/books/v1/volumes?q=' + text + '&maxResults=7');
    return this.http.get('https://books.googleapis.com/books/v1/volumes?q=' + text + '&maxResults=7')
    .pipe(
      map(
        (resp: any) => {
          return resp.items;
        }
      )
    )
    ;
  }
}
