import React, { useState } from 'react';
import { ScreenType, UnitSystem } from '../types';

interface HeaderProps {
  title: string;
  activeScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  alertsCount: number;
  onAlertClick?: () => void;
  unitSystem: UnitSystem;
}

export default function Header({
  title,
  activeScreen,
  setScreen,
  searchQuery,
  setSearchQuery,
  alertsCount,
  onAlertClick,
  unitSystem
}: HeaderProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleAddRideClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setScreen('add-ride');
  };

  return (
    <header 
      id="top-nav-bar" 
      className="h-20 bg-background/80 backdrop-blur-md flex justify-between items-center ml-[280px] px-8 w-[calc(100%-280px)] sticky top-0 z-40 border-b border-outline-variant/10"
    >
      <div className="flex items-center gap-6 flex-1">
        <h2 className="font-display text-2xl font-bold text-on-surface">
          {title}
        </h2>
        
        {/* Search telemetry - only visible on relevant screens like Dashboard / Costs */}
        {(activeScreen === 'dashboard' || activeScreen === 'costs' || activeScreen === 'services') && (
          <div className="hidden md:flex items-center bg-surface-container rounded-full px-4 py-2 border border-outline-variant/50 max-w-xs w-full focus-within:border-primary-fixed-dim transition-all">
            <span className="material-symbols-outlined text-on-surface-variant mr-2 text-sm">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full placeholder-on-surface-variant text-on-surface"
              placeholder="Search telemetry & logs..."
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-on-surface-variant hover:text-on-surface text-xs font-bold font-mono ml-1"
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications Icon with Indicator */}
        <div className="relative">
          <button 
            id="notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-on-surface-variant hover:text-primary-fixed-dim transition-colors relative"
            title="Sistemska obvestila"
          >
            <span className="material-symbols-outlined">notifications</span>
            {alertsCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary-container rounded-full border border-background"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-high border border-outline-variant rounded-xl p-4 shadow-2xl z-50 animate-fade-in text-left">
              <h4 className="font-display font-semibold text-sm text-on-surface mb-3 border-b border-outline-variant/30 pb-2 flex justify-between items-center">
                <span>Telemetry Alerts</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary-container/10 text-secondary-container">{alertsCount} active</span>
              </h4>
              <ul className="space-y-3 text-xs">
                {alertsCount > 0 ? (
                  <>
                    <li className="flex gap-2 items-start p-1.5 rounded hover:bg-surface-container transition-colors">
                      <span className="material-symbols-outlined text-error text-base">warning</span>
                      <div>
                        <p className="font-bold text-on-surface">Brake pads low</p>
                        <p className="text-[11px] text-on-surface-variant">Thickness is 0.7mm, below safety limit.</p>
                      </div>
                    </li>
                    <li className="flex gap-2 items-start p-1.5 rounded hover:bg-surface-container transition-colors">
                      <span className="material-symbols-outlined text-secondary-container text-base">tire_repair</span>
                      <div>
                        <p className="font-bold text-on-surface">Tire wear check</p>
                        <p className="text-[11px] text-on-surface-variant">Continental rear tire exceeds 2,500km.</p>
                      </div>
                    </li>
                  </>
                ) : (
                  <p className="text-on-surface-variant text-center py-2">No critical warnings! All systems normal.</p>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Help icon */}
        <button 
          id="help-btn"
          onClick={() => setShowHelp(true)}
          className="p-2 text-on-surface-variant hover:text-primary-fixed-dim transition-colors"
          title="Navodila in pomoč"
        >
          <span className="material-symbols-outlined">help</span>
        </button>

        {/* Global Action Add Ride - available on all screens */}
        <button
          onClick={handleAddRideClick}
          className="ml-4 bg-primary-fixed-dim text-on-primary-fixed px-5 py-2 rounded-full font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Ride
        </button>
      </div>

      {/* Guide/Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-6" onClick={() => setShowHelp(false)}>
          <div 
            className="bg-surface-container-high border border-outline-variant max-w-lg w-full rounded-2xl p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
              <h3 className="font-display font-bold text-lg text-primary-fixed-dim">KolesarDnevnik Guide</h3>
              <button onClick={() => setShowHelp(false)} className="text-on-surface-variant hover:text-on-surface font-mono text-sm">✕</button>
            </div>
            <div className="space-y-3 text-sm text-on-surface-variant max-h-96 overflow-y-auto pr-1">
              <p>Dobrodošli v <strong>KolesarDnevnik Pro Telemetry</strong>, vrhunskem kolesarskem dnevniku in nadzorni plošči za spremljanje opreme.</p>
              <div className="space-y-1 bg-surface rounded-lg p-3 border border-outline-variant/30">
                <p className="font-bold text-on-surface text-xs">💻 ZASLONI & NAVIGACIJA:</p>
                <ul className="list-disc pl-5 text-xs space-y-1">
                  <li><strong>Dashboard:</strong> Pogled na skupno razdaljo, aktivnost in kritična obvestila.</li>
                  <li><strong>Add Ride:</strong> Shranjevanje novih voženj in avtomatska sinhronizacija.</li>
                  <li><strong>My Bike:</strong> Specifikacije kolesa, obraba verige in servisni intervali.</li>
                  <li><strong>Services:</strong> Zgodovina popravil in dodajanje novih servisnih del.</li>
                  <li><strong>Costs:</strong> Grafi stroškov, kategorije ter optimizacija porabe.</li>
                  <li><strong>Settings:</strong> Profil, sprememba enot (Metric vs Imperial) ter izvoz podatkov.</li>
                </ul>
              </div>
              <p className="text-xs">Uporabite gumb <strong>Add Ride</strong> za enostavno beleženje voženj. Podpora za metrične enote (kilometri, metri) ali imperialne enote (milje, čevlji) se prilagaja v nastavitvah.</p>
            </div>
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setShowHelp(false)}
                className="bg-primary-fixed-dim text-on-primary-fixed px-5 py-2 rounded-full text-xs font-bold cursor-pointer"
              >
                Razumem
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
