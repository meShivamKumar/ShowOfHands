import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from 'src/app/service/global-service.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
event:any;
candidates:any;
id:string;
totalVotes:number;
user:any;
userEvent:any;
isVoted:boolean;
voteDetail:any;
  constructor(private http:HttpService,private route:ActivatedRoute,private router:Router,private globalService:GlobalServiceService) { }

  ngOnInit(): void {
    this.voteDetail={};
    this.isVoted=false;
    this.userEvent=[];
    this.user=[]
    this.totalVotes=0
    this.event={};
    this.candidates=[];
    this.route.queryParams.subscribe((params: any) => {
      this.id = params["id"];
  
      this.getEvent();
      });
  }
  back(){
    this.router.navigateByUrl("/user/viewEvent");
  }

  getEvent(){
    this.http.getRequest("http://localhost:3000/events/"+this.id).then((response:any)=>{
      this.event=response;
      this.candidates=this.event.candidates;
      this.getUser();
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }
  getUser(){
    this.http.getRequest("http://localhost:3000/user/"+this.globalService.getUniqueId()).then((response:any)=>{
      this.user=response;
      this.userEvent=this.user.event;
      for (let k of this.userEvent){
        if(k.id==this.id){
          this.isVoted=true;
          this.voteDetail=k;
        }
      }
     console.log(this.user)
     console.log(this.user.event)
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }
  vote(name:string,index:number){
    let data={
      isVoted:true,
      votedName:name,
      id:this.id
    }
    if(this.userEvent.length>0){
    this.userEvent.push(data);}
    else{
      this.userEvent.push(data);
    }
    this.user.event=this.userEvent
  console.log(this.user)
  this.event.candidates[index].totalVotes+=1;
    this.http.putRequest("http://localhost:3000/events/"+this.id,this.event).then((response:any)=>{
   alert("Voted Successfully!");
   this.http.putRequest("http://localhost:3000/user/"+this.globalService.getUniqueId(),this.user).then((response:any)=>{
    this.router.navigateByUrl("/user/viewEvent");

   })
  }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })

  }
}
