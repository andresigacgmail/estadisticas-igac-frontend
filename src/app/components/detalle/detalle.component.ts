import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Chart } from "chart.js/auto";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));

    (async function() {
      const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
      ];

      // GRAFICO DE BARRAS
      // new Chart('myChart',
      //   {
      //     type: 'bar',
      //     data: {
      //       labels: data.map(row => row.year),
      //       datasets: [
      //         {
      //           label: 'Acquisitions by year',
      //           data: data.map(row => row.count)
      //         }
      //       ]
      //     }
      //   }
      // );

      new Chart('myChart',
        {
          type: 'pie',
          data: {
            labels: [
              'Disponible',
              'En Uso'
            ],
            datasets: [{
              label: 'Hdd',
              data: [32, 8],
              backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          }
        }
      );
    })();
  }



}
