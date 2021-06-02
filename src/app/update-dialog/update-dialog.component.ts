import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  form: FormGroup;
  name: string = '';
  description: string = '';

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<UpdateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any){
    
    this.name = data.name;
    this.description = data.description;

    this.form = this.fb.group({
      name: [this.name, ''],
      description: [this.description, '']
    })
  }

  ngOnInit(): void {
  }
  
  save() {
      this.dialogRef.close(this.form?.value);
  }

  close() {
      this.dialogRef.close();
  }

}
