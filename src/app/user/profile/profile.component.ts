import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from 'src/app/service/global-service.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
gender:string;
name:string;
userId:string;
email:string;
uniqueId:string;
dept:string;
  constructor(private http:HttpService,private globalService:GlobalServiceService) { }

  ngOnInit(): void {
    this.gender='male'
    this.userId=this.globalService.getUserId()
    console.log(this.globalService.getUserId())
    this.getUserName();
    
  }
getUserName(){
  this.http.getRequest("http://localhost:8000/user/"+this.userId).then((response:any)=>{
this.name=response.name;
this.email=response.email;
this.dept=response.Department;
this.uniqueId=response.UniqueId;
  }).catch((error:any)=>{
    console.log(error)
  })
}

  }


