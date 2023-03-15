import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  URL:string = "http://localhost:8081/servidor";

  constructor(private _http:HttpClient) { }


  get listaServidores():Observable<any>{
    return this._http.get(this.URL);
  }


}
