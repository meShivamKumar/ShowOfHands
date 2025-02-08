import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-view-proposal-admin',
  templateUrl: './view-proposal-admin.component.html',
  styleUrls: ['./view-proposal-admin.component.css']
})
export class ViewProposalAdminComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private http:HttpService) { }
proposal:any;
acceptedBy:any;
rejectedBy:any;
id:string;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.id = params["id"];
  
      this.getProposal();
      });
  }
  back(){
    this.router.navigateByUrl("/admin/addProposal");
  } 
  getProposal(){
    this.http.getRequest("http://localhost:3000/proposal/"+this.id).then((response:any)=>{
      this.proposal=response;
      this.acceptedBy=this.proposal.acceptedBy;
      this.rejectedBy=this.proposal.rejectedBy;
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }
}
