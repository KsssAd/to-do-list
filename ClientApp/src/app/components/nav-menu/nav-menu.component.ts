import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded: boolean = false;
  windowWidth: number = window.innerWidth;
  opened: boolean = false;

  @Output() toggle = new EventEmitter<boolean>();

  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  collapse() {
    this.isExpanded = false;
  }

  onToggleSidebar() {
    this.opened = !this.opened;
    this.toggle.emit(this.opened);
  }

  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }
}
