import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-candidates',
  templateUrl: './add-candidates.component.html',
  styleUrls: ['./add-candidates.component.css']
})
export class AddCandidatesComponent implements OnInit {
id:string;
  form:FormGroup;
  candidates:any;
  isClosed:boolean;
  event:any;
  constructor(private http:HttpService, private formbuilder:FormBuilder,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.candidates=[];
    this.event=[]
    this.route.queryParams.subscribe((params: any) => {
      this.id = params["id"];
  
      this.getEvent();
      });
   
    this.isClosed=false;
    this.form=this.formbuilder.group({
      name:[,Validators.required],
      gender:[,Validators.required],
     totalVotes:[0]
    })
  }
  back(){
    this.router.navigateByUrl("/admin/addEvent");
  } 
  getEvent(){
    this.http.getRequest("http://localhost:3000/events/"+this.id).then((response:any)=>{
      this.event=response;
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }
addCandidate(){
  this.event.candidates.push(this.form.value);
  console.log(this.event)
  this.http.putRequest("http://localhost:3000/events/"+this.id,this.event).then((response:any)=>{
 alert("ADDED SUCCESSFULLY!!");
 this.router.navigateByUrl("/admin/addEvent");

  }).catch((error:HttpErrorResponse)=>{
    console.log(error)
  })

  }


  }

