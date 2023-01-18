import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../model/users.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  users : Users[] = []
  currentUserId : any
  currentUser : any

  constructor(private userService : UserService, private activatedRoute : ActivatedRoute){

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.currentUserId = params.get('id')

      this.userService.getUsers().subscribe((users)=>{
        this.users = users

        this.currentUser = this.users.find((p)=>{
          return p.id == this.currentUserId


        })
        console.log(this.currentUser);
      })

    })
  }

}
