import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {
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
  console.log(error);
})
}  
details(id:string){
  // this.router.navigateByUrl('detail');
  this.router.navigate(["/user/eventDetail"], {
    queryParams: {
         id:id,
     
    }})

}


}
