import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../_services/document.service';
import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent implements OnInit {
  form: FormGroup;

  constructor(public fb: FormBuilder, private docService: DocumentService) { 
    this.form = this.fb.group({
      name: [''],
      description: [''],
      attachment: [null]
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
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }


}
