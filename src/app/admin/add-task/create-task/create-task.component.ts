import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  form:FormGroup;
  candidates:any;
  inProgress:boolean;
  isCompleted:boolean;
  votedName:String
  blankArray:any;
  constructor(private http:HttpService, private formbuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.blankArray=[];
    this.candidates=[];
    this.isCompleted=false;
    this.inProgress=false;
    this.form=this.formbuilder.group({
      name:[,Validators.required],
      desc:[,Validators.required],
      assignedTo:[,Validators.required],
      assignedDate:[,Validators.required],
      dueDate:[],
      inProgress:[],
      isCompleted:[],
      inProgressBy:[],
      completedBy:[],
    

    })
  }
  back(){
    this.router.navigateByUrl("/admin/addTask");
  } 
  
create(){
  
  this.form.controls['isCompleted'].setValue(this.isCompleted);
  this.form.controls['inProgress'].setValue(this.inProgress);
  this.form.controls['completedBy'].setValue(this.blankArray);
  this.form.controls['inProgressBy'].setValue(this.blankArray);
  
  console.log(this.form.value)
  this.http.postRequest("http://localhost:3000/task",this.form.value).then((response:any)=>{
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
