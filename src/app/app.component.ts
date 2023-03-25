import {Component, OnInit} from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, IDatasource, IGetRowsParams } from "ag-grid-community";
import {GithubApi, GithubIssue, IGithubIssueSearchParams} from './common/interface/IGithubApi';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  gridApi: GridApi;
  columnApi: ColumnApi;
  gridOptions: GridOptions = null;
  searchParams: IGithubIssueSearchParams = {
    sort: 'created',
    order: 'desc',
    page: 1,
    per_page: 100
  }
  githubIssues: GithubIssue[] = [];
  constructor(private _httpClient: HttpClient) {}

  ngOnInit() {
    this.populateGridOptions();
  }

  private populateGridOptions() {
    this.gridOptions = {
      getRowNodeId: data => data.id,
      columnDefs: this.displayedColumns,
      rowModelType: 'infinite',
      onGridReady: this.onGridReady.bind(this),
      overlayLoadingTemplate: `<span class="ag-overlay-loading-center">No issue found.</span>`
    };
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.loadGithubIssues();
  }

  private get displayedColumns(): ColDef[] {
    return [
      {
        flex: 1,
        field: 'id',
        headerName: 'ID',
        cellRenderer: (params: ICellRendererParams) => {
          if (params.value !== undefined) {
            return params.value;
          } else {
            return '<img src="https://www.ag-grid.com/example-assets/loading.gif" alt="loading">';
          }
        }
      },
      {
        flex: 1,
        field: 'created_at',
        minWidth: 130,
        tooltipField: 'Created',
        headerName: 'Created',
        cellRenderer: (params: ICellRendererParams) => {
          if (params.value !== undefined) {
            return params.value;
          } else {
            return '<img src="https://www.ag-grid.com/example-assets/loading.gif" alt="loading">';
          }
        }
      },
      {
        flex: 1,
        field: 'state',
        minWidth: 130,
        tooltipField: 'State',
        headerName: 'State',
        cellRenderer: (params: ICellRendererParams) => {
          if (params.value !== undefined) {
            return params.value;
          } else {
            return '<img src="https://www.ag-grid.com/example-assets/loading.gif" alt="loading">';
          }
        }
      },
      {
        flex: 1,
        field: 'number',
        minWidth: 130,
        tooltipField: 'Number',
        headerName: 'Number',
        cellRenderer: (params: ICellRendererParams) => {
          if (params.value !== undefined) {
            return params.value;
          } else {
            return '<img src="https://www.ag-grid.com/example-assets/loading.gif" alt="loading">';
          }
        }
      },
      {
        flex: 1,
        field: 'title',
        headerName: 'Title',
        tooltipField: 'Title',
        minWidth: 140,
        cellRenderer: (params: ICellRendererParams) => {
          if (params.value !== undefined) {
            return params.value;
          } else {
            return '<img src="https://www.ag-grid.com/example-assets/loading.gif" alt="loading">';
          }
        }
      }
    ]
  }

  loadGithubIssues() {
    const dataSource: IDatasource = {
      rowCount: undefined,
      getRows: (params: IGetRowsParams) => {
        this.getRepoIssues(this.searchParams).subscribe(response => {
          this.githubIssues = response?.items;
          let lastRow = -1;
          if (response?.items?.length < 100) {
            lastRow = this.githubIssues?.length;
          }
          this.searchParams.page = this.searchParams.page+1;
          params.successCallback(this.githubIssues ?? [], lastRow);
        }, error => {
        });
      },
    };
    this.gridOptions.api.setDatasource(dataSource);
  }

  getRepoIssues(searchParams: IGithubIssueSearchParams): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${searchParams?.sort}&order=${searchParams?.order}&page=${searchParams?.page}&per_page=${searchParams?.per_page}`;
    return this._httpClient.get<GithubApi>(requestUrl);
  }
}
