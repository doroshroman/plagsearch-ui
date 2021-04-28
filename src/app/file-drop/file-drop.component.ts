import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DocumentService } from '../_services/document.service';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent implements OnInit {

  form:any = {};
  fileEntry: NgxFileDropEntry | undefined;
  file: File | undefined;
  isFileUploaded = false;
  isDirectory = false;
  isOneFile = true;
  isAddingSuccessful = false;
  errorMessage = '';

  constructor(private docService: DocumentService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    let document = {
      'name': this.form.name,
      'description': this.form.description,
      'attachment': this.file
    }
    this.docService.postNewDocument(document).subscribe(
      data => {
        this.isAddingSuccessful = true;
      },
      err => {
        console.log(err);
        this.errorMessage = typeof err.error.message === "undefined"?  err.error.msg : err.error.message;
      }
    )
  }
  public dropped(files: NgxFileDropEntry[]) {
    if (files.length > 1) {
      this.isOneFile = false;
    }
    else{
      this.fileEntry = files[0];
      if(this.fileEntry.fileEntry.isDirectory){
        this.isDirectory = true;
      }else{
        this.addDocument(this.fileEntry);
      }
    }
  }  
  addDocument(droppedFile: NgxFileDropEntry) {
    const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
    fileEntry.file((file: File) => {
      this.file = file;
      this.isFileUploaded = true;
    });
  }
  
  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }



}
