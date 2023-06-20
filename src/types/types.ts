export interface StringDict {
  [key: string]: string;
}

export interface Countries {
  [key: string]: { latitude: number; longitude: number; name: string };
}
