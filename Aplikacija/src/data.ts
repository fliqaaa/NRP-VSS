import { Ride, Service, Expense, UserProfile, BikeDetails } from './types';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: "janez-novak",
  name: "Janez Novak",
  email: "janez.n@cycling-pro.si",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuALu1MMAssj6LvpiFpnWUS4iZCGGh36mchAO0Awim05Gjm4WspPA-4uZMciyPb7_S2pbo9hTvtTENc7gncZgbdEm8-mkioYgj6NZbvOkQrhQ3We0N-JvMiRukA2NrRjItFstqjiaVbWAhniV5T_jgIye_x5tqC0k0a0P6aeUSUhizch3gKJpLnEVuzeM8gNN2LfLKHaCmG6EESLHAQA7Nm39IRsUIQXzuG0HR4aAPsWUHX3q768QAlENaxNXfIR5rP0ay_NYJd2138",
  tier: "Elite Member"
};

export const INITIAL_BIKE_DETAILS: BikeDetails = {
  brand: "Canyon",
  model: "Endurace CF SL",
  year: 2023,
  frameWeight: "980g (Size L)",
  acquisitionDate: "2023-03-14",
  totalServiceTime: "12.5 hrs",
  groupsetModel: "Shimano Ultegra Di2",
  cassetteSpec: "11-34T 12s",
  cranksetSpec: "52/36T",
  tireModel: "Continental GP5000 S TR",
  tireSize: "700x30c",
  tireHealth: 85,
  chainAgeKm: 1820
};

export const INITIAL_RIDES: Ride[] = [
  {
    id: "ride-1",
    date: "2023-10-24",
    bikeProfile: "Canyon Endurace CF SL",
    distance: 82.4,
    duration: "03:15:20",
    elevation: 1612,
    avgHeartRate: 154,
    calories: 1850,
    notes: "Superb climb up Vršič Pass. Warm weather for October, slightly windy on top.",
    status: "Synced"
  },
  {
    id: "ride-2",
    date: "2023-10-22",
    bikeProfile: "Canyon Endurace CF SL",
    distance: 45.1,
    duration: "01:52:10",
    elevation: 450,
    avgHeartRate: 138,
    calories: 950,
    notes: "Gravel loop around Ljubljana. Tires felt secure, great cadence.",
    status: "Synced"
  },
  {
    id: "ride-3",
    date: "2023-10-15",
    bikeProfile: "Canyon Endurace CF SL",
    distance: 68.0,
    duration: "02:40:00",
    elevation: 820,
    avgHeartRate: 145,
    calories: 1420,
    notes: "Regular training loop via Toško Čelo. Heavy legs but stayed in zone 2.",
    status: "Synced"
  },
  {
    id: "ride-4",
    date: "2023-10-08",
    bikeProfile: "Canyon Endurace CF SL",
    distance: 112.5,
    duration: "04:22:45",
    elevation: 1250,
    avgHeartRate: 142,
    calories: 2350,
    notes: "Sunday endurance ride to Bled and back. Great drafting, stopped for Cremeschnitte.",
    status: "Synced"
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: "srv-1",
    date: "2023-10-24",
    totalKm: 5420,
    type: "Full Tune-up (Seasonal)",
    category: "MAJOR",
    shopName: "Ljubljana Bike Lab",
    notes: "Full drivetrain degrease, cable tensioning, and spoke alignment.",
    cost: 120.00
  },
  {
    id: "srv-2",
    date: "2023-09-12",
    totalKm: 4890,
    type: "Brake Bleed (Rear)",
    category: "HYDRAULIC",
    shopName: "Self Service",
    notes: "Replaced Mineral Oil, adjusted pad contact point.",
    cost: 15.50
  },
  {
    id: "srv-3",
    date: "2023-08-05",
    totalKm: 4120,
    type: "Tire Replacement (GP5000)",
    category: "PARTS",
    shopName: "The Cycle Hub",
    notes: "New Continental GP5000 28mm front and rear. Tubeless setup.",
    cost: 145.00
  },
  {
    id: "srv-4",
    date: "2023-07-18",
    totalKm: 3850,
    type: "Chain Replacement",
    category: "CRITICAL",
    shopName: "Self Service",
    notes: "SRAM Force 12-speed Flattop chain. Waxed with Silca Secret Blend.",
    cost: 65.00
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: "exp-1",
    itemName: "Drivetrain Deep Clean & Tune",
    category: "Maintenance",
    date: "2023-10-24",
    cost: 85.00,
    notes: "LBS - City Cycles standard clean"
  },
  {
    id: "exp-2",
    itemName: "Carbon Wheelset Upgrade",
    category: "Upgrades",
    date: "2023-10-12",
    cost: 1850.00,
    notes: "Zipp 303 Firecrest"
  },
  {
    id: "exp-3",
    itemName: "Winter Thermal Bib Tights",
    category: "Apparel",
    date: "2023-10-05",
    cost: 210.00,
    notes: "MAAP Pro Thermal"
  },
  {
    id: "exp-4",
    itemName: "Chain Waxing Kit",
    category: "Maintenance",
    date: "2023-09-28",
    cost: 45.99,
    notes: "Silca Secret Blend"
  }
];

// Presets for additional profiles
export const INITIAL_BIKE_DETAILS_SPELA: BikeDetails = {
  brand: "Specialized",
  model: "Tarmac SL7 Comp",
  year: 2022,
  frameWeight: "840g (Size S)",
  acquisitionDate: "2022-05-18",
  totalServiceTime: "24.0 hrs",
  groupsetModel: "SRAM Rival eTap AXS",
  cassetteSpec: "10-36T 12s",
  cranksetSpec: "48/35T",
  tireModel: "Specialized Turbo Cotton",
  tireSize: "700x26c",
  tireHealth: 70,
  chainAgeKm: 2450
};

export const INITIAL_RIDES_SPELA: Ride[] = [
  {
    id: "spela-ride-1",
    date: "2023-10-23",
    bikeProfile: "Specialized Tarmac SL7 Comp",
    distance: 54.2,
    duration: "02:10:15",
    elevation: 620,
    avgHeartRate: 148,
    calories: 1200,
    notes: "Quick spin around Ljubljana marshlands. Windy but pleasant.",
    status: "Synced"
  },
  {
    id: "spela-ride-2",
    date: "2023-10-18",
    bikeProfile: "Specialized Tarmac SL7 Comp",
    distance: 91.5,
    duration: "03:45:00",
    elevation: 1100,
    avgHeartRate: 152,
    calories: 1980,
    notes: "Beautiful ride around Lake Bohinj. Climbing felt amazing on the SRAM Rival gearing.",
    status: "Synced"
  }
];

export const INITIAL_SERVICES_SPELA: Service[] = [
  {
    id: "spela-srv-1",
    date: "2023-09-05",
    totalKm: 3400,
    type: "Rear Derailleur Alignment & Hanger Check",
    category: "PARTS",
    shopName: "Elite Bike Ljubljana",
    notes: "Replaced bent derailleur hanger, reset SRAM Rival AXS micro-adjustments.",
    cost: 45.00
  }
];

export const INITIAL_EXPENSES_SPELA: Expense[] = [
  {
    id: "spela-exp-1",
    itemName: "Specialized Turbo Cotton Tires",
    category: "Maintenance",
    date: "2023-08-14",
    cost: 160.00,
    notes: "New gumwall tires"
  }
];

export const INITIAL_BIKE_DETAILS_LUKA: BikeDetails = {
  brand: "Trek",
  model: "Madone SLR 9",
  year: 2024,
  frameWeight: "795g (Size M)",
  acquisitionDate: "2024-01-10",
  totalServiceTime: "8.2 hrs",
  groupsetModel: "Shimano Dura-Ace Di2",
  cassetteSpec: "11-30T 12s",
  cranksetSpec: "54/40T",
  tireModel: "Pirelli P Zero Race",
  tireSize: "700x28c",
  tireHealth: 95,
  chainAgeKm: 580
};

export const INITIAL_RIDES_LUKA: Ride[] = [
  {
    id: "luka-ride-1",
    date: "2023-10-25",
    bikeProfile: "Trek Madone SLR 9",
    distance: 124.0,
    duration: "04:05:10",
    elevation: 1840,
    avgHeartRate: 162,
    calories: 2950,
    notes: "Fast training with the local club. Averaged 30.5 km/h, intense sprints at the end.",
    status: "Synced"
  },
  {
    id: "luka-ride-2",
    date: "2023-10-20",
    bikeProfile: "Trek Madone SLR 9",
    distance: 38.5,
    duration: "01:12:40",
    elevation: 210,
    avgHeartRate: 135,
    calories: 650,
    notes: "Active recovery ride after the big race weekend.",
    status: "Synced"
  }
];

export const INITIAL_SERVICES_LUKA: Service[] = [
  {
    id: "luka-srv-1",
    date: "2023-10-02",
    totalKm: 1200,
    type: "First Free Tune-up",
    category: "MAJOR",
    shopName: "Trek Flagship Ljubljana",
    notes: "Tightened all bolts, checked wheel trueness, adjusted brake pistons.",
    cost: 0.00
  }
];

export const INITIAL_EXPENSES_LUKA: Expense[] = [
  {
    id: "luka-exp-1",
    itemName: "Garmin Edge 1040 Solar",
    category: "Upgrades",
    date: "2023-09-12",
    cost: 749.00,
    notes: "Next-gen bike computer upgrade"
  }
];

export const getInitialDataForProfile = (profileId: string) => {
  switch (profileId) {
    case 'janez-novak':
      return {
        rides: INITIAL_RIDES,
        services: INITIAL_SERVICES,
        expenses: INITIAL_EXPENSES,
        bikeDetails: INITIAL_BIKE_DETAILS
      };
    case 'spela-car':
      return {
        rides: INITIAL_RIDES_SPELA,
        services: INITIAL_SERVICES_SPELA,
        expenses: INITIAL_EXPENSES_SPELA,
        bikeDetails: INITIAL_BIKE_DETAILS_SPELA
      };
    case 'luka-sprinter':
      return {
        rides: INITIAL_RIDES_LUKA,
        services: INITIAL_SERVICES_LUKA,
        expenses: INITIAL_EXPENSES_LUKA,
        bikeDetails: INITIAL_BIKE_DETAILS_LUKA
      };
    default:
      // Return a clean slate for newly created profiles
      return {
        rides: [],
        services: [],
        expenses: [],
        bikeDetails: {
          brand: "Kolo",
          model: "Model",
          year: new Date().getFullYear(),
          frameWeight: "8.5 kg",
          acquisitionDate: new Date().toISOString().split('T')[0],
          totalServiceTime: "0 hrs",
          groupsetModel: "Shimano 105",
          cassetteSpec: "11-34T 11s",
          cranksetSpec: "50/34T",
          tireModel: "Continental Grand Sport",
          tireSize: "700x28c",
          tireHealth: 100,
          chainAgeKm: 0
        }
      };
  }
};
