import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../_services/document.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent implements OnInit {
  form: FormGroup;
  isUploaded = false;
  isUploadFailed = false;
  errorMessage = '';

  constructor(public fb: FormBuilder, private docService: DocumentService) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      attachment: [null, Validators.required]
    })
  }

  ngOnInit(): void {
  }
  uploadFile(event: any){
    const file = (event.target).files[0];
    this.form.patchValue({
      attachment: file
    });
    this.form.get('attachment')!.updateValueAndValidity();
  }
  onSubmit() {
    this.docService.postNewDocument(this.form).subscribe(
      (response) => {
        console.log(response);
        this.isUploaded = true;

      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    )
  }


}
