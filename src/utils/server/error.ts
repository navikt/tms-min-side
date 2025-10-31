export class MultiStatusError extends Error {
    partialContent;

    constructor(message: string, content: any) {
        super(message);
        this.partialContent = content;
    }
}