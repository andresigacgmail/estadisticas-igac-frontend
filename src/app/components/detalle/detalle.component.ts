import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Chart } from "chart.js/auto";
import {Estadistica} from "../../modelos/Estadistica";
import { EstadisticaService } from "../../services/estadistica.service";
import {Servidor} from "../../modelos/Servidor";
import {Disco} from "../../modelos/Disco";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  dataMeses:Array<any> = [
    { mes: "Enero", valor:1,  count: 0 },
    { mes: "Fabrero", valor:2, count: 0 },
    { mes: "Marzo", valor:3, count: 0 },
    { mes: "Abril", valor:4, count: 0 },
    { mes: "Mayo", valor:5, count: 0 },
    { mes: "Junio", valor:6, count: 0 },
    { mes: "Julio",valor:7, count: 0 },
    { mes: "Agosto", valor:8, count: 0 },
    { mes: "Septiembre", valor:9, count: 0 },
    { mes: "octubre", valor:10, count: 0 },
    { mes: "Noviembre", valor:11, count: 0 },
    { mes: "Diciembre", valor:12, count: 0 }
  ];

  data:Array<number> = [32, 8];
  listaAnos:Array<string> = [];
  listaMeses:Array<any> = [
    {mes:'Enero',value:1},
    {mes:"Febrero",value:2},
    {mes:"Marzo",value:3},
    {mes:"Abril",value:4},
    {mes:"Mayo",value:5},
    {mes:"Junio",value:6},
    {mes:"Julio",value:7},
    {mes:"Agosto",value:8},
    {mes:"Septiembre",value:9},
    {mes:"Octubre",value:10},
    {mes:"Nomviembre",value:11},
    {mes:"Diciembre",value:12}
  ];
  listaDias:Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  estadisticas:Array<Estadistica> = [];
  servidor:Servidor = {
    nombre:"",
    id:0,
    actualizado:new Date(),
    creado:new Date(),
    ip_local:"",
    ip_publica:""
  };
  disco:Disco =  {
    disco_disponible: 0,
    disco_total: 0,
    disco_uso: 0
  }
  ano:string = "";
  mes:string = "";
  dia:string = "";

  constructor(private route: ActivatedRoute, private estadisticaService: EstadisticaService ) { }

  id:string | null = "";
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.obtenerServidorDetalles();
    this.cargarGraficaBarra();
  }

  obtenerServidorDetalles(){
    this.estadisticaService.cargarEstadisticasServidor(this.id).subscribe(estadistica => {
      // console.log((estadistica))
      this.servidor = estadistica.servidor;
      this.estadisticas = estadistica.estadisticas;
      this.listaAnos = estadistica.anos;
      this.disco = estadistica.estadisticas[0];
      this.data[0] = this.disco.disco_disponible;
      this.data[1] = this.disco.disco_uso;


      this.cargarGraficoPie(this.data);
    })
  }

  private cargarGraficoPie(data:Array<number>){
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
            data: data,
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }]
        }
      }
    );
  }


  consultarEstadisticasFecha(){
    console.log(this.id)
    console.log(this.ano)
    console.log(this.mes)
    console.log(this.dia)
    this.estadisticaService.consultarEstadisticasFecha(this.id, this.ano, this.mes, this.dia).subscribe(estadisticas => {
      let meses, tamanoTotal = estadisticas;
    });
  }

  cargarGraficaBarra(){

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
    new Chart('myChart2',
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: data.map(row => row.count)
            }
          ]
        }
      }
    );
  }


  cambiarAno(evento:any) {
    this.ano = evento.target.value;
  }
  cambiarMes(evento:any) {
    this.mes = evento.target.value;
  }
  cambiarDia(evento:any) {
    this.dia = evento.target.value;
  }
}
