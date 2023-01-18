import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../model/users.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  // alert : boolean
  editMode : boolean
  currentUserId : any
  userForm : FormGroup
  allUsers : Users [] = []
  currentUser : any

  constructor(private userService : UserService, private activatedRoute : ActivatedRoute, private router : Router){

  }

  ngOnInit(): void {
    this.editMode = false
    // this.alert = false
    this.getAllUser()
    this.userForm = new FormGroup({
      userName : new FormControl('', Validators.required),
      userEmail : new FormControl('', [Validators.required, Validators.email]),
      userContact : new FormControl('', [Validators.required, Validators.minLength(12)]),
    })

  }

  addUser(users:Users){

    if(!this.editMode){
      this.userService.addUser(users)
      // this.alert = true
      alert('User added successfully')
      this.userForm.reset()
    }else{
      this.updateUser(users)
    }

    // console.log(users);
  }

  getAllUser(){
    return this.activatedRoute.paramMap.subscribe((params)=>{
      this.currentUserId = params.get('id')
      this.userService.getUsers().subscribe((users)=>{
        this.allUsers  = users
      })
    })
  }

  getUser(id:string){
    this.editMode = true
    this.currentUserId = id
    this.activatedRoute.paramMap.subscribe(()=>{
      this.userService.getUsers().subscribe((users)=>{
        this.allUsers = users

        this.currentUser = this.allUsers.find((p)=>{
          return p.id == id
        })
        // console.log(this.currentUser);

        this.userForm.setValue({
          userName : this.currentUser.userName,
          userEmail : this.currentUser.userEmail,
          userContact : this.currentUser.userContact
        })
      })
    })
  }

  updateUser(users:Users){
    this.userService.updateUser(this.currentUserId,users)
    this.editMode = true
    alert('User updated successfully')
    this.userForm.reset()
  }
}
