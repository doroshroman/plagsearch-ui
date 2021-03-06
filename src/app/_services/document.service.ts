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
    formData.append('attachment', document.get('attachment').value);
    formData.append('name', document.get("name").value);
    formData.append('description', document.get("description").value)
    
    return this.http.post(this.url + 'document/add', formData);
  }

  public getAllDocuments(): Observable<any> {
    return this.http.get(this.url + 'documents');
  }

  public getDocumentByHash(hash: string): Observable<any> {
    return this.http.get(this.url + `document/${hash}`);
  }

  public deleteDocumentByHash(hash: string): Observable<any> {
    return this.http.delete(this.url + `document/${hash}`);
  }

  public updateDocumentByNameAndDescription(hash: string, name: string, description: string): Observable<any> {
    return this.http.put(this.url + `document/${hash}`, {
      "name": name,
      "description": description
    });
  }

  public getPlagiarismReportByHash(hash: string | null): Observable<any> {
    return this.http.get(this.url + `document/analyze/${hash}`);
  }


}
