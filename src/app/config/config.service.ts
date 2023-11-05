import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  restapi='https://api.github.com/users'

  constructor() { }

  private userURL = this.restapi;
    get userUrl():string {return this.userURL}
}
