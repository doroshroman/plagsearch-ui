import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../_services/document.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  files: any;
  isEmpty = false;
  
  constructor(private docService: DocumentService) {}

  ngOnInit(): void {
    this.setDocuments();
  }

  setDocuments(): void {
    this.docService.getAllDocuments().subscribe(
      data =>{
        this.files = data;
        if(!this.files.length){
          this.isEmpty = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  setLastDocument(hash: string): void {
    this.docService.getDocumentByHash(hash).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

}
