import {Component, Input, OnInit} from '@angular/core';
import {Estadistica} from "../../modelos/Estadistica";

@Component({
  selector: 'app-table-detalle',
  templateUrl: './table-detalle.component.html',
  styleUrls: ['./table-detalle.component.css']
})
export class TableDetalleComponent implements OnInit {

  @Input() estadisticas:Array<Estadistica> = [];
  constructor() { }

  ngOnInit(): void {

  }

}
