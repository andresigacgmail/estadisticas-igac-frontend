import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {Estadistica} from "../modelos/Estadistica";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  URL:string = "http://localhost:8081/";

  constructor(private _http:HttpClient) { }

  cargarEstadisticasServidor(id:any):Observable<any>{
    return this._http.get(this.URL+"estadistica/grupo/"+id)
  }

  consultarEstadisticasFecha(id: string | null, ano: string, mes: string | null, dia: string):Observable<any>{
    return this._http.get(this.URL+`estadistica/ano?id_servidor=${id}&ano=${ano}&mes=${mes}&dia=${dia}`);
  }




}
