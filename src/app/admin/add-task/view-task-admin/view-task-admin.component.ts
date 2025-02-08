import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-view-task-admin',
  templateUrl: './view-task-admin.component.html',
  styleUrls: ['./view-task-admin.component.css']
})
export class ViewTaskAdminComponent implements OnInit {
completedBy:any;
inProgressBy:any;
task:any;
id:string;
  constructor(private router:Router,private http:HttpService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=''
    this.task={}
    this.completedBy=[];
    this.inProgressBy=[];
    this.route.queryParams.subscribe((params: any) => {
      this.id = params["id"];
  
      this.getTask();
      });
  }
  getTask(){
    this.http.getRequest("http://localhost:3000/task/"+this.id).then((response:any)=>{
      this.task=response;
      this.completedBy=this.task.completedBy;
      this.inProgressBy=this.task.inProgressBy;
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }

  back(){
    this.router.navigateByUrl("/admin/addTask");
  } 

}
