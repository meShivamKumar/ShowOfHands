import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route:Router,private http:HttpService) { }
events:any
  ngOnInit(): void {
    this.events=[]
    this.getEvents();
  }
redirectAs(type:string){
  this.route.navigate(["login"], {
    queryParams: { as: type},
  });
}

getService(){
  this.route.navigateByUrl("getService");
}
register(){
  this.route.navigateByUrl("register");
}
getEvents(){
  this.http.getRequest("http://localhost:3000/events").then((response:any)=>{
    this.events=response;
  }).catch((error:HttpErrorResponse)=>{
    console.log(error)
  })
}

}
