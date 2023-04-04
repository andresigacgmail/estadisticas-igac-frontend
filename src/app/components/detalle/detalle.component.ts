import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Chart } from "chart.js/auto";
import {Estadistica} from "../../modelos/Estadistica";
import { EstadisticaService } from "../../services/estadistica.service";
import {Servidor} from "../../modelos/Servidor";
import {Disco} from "../../modelos/Disco";
import Swal from "sweetalert2";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  chart:any;
  tamanoTotal:string = "";
  dataMeses:any = [];
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
    t_id:0,
    direccion_ip_privada:"",
    direccion_ip_publica:"",
    puerto:"",
    usuario:"",
    contrasenia:"",
    alias:"",
    uso:"",
    dominio:"",
    tipo_protocolo:0
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
  }

  obtenerServidorDetalles(){
    this.estadisticaService.cargarEstadisticasServidor(this.id).subscribe({
      next: (estadistica) => {
        this.servidor = estadistica.servidor;
        this.estadisticas = estadistica.estadisticas;
        this.listaAnos = estadistica.anos;
        if(estadistica.estadisticas[0] != undefined){
          this.disco = estadistica.estadisticas[0];
          this.data[0] = this.disco.disco_disponible;
          this.data[1] = this.disco.disco_uso;
          this.cargarGraficoPie(this.data);
        }else{
          Swal.fire('No hay datos')
        }

      },
      error:(err) => console.log(err),
      complete:() => { }
    });
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

    if(this.ano != "" && this.mes != "" && this.dia != ""){
      this.estadisticaService.consultarEstadisticasFecha(this.id, this.ano, this.mes, this.dia).subscribe(estadisticas => {
        console.log(estadisticas)
        this.estadisticas = estadisticas.estadisticas;
      });

    }else if(this.ano != "" && this.mes != "" && this.dia == ""){
      this.estadisticaService.consultarEstadisticasFecha(this.id, this.ano, this.mes, this.dia).subscribe(estadisticas => {
        this.tamanoTotal = estadisticas.tamanoTotal;
        this.dataMeses = estadisticas.meses;
        this.cargarGraficaBarra(this.dataMeses, this.tamanoTotal);
      });
    }else if(this.ano != "" && this.mes == "" && this.dia == ""){
      this.estadisticaService.consultarEstadisticasFecha(this.id, this.ano, this.mes, this.dia).subscribe(estadisticas => {
        this.tamanoTotal = estadisticas.tamanoTotal;
        this.dataMeses = estadisticas.meses;
        this.cargarGraficaBarra(this.dataMeses, this.tamanoTotal);
      });
    }



  }

  cargarGraficaBarra(datameses:any, tamanoTotal:string){


    if(this.chart!=null){
      this.chart.destroy();
    }
    // GRAFICO DE BARRAS
    this.chart = new Chart('myChart2',
      {
        type: 'bar',
        data: {
          labels: this.dataMeses.map((row: { mes: any; }) => row.mes),
          datasets: [
            {
              label: `Incremento por año GB, Tamaño Max: ${tamanoTotal} GB`,
              data: this.dataMeses.map((row: { uso: any; }) => row.uso)
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


























