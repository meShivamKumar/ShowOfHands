import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GlobalServiceService } from 'src/app/service/global-service.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
id:string;
  constructor(private route:ActivatedRoute,private http:HttpService,private globalService:GlobalServiceService,private router:Router) { }
task:any;
userTask:any;
user:any;
inProgressBy:any;
completedBy:any;
mainTask:any;
  ngOnInit(): void {
    this.mainTask={};
    this.inProgressBy=[];
    this.completedBy=[]
    this.task={};
    this.user={}
    this.userTask=[]
    this.route.queryParams.subscribe((params: any) => {
      this.id = params["id"];
  
      this.getTask();
      });
      this.getUser();
  }

  back(){
    this.router.navigateByUrl("/user/viewTask");
  }
  getTask(){
    this.http.getRequest("http://localhost:3000/task/"+this.id).then((response:any)=>{
      this.task=response;
      this.inProgressBy=this.task.inProgressBy;
      this.completedBy=this.task.completedBy;
      console.log(this.inProgressBy)
      console.log(this.completedBy);
      
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }

  getUser(){
    this.http.getRequest("http://localhost:3000/user/"+this.globalService.getUniqueId()).then((response:any)=>{
      this.user=response;
      this.userTask=this.user.task
      for( let a of this.userTask){
        if(a.id==this.id){
          this.mainTask=a;
        }
      }
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }

  inProgress(){
    let data={
      inProgress:true,
      isCompleted:false,
      id:this.id,
      name:this.task.name
    }
    this.userTask.push(data);
    this.user.task=this.userTask;
let tmp={
  id:this.globalService.getUniqueId(),
  name:this.user.name
};
this.inProgressBy.push(tmp)
this.task.inProgressBy=this.inProgressBy
console.log(this.user);
console.log(this.task);

    this.http.putRequest("http://localhost:3000/task/"+this.id,this.task).then((response:any)=>{
      this.http.putRequest("http://localhost:3000/user/"+this.globalService.getUniqueId(),this.user).then((response:any)=>{
this.getTask();
this.getUser();
      })

    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }

completed(){
  for(let k of this.userTask){
    if(k.id==this.id){
   let index= this.userTask.indexOf(k);
   console.log(index)
     this.userTask.splice(index,1)
    }
  }
  for(let k of this.inProgressBy){
    if(k.id==this.globalService.getUniqueId()){
      let index= this.inProgressBy.indexOf(k);
      console.log(index)
        this.inProgressBy.splice(index,1)
     
    }
    this.task.inProgressBy=this.inProgressBy;
  }
  let data={
    inProgress:false,
    isCompleted:true,
    id:this.id,
    name:this.task.name
  }
  this.userTask.push(data);
  this.user.task=this.userTask;
let tmp={
id:this.globalService.getUniqueId(),
name:this.user.name
};
this.completedBy.push(tmp)
this.task.completedBy=this.completedBy
console.log(this.user);
console.log(this.task);
this.http.putRequest("http://localhost:3000/task/"+this.id,this.task).then((response:any)=>{
  this.http.putRequest("http://localhost:3000/user/"+this.globalService.getUniqueId(),this.user).then((response:any)=>{
    this.getTask();
    this.getUser();
  })

}).catch((error:HttpErrorResponse)=>{
  console.log(error)
})
}
}
