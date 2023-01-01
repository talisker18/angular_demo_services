import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  //,providers: [AccountService] //dependency injection. See comment in new-account and account.component.ts: here we define the Service on a higher component level so new-account and
  //account.component are using the same service instance (because we definded the service as a provider here in the app component)

  //but there is another, higher level: app.module, so move it there
})
export class AppComponent implements OnInit {
  accounts: {name: string, status: string} [] = [];

  constructor(private accountService: AccountService){

  }
  
  ngOnInit(){
    this.accounts = this.accountService.accounts;
  }
}
