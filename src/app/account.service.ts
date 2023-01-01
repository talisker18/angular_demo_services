import { Injectable, EventEmitter } from "@angular/core";
import { LoggingService } from "./logging.service";


/**
 * ------------------different way of inection---------------------
 * 
 * 
 * 
 * If you're using Angular 6+ (check your package.json  to find out), you can provide application-wide services in a different way.

Instead of adding a service class to the providers[]  array in AppModule , you can set the following config in @Injectable() :

    @Injectable({providedIn: 'root'})
    export class MyService { ... }

This is exactly the same as:

    export class MyService { ... }

and

    import { MyService } from './path/to/my.service';
     
    @NgModule({
        ...
        providers: [MyService]
    })
    export class AppModule { ... }

Using this syntax is completely optional, the traditional syntax (using providers[] ) will also work.

The "new syntax" does offer one advantage though: Services can be loaded lazily by Angular (behind the scenes) and redundant code can be removed automatically. 
This can lead to a better performance and loading speed - though this really only kicks in for bigger services and apps in general.
 * 
 * 
 */


@Injectable() //this means that another dependency can be injected HERE, into this AccountService. In our case we inject LoggingService. Dont forget to declare the LoggingService
//here as provider or, better, in the app.modile.ts
export class AccountService{
    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
      ];

      statusUpdated = new EventEmitter<string>(); //for cross component communication: this event is published by account.component and consumed by new-account.component. 
      //So we can communicate between these components

      //inject another service
      constructor(private loggingService: LoggingService){}

      addAccount(name: string, status: string){
        this.accounts.push({name: name, status: status});
        this.loggingService.logStatusChange(status);
      }

      updateStatus(index: number, status: string){
        this.accounts[index].status = status;
        this.loggingService.logStatusChange(status);
      }
}