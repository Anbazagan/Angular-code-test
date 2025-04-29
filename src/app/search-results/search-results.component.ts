import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Component for displaying search results with pagination.
 */
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {

  /**
   * Query string used for searching.
   */
  query: string = '';

  /**
   * Array to store the search results.
   */
  results: any[] = [];

  /**
   * Array to store the paginated search results.
   */
  paginatedResults: any[] = [];

  /**
   * Current page number for pagination.
   */
  currentPage = 1;

  /**
   * Number of results to display per page.
   */
  pageSize = 10;

  /**
   * Constructor to inject required services.
   * @param searchService Service to perform search operations.
   * @param route ActivatedRoute to access query parameters.
   * @param router Router to navigate between pages.
   */
  constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Subscribes to query parameters and triggers a search if a query is present.
   */
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'] || '';
      this.currentPage = +params['page'] || 1;
      if (this.query) {
        this.search(this.query);
      }
    });
  }

  /**
   * Handles the search action and updates the query parameters in the URL.
   */
  onSearch() {
    this.router.navigate([], { queryParams: { query: this.query, page: 1 } });
  }

  /**
   * Performs a search operation using the search service.
   * @param query The search query string.
   */
  search(query: string) {
    this.searchService.search(query).subscribe({
      next: (res: any) => {
        this.results = res.results;
        this.updatePagination();
      },
      error: (err: any) => {
        console.error('Error occurred while searching:', err);
        alert('Error occurred while searching:');
      }
    });
  }

  /**
   * Updates the paginated results based on the current page and page size.
   */
  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedResults = this.results.slice(start, start + this.pageSize);
  }

  /**
   * Changes the current page and updates the query parameters in the URL.
   * @param page The new page number to navigate to.
   */
  changePage(page: number) {
    this.router.navigate([], { queryParams: { query: this.query, page } });
  }

  /**
   * Calculates the total number of pages based on the results and page size.
   * @returns The total number of pages.
   */
  get totalPages() {
    return Math.ceil(this.results.length / this.pageSize);
  }
}
