import { Injectable } from ".";

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
}
