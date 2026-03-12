import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Post } from '../../core/services/api.service';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Navbar, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private apiService = inject(ApiService);

  posts: Post[] = [];
  loading = true;
  error = '';

  // pagination
  page = 1;
  limit = 10;
  hasMore = true;

  ngOnInit() {
    // fetch everything once to avoid repeated network latency
    this.loading = true;
    this.apiService.getAllPosts().subscribe({
      next: (all) => {
        // compute first page, then we'll slice on navigation
        this.posts = all.slice(0, this.limit);
        this.hasMore = all.length > this.limit;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error cargando los posts';
        this.loading = false;
        console.error(err);
      },
    });
  }

  loadPosts() {
    // when all posts are cached, just slice them; otherwise fallback to paged API
    if (this.apiService['allPostsCache']) {
      const all = this.apiService['allPostsCache'] as Post[];
      const start = (this.page - 1) * this.limit;
      this.posts = all.slice(start, start + this.limit);
      this.hasMore = start + this.limit < all.length;
      return;
    }

    this.loading = true;
    this.apiService.getPosts(this.page, this.limit).subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
        // if we received fewer than limit items, there's no more data
        this.hasMore = data.length === this.limit;
      },
      error: (err) => {
        this.error = 'Error cargando los posts';
        this.loading = false;
        console.error(err);
      },
    });
  }

  nextPage() {
    if (!this.hasMore) {
      return;
    }
    this.page++;
    this.loadPosts();
  }

  prevPage() {
    if (this.page === 1) {
      return;
    }
    this.page--;
    this.loadPosts();
  }
}
