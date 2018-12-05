export class Case {
  $key?: string;
  name: string;
  description: string;
  imageUrl: string;
  maxHoldTime: number | string;
  lastLocation: string;
  datasheetUrl: string;
  color: string;
  category: string;
  isAvailable: boolean | string;
  mass: number | string;
  rfid: string;
  tags: string;
  tagsArr?: string[];
}
