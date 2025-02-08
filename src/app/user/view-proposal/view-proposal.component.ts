import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from 'src/app/service/global-service.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-view-proposal',
  templateUrl: './view-proposal.component.html',
  styleUrls: ['./view-proposal.component.css']
})
export class ViewProposalComponent implements OnInit {
proposal:any;
user:any;
acceptedBy:any;
rejectedBy:any;
userProposal:any;
  constructor(private http:HttpService,private globalService:GlobalServiceService,private router:Router) { }

  ngOnInit(): void {
    this.user={};
    this.acceptedBy=[];
    this.userProposal=[];
    this.rejectedBy=[];
    this.proposal=[];
    this.getProposal();
  }
  getProposal(){
    this.http.getRequest("http://localhost:3000/proposal").then((response:any)=>{
      this.proposal=response;
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }
  viewProposal(id:string){
    this.router.navigate(["/user/viewProposalDetail"],
  {
    queryParams: {
         id:id,
     
    }})
  }
  
}
