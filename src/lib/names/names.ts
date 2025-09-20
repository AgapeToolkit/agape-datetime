

export abstract class Names {

  protected abstract _long?: readonly string[];

  protected abstract _short?: readonly string[];

  protected abstract _narrow?: readonly string[];

  public abstract readonly locale: string;

  abstract get long(): readonly string[];

  abstract get short(): readonly string[];

  abstract get narrow(): readonly string[];
}