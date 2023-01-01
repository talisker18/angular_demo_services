import { Component, Input } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { AccountService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
  //,providers: [LoggingService] //dependency injection. When we need the instance on a higher level, we can declare the Service in this higher component in the provider array instead of here
  //if we declare the Service in each child component as a provider, each child component uses its own Service instance and this we want to avoid in this case

  //we also remove dependency of LoggingService because we will inject it into AccountService
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private loggingService: LoggingService, private accountService: AccountService){ //dependency injection. LoggingService instance not needed here anymore because we
    //injected it into AccountService

  }

  onSetTo(status: string) {
    //console.log('A server status changed, new status: ' + status);
    //this.loggingService.logStatusChange(status);
    this.accountService.updateStatus(this.id, status);
    //alternative: emit the event defined in account.service.ts
    this.accountService.statusUpdated.emit(status); //publish event, new-account.component will consume the event
  }
}
