# Simple-Dependency-Injection-Container

```typescript
@ServiceUser()
class Person {
  constructor(public logger: LogService) {}
}

@Injectable()
class LogService {
  constructor(private logHelper: LogServiceHelper, otherServices: any) {}

  log(stuff: any) {
    this.logHelper.logHelper(stuff);
  }
}

// Usage
const injector = new DependencyInjector();
const someone = injector.resolve<Person>(Person);
```
