export class MultiStatusError extends Error {
  partialData;

  constructor(message: string, partialData: any) {
    super(message);
    this.partialData = partialData;
  }
}
