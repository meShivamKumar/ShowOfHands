import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-proposal',
  templateUrl: './add-proposal.component.html',
  styleUrls: ['./add-proposal.component.css']
})
export class AddProposalComponent implements OnInit {
  proposal:any;
  constructor(private http:HttpService,private router:Router) { }

  ngOnInit(): void {
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
addProposal(){
  this.router.navigate(["/admin/createProposal"])
} 

deleteProposal(id:string){
  this.http.deleteRequest("http://localhost:3000/proposal/"+id).then((response:any)=>{
    this.getProposal();
  }).catch((error:HttpErrorResponse)=>{
    console.log(error)
  })
} 

viewProposal(id:string){
  this.router.navigate(["/admin/viewProposalAdmin"],
  {
    queryParams: {
         id:id,
     
    }})


}
}
