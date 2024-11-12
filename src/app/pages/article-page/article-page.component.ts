import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private http = inject(HttpClient);
  articlesId!: number;
  article$!: Observable<Article>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articlesId = Number(params.get('id'));
      this.article$ = this.getArticleById(this.articlesId);
    });
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`http://localhost:3000/articles/${id}`);
  }
}
