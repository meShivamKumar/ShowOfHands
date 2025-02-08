
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { GlobalServiceService } from '../service/global-service.service';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;
  blankArray:any;
  dummy:any;
  constructor(private http:HttpService, private formbuilder:FormBuilder,private router:Router,private globalService:GlobalServiceService) { }

  ngOnInit(): void {
    this.blankArray=[];
    this.dummy={}
    this.form=this.formbuilder.group({
     UniqueId:[,Validators.required],
      name:[,Validators.required],
      email:[,Validators.required],
      Department:[,Validators.required],
      password:[,Validators.required],
      event:[],
      task:[],
      proposal:[]

    })
   
  }
  back(){
    this.router.navigateByUrl("");
  } 
  
register(){

  this.http.postRequest("http://localhost:8000/user/register",this.form.value).then((response:any)=>{
    this.dummy=this.form.value;
    this.registerLocally();
  }).catch((err:HttpErrorResponse)=>{
    console.log(err);
  
  })
  
}

registerLocally(){
  this.dummy.event=this.blankArray;
  this.dummy.task=this.blankArray;
  this.dummy.proposal=this.blankArray;
  this.dummy.id=this.form.value.UniqueId
  // this.form.controls['task'].setValue(this.blankArray);
  // this.form.controls['proposal'].setValue(this.blankArray);
  this.http.postRequest("http://localhost:3000/user",this.dummy).then((response:any)=>{
    alert("Registered Successfully");
    this.router.navigateByUrl("/login?as=user");
  }).catch((err:HttpErrorResponse)=>{
    console.log(err);
  
  })
}
}
