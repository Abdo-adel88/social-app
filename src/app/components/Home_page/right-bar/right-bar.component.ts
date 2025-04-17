import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-right-bar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, AvatarModule, RippleModule, CommonModule],
  templateUrl: './right-bar.component.html',
  styleUrl: './right-bar.component.css'
})
export class RightBarComponent {
  sidebarVisible: boolean = true;

  favoritesOpen: boolean = true;
  applicationOpen: boolean = true;

  userName: string = 'Amy Elsner';

  favorites = [
    { label: 'Dashboard', icon: 'pi pi-home' },
    { label: 'Bookmarks', icon: 'pi pi-bookmark' },
    { label: 'Reports', icon: 'pi pi-chart-line' },
    { label: 'Team', icon: 'pi pi-users' },
    { label: 'Messages', icon: 'pi pi-comments' },
    { label: 'Calendar', icon: 'pi pi-calendar' },
    { label: 'Settings', icon: 'pi pi-cog' },
  ];

  applications = [
    { label: 'Projects', icon: 'pi pi-folder' },
    { label: 'Performance', icon: 'pi pi-chart-bar' },
    { label: 'Settings', icon: 'pi pi-cog' },
  ];

  toggleFavorites() {
    this.favoritesOpen = !this.favoritesOpen;
  }

  toggleApplication() {
    this.applicationOpen = !this.applicationOpen;
  }

  openSidebar() {
    this.sidebarVisible = true;
  }

  closeSidebar() {
    this.sidebarVisible = false;
  }
}
