# Product Backlog – KolesarDnevnik

## Persona

Rekreativni kolesar, star med 25 in 50 let, ki redno uporablja kolo za šport in rekreacijo ter želi imeti boljši pregled nad vzdrževanjem svojega kolesa.

---

# Uporabniške zgodbe (User Stories)

## US1 (M – Must Have)

**Kot kolesar želim dodati novo vožnjo, da lahko spremljam svoje prevožene kilometre.**

### Sprejemni kriteriji

* Uporabnik lahko vnese datum vožnje.
* Uporabnik lahko vnese število prevoženih kilometrov.

---

## US2 (M – Must Have)

**Kot kolesar želim videti skupno število prevoženih kilometrov, da imam pregled nad uporabo kolesa.**

### Sprejemni kriteriji

* Prikazano je skupno število kilometrov.
* Podatek se samodejno posodobi po dodani vožnji.

---

## US3 (M – Must Have)

**Kot kolesar želim dodati servis kolesa, da imam evidenco opravljenih vzdrževalnih del.**

### Sprejemni kriteriji

* Možen je vnos datuma servisa.
* Možen je vnos vrste servisa.

---

## US4 (M – Must Have)

**Kot kolesar želim pregled zgodovine servisov, da lahko preverim pretekla vzdrževanja.**

### Sprejemni kriteriji

* Vsi servisi so prikazani v seznamu.
* Pri vsakem servisu je prikazan datum.

---

## US5 (M – Must Have)

**Kot kolesar želim beležiti stroške servisov, da spremljam stroške vzdrževanja.**

### Sprejemni kriteriji

* Pri servisu je možno vnesti ceno.
* Cena se shrani v evidenco.

---

## US6 (M – Must Have)

**Kot kolesar želim videti skupne stroške vzdrževanja, da vem koliko me stane kolo.**

### Sprejemni kriteriji

* Sistem sešteje vse stroške.
* Prikazan je skupni znesek.

---

## US7 (M – Must Have)

**Kot kolesar želim vnesti podatke o svojem kolesu, da imam vse podatke na enem mestu.**

### Sprejemni kriteriji

* Možen je vnos znamke.
* Možen je vnos modela in letnika.

---

## US8 (M – Must Have)

**Kot kolesar želim urejati podatke o kolesu, da so podatki vedno aktualni.**

### Sprejemni kriteriji

* Podatke je mogoče spremeniti.
* Spremembe se uspešno shranijo.

---

## US9 (M – Must Have)

**Kot kolesar želim prejeti opomnik za servis verige, da ne zamudim priporočene menjave.**

### Sprejemni kriteriji

* Prikaže se opozorilo za servis.
* Opozorilo temelji na številu prevoženih kilometrov.

---

## US10 (M – Must Have)

**Kot kolesar želim izbrisati napačno vneseno vožnjo, da ostanejo podatki pravilni.**

### Sprejemni kriteriji

* Vožnjo je mogoče izbrisati.
* Skupni kilometri se ponovno izračunajo.

---

## US11 (S – Should Have)

**Kot kolesar želim dodajati opombe k vožnjam, da si lahko zapišem posebnosti posamezne vožnje.**

### Sprejemni kriteriji

* Na voljo je polje za opombe.
* Opomba se shrani skupaj z vožnjo.

---

## US12 (S – Should Have)

**Kot kolesar želim dodajati opombe k servisom, da imam več informacij o opravljenem posegu.**

### Sprejemni kriteriji

* Servisu je možno dodati opis.
* Opis se shrani.

---

## US13 (S – Should Have)

**Kot kolesar želim videti zadnje dodane vožnje, da hitro pregledam svoje aktivnosti.**

### Sprejemni kriteriji

* Prikazan je seznam zadnjih voženj.
* Vožnje so razvrščene po datumu.

---

## US14 (S – Should Have)

**Kot kolesar želim videti zadnje servise, da hitro preverim zgodovino vzdrževanja.**

### Sprejemni kriteriji

* Prikazan je seznam servisov.
* Najnovejši servis je prikazan prvi.

---

## US15 (S – Should Have)

**Kot kolesar želim spremljati stroške po letih, da lahko primerjam porabo med sezonami.**

### Sprejemni kriteriji

* Stroški so prikazani po posameznih letih.
* Prikazan je letni seštevek.

---

## US16 (C – Could Have)

**Kot kolesar želim izvoziti svoje podatke, da jih lahko shranim ali prenesem drugam.**

### Sprejemni kriteriji

* Sistem omogoča izvoz podatkov.
* Izvoz vsebuje vožnje in servise.

---

## US17 (C – Could Have)

**Kot kolesar želim spremljati več koles, da imam vse podatke na enem mestu.**

### Sprejemni kriteriji

* Možno je dodati več koles.
* Podatki se vodijo ločeno za vsako kolo.

---

## US18 (C – Could Have)

**Kot kolesar želim dodati fotografijo kolesa, da ga lažje prepoznam v aplikaciji.**

### Sprejemni kriteriji

* Možen je nalaganje fotografije.
* Fotografija se prikaže pri podatkih o kolesu.

---

## US19 (C – Could Have)

**Kot kolesar želim prejemati sezonske nasvete za vzdrževanje, da bolje skrbim za svoje kolo.**

### Sprejemni kriteriji

* Sistem prikaže nasvet za vzdrževanje.
* Nasvet se prilagaja letnemu času.

---

## US20 (C – Could Have)

**Kot kolesar želim iskati po servisni zgodovini, da hitreje najdem določene podatke.**

### Sprejemni kriteriji

* Na voljo je iskalno polje.
* Rezultati se filtrirajo glede na vpisan izraz.

---

# Prioritizacija – MoSCoW metoda

## Zakaj sem izbral metodo MoSCoW

Metodo MoSCoW sem izbral, ker omogoča enostavno razvrščanje funkcionalnosti glede na njihovo pomembnost za prvo verzijo aplikacije. Tako je lažje določiti, katere funkcionalnosti so nujne za delovanje sistema in katere lahko dodamo kasneje.

## Must Have (obvezno)

* US1 do US10

To so osnovne funkcionalnosti brez katerih aplikacija ne bi izpolnjevala svojega namena.

## Should Have (pomembno)

* US11 do US15

Gre za funkcionalnosti, ki izboljšajo uporabniško izkušnjo, vendar niso nujne za prvo verzijo aplikacije.

## Could Have (zaželeno)

* US16 do US20

Dodatne funkcionalnosti, ki povečajo vrednost aplikacije, vendar niso ključne za delovanje sistema.

## Won't Have (ne v prvi verziji)

* Integracija s Stravo
* Integracija z Garmin Connect
* Samodejno iskanje najcenejših rezervnih delov
* AI analiza obrabe komponent

Te funkcionalnosti predstavljajo možne nadgradnje v prihodnjih verzijah aplikacije in niso del prvega prototipa.
