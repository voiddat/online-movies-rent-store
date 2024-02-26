import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import ApexCharts from 'apexcharts';
import { Observable, tap } from 'rxjs';
import { MoviesResponse } from '../../models/movie.models';
import { RentStoreService } from '../../services/rent-store.service';

@Component({
  selector: 'app-bubble-chart',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './bubble-chart.component.html',
  styleUrl: './bubble-chart.component.scss'
})
export class BubbleChartComponent implements OnInit {
  movies$!: Observable<MoviesResponse>
  apexChart!: ApexCharts;
  constructor(private rentStoreService: RentStoreService) { }


  pageSize = 25;
  page = 0;

  ngOnInit(): void {
    // could add possibility to choose timeframe (year from and year to)
    this.movies$ = this.rentStoreService.getMoviesForBubbleChart$(2000, 2020, this.page + 1, this.pageSize).pipe(tap(moviesResponse => {
      this.chartOptions = this.createChartOptions(moviesResponse);
      this.apexChart?.destroy()
      this.apexChart = new ApexCharts(document.getElementById('chart'), this.chartOptions)
      this.apexChart.render();
    }));
  }

  createChartOptions(moviesResponse: MoviesResponse) {
    const results = moviesResponse.results;
    const resultingObject = groupBy(results, (movie) => movie.pub_date);
    this.chartOptions.series = [];
    Object.entries(resultingObject).forEach(([key, value]) => {
      this.chartOptions.series.push({ name: key, data: [[Number.parseInt(key), value.length, value.length]] })
    })
    return this.chartOptions;

  }

  onPageChange($event: PageEvent) {
    console.log($event);
    this.page = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.ngOnInit();
  }
  chartOptions = {
    xaxis: {
      tickAmount: 12,
      type: "datetime",
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MM/yyyy',
          day: 'MM/yyyy',
          hour: 'HH:mm'
        }
      }
    },
    series: [
      {
        name: "Bubble1",
        data: [[new Date().getTime(), 43, 28]]
      },
      {
        name: "Bubble2",
        data: [[new Date().getTime(), 1, 5]]
      }
    ],
    chart: {
      height: 350,
      type: "bubble"
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 0.8
    },
    title: {
      text: "Movies bubble chart"
    },
    yaxis: {
      max: 10
    }
  };

}
const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);