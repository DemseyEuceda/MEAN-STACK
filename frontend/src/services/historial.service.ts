import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  public url ='';


  constructor( private http: HttpClient) { 
    this.url = 'http://localhost:8000/'
  }


  crearHistorial(data:any) : Observable<any>{
    return this.http.post(this.url, data)

  }

  getHistorial() : Observable<any>{
    
    return this.http.get(this.url)

  }

  eliminarhistorial() : Observable<any>{
    return this.http.delete(this.url);
  }
}
