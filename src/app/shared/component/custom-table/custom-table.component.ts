import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, NgModule, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}

@Injectable({ providedIn: 'root' })
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<{ results: RandomUser[] }> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    return this.http
      .get<{ results: RandomUser[] }>(`${this.randomUserUrl}`, { params })
      .pipe(catchError(() => of({ results: [] })));
  }

  constructor(private http: HttpClient) {}
}

@Component({
  selector: 'custom-table',
  template: `
    <nz-table
      nzShowSizeChanger
      [nzData]="listOfRandomUser"
      [nzFrontPagination]="false"
      [nzLoading]="loading"
      [nzTotal]="total"
      [nzPageSize]="pageSize"
      [nzPageIndex]="pageIndex"
      (nzQueryParams)="onQueryParamsChange($event)"
    >
      <thead>
        <tr>
          <th nzColumnKey="name" [nzSortFn]="true">Name</th>
          <th nzColumnKey="gender" [nzFilters]="filterGender" [nzFilterFn]="true">Gender</th>
          <th nzColumnKey="email" [nzSortFn]="true">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of listOfRandomUser">
          <td>
           <img style="with: 70px; object-fit: cover; height: 60px; border-radius: 8px;" src="../../../../assets/images/coffee.jpg" alt="">
            {{data.name.first }} {{ data.name.last }}
          </td>
          <td>{{ data.gender }}</td>
          <td>{{ data.email }}</td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class CustomTableComponent implements OnInit {
  total = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.randomUserService.getUsers(pageIndex, pageSize, sortField, sortOrder, filter).subscribe(data => {
      this.loading = false;
      this.total = 200; // mock the total data here
      this.listOfRandomUser = data.results;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  constructor(private randomUserService: RandomUserService) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
  }
}


@NgModule({
	declarations: [
		CustomTableComponent
	],
	exports: [
		CustomTableComponent
	],
	imports: [
		CommonModule,
		FormsModule,
    NzTableModule,

	]
})
export class CustomTableModule { }
