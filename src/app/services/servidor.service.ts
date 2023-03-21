import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SaveServidor} from "../modelos/SaveServidor";

@Injectable({
  providedIn: 'root'
})
export class ServidorService {


  URL:string = "http://localhost:8081/servidor";

  constructor(private _http:HttpClient) { }


  get listaServidores():Observable<any>{
    return this._http.get(this.URL);
  }

  guardarServidor(saveServidor: SaveServidor):Observable<any>{
    let servidor = JSON.stringify(saveServidor);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.URL,  servidor,{headers: headers})
  }

  eliminarServidor(id:number):Observable<any>{
    return this._http.delete(this.URL+"/"+id);
  }


}
