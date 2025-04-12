import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { on } from 'node:events';

@Component({
  selector: 'app-online-friends',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './online-friends.component.html',
  styleUrls: ['./online-friends.component.css']
})
export class OnlineFriendsComponent {
  friends = [
    { name: 'Ali mohamed', image: 'https://randomuser.me/api/portraits/men/75.jpg',online: true },
    { name: 'Sara ali', image: 'https://randomuser.me/api/portraits/women/45.jpg',online: true },
    { name: 'Youssef abdo', image: 'https://randomuser.me/api/portraits/men/35.jpg',online: true },
  ];
}
