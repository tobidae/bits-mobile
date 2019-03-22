export class Case {
  $key?: string;
  caseId?: string;
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
  dimensions: {
    depth: string,
    width: string,
    length: string
  };
}


export class PastOrder {
  $key?: string;
  caseId: string;
  fulfillTimestamp: string;
  foundCaseTimestamp: string;
  orderFulfilled: string;
  kartReceivedOrder: string;
  completedByKart: string;
  isTransporting: string;
  scannedByUser: string;
}
