import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GlobalServiceService } from 'src/app/service/global-service.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-view-proposal-detail',
  templateUrl: './view-proposal-detail.component.html',
  styleUrls: ['./view-proposal-detail.component.css']
})
export class ViewProposalDetailComponent implements OnInit {
  proposal:any;
  user:any;
  acceptedBy:any;
  rejectedBy:any;
  userProposal:any;
  id:string;
  mainProposal:any;
  present:boolean;
    constructor(private http:HttpService
      ,private globalService:GlobalServiceService,private route:ActivatedRoute,private router:Router) { }
  
    ngOnInit(): void {
      this.present=false;
      this.id='';
      this.user={};
      this.acceptedBy=[];
      this.userProposal=[];
      this.rejectedBy=[];
      this.proposal=[];
      this.mainProposal={};
      this.route.queryParams.subscribe((params: any) => {
        this.id = params["id"];
    
        this.getProposal();
        });
      
    }

    getProposal(){
      this.http.getRequest("http://localhost:3000/proposal/"+this.id).then((response:any)=>{
        this.proposal=response;
        this.acceptedBy=this.proposal.acceptedBy;
        this.rejectedBy=this.proposal.rejectedBy;
        console.log(this.acceptedBy);
        console.log(this.rejectedBy);
        
        this.getUser();
      }).catch((error:HttpErrorResponse)=>{
        console.log(error)
      })
    }

  getUser(){
    this.http.getRequest("http://localhost:3000/user/"+this.globalService.getUniqueId()).then((response:any)=>{
      this.user=response;
      this.userProposal=this.user.proposal;
      for (let p of this.userProposal){
        if(p.id==this.id){
          this.mainProposal=p
          this.present=true;

        }
      }
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }
  accept(){
    let data={
      isAccepted:true,
      id:this.id,
      name:this.proposal.title,
      
    }
    this.userProposal.push(data);
    this.user.proposal=this.userProposal;
    let tmp={
      id:this.globalService.getUniqueId(),
      name:this.user.name
    }
    this.acceptedBy.push(tmp)
    this.proposal.acceptedBy=this.acceptedBy;
    console.log(this.user);
  console.log(this.proposal);
    this.http.putRequest("http://localhost:3000/proposal/"+this.id,this.proposal).then((response:any)=>{
      this.http.putRequest("http://localhost:3000/user/"+this.globalService.getUniqueId(),this.user).then((response:any)=>{

      })
    this.getProposal();
    this.getUser();
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }
back(){
  this.router.navigateByUrl("/user/viewProposal");
}
reject(){
  let data={
    isAccepted:false,
    id:this.id,
    name:this.proposal.title
  }
  this.userProposal.push(data);
  this.user.proposal=this.userProposal;
  let tmp={
    id:this.globalService.getUniqueId(),
    name:this.user.name
  }
  this.rejectedBy.push(tmp)
  this.proposal.rejectedBy=this.rejectedBy;
  console.log(this.user);
  console.log(this.proposal);
  
  this.http.putRequest("http://localhost:3000/proposal/"+this.id,this.proposal).then((response:any)=>{
    this.http.putRequest("http://localhost:3000/user/"+this.globalService.getUniqueId(),this.user).then((response:any)=>{

    })
  this.getProposal();
  this.getUser();
  }).catch((error:HttpErrorResponse)=>{
    console.log(error)
  })
}

}
