import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../model/users.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {


  @Input('allUsers') allUsers : Users [] = []
  @Output() getUser : EventEmitter<string> = new EventEmitter<string>();
  @Output() userUpdate : EventEmitter<Users> = new EventEmitter<Users>();

  editMode:boolean

  constructor(private userService : UserService, private activatedRoute : ActivatedRoute){

  }

  ngOnInit(): void {
    this.editMode = false
    console.log(this.getUser);

  }

  deleteUser(id:string){
    this.userService.deleteUser(id)
  }

  fetchData(){
    this.userService.getUsers().subscribe((users)=>{
      this.allUsers = users
    })
  }

  editUser(id:string){
    this.getUser.emit(id)
  }

  updateUser(users:Users){
    this.editMode = true
    this.userUpdate.emit(users)
  }
}


