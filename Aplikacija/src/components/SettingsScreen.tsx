import React, { useState, useEffect } from 'react';
import { UserProfile, UnitSystem, ScreenType } from '../types';

interface SettingsScreenProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
  unitSystem: UnitSystem;
  onUpdateUnitSystem: (system: UnitSystem) => void;
  onExportData: () => void;
  onResetData: () => void;
  setScreen: (screen: ScreenType) => void;
  profiles: UserProfile[];
  activeProfileId: string;
  onSelectProfile: (id: string) => void;
  onCreateProfile: (name: string, email: string, username: string, password: string) => void;
}

export default function SettingsScreen({
  userProfile,
  onUpdateProfile,
  unitSystem,
  onUpdateUnitSystem,
  onExportData,
  onResetData,
  setScreen,
  profiles,
  activeProfileId,
  onSelectProfile,
  onCreateProfile
 }: SettingsScreenProps) {
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [password, setPassword] = useState(userProfile.password || '123');
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const [showNewProfileForm, setShowNewProfileForm] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileEmail, setNewProfileEmail] = useState('');
  const [newProfileUsername, setNewProfileUsername] = useState('');
  const [newProfilePassword, setNewProfilePassword] = useState('');
  const [newProfileError, setNewProfileError] = useState('');

  const [verifyingProfileId, setVerifyingProfileId] = useState<string | null>(null);
  const [switchPassword, setSwitchPassword] = useState('');
  const [switchError, setSwitchError] = useState('');

  useEffect(() => {
    setName(userProfile.name);
    setEmail(userProfile.email);
    setAvatar(userProfile.avatar);
    setPassword(userProfile.password || '123');
  }, [userProfile]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, email, avatar, password });
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const handleCreateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewProfileError('');

    const normUsername = newProfileUsername.trim().toLowerCase();

    if (normUsername.length < 3) {
      setNewProfileError('Uporabniško ime mora imeti vsaj 3 znake.');
      return;
    }
    if (newProfilePassword.length < 3) {
      setNewProfileError('Geslo mora imeti vsaj 3 znake.');
      return;
    }

    // Preveri, če uporabniško ime že obstaja
    const usernameExists = profiles.some(p => p.username?.toLowerCase() === normUsername);
    if (usernameExists) {
      setNewProfileError('Uporabniško ime je že zasedeno.');
      return;
    }

    if (newProfileName && newProfileEmail) {
      onCreateProfile(newProfileName, newProfileEmail, normUsername, newProfilePassword);
      setNewProfileName('');
      setNewProfileEmail('');
      setNewProfileUsername('');
      setNewProfilePassword('');
      setShowNewProfileForm(false);
    }
  };

  const selectPresetAvatar = (url: string) => {
    setAvatar(url);
  };

  const avatarPresets = [
    { name: 'Slayer', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALu1MMAssj6LvpiFpnWUS4iZCGGh36mchAO0Awim05Gjm4WspPA-4uZMciyPb7_S2pbo9hTvtTENc7gncZgbdEm8-mkioYgj6NZbvOkQrhQ3We0N-JvMiRukA2NrRjItFstqjiaVbWAhniV5T_jgIye_x5tqC0k0a0P6aeUSUhizch3gKJpLnEVuzeM8gNN2LfLKHaCmG6EESLHAQA7Nm39IRsUIQXzuG0HR4aAPsWUHX3q768QAlENaxNXfIR5rP0ay_NYJd2138' },
    { name: 'Sprinter', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=150' },
    { name: 'Climber', url: 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&q=80&w=150' }
  ];

  return (
    <div className="px-8 py-6 max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Top Header Row */}
      <div className="flex justify-between items-center bg-surface-container-low border border-outline-variant/35 p-6 rounded-xl">
        <div>
          <h3 className="font-display text-lg font-bold text-white">System Settings & Profile</h3>
          <p className="text-xs text-on-surface-variant">Prilagodite kolesarske parametre, metrične enote ter varnostne kopije.</p>
        </div>
        <button
          onClick={() => setScreen('add-ride')}
          className="bg-primary-fixed-dim text-on-primary-fixed font-bold px-6 py-2.5 rounded hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          Add Ride
        </button>
      </div>

      {showSavedToast && (
        <div className="bg-primary-fixed-dim/20 text-primary-fixed-dim p-4 rounded-xl border border-primary-fixed-dim/40 flex items-center gap-2 text-xs font-bold animate-scale-up">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span>Sistemski profil uspešno posodobljen! Podatki so sinhronizirani z lokalno shrambo.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* User profile details (Left) */}
        <form onSubmit={handleProfileSubmit} className="col-span-12 md:col-span-7 bg-surface-container-low border border-outline-variant rounded-xl p-6 space-y-6">
          <h4 className="font-display font-bold text-white text-base">Rider Profile</h4>
          
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Profile Image</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant flex-shrink-0">
                <img className="w-full h-full object-cover" src={avatar} alt="Profile Avatar" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-2">
                <p className="text-xs text-on-surface-variant font-medium">Select preset telemetry avatar:</p>
                <div className="flex gap-2">
                  {avatarPresets.map((pr) => (
                    <button
                      type="button"
                      key={pr.name}
                      onClick={() => selectPresetAvatar(pr.url)}
                      className={`px-3 py-1 bg-surface-container hover:bg-surface-container-highest border text-[11px] font-mono rounded ${
                        avatar === pr.url ? 'border-primary-fixed-dim text-primary-fixed-dim font-bold' : 'border-outline-variant text-on-surface-variant'
                      }`}
                    >
                      {pr.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <input 
                type="text"
                placeholder="Custom Avatar Image URL..."
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-xs text-on-surface focus:outline-none focus:border-primary-fixed-dim font-mono"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Full Name</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3.5 text-sm text-on-surface focus:outline-none focus:border-primary-fixed-dim font-semibold"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Email Address</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3.5 text-sm text-on-surface focus:outline-none focus:border-primary-fixed-dim font-mono text-on-surface-variant"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">Geslo za prijavo</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3.5 text-sm text-on-surface focus:outline-none focus:border-primary-fixed-dim font-mono"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-primary-fixed-dim text-on-primary-fixed rounded-full text-xs font-bold cursor-pointer hover:brightness-110 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            Update Profile
          </button>
        </form>

        {/* Global configuration preferences (Right) */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
          {/* Rider Accounts / Profiles switcher */}
          <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-display font-bold text-white text-base">Profili kolesarjev</h4>
              <button
                type="button"
                onClick={() => setShowNewProfileForm(!showNewProfileForm)}
                className="text-xs font-bold text-primary-fixed-dim hover:underline cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">{showNewProfileForm ? 'close' : 'add'}</span>
                {showNewProfileForm ? 'Zapri' : 'Dodaj profil'}
              </button>
            </div>
            <p className="text-xs text-on-surface-variant mb-4">
              Izberite ali ustvarite profil kolesarja. Vsak profil ima ločene vožnje, servise in stroške.
            </p>

            {showNewProfileForm && (
              <form onSubmit={handleCreateProfileSubmit} className="space-y-3.5 bg-surface-container p-4 rounded-xl border border-outline-variant/60 mb-4">
                <div>
                  <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-1">Ime kolesarja</label>
                  <input
                    type="text"
                    value={newProfileName}
                    onChange={(e) => setNewProfileName(e.target.value)}
                    placeholder="npr. Špela Car"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs text-on-surface focus:outline-none focus:border-primary-fixed-dim"
                    required
                  />
                </div>
                <div>
                  <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-1">E-poštni naslov</label>
                  <input
                    type="email"
                    value={newProfileEmail}
                    onChange={(e) => setNewProfileEmail(e.target.value)}
                    placeholder="npr. spela@kolesar.si"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs text-on-surface focus:outline-none focus:border-primary-fixed-dim font-mono"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-1">Uporabniško ime</label>
                    <input
                      type="text"
                      value={newProfileUsername}
                      onChange={(e) => setNewProfileUsername(e.target.value)}
                      placeholder="spela"
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs text-on-surface focus:outline-none focus:border-primary-fixed-dim"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-1">Geslo</label>
                    <input
                      type="password"
                      value={newProfilePassword}
                      onChange={(e) => setNewProfilePassword(e.target.value)}
                      placeholder="Geslo"
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs text-on-surface focus:outline-none focus:border-primary-fixed-dim"
                      required
                    />
                  </div>
                </div>

                {newProfileError && (
                  <p className="text-xs text-error font-mono mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">error</span>
                    {newProfileError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2 bg-primary-fixed-dim text-on-primary-fixed rounded-lg text-xs font-bold cursor-pointer hover:brightness-110 flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-xs">add_circle</span>
                  Ustvari nov profil
                </button>
              </form>
            )}

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {profiles.map((prof) => {
                const isActive = prof.id === activeProfileId;
                return (
                  <button
                    key={prof.id}
                    type="button"
                    onClick={() => {
                      if (!isActive) {
                        setVerifyingProfileId(prof.id);
                        setSwitchPassword('');
                        setSwitchError('');
                      }
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left cursor-pointer ${
                      isActive
                        ? 'border-primary-fixed-dim bg-primary-fixed-dim/10'
                        : 'border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {prof.avatar ? (
                        <img
                          src={prof.avatar}
                          alt={prof.name}
                          className="w-9 h-9 rounded-full object-cover border border-outline/50"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-sm font-bold text-white uppercase border border-outline/50">
                          {prof.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-display font-semibold text-xs text-white flex items-center gap-1.5">
                          {prof.name}
                          {isActive && (
                            <span className="bg-primary-fixed text-on-primary-fixed text-[8px] font-mono px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider">
                              Aktivno
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-on-surface-variant font-mono truncate max-w-[150px]">
                          {prof.email}
                        </div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-sm text-on-surface-variant/80">
                      {isActive ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Unit Preferences */}
          <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6">
            <h4 className="font-display font-bold text-white text-base mb-1">Unit Preferences</h4>
            <p className="text-xs text-on-surface-variant mb-6">Spremenite enote za razdalje, višino in težo v celotnem dnevniku.</p>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onUpdateUnitSystem('metric')}
                className={`py-4 rounded-xl border font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  unitSystem === 'metric'
                    ? 'border-primary-fixed-dim bg-primary-fixed-dim/10 text-primary-fixed-dim'
                    : 'border-outline-variant/60 bg-surface-container hover:bg-surface-container-highest text-on-surface-variant'
                }`}
              >
                <span className="font-display text-lg">Metric</span>
                <span className="font-mono text-[10px] opacity-75">km, m, kg</span>
              </button>
              
              <button
                onClick={() => onUpdateUnitSystem('imperial')}
                className={`py-4 rounded-xl border font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  unitSystem === 'imperial'
                    ? 'border-primary-fixed-dim bg-primary-fixed-dim/10 text-primary-fixed-dim'
                    : 'border-outline-variant/60 bg-surface-container hover:bg-surface-container-highest text-on-surface-variant'
                }`}
              >
                <span className="font-display text-lg">Imperial</span>
                <span className="font-mono text-[10px] opacity-75">mi, ft, lbs</span>
              </button>
            </div>
          </div>

          {/* Backup / Export options */}
          <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 flex-1 flex flex-col justify-between">
            <div>
              <h4 className="font-display font-bold text-white text-base mb-1">Data Management</h4>
              <p className="text-xs text-on-surface-variant mb-6">Upravljajte s shranjenimi podatki ali uvozite telemetrijo.</p>
              
              <div className="space-y-3">
                <button
                  onClick={onExportData}
                  className="w-full py-3 bg-surface-container hover:bg-surface-container-highest text-on-surface border border-outline-variant/50 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Export System Data (JSON)
                </button>
                
                <button
                  onClick={() => setShowConfirmReset(true)}
                  className="w-full py-3 bg-error/10 hover:bg-error/15 text-error border border-error/25 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">delete_forever</span>
                  Reset All Telemetry Logs
                </button>
              </div>
            </div>

            <p className="font-mono text-[9px] text-on-surface-variant text-center tracking-wider mt-6 uppercase">
              KolesarDnevnik Version 1.4.2 (Stable)
            </p>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6" onClick={() => setShowConfirmReset(false)}>
          <div 
            className="bg-surface-container-high border border-error/25 max-w-sm w-full rounded-2xl p-6 space-y-4 shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
              <h3 className="font-display font-bold text-lg text-error flex items-center gap-2">
                <span className="material-symbols-outlined">warning</span>
                Reset Confirmation
              </h3>
              <button onClick={() => setShowConfirmReset(false)} className="text-on-surface-variant hover:text-on-surface font-mono text-sm">✕</button>
            </div>
            
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Ali ste prepričani, da želite ponastaviti vse podatke v aplikaciji? Ta korak bo izbrisal vse vožnje, stroškovnike in servisno zgodovino. Dejanje je nepopravljivo.
            </p>

            <div className="flex gap-3 pt-3">
              <button 
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-2.5 bg-surface-container-highest text-on-surface rounded-full text-xs font-bold cursor-pointer hover:bg-surface-bright"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={() => {
                  onResetData();
                  setShowConfirmReset(false);
                }}
                className="flex-1 py-2.5 bg-error text-white rounded-full text-xs font-bold cursor-pointer hover:brightness-110"
              >
                Delete Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password verification modal */}
      {verifyingProfileId && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6" onClick={() => setVerifyingProfileId(null)}>
          <div 
            className="bg-surface-container-high border border-outline-variant max-w-sm w-full rounded-2xl p-6 space-y-4 shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="material-symbols-outlined">lock</span>
                Preverjanje gesla
              </h3>
              <button onClick={() => setVerifyingProfileId(null)} className="text-on-surface-variant hover:text-on-surface font-mono text-sm">✕</button>
            </div>
            
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Vnesite geslo za preklop v profil <span className="font-bold text-white">{profiles.find(p => p.id === verifyingProfileId)?.name}</span>.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              const targetProfile = profiles.find(p => p.id === verifyingProfileId);
              const correctPassword = targetProfile?.password || '123';
              if (switchPassword === correctPassword) {
                onSelectProfile(verifyingProfileId);
                setVerifyingProfileId(null);
                setSwitchPassword('');
                setSwitchError('');
              } else {
                setSwitchError('Napačno geslo!');
              }
            }} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={switchPassword}
                  onChange={(e) => setSwitchPassword(e.target.value)}
                  placeholder="Geslo"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:border-primary-fixed-dim font-mono"
                  autoFocus
                  required
                />
                {switchError && (
                  <p className="text-xs text-error mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">error</span>
                    {switchError}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-1">
                <button 
                  type="button"
                  onClick={() => setVerifyingProfileId(null)}
                  className="flex-1 py-2.5 bg-surface-container-highest text-on-surface rounded-full text-xs font-bold cursor-pointer hover:bg-surface-bright"
                >
                  Prekliči
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-primary-fixed-dim text-on-primary-fixed rounded-full text-xs font-bold cursor-pointer hover:brightness-110"
                >
                  Potrdi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
