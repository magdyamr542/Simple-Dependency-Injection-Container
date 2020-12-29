import { Injectable, ServiceUser, DependencyInjector } from "./index";

@Injectable()
class LogServiceHelper {
  constructor() {}
  logHelper(stuff: any) {
    console.log("logging stuff inside of the helper and here is the stuff");
    console.log(stuff);
  }
}
@Injectable()
class LogService {
  counter: number = 0;
  constructor(private logHelper: LogServiceHelper) {}
  log(stuff: any) {
    this.logHelper.logHelper(stuff);
  }
  incrementCounter() {
    this.counter++;
  }
  getCounter() {
    return this.counter;
  }
}

@ServiceUser()
class Person {
  constructor(public logger: LogService) {}
}

const injector = new DependencyInjector();
const ahmed: Person = injector.resolve<Person>(Person); // we can see here that we dont need to create the objects our self
console.log(
  "the coutner before incrementing from ahmed",
  ahmed.logger?.getCounter()
);

ahmed.logger?.incrementCounter();
console.log(
  "the coutner after incrementing from ahmed",
  ahmed.logger?.getCounter()
);
const amr: Person = injector.resolve<Person>(Person); // we can see here that we dont need to create the objects our self
console.log(
  "the counter when amr asks for it with caching of dependencies is enabled",
  amr.logger?.getCounter()
);
