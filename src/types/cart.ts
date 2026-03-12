export interface AddToCartPayload {
  id: string;
  colorCode: number;
  storageCode: number;
}

export interface AddToCartResponse {
  count: number;
}
