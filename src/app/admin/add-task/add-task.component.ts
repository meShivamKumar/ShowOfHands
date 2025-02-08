import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
task:any;
  constructor(private http:HttpService,private router:Router) { }

  ngOnInit(): void {
    this.task=[];
    this.getTask();
  }
getTask(){
  this.http.getRequest("http://localhost:3000/task").then((response:any)=>{
    this.task=response;
  }).catch((error:HttpErrorResponse)=>{
    console.log(error)
  })
}
addTask(){
  this.router.navigate(["/admin/createTask"])
} 
deleteTask(id:string){
  this.http.deleteRequest("http://localhost:3000/task/"+id).then((response:any)=>{
    this.getTask();
  }).catch((error:HttpErrorResponse)=>{
    console.log(error)
  })
} 

viewTask(id:string){
  
    this.router.navigate(["/admin/viewTaskAdmin"],
    {
      queryParams: {
           id:id,
       
      }})

  

}
}
