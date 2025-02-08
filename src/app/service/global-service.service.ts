import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  public user_id: string;
  public user: string;
  public uniqueId: string;
  constructor() { }

getUniqueId(){
  return this.uniqueId;
}
  getUserId() {
    return this.user_id;
  } 

  getUser() {
    return this.user;
  } 

 
  setInformation(
    user_id: string,
    user: string,
    uniqueId:string
    
  ) {
    this.user_id = user_id;
    this.user=user;
    this.uniqueId=uniqueId
  }

  remove() {
  
    this.user = '';
    this.user_id = '';
    this.uniqueId = '';
  } 
}
