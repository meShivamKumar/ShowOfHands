import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})
export class CreateProposalComponent implements OnInit {
  form:FormGroup;
  candidates:any;
  isAccepted:boolean;
  isRejected:boolean;
  votedName:String;
  blankArray:any;
  constructor(private http:HttpService, private formbuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.candidates=[];
    this.blankArray=[]
    this.isAccepted=false;
    this.isRejected=false;
    this.form=this.formbuilder.group({
      title:[,Validators.required],
      desc:[,Validators.required],
      isAccepted:[],
      isRejected:[],
      acceptedBy:[],
      rejectedBy:[]
    

    })
  }
  back(){
    this.router.navigateByUrl("/admin/addProposal");
  } 
  
create(){
  
  this.form.controls['isAccepted'].setValue(this.isAccepted);
  this.form.controls['isRejected'].setValue(this.isRejected);
  this.form.controls['acceptedBy'].setValue(this.blankArray);
  this.form.controls['rejectedBy'].setValue(this.blankArray);
  console.log(this.form.value)
  this.http.postRequest("http://localhost:3000/proposal",this.form.value).then((response:any)=>{
    alert("Created Successfully");
   this.back();
  }).catch((err:HttpErrorResponse)=>{
    console.log(err);
  
  })
  
}

}
