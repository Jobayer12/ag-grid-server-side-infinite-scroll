import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GithubApi, IGithubIssueSearchParams} from "../interface/IGithubApi";

export class GithubIssuesService {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(searchParams: IGithubIssueSearchParams): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${searchParams?.sort}&order=${searchParams?.order}&page=${searchParams?.page + 1}`;
    return this._httpClient.get<GithubApi>(requestUrl);
  }
}
