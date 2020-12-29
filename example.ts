import { CounterService } from "./counter.service";
import { ServiceConsumer, DependencyInjector } from "./DIContainer";
import { LogService } from "./log.service";

@ServiceConsumer()
class PersonCollection {
  constructor(
    private readonly logger: LogService,
    private readonly counter: CounterService
  ) {}
  countPersonFrequencyAndPrint(personName: string, listOfNames: string[]) {
    const frequency = this.counter.countFrequency(personName, listOfNames);
    this.logger.log("list of names is ", listOfNames);
    this.logger.log(`frequency of ${personName}`, frequency);
  }
}

const injector = new DependencyInjector();
const personCollection = injector.resolve<PersonCollection>(PersonCollection); // we can see here that we dont need to create the objects our self
personCollection.countPersonFrequencyAndPrint("bob", [
  "bob",
  "sam",
  "saly",
  "bob",
]);
