import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../service/global-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router:Router,private globalService:GlobalServiceService ) { }

  ngOnInit(): void {
  }
logOut(){
  this.globalService.remove();
  this.router.navigateByUrl("login?as=user");

}
}
