import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
  //,providers: [LoggingService] //dependency injection. When we need the instance on a higher level, we can declare the Service in this higher component in the provider array instead of here
  //if we declare the Service in each child component as a provider, each child component uses its own Service instance and this we want to avoid in this case

  //we also remove dependency of LoggingService because we will inject it into AccountService
})
export class NewAccountComponent {

  constructor(private loggingService: LoggingService, private accountService: AccountService){ //dependency injection. LoggingService instance not needed here anymore because we
    //injected it into AccountService

    //consume event published by account.component.ts and simply fire an alert every time a status is updated
    this.accountService.statusUpdated.subscribe(
      (status: string) => alert('New Status: '+status)
    );

  }

  onCreateAccount(accountName: string, accountStatus: string) {
    //this.loggingService.logStatusChange(accountStatus);
    //console.log('A server status changed, new status: ' + accountStatus);
    this.accountService.addAccount(accountName, accountStatus);
  }
}
