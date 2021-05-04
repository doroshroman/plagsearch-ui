import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../_services/document.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  fileHash: string | null = '';
  report: any;

  isLoaded = false;
  
  constructor(private route: ActivatedRoute, private docService: DocumentService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.fileHash = params.get('hash');
      this.setPlagiarismReport();
    });
  }

  setPlagiarismReport(): void {
    this.docService.getPlagiarismReportByHash(this.fileHash).subscribe(
      response => {
        this.report = response;
        this.isLoaded = true;
        
      },
      error => {
        console.log(error);
      }
    )
    
  }

}
