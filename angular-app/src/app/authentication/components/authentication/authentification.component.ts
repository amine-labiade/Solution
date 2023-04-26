import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  spinnerVisible: boolean = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  authenticate(){
    this.spinnerVisible = true
    setTimeout(() => {this.router.navigate(['']);this.spinnerVisible = false } ,1000)
  }

}
