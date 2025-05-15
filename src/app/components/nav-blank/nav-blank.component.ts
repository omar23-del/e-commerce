import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css',
})
export class NavBlankComponent {
  isNavScrolled: boolean = false;

@HostListener('window:scroll', [])

onWindowScroll() {
  this.isNavScrolled = scrollY > 50
}
}
