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
    console.log(document);
    const formData: any = new FormData();
    formData.append('attachment', document.get('attachment').value);
    formData.append('name', document.get("name").value);
    formData.append('description', document.get("description").value)
    
    return this.http.post(this.url + 'document/add', formData);
  }


}
