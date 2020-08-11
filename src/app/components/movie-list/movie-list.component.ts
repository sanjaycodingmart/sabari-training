import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: any[];
  constructor(private service: MoviesService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activeRoute.queryParams.subscribe(
      (qparam) => { this.service.searchMovies(qparam['q']).subscribe((res) => { this.movies = res.Search }); }
    )



  }

}
