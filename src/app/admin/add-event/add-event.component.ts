import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
events:any;
  constructor(private http:HttpService,private router:Router) { }

  ngOnInit(): void {
    this.events=[];
    this.getEvents();
  }

  getEvents(){
    this.http.getRequest("http://localhost:3000/events").then((response:any)=>{
      this.events=response;
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }

  deleteEvent(id:string){
    this.http.deleteRequest("http://localhost:3000/events/"+id).then((response:any)=>{
      this.getEvents();
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }

  addEvent(){
    this.router.navigate(["/admin/create"])

  }
  viewEvent(id:string){
    this.router.navigate(["/admin/viewEvent"],
    {
      queryParams: {
           id:id,
       
      }})

  }

  addCandidate(id:string){
    this.router.navigate(["/admin/addCandidate"],
    {
      queryParams: {
           id:id,
       
      }})

  }
}
