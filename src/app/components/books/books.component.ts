import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { BooksService } from '../../services/books.service';
import { BookItem, ItemVM } from '../../models/books';

//
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from 'src/app/services/book.service';
import { BookQuery } from '../../store/book.query';
//

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'title', 'author'];
  // dataSource: MatTableDataSource<ItemVM>;
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  loading = false;
  bookItems: ItemVM[];
  subscription = new Subscription();

  mainSearchText = '';
  mainSearchTextPrev = '';

  //
  listBooksSub: Subscription;
  books$: Observable<ItemVM[]> = this.bookQuery.selectAll();
  //

  constructor(private bookService: BookService, private bookQuery: BookQuery) {
    // this.dataSource = new MatTableDataSource(this.bookItems);
  }

  ngOnInit(): void {
    this.books$.subscribe(
      result => {
        console.log('cambia');
        this.dataSource.data = result;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    // this.dataSource.sort = this.sort;
    // this.getList();
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    console.log('hola');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getList(mainSearchText: string): void {
    this.listBooksSub = this.bookQuery.selectAreBooksLoaded$.pipe(
      switchMap(areBooksLoaded => {
        console.log('mainSearchText', this.mainSearchText);
        console.log('mainSearchTextPrev', this.mainSearchTextPrev);
        console.log('areBooksLoaded', areBooksLoaded);
        console.log('restultado if: ', ((!areBooksLoaded) || (this.mainSearchText !== this.mainSearchTextPrev)));
        if ((!areBooksLoaded) || (this.mainSearchText !== this.mainSearchTextPrev)) {
          console.log('apretando getlist');
          this.mainSearchTextPrev = this.mainSearchText;
          return this.bookService.getBooks(mainSearchText);
        }
      })
    ).subscribe(result => {});
  }

}
