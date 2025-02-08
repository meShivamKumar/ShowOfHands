import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
task:any;
  constructor(private http:HttpService, private router:Router) { }

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

details(id:string){
  // this.router.navigateByUrl('detail');
  this.router.navigate(["/user/detail"], {
    queryParams: {
         id:id,
     
    }})

}


}
