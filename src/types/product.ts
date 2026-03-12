export interface ApiProduct {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
}

export interface ApiProductDetails extends ApiProduct {
  networkTechnology: string;
  networkSpeed: string;
  gprs: string;
  edge: string;
  announced: string;
  status: string;
  dimentions: string; 
  weight: string;
  sim: string;
  displayType: string;
  displayResolution: string;
  displaySize: string;
  os: string;
  cpu: string;
  chipset: string;
  gpu: string;
  externalMemory: string;
  internalMemory: string[];
  ram: string;
  primaryCamera: string | string[];
  secondaryCmera: string | string[]; // Kept as secondaryCmera due to API typo
  speaker: string;
  audioJack: string;
  wlan: string | string[]; // Arrays according to Postman payload
  bluetooth: string | string[];
  gps: string;
  nfc: string;
  radio: string;
  usb: string;
  sensors: string | string[];
  battery: string;
  colors: string[];
  options: {
    colors: {
      code: number;
      name: string;
    }[];
    storages: {
      code: number;
      name: string;
    }[];
  };
}
