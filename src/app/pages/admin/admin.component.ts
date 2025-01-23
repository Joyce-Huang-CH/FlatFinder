import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { HeaderComponent } from '../../components/header/header.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MaterialModule, HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})

export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'isAdmin', 'actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      this.dataSource = await this.adminService.getUsersDataSource();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      this.showMessage('Failed to fetch users');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async makeAdmin(userId: string) {
    try {
      await this.adminService.grantAdmin(userId);
      this.showMessage('grant admin success');
      await this.fetchUsers();
    } catch (error) {
      this.showMessage('grant admin failed');
    }
  }

  async removeUser(userId: string) {
    if (confirm('Delete user?')) {
      try {
        await this.adminService.deleteUser(userId);
        this.showMessage('user deleted');
        await this.fetchUsers();
      } catch (error) {
        this.showMessage('delete user failed');
      }
    }
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
