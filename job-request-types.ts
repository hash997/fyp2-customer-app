import { Customer, Worker } from "./src/API";

export interface JobRequestState {
  job: JobRequest;
  currentStep: number;
  workers: Worker[] | [];
}
export interface AuthState {
  user: Customer | undefined;
  congnitoUser: any;
}

export interface JobRequest {
  title: string;
  description: string;
  bookingType: BookingType;
  numberOfItem: number;
  items: string[];
  location: Location;
  worker?: WorkerDetails;
  isUrgent: boolean | undefined;
  preferedTime: string | null;
}

export interface WorkerDetails {
  firstName: string;
  lastName: string;
  hourlyRate: number;
}

export enum BookingType {
  urgent = "URGENT",
  pickWorker = "PICK_WORKER",
}

export interface Location {
  customerId: string;
  lng: string;
  lat: string;
  state: string;
  city: string;
  address: string;
}
