import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';

interface LoginScreenProps {
  profiles: UserProfile[];
  onLogin: (profile: UserProfile) => void;
  onRegister: (name: string, email: string, username: string, password: string) => void;
}

export default function LoginScreen({ profiles, onLogin, onRegister }: LoginScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  
  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const normalizedUser = loginUsername.trim().toLowerCase();
    
    // Find profile matching username OR email
    const foundProfile = profiles.find(
      p => (p.username?.toLowerCase() === normalizedUser || p.email.toLowerCase() === normalizedUser)
    );

    if (!foundProfile) {
      setLoginError('Uporabniško ime ali e-pošta ne obstaja.');
      return;
    }

    // Since these are MVP local profiles, let's treat any default profile without password as having "123"
    const correctPassword = foundProfile.password || '123';
    
    if (loginPassword !== correctPassword) {
      setLoginError('Napačno geslo.');
      return;
    }

    onLogin(foundProfile);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    const normalizedUser = regUsername.trim().toLowerCase();
    const normalizedEmail = regEmail.trim().toLowerCase();

    if (normalizedUser.length < 3) {
      setRegError('Uporabniško ime mora imeti vsaj 3 znake.');
      return;
    }

    if (regPassword.length < 3) {
      setRegError('Geslo mora imeti vsaj 3 znake.');
      return;
    }

    // Check if username already exists
    const userExists = profiles.some(
      p => p.username?.toLowerCase() === normalizedUser
    );
    if (userExists) {
      setRegError('Uporabniško ime je že zasedeno.');
      return;
    }

    // Check if email already exists
    const emailExists = profiles.some(
      p => p.email.toLowerCase() === normalizedEmail
    );
    if (emailExists) {
      setRegError('E-poštni naslov je že registriran.');
      return;
    }

    onRegister(regName, regEmail, normalizedUser, regPassword);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center p-4 antialiased font-sans select-none">
      <div className="w-full max-w-[460px] bg-surface-container-low border border-outline-variant/60 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary-fixed-dim/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary-fixed-dim/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Logo & Title */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-fixed-dim/15 text-primary-fixed-dim mb-4 border border-primary-fixed-dim/20">
            <span className="material-symbols-outlined text-3xl">pedal_bike</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-white tracking-tight leading-none">
            KolesarDnevnik
          </h1>
          <p className="font-mono text-[10px] text-primary-fixed-dim uppercase tracking-widest mt-2">
            Lokalna telemetrija & dnevniki
          </p>
        </div>

        {/* Tabs switcher */}
        <div className="flex bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/40 mb-6 relative z-10">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setLoginError('');
              setRegError('');
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              isLogin 
                ? 'bg-secondary-container text-on-secondary-container font-extrabold shadow-sm' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Prijava
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setLoginError('');
              setRegError('');
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              !isLogin 
                ? 'bg-secondary-container text-on-secondary-container font-extrabold shadow-sm' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Registracija
          </button>
        </div>

        {/* Forms with AnimatePresence/motion */}
        <div className="relative z-10 min-h-[290px]">
          {isLogin ? (
            <motion.form
              key="login-form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleLoginSubmit}
              className="space-y-4"
            >
              <div>
                <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-1.5">
                  Uporabniško ime ali E-pošta
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                    person
                  </span>
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="npr. janez"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl pl-10 pr-4 py-3 text-xs text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-1.5">
                  Geslo
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                    lock
                  </span>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Vnesite geslo"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl pl-10 pr-4 py-3 text-xs text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-all"
                    required
                  />
                </div>
                <div className="mt-1 text-[10px] text-on-surface-variant/70 italic">
                  Privzeto geslo za prednastavljene profile je: <span className="font-mono font-bold text-primary-fixed-dim">123</span>
                </div>
              </div>

              {loginError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-base shrink-0">error</span>
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-primary-fixed-dim text-on-primary-fixed rounded-xl text-xs font-bold cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary-fixed-dim/10"
              >
                <span className="material-symbols-outlined text-sm">login</span>
                Prijavi se v profil
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="register-form"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleRegisterSubmit}
              className="space-y-3.5"
            >
              <div>
                <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-1">
                  Ime in priimek
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                    badge
                  </span>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="npr. Špela Car"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl pl-10 pr-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-1">
                  E-poštni naslov
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                    mail
                  </span>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="npr. spela@kolesar.si"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl pl-10 pr-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-all font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-1">
                    Uporabniško ime
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                      alternate_email
                    </span>
                    <input
                      type="text"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="spela"
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl pl-10 pr-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-1">
                    Geslo
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                      lock_open
                    </span>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Geslo"
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl pl-10 pr-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {regError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-2.5 rounded-xl text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-base shrink-0">error</span>
                  <span>{regError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-primary-fixed-dim text-on-primary-fixed rounded-xl text-xs font-bold cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1 shadow-lg shadow-primary-fixed-dim/10"
              >
                <span className="material-symbols-outlined text-sm">person_add</span>
                Registriraj in prijavi se
              </button>
            </motion.form>
          )}
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 text-[10px] text-on-surface-variant">
          Podatki se varno shranjujejo izključno v vašem brskalniku (LocalStorage).
        </div>
      </div>
    </div>
  );
}
