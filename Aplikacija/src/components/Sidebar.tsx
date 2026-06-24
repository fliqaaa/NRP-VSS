import React from 'react';
import { ScreenType, UserProfile, BikeDetails } from '../types';

interface SidebarProps {
  activeScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  userProfile: UserProfile;
  bikeDetails: BikeDetails;
  onLogout: () => void;
}

export default function Sidebar({ activeScreen, setScreen, userProfile, bikeDetails, onLogout }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'add-ride', label: 'Add Ride', icon: 'add_circle' },
    { id: 'my-bike', label: 'My Bike', icon: 'pedal_bike' },
    { id: 'services', label: 'Services', icon: 'handyman' },
    { id: 'costs', label: 'Costs', icon: 'payments' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ] as const;

  const handleNavClick = (e: React.MouseEvent, screenId: ScreenType) => {
    e.preventDefault();
    setScreen(screenId);
  };

  return (
    <aside id="sidebar-panel" className="fixed left-0 top-0 h-screen w-[280px] bg-surface-container-low border-r border-outline-variant flex flex-col py-8 z-50">
      <div className="px-6 mb-10">
        <h1 className="font-display text-4xl font-extrabold text-primary-fixed-dim leading-none tracking-tight">
          KolesarDnevnik
        </h1>
        <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest mt-2 font-medium">
          Pro Telemetry
        </p>
      </div>

      <nav className="flex-1 space-y-1.5 px-3">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container border-l-2 border-primary-fixed-dim font-bold scale-[1.02]'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              <span 
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}
              >
                {item.icon}
              </span>
              <span className="font-sans text-sm leading-none">{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="px-6 mt-auto space-y-3">
        <div 
          onClick={(e) => handleNavClick(e, 'settings')}
          className="flex items-center gap-3 p-3 bg-surface-container rounded-xl border border-outline-variant hover:border-primary-fixed-dim/30 cursor-pointer transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant">
            {userProfile.avatar ? (
              <img 
                className="w-full h-full object-cover" 
                src={userProfile.avatar} 
                alt={userProfile.name} 
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-primary-fixed-dim text-on-primary-fixed flex items-center justify-center font-bold text-sm">
                {userProfile.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-sm text-on-surface truncate leading-none">
              {userProfile.name}
            </p>
            <p className="text-[11px] text-on-surface-variant uppercase tracking-tighter mt-1 truncate">
              {bikeDetails.brand} {bikeDetails.model}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          Odjava
        </button>
      </div>
    </aside>
  );
}
