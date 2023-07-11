import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Weather {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

@Component({
  selector: 'tab1-component',
  standalone: true,
  templateUrl: 'tab1.component.html',
  styleUrls: ['tab1.component.css']
})
export class Tab1Component {
  public cityName: string;
  public weather: Weather;

  private apiKey = '35cb9273871536470f882136779b829d';

  constructor(private http: HttpClient) {}

  getWeather() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.apiKey}&units=metric`;

    this.http.get<Weather>(apiUrl).subscribe(
      (data) => {
        this.weather = data;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
}
