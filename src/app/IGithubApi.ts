
export interface IGithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
  id: string;
}

export interface IGithubApi {
  items: IGithubIssue[];
  total_count: number;
  incomplete_results: boolean;
}

export interface IGithubIssueSearchParams {
  sort: string;
  order: 'asc' | 'desc';
  page: number;
  per_page: number;
}
