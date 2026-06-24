import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenType, Ride, Service, Expense, UserProfile, BikeDetails, UnitSystem } from './types';
import {
  INITIAL_RIDES,
  INITIAL_SERVICES,
  INITIAL_EXPENSES,
  INITIAL_USER_PROFILE,
  INITIAL_BIKE_DETAILS,
  getInitialDataForProfile
} from './data';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardScreen from './components/DashboardScreen';
import AddRideScreen from './components/AddRideScreen';
import ServicesScreen from './components/ServicesScreen';
import MyBikeScreen from './components/MyBikeScreen';
import CostsScreen from './components/CostsScreen';
import SettingsScreen from './components/SettingsScreen';
import LoginScreen from './components/LoginScreen';

export default function App() {
  // 1. Core Reactive States with local storage hydration
  const [activeScreen, setActiveScreen] = useState<ScreenType>(() => {
    const hash = window.location.hash.replace('#', '');
    return (hash as ScreenType) || 'dashboard';
  });

  // Profiles list
  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('kolesardnevnik_profiles');
    if (saved) {
      return JSON.parse(saved);
    } else {
      const initialProfilesList: UserProfile[] = [
        {
          id: "janez-novak",
          username: "janez",
          password: "123",
          name: "Janez Novak",
          email: "janez.n@cycling-pro.si",
          avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuALu1MMAssj6LvpiFpnWUS4iZCGGh36mchAO0Awim05Gjm4WspPA-4uZMciyPb7_S2pbo9hTvtTENc7gncZgbdEm8-mkioYgj6NZbvOkQrhQ3We0N-JvMiRukA2NrRjItFstqjiaVbWAhniV5T_jgIye_x5tqC0k0a0P6aeUSUhizch3gKJpLnEVuzeM8gNN2LfLKHaCmG6EESLHAQA7Nm39IRsUIQXzuG0HR4aAPsWUHX3q768QAlENaxNXfIR5rP0ay_NYJd2138",
          tier: "Elite Member"
        },
        {
          id: "spela-car",
          username: "spela",
          password: "123",
          name: "Špela Car",
          email: "spela.c@cycling-pro.si",
          avatar: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&q=80&w=150",
          tier: "Elite Member"
        },
        {
          id: "luka-sprinter",
          username: "luka",
          password: "123",
          name: "Luka Šprinter",
          email: "luka.s@cycling-pro.si",
          avatar: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=150",
          tier: "Elite Member"
        }
      ];
      localStorage.setItem('kolesardnevnik_profiles', JSON.stringify(initialProfilesList));
      return initialProfilesList;
    }
  });

  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    const saved = localStorage.getItem('kolesardnevnik_active_profile_id');
    return saved || 'janez-novak';
  });

  const [rides, setRides] = useState<Ride[]>(() => {
    const activeId = localStorage.getItem('kolesardnevnik_active_profile_id') || 'janez-novak';
    const saved = localStorage.getItem(`kolesardnevnik_rides_${activeId}`);
    return saved ? JSON.parse(saved) : getInitialDataForProfile(activeId).rides;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const activeId = localStorage.getItem('kolesardnevnik_active_profile_id') || 'janez-novak';
    const saved = localStorage.getItem(`kolesardnevnik_services_${activeId}`);
    return saved ? JSON.parse(saved) : getInitialDataForProfile(activeId).services;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const activeId = localStorage.getItem('kolesardnevnik_active_profile_id') || 'janez-novak';
    const saved = localStorage.getItem(`kolesardnevnik_expenses_${activeId}`);
    return saved ? JSON.parse(saved) : getInitialDataForProfile(activeId).expenses;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const activeId = localStorage.getItem('kolesardnevnik_active_profile_id') || 'janez-novak';
    const saved = localStorage.getItem(`kolesardnevnik_profile_${activeId}`);
    if (saved) return JSON.parse(saved);
    
    // Look up in profiles
    const savedProfiles = localStorage.getItem('kolesardnevnik_profiles');
    const profilesList = savedProfiles ? JSON.parse(savedProfiles) : [];
    const found = profilesList.find((p: any) => p.id === activeId);
    return found || { id: 'janez-novak', ...INITIAL_USER_PROFILE };
  });

  const [bikeDetails, setBikeDetails] = useState<BikeDetails>(() => {
    const activeId = localStorage.getItem('kolesardnevnik_active_profile_id') || 'janez-novak';
    const saved = localStorage.getItem(`kolesardnevnik_bike_${activeId}`);
    return saved ? JSON.parse(saved) : getInitialDataForProfile(activeId).bikeDetails;
  });

  const [unitSystem, setUnitSystem] = useState<UnitSystem>(() => {
    const saved = localStorage.getItem('kolesardnevnik_unit_system');
    return saved ? (saved as UnitSystem) : 'metric';
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('kolesardnevnik_is_logged_in');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('kolesardnevnik_is_logged_in', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  // 2. Synchronize Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveScreen(hash as ScreenType);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when screen state changes
  useEffect(() => {
    window.location.hash = activeScreen;
  }, [activeScreen]);

  // 3. Persistent LocalStorage Syncs
  useEffect(() => {
    localStorage.setItem(`kolesardnevnik_rides_${activeProfileId}`, JSON.stringify(rides));
  }, [rides, activeProfileId]);

  useEffect(() => {
    localStorage.setItem(`kolesardnevnik_services_${activeProfileId}`, JSON.stringify(services));
  }, [services, activeProfileId]);

  useEffect(() => {
    localStorage.setItem(`kolesardnevnik_expenses_${activeProfileId}`, JSON.stringify(expenses));
  }, [expenses, activeProfileId]);

  useEffect(() => {
    localStorage.setItem(`kolesardnevnik_profile_${activeProfileId}`, JSON.stringify(userProfile));
  }, [userProfile, activeProfileId]);

  useEffect(() => {
    localStorage.setItem(`kolesardnevnik_bike_${activeProfileId}`, JSON.stringify(bikeDetails));
  }, [bikeDetails, activeProfileId]);

  useEffect(() => {
    localStorage.setItem('kolesardnevnik_active_profile_id', activeProfileId);
  }, [activeProfileId]);

  useEffect(() => {
    localStorage.setItem('kolesardnevnik_unit_system', unitSystem);
  }, [unitSystem]);

  // 4. Action Handlers
  const handleAddRide = (newRide: Omit<Ride, 'id' | 'status'>) => {
    const rideWithId: Ride = {
      ...newRide,
      id: `ride-${Date.now()}`,
      status: 'Synced'
    };
    
    // Add ride
    setRides(prev => [rideWithId, ...prev]);

    // Accumulate chain age distance
    setBikeDetails(prev => ({
      ...prev,
      chainAgeKm: prev.chainAgeKm + newRide.distance
    }));
  };

  const handleAddService = (newService: Omit<Service, 'id'>) => {
    const srvWithId: Service = {
      ...newService,
      id: `srv-${Date.now()}`
    };
    setServices(prev => [srvWithId, ...prev]);
  };

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expWithId: Expense = {
      ...newExpense,
      id: `exp-${Date.now()}`
    };
    setExpenses(prev => [expWithId, ...prev]);
  };

  const handleReplaceChain = () => {
    // 1. Reset chain age in local storage
    setBikeDetails(prev => ({
      ...prev,
      chainAgeKm: 0
    }));

    // 2. Automatically log a corresponding service expense
    const chainService: Service = {
      id: `srv-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      totalKm: Math.round(rides.reduce((sum, r) => sum + r.distance, 0)),
      type: 'Chain Replacement & Waxing',
      category: 'CRITICAL',
      shopName: 'Self Service',
      notes: 'Chain age threshold reached. Replaced with Shimano 12s, hot melt paraffin waxed.',
      cost: 65.00
    };
    setServices(prev => [chainService, ...prev]);
  };

  const handleSelectProfile = (profileId: string) => {
    // 1. Save CURRENT profile's states to LocalStorage before switching
    localStorage.setItem(`kolesardnevnik_rides_${activeProfileId}`, JSON.stringify(rides));
    localStorage.setItem(`kolesardnevnik_services_${activeProfileId}`, JSON.stringify(services));
    localStorage.setItem(`kolesardnevnik_expenses_${activeProfileId}`, JSON.stringify(expenses));
    localStorage.setItem(`kolesardnevnik_profile_${activeProfileId}`, JSON.stringify(userProfile));
    localStorage.setItem(`kolesardnevnik_bike_${activeProfileId}`, JSON.stringify(bikeDetails));

    // 2. Load NEW profile's states from LocalStorage or fallback to initial data
    const newRidesSaved = localStorage.getItem(`kolesardnevnik_rides_${profileId}`);
    const nextRides = newRidesSaved ? JSON.parse(newRidesSaved) : getInitialDataForProfile(profileId).rides;

    const newServicesSaved = localStorage.getItem(`kolesardnevnik_services_${profileId}`);
    const nextServices = newServicesSaved ? JSON.parse(newServicesSaved) : getInitialDataForProfile(profileId).services;

    const newExpensesSaved = localStorage.getItem(`kolesardnevnik_expenses_${profileId}`);
    const nextExpenses = newExpensesSaved ? JSON.parse(newExpensesSaved) : getInitialDataForProfile(profileId).expenses;

    const newProfileSaved = localStorage.getItem(`kolesardnevnik_profile_${profileId}`);
    let nextProfile = newProfileSaved ? JSON.parse(newProfileSaved) : null;
    if (!nextProfile) {
      const found = profiles.find(p => p.id === profileId);
      nextProfile = found || { id: profileId, name: "Neznanec", email: "neznanec@cycling-pro.si", avatar: "", tier: "Standard Member" };
    }

    const newBikeSaved = localStorage.getItem(`kolesardnevnik_bike_${profileId}`);
    const nextBike = newBikeSaved ? JSON.parse(newBikeSaved) : getInitialDataForProfile(profileId).bikeDetails;

    // 3. Batch state updates together
    setRides(nextRides);
    setServices(nextServices);
    setExpenses(nextExpenses);
    setUserProfile(nextProfile);
    setBikeDetails(nextBike);
    setActiveProfileId(profileId);
    localStorage.setItem('kolesardnevnik_active_profile_id', profileId);
  };

  const handleCreateProfile = (name: string, email: string, username: string, password: string) => {
    const newId = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();
    const newProfile: UserProfile = {
      id: newId,
      name,
      email,
      username,
      password,
      avatar: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&q=80&w=150",
      tier: "Elite Member"
    };

    // 1. Add to profiles list
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('kolesardnevnik_profiles', JSON.stringify(updatedProfiles));

    // 2. Automatically switch to the newly created profile
    handleSelectProfile(newId);
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const nextProfile = { ...prev, ...updated };
      
      // Update in profiles array
      setProfiles(prevProfiles => {
        const updatedProfiles = prevProfiles.map(p => p.id === activeProfileId ? { ...p, ...updated } : p);
        localStorage.setItem('kolesardnevnik_profiles', JSON.stringify(updatedProfiles));
        return updatedProfiles;
      });
      
      return nextProfile;
    });
  };

  const handleUpdateUnitSystem = (system: UnitSystem) => {
    setUnitSystem(system);
  };

  const handleExportData = () => {
    const backupData = {
      rides,
      services,
      expenses,
      userProfile,
      bikeDetails,
      unitSystem,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kolesardnevnik-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    localStorage.clear();
    const defaultActiveId = 'janez-novak';
    const initialProfilesList = [
      {
        id: "janez-novak",
        username: "janez",
        password: "123",
        name: "Janez Novak",
        email: "janez.n@cycling-pro.si",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuALu1MMAssj6LvpiFpnWUS4iZCGGh36mchAO0Awim05Gjm4WspPA-4uZMciyPb7_S2pbo9hTvtTENc7gncZgbdEm8-mkioYgj6NZbvOkQrhQ3We0N-JvMiRukA2NrRjItFstqjiaVbWAhniV5T_jgIye_x5tqC0k0a0P6aeUSUhizch3gKJpLnEVuzeM8gNN2LfLKHaCmG6EESLHAQA7Nm39IRsUIQXzuG0HR4aAPsWUHX3q768QAlENaxNXfIR5rP0ay_NYJd2138",
        tier: "Elite Member"
      },
      {
        id: "spela-car",
        username: "spela",
        password: "123",
        name: "Špela Car",
        email: "spela.c@cycling-pro.si",
        avatar: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&q=80&w=150",
        tier: "Elite Member"
      },
      {
        id: "luka-sprinter",
        username: "luka",
        password: "123",
        name: "Luka Šprinter",
        email: "luka.s@cycling-pro.si",
        avatar: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=150",
        tier: "Elite Member"
      }
    ];
    setProfiles(initialProfilesList);
    setActiveProfileId(defaultActiveId);
    setRides(getInitialDataForProfile(defaultActiveId).rides);
    setServices(getInitialDataForProfile(defaultActiveId).services);
    setExpenses(getInitialDataForProfile(defaultActiveId).expenses);
    setUserProfile(initialProfilesList[0]);
    setBikeDetails(getInitialDataForProfile(defaultActiveId).bikeDetails);
    setUnitSystem('metric');
    setActiveScreen('dashboard');
    setIsLoggedIn(false);
  };

  // Determine current screen title
  const getScreenTitle = () => {
    switch (activeScreen) {
      case 'dashboard':
        return 'Dashboard Telemetry';
      case 'add-ride':
        return 'Log Performance';
      case 'services':
        return 'Mechanical Log';
      case 'my-bike':
        return 'Garage Spec';
      case 'costs':
        return 'Expense Ledger';
      case 'settings':
        return 'System Setup';
      default:
        return 'KolesarDnevnik';
    }
  };

  // Master total ride distance (km)
  const totalDistanceKm = rides.reduce((sum, r) => sum + r.distance, 0);

  // Dynamic alert calculation for the notification badge
  const activeAlertsCount = (bikeDetails.chainAgeKm > 3500 ? 1 : 0) + 2; // chain age check + brake pads low + tire wear check

  if (!isLoggedIn) {
    return (
      <LoginScreen
        profiles={profiles}
        onLogin={(profile) => {
          setIsLoggedIn(true);
          handleSelectProfile(profile.id);
        }}
        onRegister={(name, email, username, password) => {
          const newId = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();
          const newProfile: UserProfile = {
            id: newId,
            name,
            email,
            username,
            password,
            avatar: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&q=80&w=150",
            tier: "Elite Member"
          };
          
          // 1. Add to profiles list
          const updatedProfiles = [...profiles, newProfile];
          setProfiles(updatedProfiles);
          localStorage.setItem('kolesardnevnik_profiles', JSON.stringify(updatedProfiles));
          
          // 2. Log in and switch
          setIsLoggedIn(true);
          handleSelectProfile(newId);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex font-sans antialiased selection:bg-primary-fixed-dim selection:text-on-primary select-none">
      {/* 1. Fixed Left Sidebar */}
      <Sidebar 
        activeScreen={activeScreen} 
        setScreen={setActiveScreen} 
        userProfile={userProfile} 
        bikeDetails={bikeDetails} 
        onLogout={() => {
          setIsLoggedIn(false);
          setActiveScreen('dashboard');
        }}
      />

      {/* 2. Scrollable Right Context Area */}
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Sticky Top Header */}
        <Header 
          title={getScreenTitle()} 
          activeScreen={activeScreen}
          setScreen={setActiveScreen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          alertsCount={activeAlertsCount}
          unitSystem={unitSystem}
        />

        {/* Master Screen Transitions Frame */}
        <main className="flex-grow ml-[280px] pb-16 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeScreen === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}
              >
                <DashboardScreen
                  rides={rides}
                  services={services}
                  expenses={expenses}
                  bikeDetails={bikeDetails}
                  setScreen={setActiveScreen}
                  unitSystem={unitSystem}
                  searchQuery={searchQuery}
                />
              </motion.div>
            )}

            {activeScreen === 'add-ride' && (
              <motion.div
                key="add-ride"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 150 }}
              >
                <AddRideScreen
                  onAddRide={handleAddRide}
                  bikeDetails={bikeDetails}
                  setScreen={setActiveScreen}
                  unitSystem={unitSystem}
                />
              </motion.div>
            )}

            {activeScreen === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}
              >
                <ServicesScreen
                  services={services}
                  onAddService={handleAddService}
                  bikeDetails={bikeDetails}
                  totalDistanceKm={totalDistanceKm}
                />
              </motion.div>
            )}

            {activeScreen === 'my-bike' && (
              <motion.div
                key="my-bike"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}
              >
                <MyBikeScreen
                  bikeDetails={bikeDetails}
                  totalDistanceKm={totalDistanceKm}
                  onReplaceChain={handleReplaceChain}
                  setScreen={setActiveScreen}
                  unitSystem={unitSystem}
                />
              </motion.div>
            )}

            {activeScreen === 'costs' && (
              <motion.div
                key="costs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}
              >
                <CostsScreen
                  expenses={expenses}
                  services={services}
                  onAddExpense={handleAddExpense}
                />
              </motion.div>
            )}

            {activeScreen === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}
              >
                <SettingsScreen
                  userProfile={userProfile}
                  onUpdateProfile={handleUpdateProfile}
                  unitSystem={unitSystem}
                  onUpdateUnitSystem={handleUpdateUnitSystem}
                  onExportData={handleExportData}
                  onResetData={handleResetData}
                  setScreen={setActiveScreen}
                  profiles={profiles}
                  activeProfileId={activeProfileId}
                  onSelectProfile={handleSelectProfile}
                  onCreateProfile={handleCreateProfile}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
