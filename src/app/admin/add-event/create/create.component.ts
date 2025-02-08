import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form:FormGroup;
  candidates:any;
  isClosed:boolean;
  isVoted:boolean;
  votedName:String
  constructor(private http:HttpService, private formbuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.candidates=[];
    this.isClosed=false;
    this.form=this.formbuilder.group({
      name:[,Validators.required],
      desc:[,Validators.required],
      assignedTo:[,Validators.required],
      closingOn:[,Validators.required],
      candidates:[],
      isClosed:[],
      isVoted:[],
      votedName:[],

    })
  }
  back(){
    this.router.navigateByUrl("/admin/addEvent");
  } 
  
create(){
  this.form.controls['candidates'].setValue(this.candidates);
  this.form.controls['isClosed'].setValue(this.isClosed);
  this.form.controls['isVoted'].setValue(this.isVoted);
  this.form.controls['votedName'].setValue("");
  this.http.postRequest("http://localhost:3000/events",this.form.value).then((response:any)=>{
    alert("Created Successfully");
   this.back();
  }).catch((err:HttpErrorResponse)=>{
    console.log(err);
  
  })
  
}

  addCandidate(){
    this.router.navigate(["/admin/addCandidate"])

  }
}
