import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SaveServidor} from "../modelos/SaveServidor";

@Injectable({
  providedIn: 'root'
})
export class ServidorService {


  URL:string = "http://10.23.13.10:8081/servidor";
  //URL:string = "http://localhost:8081/servidor";
  headers:any = new HttpHeaders().set('Content-Type','application/json');

  constructor(private _http:HttpClient) { }


  get listaServidores():Observable<any>{
    return this._http.get(this.URL);
  }

  guardarServidor(saveServidor: SaveServidor):Observable<any>{
    let servidor = JSON.stringify(saveServidor);
    return this._http.post(this.URL,  servidor,{headers: this.headers})
  }

  obtenerServidor(id:number){
    return this._http.get(this.URL+"/"+id);
  }

  updateServidor(servidorUpdate: SaveServidor, id:number){
    let servidor = JSON.stringify(servidorUpdate);
    return this._http.put(this.URL+"/"+id,servidor,{headers: this.headers});
  }

  eliminarServidor(id:number):Observable<any>{
    return this._http.delete(this.URL+"/"+id);
  }


}
