# Simple-Dependency-Injection-Container

### The first Service which uses another helper service

```typescript
@Injectable()
export class LogService {
  constructor(private logHelper: LogServiceHelper) {}

  log(key: string, value: any) {
    this.logHelper.logHelper(key, value); // using the service helper which is also injected
  }
}

@Injectable()
export class LogServiceHelper {
  constructor() {}

  log(key: string, value: any) {
    console.log(`LogServiceHelper is logging: {${key} : ${value}}`);
  }
}
```

### The second Service

```typescript
@Injectable()
export class CounterService {
  constructor() {}

  countFrequency(toCount: string, collection: string[]) {
    let result = 0;
    collection.forEach((item) => {
      if (item === toCount) result++;
    });
    return result;
  }

```

### The Class where we use our injected dependencies

```typescript
// use ServiceConsumer to reflect the metadata of this class
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
}
```

### How to use

```typescript
const injector = new DependencyInjector();
const personCollection = injector.resolve<PersonCollection>(PersonCollection); // this will resolve all of the inner dependencies recursively
personCollection.countPersonFrequencyAndPrint("bob", [
  "bob",
  "sam",
  "saly",
  "bob",
]);
```

### Output

```typescript
"LogServiceHelper is logging: { list of names is  : bob,sam,saly,bob }";
"LogServiceHelper is logging: {frequency of bob : 2}";
```

### Conclusion

use to decouple your services from the classes which use them for better testing and reusability
