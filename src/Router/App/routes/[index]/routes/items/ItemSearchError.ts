export type ItemSearchErrorProperties = {
  hostname: string;
  message: string;
}

export default class ItemSearchError extends Error {

  hostname: string;

  constructor({message, hostname}: ItemSearchErrorProperties) {

    super(message);
    this.hostname = hostname;

  }
  
}