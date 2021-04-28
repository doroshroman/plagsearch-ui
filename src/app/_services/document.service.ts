import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  url = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  public postNewDocument(document: any): Observable<any> {

    const formData: any = new FormData();
    formData.append('attachment', document.file);
    formData.append('name', document.name);
    formData.append('description', document.description)
    
    return this.http.post(this.url + 'document/add', formData);
  }


}
