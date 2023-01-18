import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Users } from '../model/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) {
  }

  addUser(users: Users) {
    this.http.post('https://bootcamp-a1a1d-default-rtdb.firebaseio.com/users.json', users).subscribe()
  }

  getUsers() {
    return this.http.get<{[key:string]:Users}>('https://bootcamp-a1a1d-default-rtdb.firebaseio.com/users.json')
    .pipe(map((res)=>{
      const users = []
      for(const key in res){
        if(res.hasOwnProperty(key)){
          users.push({...res[key], id:key})
        }
      }
      return users
    }))
  }

  updateUser(id:string, users:Users){
    this.http.put('https://bootcamp-a1a1d-default-rtdb.firebaseio.com/users/'+id+'.json', users).subscribe()
  }

  deleteUser(id:string){
    this.http.delete('https://bootcamp-a1a1d-default-rtdb.firebaseio.com/users/'+id+'.json').subscribe()
  }

}
