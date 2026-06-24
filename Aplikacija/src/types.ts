export interface Ride {
  id: string;
  date: string;
  bikeProfile: string;
  distance: number; // always stored in km internally
  duration: string; // HH:MM:SS
  elevation: number; // always stored in meters
  avgHeartRate: number;
  calories: number;
  notes: string;
  status: 'Synced' | 'Pending';
}

export interface Service {
  id: string;
  date: string;
  totalKm: number;
  type: string;
  category: 'MAJOR' | 'HYDRAULIC' | 'PARTS' | 'CRITICAL';
  shopName: string;
  notes: string;
  cost: number;
}

export interface Expense {
  id: string;
  itemName: string;
  category: 'Maintenance' | 'Upgrades' | 'Apparel';
  date: string;
  cost: number;
  notes: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string; // URL or preset
  tier: string;
  username?: string;
  password?: string;
}

export interface BikeDetails {
  brand: string;
  model: string;
  year: number;
  frameWeight: string;
  acquisitionDate: string;
  totalServiceTime: string;
  groupsetModel: string;
  cassetteSpec: string;
  cranksetSpec: string;
  tireModel: string;
  tireSize: string;
  tireHealth: number; // percentage, e.g. 85
  chainAgeKm: number; // km since install
}

export type ScreenType = 'dashboard' | 'add-ride' | 'services' | 'my-bike' | 'costs' | 'settings';

export type UnitSystem = 'metric' | 'imperial';
