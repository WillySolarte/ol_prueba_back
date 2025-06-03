declare module 'json2csv' {
  export class Parser<T = any> {
    constructor(opts?: {
      fields?: string[];
      delimiter?: string;
    });
    parse(data: T[]): string;
  }
}
