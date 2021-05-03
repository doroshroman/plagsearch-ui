import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../_services/document.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})

export class FileListComponent implements OnInit {

  files: any;
  isEmpty = false;

  constructor(private docService: DocumentService, private updateDialog: MatDialog) {}

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

  deleteFile(hash: string): void {
    this.docService.deleteDocumentByHash(hash).subscribe(
      response => {
        this.setDocuments();
      }, 
      error => {
        console.log(error);
      }
    )
  }

  updateFile(hash: string, name: string, description: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      name: name,
      description: description
    }

    const dialogRef = this.updateDialog.open(UpdateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          this.docService.updateDocumentByNameAndDescription(
            hash,
            data.name,
            data.description
            ).subscribe(
              response => {
                this.setDocuments();
              },
              error => {
                console.log(error);
              }
            )
        }
    );

  }



}
