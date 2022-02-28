import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../responses/user-response';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserResponse = {
    email: '',
    firstName: '',
    lastName: '',
    creationDate: new Date()
  }
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      {
        next: (data => {
          this.user = data;
        }),
        error: (() => {
          console.log('failed to get the use info');
        })
      }

    );
  }

}
