Refleksjonsrapport: JobFit-AI  
Prosjekt: KI-basert applikasjon for skreddersydd CV og jobbsøknad.

1. Innledning:
I dette prosjektet utviklet jeg JobFit-AI, en KI-basert webapplikasjon som hjelper jobbsøkere med å lage skreddersydde CV-er og jobbsøknader basert på en konkret stillingsannonse. Målet var ikke bare å lage en fungerende løsning, men også å forstå hvordan kunstig intelligens kan brukes aktivt i hele utviklingsprosessen.
En viktig erfaring tidlig i prosjektet var at KI ikke bare fungerer som et verktøy for å generere tekst, men også kan brukes til å utvikle selve applikasjonen. Google Gemini, integrert i Visual Studio Code, ble brukt til store deler av kodegenereringen, mens OpenAI ble brukt til selve innholdet i løsningen. Jeg vurderte også Claude, men valgte OpenAI på grunn av bedre kjennskap. Samtidig ble det tydelig at utviklingen innen KI går raskt, og at flere verktøy nå begynner å nærme seg hverandre i kvalitet.
Dette gjorde at prosjektet i stor grad handlet om samspillet mellom menneske og KI, og ikke bare tradisjonell programmering.

2. Prosjektets mål og problemstilling:
Målet med prosjektet var å lage en løsning som ikke bare genererer CV og søknad, men også analyserer hvor godt en kandidat passer til en stilling.
Applikasjonen skal:
- analysere stillingsannonse  
- generere skreddersydd CV og søknad  
- optimalisere tekst for ATS-systemer  
- vurdere match mellom kandidat og stilling  
- identifisere manglende kvalifikasjoner  

Problemstillingen kan formuleres slik:
Hvordan kan KI brukes til å utvikle en løsning som både genererer og analyserer jobbsøknader, samtidig som den er relevant for moderne rekrutteringssystemer spessielt med fokus på ATS- System.
Gjennom arbeidet med dette ble det tydelig for meg at KI ikke bare kan automatisere oppgaver, men også bidra til å gi brukeren innsikt, noe som gjør løsningen mer verdifull.

3. Utviklingsprosess og arbeidsmetodikk:
Prosjektet ble gjennomført over tre uker. Det som overrasket meg mest var hvor raskt det var mulig å utvikle en fungerende applikasjon ved hjelp av KI. Samtidig oppdaget jeg raskt at hastigheten også kunne føre til feil og mangler dersom jeg ikke hadde god nok kontroll.
Jeg startet med en mer strukturert tilnærming enn tidligere, blant annet ved igjen å bruke BMAD-metodikk. Dette gjorde at jeg i større grad tenkte gjennom hva applikasjonen faktisk skulle gjøre før jeg begynte å generere kode.
Dette var una viktig læring, fordi jeg tidligere ofte har gått rett på implementasjon. I dette prosjektet erfarte jeg at god planlegging faktisk reduserer behovet for senere feilretting.

3.1 Samspill mellom Gemini, Visual Studio og lokal maskin:  
Google Gemini var koblet til Visual Studio Code og hadde dermed tilgang til både prosjektfiler og terminal. Dette gjorde at KI kunne gjøre langt mer enn å bare foreslå kode – den kunne faktisk bidra aktivt i utviklingen.
Jeg opplevde at dette endret min rolle som utvikler. I stedet for å skrive all kode selv, handlet det mer om å:
- formulere tydelige instruksjoner  
- forstå hva KI gjorde  
- evaluere resultatet  
- rette opp feil  
Dette ga en ny forståelse av programmering, der kommunikasjon mer spesifikt riktig formulering og struktur ble like viktig som selve koden.

3.1.2 Gemini:
Store deler av implementeringen ble gjort ved hjelp av Gemini. Dette gjorde utviklingen svært effektiv, men det ble også tydelig at kvaliteten på resultatet var helt avhengig av hvor gode instruksjonene mine var.
Jeg erfarte at uklare prompts ofte førte til dårlig eller irrelevant kode, mens tydelige og detaljerte beskrivelser ga langt bedre resultater.
Dette gjorde meg mer bevisst på at KI ikke erstatter utvikleren, men krever en annen type kompetanse.
Når Gemini har tilgang til både editor og terminal, fungerte det mer som en aktiv deltaker i utviklingen enn et vanlig verktøy.
Dette gjorde det mulig å jobbe raskt, men det ble også tydelig at KI ikke alltid forstod konteksten fullt ut. Ved mer kompliserte problemer måtte jeg ofte bruke andre verktøy, som ChatGPT, for å analysere feilmeldinger og finne løsninger.

3.2 Strukturert tilnærming – BMAD :
Ved å bruke BMAD-metodikken fikk jeg en bedre forståelse av hvordan man kan tenke mer helhetlig rundt utvikling. Spesielt business-perspektivet gjorde at jeg begynte å tenke mer på brukeren og verdien av løsningen.
Dette førte til at jeg også vurderte ting som brukervennlighet og hvordan applikasjonen kunne vært brukt i praksis, ikke bare teknisk funksjonalitet.

4. Utfordringer og løsninger:
Den største utfordringen i prosjektet var overgangen fra lokalt miljø til Vercel via Github. Kode som fungerte lokalt, fungerte ikke alltid etter deploy.
Dette var frustrerende, men samtidig lærerikt. Jeg fikk bedre forståelse av hvordan miljøforskjeller, avhengigheter og serverless-arkitektur påvirker applikasjoner.
En annen stor utfordring var håndtering av PDF-filer. opplesing fungerte ikke alltid som forventet, spesielt i overgang fra visual til github og igjen til vercel.

5. Design, personvern og etikk:
Jeg valgte bevisst å ikke implementere innlogging eller lagring av brukerdata i applikasjonen. Dette valget var først og fremst basert på hensyn til personvern og kravene i GDPR, men også på en mer generell skepsis til hvordan sensitiv informasjon håndteres i KI-baserte systemer.
Applikasjonen behandler potensielt svært personlig informasjon, innad CV, arbeidserfaring og søknadstekster. Dette er data som i mange tilfeller kan regnes som sensitive, og som det stilles strenge krav til både lagring og behandling av. Ved å unngå lagring av denne typen data, reduseres risikoen for både datalekkasjer og misbruk betydelig.
Gjennom prosjektet ble jeg mer bevisst på at det ikke bare handler om hva som er teknisk mulig, men også hva som er ansvarlig å gjøre. Selv om det hadde vært mulig å implementere funksjoner som lagring av brukerprofiler eller historikk, ville dette krevd langt mer omfattende sikkerhetsmekanismer, som kryptering, tilgangskontroll og tydelig samtykke fra bruker.
Jeg erfarte også at KI som teknologi fortsatt er i utvikling, og at det derfor finnes en viss usikkerhet knyttet til hvordan data faktisk behandles av eksterne API-er. Spessielt også Open AI. Dette forsterket valget om å minimere databruk og heller fokusere på en løsning der informasjon behandles midlertidig og ikke lagres.
Samtidig innebærer dette valget noen begrensninger, som at brukeren ikke kan lagre tidligere analyser eller gjenbruke data.

6. Språk og KI:
En viktig erfaring i prosjektet var hvor stor betydning språk har i kommunikasjon med KI. Jeg erfarte at bruk av engelsk angir gjennomgående bedre resultater enn norsk, spesielt i mer komplekse oppgaver som kodegenerering, strukturering og detaljert tekstproduksjon.

7. Kritisk vurdering av KI:
KI hadde en avgjørende rolle i prosjektet. Uten bruk av verktøy som Gemini og OpenAI ville det ikke vært mulig å utvikle en såpass omfattende applikasjon innenfor den korte tidsrammen. KI gjorde det mulig å raskt etablere struktur, generere kode, teste løsninger og iterere på funksjonalitet.
Samtidig førte bruken av KI til nye utfordringer som jeg ikke hadde like stor bevissthet rundt før prosjektet startet. Resultatet ble i stor grad avhengig av kvaliteten på promptene, og små endringer i formulering kunne gi store utslag i output. Dette gjaldt både for kode og tekst.
Jeg opplevde også at KI i enkelte tilfeller kunne gi feil eller ufulltendige løsninger, spesielt i mer komplekse situasjoner. Dette gjorde det nødvendig å være kritisk til det som ble generert, og ikke bare akseptere forslagene direkte. I praksis betydde dette at jeg ofte måtte lese gjennom, teste og tilpasse det KI produserte.
En viktig refleksjon er derfor at KI ikke reduserer behovet for kompetanse, men endrer hva slags kompetanse som er viktig. I stedet for å fokusere på å skrive all kode manuelt, handler det i større grad om å forstå systemer, formulere gode instrukser og vurdere kvaliteten på det som blir generert.
KI fungerte dermed ikke som en erstatning for utvikleren, men som et kraftig verktøy som krevde aktiv styring. Det gjorde utviklingen raskere, men også mer avhengig av kritisk tenkning og kontroll – desverre kvaliteter jeg ennå ikke behersker.
Dette prosjektet har derfor gitt meg en mer nyansert forståelse av KI. Det er ikke en “løsning på alt”, men et verktøy som kan være svært effektivt dersom det brukes riktig.

8. Konklusjon:
Prosjektet har gitt meg en ny forståelse av programmering. Fokus har gått fra å skrive kode manuelt til å strukturere problemer, formulere gode instrukser og vurdere løsninger.
Den viktigste lærdommen er at KI gjør utvikling raskere, men ikke nødvendigvis enklere. Det stiller nye krav til hvordan man tenker, jobber og vurderer kvalitet.
KI fungerte som en avgjørende muliggjører for prosjektet, men det var den menneskelige vurderingen som avgjorde resultatet.

