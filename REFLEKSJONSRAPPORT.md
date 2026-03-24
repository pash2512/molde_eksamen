Refleksjonsrapport: JobFit-AI

Prosjekt: KI-basert applikasjon for skreddersydd CV og jobbsøknad

1. Innledning:

I dette prosjektet utviklet jeg JobFit-AI, en KI-basert webapplikasjon som hjelper jobbsøkere med å lage skreddersydde CV-er og jobbsøknader basert na en konkret stillingsannonse. Målet var ikke bare å lage en fungerende løsning, men også å forstå hvordan kunstig intelligens kan brukes aktivt i utviklingsprosessen.

En tidlig erfaring var at KI ikke bare fungerer som et verktøy for å generere tekst, men også kan bidra i selve utviklingen av applikasjonen. Google Gemini, integrert i Visual Studio Code, ble brukt til kodegenerering, mens OpenAI ble brukt til å generere innhold i løsningen. Jeg vurderte også Claude, men valgte OpenAI på grunn av større kjennskap. Samtidig ble det tydelig at utviklingen innen KI går raskt, og at flere verktøy nærmer seg hverandre i kvalitet.

Prosjektet handlet derfor i stor grad om samspillet mellom menneske og KI, ikke bare tradisjonell programmering.

2. Prosjektets mål og problemstilling:

Målet var å utvikle en løsning som både genererer og analyserer jobbsøknader. Applikasjonen skulle:

analysere stillingsannonser
generere skreddersydd CV og søknad
optimalisere tekst for ATS-systemer
vurdere match mellom kandidat og stilling
identifisere manglende kvalifikasjoner

Problemstillingen var:
Hvordan kan KI brukes til å utvikle en løsning som både genererer og analyserer jobbsøknader, med særlig fokus på moderne rekrutteringssystemer som ATS?

Gjennom arbeidet ble det tydelig at KI ikke bare automatiserer oppgaver, men også kan gi brukeren innsikt, noe som øker verdien av løsningen.

3. Utviklingsprosess og arbeidsmetodikk:

Prosjektet ble gjennomført over tre uker. Det mest overraskende var hvor raskt det var mulig å utvikle en fungerende applikasjon ved hjelp av KI. Samtidig førte denne hastigheten til nye utfordringer, særlig knyttet til feil og manglende oversikt.

Jeg valgte en mer strukturert tilnærming enn tidligere, blant annet ved å bruke BMAD-metodikk. Dette gjorde at jeg i større grad planla funksjonalitet før implementasjon. En viktig lærdom var at god planlegging reduserer behovet for senere feilretting.

4. Samspill mellom KI og utviklingsverktøy:

Google Gemini var integrert i Visual Studio Code og hadde tilgang til både kode og terminal. Dette gjorde at KI fungerte som en aktiv deltaker in utviklingen, ikke bare et støtteverktøy.

Min rolle som utvikler endret seg fra å skrive kode manuelt til å:

formulere presise instrukser
forstå hva KI genererer
evaluere kvaliteten
rette og tilpasse resultatet

Dette ga en ny forståelse av programmering, der kommunikasjon og struktur ble like viktig som selve koden.

Bruk av Gemini og ChatGPT

Store deler av implementeringen ble gjort med Gemini. Kvaliteten på resultatet var imidlertid sterkt avhengig av hvor presise instruksjonene mine var. Uklare prompts ga svake resultater, mens tydelige beskrivelser ga betydelig bedre kode.

Ved mer komplekse problemer, spesielt feilsøking, brukte jeg også ChatGPT. Dette viste at ulike KI-verktøy har ulike styrker, og at det kan være nyttig å kombinere dem.

5. Strukturert tilnærming – BMAD:

Bruken av BMAD-metodikk gjorde at jeg i større grad tok hensyn til brukerbehov og verdien av løsningen. Dette førte til et mer helhetlig fokus, der både funksjonalitet og brukervennlighet ble vurdert.

6. Utfordringer og løsninger:

Den største utfordringen var overgangen fra lokalt miljø til deploy via GitHub og Vercel. Kode som fungerte lokalt, fungerte ikke alltid etter deploy. Dette ga meg bedre forståelse for miljøforskjeller, avhengigheter og serverless-arkitektur.

En annen utfordring var håndtering av PDF-filer, spesielt ved opplesing og filbehandling i ulike miljøer. Disse problemene krevde testing, feilsøking og justering av løsningen.

7. Design, personvern og etikk:

Jeg valgte bevisst å ikke implementere innlogging eller lagring av brukerdata. Dette var basert på hensyn til personvern og GDPR, men også en generell skepsis til hvordan sensitiv informasjon håndteres i KI-systemer.

Applikasjonen behandler potensielt sensitive data, som CV, arbeidserfaring og søknadstekster. Ved å unngå lagring reduseres risikoen for datalekkasjer og misbruk.

Dette valget medfører begrensninger, som manglende lagring av historikk, men ble vurdert som nødvendig. Prosjektet har gjort meg mer bevisst på at utvikling ikke bare handler om hva som er teknisk mulig, men også hva som er ansvarlig å gjøre.

8. Språk og KI:

En viktig erfaring var at språk påvirker kvaliteten på KI-resultater. Jeg opplevde at bruk av engelsk ga bedre resultater enn norsk, spesielt i komplekse oppgaver som kodegenerering og strukturering.

9. Kritisk vurdering av KI:

KI var avgjørende for å gjennomføre prosjektet innen tidsrammen. Det gjorde det mulig å utvikle, teste og iterere raskt. Samtidig introduserte det nye utfordringer.

Resultatet var sterkt avhengig av kvaliteten på promptene, og små endringer kunne gi store utslag. KI ga også til tider feil eller ufullstendige løsninger, noe som krevde kritisk vurdering og manuell tilpasning.

En sentral lærdom er at KI ikke reduserer behovet for kompetanse, men endrer hva slags kompetanse som er viktig. Fokus flyttes fra å skrive kode manuelt til å forstå systemer, formulere gode instrukser og evaluere resultater.

KI fungerte derfor ikke som en erstatning for utvikleren, men som et kraftig verktøy som krever aktiv styring.

10. Konklusjon:

Prosjektet har gitt meg en ny forståelse av programmering. Fokus har gått fra manuell koding til strukturering av problemer, formulering av instrukser og vurdering av løsninger.

De viktigste lærdommene er:

KI kan øke utviklingshastigheten betydelig
gode prompts er avgjørende for kvalitet
kritisk vurdering er nødvendig for å sikre riktige resultater

KI var en viktig muliggjører for prosjektet, men det var den menneskelige vurderingen som avgjorde kvaliteten på det endelige resultatet.
