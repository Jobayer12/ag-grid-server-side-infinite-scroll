
export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface IGithubIssueSearchParams {
  sort: string;
  order: 'asc' | 'desc';
  page: number;
  per_page: number;
}
