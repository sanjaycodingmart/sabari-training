import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieDetails: any;

  constructor(private service: MoviesService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe(params => {
      this.service.searchMovieDetails(params['imdbID']).subscribe(res => { setTimeout(() => { this.movieDetails = res }, 2000) })
    })

  }
  goBack() {
    window.history.back();
  }

}
