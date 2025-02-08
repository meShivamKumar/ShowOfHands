import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from 'src/app/service/global-service.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
name:string;
userId:string;
uniqueId:string;
  constructor(private http:HttpService,private globalService:GlobalServiceService,private router:Router) { }

  ngOnInit(): void {
    this.userId=this.globalService.getUserId()
    this.uniqueId=this.globalService.getUniqueId()
    console.log(this.globalService.getUserId())
    this.getUserName();
    
  }
getUserName(){
  this.http.getRequest("http://localhost:8000/user/"+this.userId).then((response:any)=>{
this.name=response.name;
this.getUser();
  }).catch((error:any)=>{
    console.log(error)
  })
}

getUser(){
  this.http.getRequest("http://localhost:3000/user/"+this.uniqueId).then((response:any)=>{

  }).catch((error:any)=>{
    console.log(error)
  })
}

viewEvent(){
  this.router.navigate(["/user/viewEvent"])
}
viewTask(){
  this.router.navigate(["/user/viewTask"])
}
viewProposal(){
  this.router.navigate(["/user/viewProposal"])
}
}
