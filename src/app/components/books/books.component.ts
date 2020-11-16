import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ItemVM } from '../../models/books';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from 'src/app/services/book.service';
import { BookQuery } from '../../store/book.query';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'title', 'author'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  bookItems: ItemVM[];

  mainSearchText = '';
  mainSearchTextPrev = '';

  getlistBooksSub: Subscription;
  listBooksSub: Subscription;
  books$: Observable<ItemVM[]> = this.bookQuery.selectAll();


  constructor(private bookService: BookService, public bookQuery: BookQuery) {
  }

  ngOnInit(): void {
    // First thing we do is to setup the book list subscriber to keep watching for any change and to update the datasource properties.

    this.listBooksSub = this.books$.subscribe(
      result => {
        this.dataSource.data = result;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngOnDestroy(): void {
    // Once we are gone we unsubscribe to avoid memory leak
    this.listBooksSub.unsubscribe();
    this.getlistBooksSub.unsubscribe();
  }

  applyFilter(event: Event): void {
    // This is the online filter
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getList(mainSearchText: string): void {
    // Here we make a double check:
    // one: if the book list was not changed by another component (which of course we don't have in this demo)
    // two: if we change the search criteria to watch another list here in this component

    this.listBooksSub = this.bookQuery.selectAreBooksLoaded$.pipe(
      switchMap(areBooksLoaded => {
        if ((!areBooksLoaded) || (this.mainSearchText !== this.mainSearchTextPrev)) {
          this.mainSearchTextPrev = this.mainSearchText;
          return this.bookService.getBooks(mainSearchText);
        }
      })
    ).subscribe(result => { });
  }

}
