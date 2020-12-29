import { Injectable } from ".";

@Injectable()
export class LogServiceHelper {
  constructor() {}
  log(key: string, value: any) {
    console.log(`LogServiceHelper is logging: {${key} : ${value}}`);
  }
}

@Injectable()
export class LogService {
  constructor(private logHelper: LogServiceHelper) {}
  log(key: string, value: any) {
    this.logHelper.log(key, value);
  }
}
