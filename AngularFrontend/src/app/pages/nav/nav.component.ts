import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavElement } from 'src/app/models/navelement';
import { NAV_ELEMENTS } from './navelements';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent{

  nav_elements: NavElement[] = NAV_ELEMENTS;

  constructor(private router: Router) { }

  select(element: string) {
    this.router.navigateByUrl(element);
  }

}
