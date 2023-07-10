import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'tab1',
  standalone: true,
  templateUrl: 'tab1.component.html',
})
export class Tab1Component implements OnInit {
  private openWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private urlSuffix = '&unit=metric&APPID=35cb9273871536470f882136779b829d';

  searchInput = new FormControl();
  weather: string | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(200),
        switchMap((city) => this.getWeather(city))
      )
      .subscribe(
        (res) => {
          this.weather = `Current Temperature is ${res['main'].temp} C`;
        },
        (err) =>
          console.log(
            `Can't get weather. Error code %s, URL: %s`,
            err.message,
            err.url
          )
      );
  }

  getWeather(city: string): Observable<any> {
    return this.http.get(this.openWeatherURL + city + this.urlSuffix).pipe(
      catchError((err) => {
        console.log(`City ${city} not found`);
        return EMPTY;
      })
    );
  }
}
