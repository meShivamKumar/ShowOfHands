import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-view-event-admin',
  templateUrl: './view-event-admin.component.html',
  styleUrls: ['./view-event-admin.component.css']
})
export class ViewEventAdminComponent implements OnInit {
event:any;
candidates:any;
id:string;
  constructor(private http:HttpService, private formbuilder:FormBuilder,private route:ActivatedRoute,private router:Router){ }

  ngOnInit(): void {
    this.id="";
    this.event={};
    this.candidates=[];
    this.route.queryParams.subscribe((params: any) => {
      this.id = params["id"];
  
      this.getEvent();
      });
  }

  getEvent(){
    this.http.getRequest("http://localhost:3000/events/"+this.id).then((response:any)=>{
      this.event=response;
      this.candidates=this.event.candidates
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })

  }
  back(){
    this.router.navigateByUrl("/admin/addEvent");
  } 
}
