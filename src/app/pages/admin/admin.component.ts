import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/admin.service';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getAllUsers().then((querySnapshot) => {
      this.users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    });
  }

  makeAdmin(userId: string) {
    this.userService.grantAdmin(userId).then(() => {
      alert('User granted admin permissions!');
      this.fetchUsers();
    });
  }

  removeUser(userId: string) {
    this.userService.deleteUser(userId).then(() => {
      alert('User deleted successfully!');
      this.fetchUsers();
    });
  }
}
