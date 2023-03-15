import { Component, OnInit } from '@angular/core';
import { ServidorService} from "../../services/servidor.service";
import { Servidor} from "../../modelos/Servidor";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

/*export interface Servidor {
  id:number,
  nombre:string,
  ip_publica:string,
  ip_local:string,
  creado:Date,
  actualizado:Date
}*/
export class TableComponent implements OnInit {

  servidores:Array<Servidor> = [];
  constructor(private _servidorService:ServidorService) { }

  ngOnInit(): void {
    this.cargarServidores()
  }

  cargarServidores(){
    this._servidorService.listaServidores.subscribe( servidores => {
      this.servidores = servidores;
    })
  }


}
