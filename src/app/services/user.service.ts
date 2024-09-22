import { Injectable } from '@angular/core';
import { DUMMY_TASKS } from '../../dummy-tasks';
import { DUMMY_USERS } from '../../dummy-users';

export interface User {
  id: string,
  avatar: string, 
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  findUserById(id: string){
    const user = DUMMY_USERS.find(user=> user.id == id)
    return user
  }

}
