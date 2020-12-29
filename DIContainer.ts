import "reflect-metadata";

// decorator to donate that the class which uses it can be injected in other classes
export const Injectable = (): ClassDecorator => {
  return () => {};
};

export const ServiceConsumer = Injectable; // use to donate that the class is going to use dependeny injection inside of it

export type ConstructorLike<T> = new (...params: any[]) => T;

export interface DependencyInjectorInterface {
  resolve: <T>(target: ConstructorLike<T>) => T;
}
export class DependencyInjector implements DependencyInjectorInterface {
  cache: { [dependencyName: string]: any } = {}; // cachin already created dependencies

  /* Main method which is used to create the instances*/
  resolve<T>(target: ConstructorLike<T>): T {
    // check if we can resolve it from the cache
    const targetName = this._getNameOfClass(target);
    const targetInCache = this._checkIfCacheContainsDependency(targetName);
    if (targetInCache) {
      return this._getDependencyFromCache(targetName);
    }
    // if not then create the dependency and return it
    return this._createAndCacheDependency(target);
  }

  /* Creating the dependeny and caching it */
  private _createAndCacheDependency<T>(target: ConstructorLike<T>): T {
    const targetName = this._getNameOfClass(target);
    const params: any[] =
      Reflect.getMetadata("design:paramtypes", target) || [];
    const paramsAfterInjection = params.map((param) =>
      this.resolve<any>(param)
    );
    const dependency = new target(...paramsAfterInjection);
    this._cacheDependency(targetName, dependency);
    return dependency;
  }

  /* Caching the dependency */
  private _cacheDependency(targetName: string, dependency: any) {
    this.cache[targetName] = dependency;
  }

  /* Getting the cached dependency */
  private _getDependencyFromCache(targetName: string) {
    return this.cache[targetName];
  }

  /* Check if we already have this dependency in the cache */
  private _checkIfCacheContainsDependency(targetName: string) {
    return this.cache[targetName] !== undefined;
  }

  /* Getting the name of the class that we are using */
  private _getNameOfClass<T>(target: ConstructorLike<T>): string {
    return (target as any).name;
  }
}
