export interface JobRequestState {
  job: JobRequest;
  currentStep: number;
}

export interface JobRequest {
  numberOfItem: number;
  items: string[];
  location: Location;
}

export interface Location {
  customerId: string;
  lng: string;
  lat: string;
  state: string;
  city: string;
  address: string;
}
