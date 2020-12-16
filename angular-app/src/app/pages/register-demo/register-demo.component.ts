import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-register-demo',
  templateUrl: './register-demo.component.html',
  styleUrls: ['./register-demo.component.css'],
})
export class RegisterDemoComponent implements OnInit {
  public user: any = {};
  constructor(private mainService: MainService) {}

  ngOnInit(): void {}

  register() {
    this.mainService.registerDemoAPI(this.user).subscribe((response) => {
      console.log(response);
    });
  }
}
