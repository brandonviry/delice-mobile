/**
 * Types pour le système de localisation du food truck
 */

export interface FoodTruckLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  date: string; // ISO 8601
  startTime: string; // HH:mm
  endTime: string;
  status: LocationStatus;
  description?: string;
  order: number;
}

export enum LocationStatus {
  PASSED = "passed",
  CURRENT = "current",
  UPCOMING = "upcoming",
}

export interface LocationsResponse {
  success: boolean;
  locations: FoodTruckLocation[];
  currentLocation: FoodTruckLocation | null;
  nextLocation: FoodTruckLocation | null;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
