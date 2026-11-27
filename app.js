/**
 * AGORÀ — Laboratorio Virtuale
 * Architettura Monopagina ad Onde Sonore Concentriche
 * Moodboard: Deep Obsidian Navy & Spectral Wave Glow (Cyan, Teal, Amber)
 * 
 * Caratteristiche:
 *  - Rendering multifilamento armonico ispirato alle onde di risonanza a corda
 *  - Cerchi aperti con testo spettrale che li completa e respiro laterale
 *  - Passaggio del mouse: increspatura multifilo ondulata e modulazione sonora
 *  - Hover / Stazionamento: pulsazione in-out del raggio ed espansione del bagliore
 *  - Hit area trasparenti allargate a 34px: nessun blocco, click e hover istantanei
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // DATI DETTAGLIATI PROGETTO AGORÀ (CIRI-EC Università di Bologna)
  // -------------------------------------------------------------------------
  const LAB_PHASES = [
    {
      num: 1,
      tag: 'Fase 1',
      title: 'Fase 1: Acquisizione 3D e Soundscape',
      body: [
        'I ricercatori hanno condotto una campagna sperimentale in 5 città dell\'Emilia-Romagna (Parma, Rimini, Faenza, Comacchio e Tresigallo), registrando il soundscape di 11 piazze storiche.',
        'Al centro di ogni piazza è stato posizionato un microfono sferico a 64 capsule (Eigenmike em64) abbinato a una telecamera 360° in 8K. Su rete digitale Dante a 48 kHz, audio e video vengono acquisiti in sincronia per documentare il campo acustico e le immagini dello spazio urbano.'
      ],
      image: 'assets/gallery/image12.jpg',
      imageCaption: 'Rilievo in Piazza Cavour a Rimini: microfono sferico Eigenmike em64 e telecamera 360° in 8K per la registrazione del soundscape.'
    },
    {
      num: 2,
      tag: 'Fase 2',
      title: 'Fase 2: Risposta all\'Impulso e Metodo ESS',
      body: [
        'Facciate, colonne e portici riflettono il suono definendo l\'acustica di ogni piazza. Le misure seguono lo standard ISO 3382, applicando allo spazio aperto i parametri utilizzati per teatri e sale da concerto.',
        'Attraverso il metodo ESS (Exponential Sine Sweep), una sorgente a dodecaedro emette uno sweep a frequenza crescente che permette di calcolare la Risposta all\'Impulso (IR 3D). Con l\'approccio multicanale MIMO si ricavano il tempo di riverberazione (T30 di circa 1,6 s a Rimini) e la direzione delle prime riflessioni.'
      ],
      image: 'assets/gallery/image31.jpg',
      imageCaption: 'Misura acustica in Piazza Cavour a Rimini: calcolo della risposta all\'impulso e del tempo di riverberazione con sorgente a dodecaedro.'
    },
    {
      num: 3,
      tag: 'Fase 3',
      title: 'Fase 3: Armoniche Sferiche e Mappe 3D',
      body: [
        'I segnali dei 64 microfoni vengono codificati in formato Ambisonics (HOA di 3° ordine su 16 canali, standard AmbiX). Il suono viene descritto come una sfera acustica tridimensionale indipendente dal sistema di altoparlanti finale.',
        'Da questi dati si ricavano mappe di intensità acustica (Loudness) sovrapposte alle immagini a 360°, individuando la direzione di provenienza dei suoni e l\'energia delle riflessioni su facciate e portici.'
      ],
      image: 'assets/gallery/image28.jpg',
      imageCaption: 'Mappa acustica in formato AmbiX: scomposizione in armoniche sferiche e intensità del suono nello spazio 3D.'
    },
    {
      num: 4,
      tag: 'Fase 4',
      title: 'Fase 4: Realtà Virtuale 6DOF e Auralizzazione',
      body: [
        'I rilievi fotografici da terra e con drone sono stati utilizzati per ricostruire le piazze in 3D all\'interno del motore Unreal Engine, collegando la geometria dello spazio al modello acustico calcolato.',
        'Il sistema esegue l\'auralizzazione in tempo reale con 6 gradi di libertà (6DOF): l\'utente naviga nella piazza e l\'acustica cambia in base alla posizione e ai movimenti della testa, simulando la propagazione del suono all\'aperto o sotto i portici.'
      ],
      image: 'assets/gallery/image35.jpg',
      imageCaption: 'Ricostruzione in Realtà Virtuale 6DOF di Piazzale San Francesco a Parma: navigazione libera con audio interattivo.'
    },
    {
      num: 5,
      tag: 'Fase 5',
      title: 'Fase 5: Restituzione Immersiva e Inclusione',
      body: [
        'La riproduzione avviene in cuffia tramite filtri binaurali (HRTF) che ricostruiscono la spazialità per l\'ascolto individuale, oppure in sale d\'ascolto dedicate.',
        'A Tresigallo, nell\'edificio "Sogni", è stata realizzata una sala immersiva con sistema WFS (Wave Field Synthesis), 32 altoparlanti e proiezione a 360°. L\'ambiente consente anche a persone con disabilità motorie di accedere all\'esperienza acustica e visiva delle piazze storiche.'
      ],
      image: 'assets/gallery/tresigallo_wfs_room.jpg',
      imageCaption: 'Sala d\'ascolto WFS a Tresigallo: 32 altoparlanti e proiezione a 360° per la fruizione accessibile del patrimonio sonoro.'
    }
  ];

  const DRAWER_DATA = {
    timeline: {
      category: 'Evoluzione & Tempistiche',
      title: 'Timeline di Progetto',
      sections: [
        {
          heading: '2019 – 2021: Progetto SIPARIO (I Teatri Storici)',
          text: [
            'Programma: POR FESR 2014–2020 / FSC della Regione Emilia-Romagna (durata 24 mesi).',
            'Focus scientifico: documentazione e rilievo dell\'acustica tridimensionale di 7 teatri d\'opera storici regionali (tra cui il Teatro Pavarotti di Modena, il Teatro Masini di Faenza, il Teatro Municipale di Piacenza e il Teatro Comunale di Bologna). Misure MIMO con sorgente sferica a 32 altoparlanti, Eigenmike-32 e fotogrammetria con drone per le prime sale d\'ascolto a Parma e Bologna.'
          ]
        },
        {
          heading: '2024 – 2026: Progetto AGORÀ (Dalle Sale alle Piazze)',
          text: [
            'Programma: PR FESR Emilia-Romagna 2021–2027 (durata 30 mesi: 30/01/2024 – 29/07/2026).',
            'Focus scientifico: trasposizione ed evoluzione metodologica dallo spazio chiuso teatrale allo spazio pubblico urbano delle piazze monumentali intese come beni culturali immateriali. Rilievi su 11 piazze in 5 città, campionamento 3D con sonda em64 a 64 capsule e video 8K, modellazione VR a 6 gradi di libertà (6DoF) e restituzione accessibile per persone con disabilità.'
          ]
        },
        {
          heading: '2026 (Novembre): Sala Immersiva di Tresigallo & Sintesi',
          text: [
            'Allestimento della sala immersiva modulare permanente presso l\'edificio razionalista "Sogni" a Tresigallo (Città d\'Arte del \'900).',
            'Integrazione avanzata tra Ambisonics di 3° ordine, Wave Field Synthesis (WFS) con amplificazione a 32 canali e proiezione ottagonale a 360°, presentata pubblicamente a Parma (Centro Elisabetta, 27 Novembre 2026).'
          ]
        }
      ]
    },
    pubblicazioni: {
      category: 'Letteratura Scientifica',
      title: 'Pubblicazioni & Ricerca',
      sections: [
        {
          heading: 'Articoli su Riviste Internazionali con Peer-Review',
          text: [
            '• Farina A. et al. (2025) — "Immersive 3D Soundscape: Analysis of Environmental Acoustic Parameters of Historical Squares in Parma (Italy)". Urban Science, 9(7): 259.',
            '• Bevilacqua A., Farina A., Tronchin L. (2026) — "Six-Degree-of-Freedom Audio Rendering Using Spatial Impulse Responses in an Urban Context". ASME Journal of Vibration and Acoustics (in press).'
          ]
        },
        {
          heading: 'Atti del Congresso Internazionale I3DA 2025 (Immersive and 3D Audio)',
          text: [
            '• Battisti L. et al. — "3D Soundscape in Piazza Duomo of Parma"',
            '• Tentoni G. et al. — "Soundscape in Piazza Garibaldi in Parma"',
            '• Bevilacqua A. et al. — "Piazzale San Francesco (Parma) and Trafalgar Square"',
            '• Martinetti A. et al. — "Piazza Tre Martiri (Rimini) and Piccadilly Circus"',
            '• Tentoni G. et al. — "Piazza Cavour (Rimini) and Buckingham Palace Square"',
            '• Bevilacqua A. et al. — "Piazza del Popolo (Faenza) and Leicester Square"',
            '• Tronchin L. et al. — "Teatro Masini, Faenza: Indagini 2020 e 2025"',
            '• Rimoldi V.D.F. et al. — "Teatro Comunale di Bologna senza poltrone"'
          ]
        },
        {
          heading: 'Atti del Congresso Internazionale I3DA 2026',
          text: [
            '• Bevilacqua A., Farina A. et al. — "MIMO Measurements in Piazza Cavour"',
            '• Farina A., Bevilacqua A. et al. — "MIMO Measurements inside the Teatro Municipale in Piacenza"',
            '• Denaro A. et al. — "Acoustic Characterisation of Piazza Trepponti in Comacchio"',
            '• Tronchin L., Gelli F., Tentoni G. — "Luigi Russolo and the Acoustic Heritage of Comacchio"',
            '• Tronchin L., Denaro A. et al. — "A New Questionnaire for Subjective Assessment of Acoustic Quality through Reproduction in Ambisonics and WFS Virtual Environments"',
            '• Bevilacqua A., Farina A. et al. — "Evaluation of Acoustic and Scenery within the Communal Theatre in Modena"'
          ]
        }
      ]
    },
    partnership: {
      category: 'Partenariato Istituzionale',
      title: 'Partnership & Ruoli',
      logos: [
        {
          name: 'Gruppo C.S.A. S.p.A. (Soggetto Capofila)',
          image: 'assets/gallery/image8.png'
        },
        {
          name: 'Università di Bologna – CIRI-EC',
          image: 'assets/gallery/image9.png'
        },
        {
          name: 'Università di Parma – CIDEA',
          image: 'assets/gallery/image10.png'
        },
        {
          name: 'Consorzio Futuro in Ricerca (CFR)',
          image: 'assets/gallery/image11.png'
        }
      ],
      sections: [
        {
          heading: 'Soggetto Capofila',
          text: 'Gruppo C.S.A. S.p.A. (Istituto di Ricerca Applicata e Ambientale): capofila responsabile del coordinamento operativo, monitoraggio delle milestone, supervisione amministrativa e raccordo tra i partner industriali e scientifici. Team: G. Tentoni, A. Martinetti, I. Berardi, A. Denaro.'
        },
        {
          heading: 'Partner Scientifici e Accademici',
          text: [
            'Università di Bologna – Dipartimento di Architettura e CIRI Edilizia e Costruzioni: Responsabile scientifico Prof. Lamberto Tronchin; team operativo: L. Battisti, R. Yan, A. Farina, M. Fadda.',
            'Università di Parma – CIDEA (Centro Interdipartimentale per l\'Energia e l\'Ambiente): Prof. Sara Rainieri; A. Bevilacqua, M. Binelli.',
            'Consorzio Futuro in Ricerca (CFR): valorizzazione economica e trasferimento tecnologico dei risultati di ricerca verso il tessuto produttivo e le amministrazioni.'
          ]
        },
        {
          heading: 'Partner Industriali & Polo di Tresigallo',
          text: [
            'Imprese partner: PGM Acustica, Mango Mobile Agency, CreatiBo – Bologna Creative Hub.',
            'Polo di Tresigallo: Comune di Tresigallo, Associazione Torri di Marmo (messa a disposizione dell\'edificio \"Sogni\"), Zotech (amplificatori multicanale a 32 stadi dedicati), Ing. S. Campanini (sviluppo del plugin VST WFSMixer).'
          ]
        }
      ]
    },
    credits: {
      category: 'Governance & Impatto',
      title: 'Credits & Governance',
      sections: [
        {
          heading: 'Inquadramento Programmatico & Finanziamento (Fondi Europei e Regionali)',
          text: [
            '• Progetto AGORÀ ("Atelier sonoro per il GiocO, la RicercA, l\'AcusticA"): Cofinanziato dai Fondi Europei della Regione Emilia-Romagna nell\'ambito del Programma PR FESR 2021–2027 (Azione 1.1.2 - Sostegno alla ricerca industriale delle filiere produttive e dell\'innovazione). Costo e budget totale del progetto: 763.535,00 € (durata 30 mesi: 30/01/2024 – 29/07/2026).',
            '• Progetto SIPARIO ("Il Suono dei Teatri d\'Opera"): Progetto capostipite propedeutico, cofinanziato dal Programma POR FESR 2014–2020 / FSC della Regione Emilia-Romagna. Contributo pubblico regionale erogato: 501.500,00 € (durata 24 mesi: 2019–2021).',
            'Tutte le risorse economiche, gli stanziamenti e i contributi dei programmi comunitari sono accentrati sotto la supervisione e la rendicontazione amministrativa del soggetto capofila Gruppo C.S.A. S.p.A. e della Regione Emilia-Romagna.'
          ]
        },
        {
          heading: 'Coordinamento Scientifico Generale',
          text: 'Prof. Lamberto Tronchin (Alma Mater Studiorum – Università di Bologna, CIRI-EC), Prof. Sara Rainieri (Università di Parma, CIDEA), Dott. G. Tentoni (Gruppo C.S.A. S.p.A.). Ricercatori e sperimentatori di rilievo: A. Bevilacqua, A. Farina, L. Battisti, R. Yan, M. Binelli, A. Denaro, M. Fadda.'
        },
        {
          heading: 'Piattaforme Web & Documentazione',
          text: 'Siti ufficiali di approfondimento, archivi audio e video 360: progettoagora.org e progettosipario.org. Presentazione scientifica: Parma, Centro Elisabetta, 27 Novembre 2026.'
        }
      ]
    },
    gallery: {
      category: 'Archivio Visivo & Sperimentale',
      title: 'Gallery del Progetto',
      isGallery: true,
      items: [
        {
          title: 'Rimini, Piazza Cavour',
          caption: 'Setup di misura con microfono sferico a 64 capsule Eigenmike em64 e sorgente acustica per la cattura del soundscape.',
          image: 'assets/gallery/image12.jpg'
        },
        {
          title: 'Faenza, Piazza del Popolo',
          caption: 'Il gruppo di ricerca CIRI-EC dell\'Università di Bologna con la sonda sferica sotto le arcate dei portici storici.',
          image: 'assets/gallery/image13.jpg'
        },
        {
          title: 'Tresigallo, Piazza della Repubblica',
          caption: 'Postazione di misura ed emissione acustica installata in prossimità della fontana monumentale nella Città del \'900.',
          image: 'assets/gallery/image14.jpg'
        },
        {
          title: 'Faenza, Teatro Masini',
          caption: 'Misura delle risposte all\'impulso tridimensionali (IR 3D) con sonda sferica dal palcoscenico verso l\'ordine dei palchi.',
          image: 'assets/gallery/image15.jpg'
        },
        {
          title: 'Rimini, Piazza Cavour (Ripresa 360°)',
          caption: 'Scatto fotografico panoramico equirettangolare a 360° abbinato all\'acquisizione audio multicanale.',
          image: 'assets/gallery/image16.jpg'
        },
        {
          title: 'Il Team di Misura al Teatro Masini',
          caption: 'I ricercatori di CIRI-EC (UniBo), CIDEA (UniPr) e Gruppo C.S.A. durante le sessioni sperimentali a Faenza.',
          image: 'assets/gallery/image17.jpg'
        },
        {
          title: 'Array Sferico em64 sul Cavalletto',
          caption: 'Dettaglio della sfera rigida a 64 capsule Eigenmike em64 a 1,7 m di quota (Rimini, 2024).',
          image: 'assets/gallery/image27.jpg'
        },
        {
          title: 'Misura MIMO in Teatro (SIPARIO)',
          caption: 'Sorgente sferica a 32 altoparlanti e microfono Eigenmike sul palco nei teatri storici dell\'Emilia-Romagna.',
          image: 'assets/gallery/image23.jpg'
        },
        {
          title: 'Sorgente Sferica Chiesi & Eigenmike-32',
          caption: 'Diffusore sferico a 32 trasduttori controllati singolarmente (sinistra) e sonda microfonica a 32 capsule (destra).',
          image: 'assets/gallery/image24.jpg'
        },
        {
          title: 'Rilievo Aerofotogrammetrico con Drone',
          caption: 'Scansione volumetrica e fotogrammetrica con drone all\'interno del Teatro Comunale Pavarotti di Modena.',
          image: 'assets/gallery/image26.jpg'
        },
        {
          title: 'Armoniche Sferiche fino al 3° Ordine',
          caption: 'Rappresentazione spaziale dei 16 canali Ambix (ACN/SN3D) dall\'ordine 0 (W) all\'ordine 3 (Q, O, M, K, L, N, P).',
          image: 'assets/gallery/image28.jpg'
        },
        {
          title: 'Mappa Acustica 3D a Colori (Parma)',
          caption: 'Mappa di intensità e provenienza direzionale del paesaggio sonoro 3D sovrapposta a immagine 360 (Farina et al., Urban Science 2025).',
          image: 'assets/gallery/image29.jpg'
        },
        {
          title: 'Profili di Loudness nel Tempo (sone)',
          caption: 'Analisi psicoacustica comparata tra Piazza Garibaldi (forte variabilità), Piazza Duomo (silenziosa) e Piazzale Pilotta.',
          image: 'assets/gallery/image30.jpg'
        },
        {
          title: 'Piazza Cavour come Sala da Concerto',
          caption: 'em64 + dodecaedro con altoparlanti pilotati singolarmente (MIMO). Decadimento misurato ≈ 1,6 s: analogo a una sala d\'opera media.',
          image: 'assets/gallery/image31.jpg'
        },
        {
          title: 'Comacchio, Piazza Trepponti',
          caption: 'Prima caratterizzazione acustica dei ponti monumentali: sweep ESS su 9 posizioni con T30 tra 1,4 s e 1,9 s.',
          image: 'assets/gallery/image32.jpg'
        },
        {
          title: 'Sala Immersiva WFS di Tresigallo (Edificio Sogni)',
          caption: 'Allestimento della sala d\'ascolto con array circolare di diffusori Wave Field Synthesis e sistema di videoproiezione a 360°.',
          image: 'assets/gallery/tresigallo_wfs_room.jpg'
        },
        {
          title: 'Mappa delle Prime Riflessioni (Trepponti)',
          caption: 'Mappa panoramica delle prime riflessioni (0–80 ms) elaborata dalla sonda a 64 capsule a Comacchio.',
          image: 'assets/gallery/image33.jpg'
        },
        {
          title: 'Flusso di Modellazione VR 6DoF',
          caption: 'Schema della catena: Rilievo Visivo (fotogrammetria) + Rilievo Acustico (IR HOA) → Ambiente Audiovisivo Immersivo a 6DoF.',
          image: 'assets/gallery/image34.jpg',
          imageFit: 'contain'
        },
        {
          title: 'Piazzale San Francesco in Unreal Engine',
          caption: 'Ricostruzione 3D e navigazione libera a 6 gradi di libertà con auralizzazione in tempo reale di un brano da Il Trovatore.',
          image: 'assets/gallery/image35.jpg'
        }
      ]
    }
  };

  // =========================================================================
  // BLOCCO TEMA: "STILE EASY"
  // (Raggruppa tutti i parametri sonori, fisici e tipografici dell'onda spettrale)
  // Permette di sperimentare nuovi stili mantenendo intatta la struttura fissa.
  // =========================================================================
  const STILE_EASY = {
    id: 'easy',
    name: 'Stile Easy',
    description: 'Onda spettrale multifilamento ciano/ambra su fondo ossidiana, sintesi armonica eterea a due oscillatori e 2 soli font dedicati.',

    // I 2 caratteri tipografici associati allo Stile Easy
    typography: {
      titleFont: 'Space Grotesk',
      bodyFont: 'Plus Jakarta Sans'
    },

    // Parametri sonori specifici dello Stile Easy (Web Audio API)
    audio: {
      masterVolume: 0.75,
      osc1Type: 'sine',               // Oscillatore 1: sinusoidale puro
      osc2Type: 'triangle',           // Oscillatore 2: triangolare armonico (+1 ottava)
      baseFilterCutoff: 320,          // Cutoff filtro passa-basso a riposo (Hz)
      filterModulationRange: 1650,    // Escursione di apertura filtro al movimento mouse
      filterQ: 2.2,                   // Risonanza filtro
      maxVoiceGain: 0.18,             // Guadagno massimo della voce durante il moto
      frequencies: {
        'lab-c1': 110.0,  // La1
        'lab-c2': 137.5,  // Do#2
        'lab-c3': 165.0,  // Mi2
        'lab-c4': 220.0,  // La2
        'lab-c5': 275.0,  // Do#3
        'part-c1': 196.0, // Sol2 (Partner)
        'part-c2': 246.9, // Si2 (Crediti)
        'part-c3': 293.7, // Re3 (Pubblicazioni)
        'cred-c1': 349.2, // Fa3 (Timeline)
        'cred-c2': 392.0  // Sol3 (Gallery)
      }
    },

    // Parametri dinamici di risposta visiva dello Stile Easy
    dynamics: {
      maxWaveAmp: 8.5,        // Ampiezza massima dell'ondina al passaggio del mouse (px)
      energyDecay: 0.026,     // Decadimento inerziale dell'increspatura
      hoverPulseRadius: 4.5,  // Escursione pulsazione in-out ad hover stazionario (+/- px)
      hoverPulseSpeed: 3.5,   // Frequenza pulsazione in-out
      circleWaves: {
        'lab-c1': { cycles: 10, speed: 1.8 },
        'lab-c2': { cycles: 13, speed: 2.1 },
        'lab-c3': { cycles: 17, speed: 1.9 },
        'lab-c4': { cycles: 21, speed: 2.2 },
        'lab-c5': { cycles: 25, speed: 1.7 },
        'part-c1': { cycles: 9, speed: 2.0 },
        'part-c2': { cycles: 13, speed: 2.2 },
        'part-c3': { cycles: 17, speed: 1.8 },
        'cred-c1': { cycles: 10, speed: 1.9 },
        'cred-c2': { cycles: 14, speed: 2.1 }
      }
    }
  };

  // Modalità di adattamento immagine nella gallery (evita stringhe sparse)
  const IMAGE_FIT = Object.freeze({
    COVER: 'cover',
    CONTAIN: 'contain'
  });

  const GALLERY_DESKTOP_GROUP_SIZE = 3;
  const GALLERY_DESKTOP_QUAD_THRESHOLD = 4;
  const LIGHTBOX_FADE_DELAY_MS = 60;
  const INNERMOST_CIRCLE_IDS = Object.freeze(new Set(['lab-c1', 'part-c1', 'cred-c1']));
  const DIALOG_FOCUS_SELECTOR = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

  // Stile attivo applicato: Stile Easy (Onda spettrale su fondo ossidiana)
  let activeStyle = STILE_EASY;

  // -------------------------------------------------------------------------
  // REGISTRO DEI CERCHI (STRUTTURA GEOMETRICA FISSA: Sinistra 5 Fasi | Destra)
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // REGISTRO DEI CERCHI (COORDINATE DINAMICHE: Desktop Orizzontale | Mobile Verticale)
  // -------------------------------------------------------------------------
  const CIRCLES_REGISTRY = [
    // --- ONDA 1: LABORATORIO VIRTUALE (5 ONDE CONCENTRICHE, DISTANZE ARMONIZZATE E COMPATTE) ---
    {
      id: 'lab-c1',
      system: 'laboratorio',
      cx: 540, cy: 475, radius: 80, labelAngle: 0.85 * Math.PI,
      mobileCx: 285, mobileCy: 390, mobileRadius: 65, mobileLabelAngle: 0.85 * Math.PI,
      labelText: '1 • Acquisizione 3D',
      isPhase: true,
      phaseIndex: 0
    },
    {
      id: 'lab-c2',
      system: 'laboratorio',
      cx: 540, cy: 475, radius: 140, labelAngle: 0.25 * Math.PI,
      mobileCx: 285, mobileCy: 390, mobileRadius: 100, mobileLabelAngle: 0.25 * Math.PI,
      labelText: '2 • Risposte ad Impulso',
      isPhase: true,
      phaseIndex: 1
    },
    {
      id: 'lab-c3',
      system: 'laboratorio',
      cx: 540, cy: 475, radius: 200, labelAngle: 1.25 * Math.PI,
      mobileCx: 285, mobileCy: 390, mobileRadius: 135, mobileLabelAngle: 1.25 * Math.PI,
      labelText: '3 • Armoniche Sferiche',
      isPhase: true,
      phaseIndex: 2
    },
    {
      id: 'lab-c4',
      system: 'laboratorio',
      cx: 540, cy: 475, radius: 260, labelAngle: 1.75 * Math.PI,
      mobileCx: 285, mobileCy: 390, mobileRadius: 170, mobileLabelAngle: 1.75 * Math.PI,
      labelText: '4 • Realtà Virtuale 6DoF',
      isPhase: true,
      phaseIndex: 3
    },
    {
      id: 'lab-c5',
      system: 'laboratorio',
      cx: 540, cy: 475, radius: 320, labelAngle: 0.00 * Math.PI,
      mobileCx: 285, mobileCy: 390, mobileRadius: 205, mobileLabelAngle: 0.05 * Math.PI,
      labelText: '5 • Restituzione Immersiva',
      isPhase: true,
      phaseIndex: 4
    },

    // --- ONDA 2: RETE & RICERCA (Partner, Crediti, Pubblicazioni - CONTINUITÀ ACUSTICA) ---
    {
      id: 'part-c1',
      system: 'partnership',
      cx: 1240, cy: 285, radius: 65, labelAngle: 0.90 * Math.PI,
      mobileCx: 315, mobileCy: 890, mobileRadius: 75, mobileLabelAngle: 0.85 * Math.PI,
      labelText: 'Partner',
      isPhase: false
    },
    {
      id: 'part-c2',
      system: 'credits',
      cx: 1240, cy: 285, radius: 115, labelAngle: 1.65 * Math.PI,
      mobileCx: 315, mobileCy: 890, mobileRadius: 128, mobileLabelAngle: 1.65 * Math.PI,
      labelText: 'Crediti',
      isPhase: false
    },
    {
      id: 'part-c3',
      system: 'pubblicazioni',
      cx: 1240, cy: 285, radius: 165, labelAngle: 0.00 * Math.PI,
      mobileCx: 315, mobileCy: 890, mobileRadius: 180, mobileLabelAngle: 0.15 * Math.PI,
      labelText: 'Pubblicazioni',
      isPhase: false
    },

    // --- ONDA 3: ARCHIVIO (Timeline & Gallery - RACCORDO FLUIDO) ---
    {
      id: 'cred-c1',
      system: 'timeline',
      cx: 1240, cy: 690, radius: 65, labelAngle: 0.85 * Math.PI,
      mobileCx: 285, mobileCy: 1340, mobileRadius: 85, mobileLabelAngle: 0.85 * Math.PI,
      labelText: 'Timeline',
      isPhase: false
    },
    {
      id: 'cred-c2',
      system: 'gallery',
      cx: 1240, cy: 690, radius: 110, labelAngle: 0.00 * Math.PI,
      mobileCx: 285, mobileCy: 1340, mobileRadius: 155, mobileLabelAngle: 0.05 * Math.PI,
      labelText: 'Gallery',
      isPhase: false
    }
  ];

  // Hub centrali: disattivati su richiesta dell'utente per massima pulizia ed eleganza acustica
  const SYSTEM_HUBS = [];

  function isMobileViewport() {
    return window.innerWidth <= 900;
  }

  function getCircleCoords(c) {
    const isMob = isMobileViewport();
    return {
      cx: isMob ? (c.mobileCx || c.cx) : c.cx,
      cy: isMob ? (c.mobileCy || c.cy) : c.cy,
      radius: isMob ? (c.mobileRadius || c.radius) : c.radius,
      labelAngle: isMob ? (c.mobileLabelAngle || c.labelAngle) : c.labelAngle
    };
  }

  // -------------------------------------------------------------------------
  // STATO DINAMICO DELL'INTERAZIONE
  // -------------------------------------------------------------------------
  const state = {
    activeSection: 'laboratorio',
    currentPhaseIndex: 0,
    currentGalleryTrioIndex: 0,
    galleryLightboxOpen: false,
    currentLightboxIndex: 0,
    portalOpen: false,
    audioMuted: false,
    suppressHoverAudioUntil: 0,
    introRippleAudioPlayed: false,
    initialIntroCompleted: false,

    circles: {}
  };

  CIRCLES_REGISTRY.forEach(function (c) {
    state.circles[c.id] = {
      isHovered: false,
      motionEnergy: 0,
      pulsePhase: Math.random() * Math.PI * 2
    };
  });

  const circleDOM = {};

  // -------------------------------------------------------------------------
  // SINTESI ACUSTICA (Web Audio API)
  // -------------------------------------------------------------------------
  let audioCtx = null;
  let masterGainNode = null;
  const audioNodes = {};

  function getAudioOutputNode() {
    return masterGainNode || audioCtx.destination;
  }

  function initAudioContext() {
    if (audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audioCtx = new AudioContext();

      masterGainNode = audioCtx.createGain();
      masterGainNode.gain.setValueAtTime(activeStyle.audio.masterVolume, audioCtx.currentTime);
      masterGainNode.connect(audioCtx.destination);

      CIRCLES_REGISTRY.forEach(function (c) {
        // Timbro e accordatura dal blocco di stile attivo ("Stile Easy")
        const freq = activeStyle.audio.frequencies[c.id] || 220;
        createAudioVoice(c.id, freq);
      });

      // Voci audio dedicate per il pulsante rotante "Torna alla Home" e l'immagine circolare
      createAudioVoice('back-home', 440);
      createAudioVoice('portal-media', 330);

      // Tenta l'attivazione immediata all'avvio
      audioCtx.resume().then(function () {
        if (audioCtx.state === 'running') {
          detachUnlockListeners();
        }
      }).catch(function () {});
    } catch (err) {
      console.warn('Audio non supportato:', err);
    }
  }

  function createAudioVoice(id, freq) {
    if (!audioCtx) return null;
    try {
      const osc1 = audioCtx.createOscillator();
      osc1.type = activeStyle.audio.osc1Type;
      osc1.frequency.setValueAtTime(freq, audioCtx.currentTime);

      const osc2 = audioCtx.createOscillator();
      osc2.type = activeStyle.audio.osc2Type;
      osc2.frequency.setValueAtTime(freq * 2, audioCtx.currentTime);

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(activeStyle.audio.baseFilterCutoff, audioCtx.currentTime);
      filter.Q.setValueAtTime(activeStyle.audio.filterQ, audioCtx.currentTime);

      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.0001, audioCtx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(getAudioOutputNode());

      osc1.start();
      osc2.start();

      const voiceObj = {
        osc1: osc1,
        osc2: osc2,
        filter: filter,
        gain: gainNode,
        baseFreq: freq
      };

      audioNodes[id] = voiceObj;
      return voiceObj;
    } catch (e) {
      return null;
    }
  }

  function ensureAudioUnlocked(callback) {
    if (!audioCtx) initAudioContext();
    if (!audioCtx) return;

    function onUnlocked() {
      detachUnlockListeners();
      if (!state.introRippleAudioPlayed && !state.portalOpen) {
        state.introRippleAudioPlayed = true;
        triggerIntroExpansionRipple();
      }
      if (typeof callback === 'function') callback();
    }

    if (audioCtx.state === 'running') {
      onUnlocked();
      return;
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume().then(function () {
        if (audioCtx.state === 'running') {
          onUnlocked();
        }
      }).catch(function () {});
    }
  }

  // Ascoltatori reattivi su qualsiasi movimento del mouse, tocco o tasto
  const UNLOCK_EVENTS = [
    'pointermove', 'mousemove', 'mouseenter', 'mouseover', 'wheel',
    'pointerdown', 'mousedown', 'touchstart', 'touchend', 'keydown'
  ];
  function onUserWakeGesture() {
    ensureAudioUnlocked();
  }
  function attachUnlockListeners() {
    UNLOCK_EVENTS.forEach(function (evt) {
      window.addEventListener(evt, onUserWakeGesture, { capture: true, passive: true });
      document.addEventListener(evt, onUserWakeGesture, { capture: true, passive: true });
    });
  }
  function detachUnlockListeners() {
    UNLOCK_EVENTS.forEach(function (evt) {
      window.removeEventListener(evt, onUserWakeGesture, { capture: true });
      document.removeEventListener(evt, onUserWakeGesture, { capture: true });
    });
  }

  // -------------------------------------------------------------------------
  // SILENZIAMENTO RIGOROSO DI TUTTE LE VOCI AUDIO RESIDUE
  // (Evita droni continui al cambio pagina o al ritorno alla home)
  // -------------------------------------------------------------------------
  function silenceAllVoices(fadeSec) {
    if (!audioCtx) return;
    const time = audioCtx.currentTime;
    const ramp = fadeSec || 0.03;

    backHomeState.isHovered = false;
    backHomeState.motionEnergy = 0;
    mediaWaveState.isHovered = false;
    mediaWaveState.motionEnergy = 0;

    CIRCLES_REGISTRY.forEach(function (c) {
      if (state.circles[c.id]) {
        state.circles[c.id].isHovered = false;
        state.circles[c.id].motionEnergy = 0;
      }
      if (audioNodes[c.id] && audioNodes[c.id].gain) {
        try {
          audioNodes[c.id].gain.gain.cancelScheduledValues(time);
          audioNodes[c.id].gain.gain.setTargetAtTime(0.0001, time, ramp);
        } catch (e) {}
      }
    });

    if (audioNodes['back-home'] && audioNodes['back-home'].gain) {
      try {
        audioNodes['back-home'].gain.gain.cancelScheduledValues(time);
        audioNodes['back-home'].gain.gain.setTargetAtTime(0.0001, time, ramp);
      } catch (e) {}
    }

    if (audioNodes['portal-media'] && audioNodes['portal-media'].gain) {
      try {
        audioNodes['portal-media'].gain.gain.cancelScheduledValues(time);
        audioNodes['portal-media'].gain.gain.setTargetAtTime(0.0001, time, ramp);
      } catch (e) {}
    }
  }

  // -------------------------------------------------------------------------
  // SINTESI EFFETTI SONORI TRANSIZIONI (ZOOM IN, RITORNO MELODICO, FASI)
  // -------------------------------------------------------------------------
  function playZoomInChime(baseFreq) {
    if (!audioCtx || state.audioMuted) return;
    try {
      const freq = baseFreq || 220;
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 2.8, now + 0.6);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 1.5, now);
      filter.frequency.exponentialRampToValueAtTime(freq * 3.2, now + 0.6);
      filter.Q.setValueAtTime(3.2, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(getAudioOutputNode());

      osc.start(now);
      osc.stop(now + 0.8);
    } catch (e) {
      // Ignora errori di contesto non inizializzato
    }
  }

  function playReturnChime() {
    if (!audioCtx || state.audioMuted) return;
    try {
      const now = audioCtx.currentTime;
      const chord = [523.25, 392.00, 261.63]; // Do5, Sol4, Do4 (Accordo discendente etereo)
      chord.forEach(function (freq, i) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.11);

        gain.gain.setValueAtTime(0.0001, now + i * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.11 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.11 + 0.7);

        osc.connect(gain);
        gain.connect(getAudioOutputNode());

        osc.start(now + i * 0.11);
        osc.stop(now + i * 0.11 + 0.75);
      });
    } catch (e) {
      // Ignora errori
    }
  }

  function playPhaseStepSound() {
    if (!audioCtx || state.audioMuted) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.14, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      osc.connect(gain);
      gain.connect(getAudioOutputNode());

      osc.start(now);
      osc.stop(now + 0.32);
    } catch (e) {
      // Ignora errori
    }
  }

  function playRipplePulseSound(freq) {
    if (!audioCtx) initAudioContext();
    if (!audioCtx || state.audioMuted) return;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume().then(function () {
        if (audioCtx.state === 'running') {
          playSineTone(freq);
        }
      }).catch(function () {});
      return;
    }

    if (audioCtx.state === 'running') {
      playSineTone(freq);
    }
  }

  function playSineTone(freq) {
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.065, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

      osc.connect(gain);
      gain.connect(getAudioOutputNode());

      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {
      // Ignora errori
    }
  }

  // -------------------------------------------------------------------------
  // CALCOLO GEOMETRICO: CERCHIO APERTO CON RESPIRO LATERALE PER IL TESTO
  // -------------------------------------------------------------------------
  function computeCircleGapArc(c) {
    if (!c.labelText) {
      return { hasGap: false };
    }

    const coords = getCircleCoords(c);
    const isMob = isMobileViewport();
    const textPxWidth = c.labelText.length * (isMob ? 11.0 : 10.5);
    const paddingPx = isMob ? 14 : 22; // Respiro laterale calibrato
    const totalGapPx = textPxWidth + paddingPx * 2;

    const gapHalfAngle = (totalGapPx / 2) / coords.radius;
    const centerAngle = coords.labelAngle;

    const arcStartAngle = centerAngle + gapHalfAngle;
    const arcEndAngle = centerAngle - gapHalfAngle;

    return {
      hasGap: true,
      centerAngle: centerAngle,
      gapHalfAngle: gapHalfAngle,
      arcStartAngle: arcStartAngle,
      arcEndAngle: arcEndAngle
    };
  }

  function revealAllCirclesImmediately() {
    state.initialIntroCompleted = true;
    CIRCLES_REGISTRY.forEach(function (c) {
      const dom = circleDOM[c.id];
      if (dom && dom.group) {
        dom.group.classList.remove('initial-hidden', 'circle-revealing');
        dom.group.classList.add('circle-revealed');
      }
    });
  }

  function updateSvgLayout() {
    const svg = document.getElementById('soundWavesSvg');
    if (!svg) return;
    const isMob = isMobileViewport();
    if (isMob) {
      svg.setAttribute('viewBox', '0 0 600 1700');
    } else {
      svg.setAttribute('viewBox', '0 0 1600 950');
    }

    // Aggiorna le posizioni degli Hub centrali (se presenti)
    SYSTEM_HUBS.forEach(function (hub) {
      const g = document.getElementById('hub-group-' + hub.id);
      if (!g) return;
      const hx = isMob ? hub.mobileCx : hub.desktopCx;
      const hy = isMob ? hub.mobileCy : hub.desktopCy;
      const tTitle = g.querySelector('.system-hub-title');
      const tSub = g.querySelector('.system-hub-subtitle');
      const hit = g.querySelector('.hub-hit-circle');
      if (tTitle) {
        tTitle.setAttribute('x', hx);
        tTitle.setAttribute('y', hy - 5);
      }
      if (tSub) {
        tSub.setAttribute('x', hx);
        tSub.setAttribute('y', hy + 14);
      }
      if (hit) {
        hit.setAttribute('cx', hx);
        hit.setAttribute('cy', hy);
        hit.setAttribute('r', isMob ? 46 : 40);
      }
    });

    // Ricalcola i varchi per i testi su tutti i cerchi
    CIRCLES_REGISTRY.forEach(function (c) {
      const dom = circleDOM[c.id];
      if (dom) {
        dom.gapData = computeCircleGapArc(c);
      }
    });
  }

  // -------------------------------------------------------------------------
  // COSTRUZIONE SCENA SVG (CON FILAMENTI ARMONICI MULTIPLI & ONDE GRANDI)
  // -------------------------------------------------------------------------
  function renderSvgScene() {
    const sceneGroup = document.getElementById('wavesSceneGroup');
    if (!sceneGroup) return;
    sceneGroup.innerHTML = '';

    const svg = document.getElementById('soundWavesSvg');
    const isMob = isMobileViewport();
    if (svg) {
      svg.setAttribute('viewBox', isMob ? '0 0 600 1700' : '0 0 1600 950');
    }

    CIRCLES_REGISTRY.forEach(function (c) {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', state.initialIntroCompleted ? 'circle-item circle-revealed' : 'circle-item initial-hidden');
      g.setAttribute('id', 'item-' + c.id);
      g.setAttribute('data-id', c.id);
      g.setAttribute('data-system', c.system);
      g.setAttribute('role', 'button');
      g.setAttribute('tabindex', '0');
      if (c.labelText) g.setAttribute('aria-label', c.labelText);
      if (c.isPhase) g.setAttribute('data-phase-index', c.phaseIndex);

      // 1. Filamenti Armonici Secondari (Texture a nastro spettrale come da moodboard)
      const strandA = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      strandA.setAttribute('class', 'wave-harmonic-strand strand-inner');
      g.appendChild(strandA);

      const strandB = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      strandB.setAttribute('class', 'wave-harmonic-strand strand-outer');
      g.appendChild(strandB);

      // 2. Tracciato Principale Luminescente (Cerchio Aperto)
      const pathVis = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathVis.setAttribute('class', 'wave-single-circle');
      pathVis.setAttribute('id', 'vis-' + c.id);
      g.appendChild(pathVis);

      // 3. Tracciato Guida per il Testo su Path (<textPath>)
      let guidePath = null;
      if (c.labelText) {
        guidePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        guidePath.setAttribute('id', 'guide-' + c.id);
        guidePath.setAttribute('fill', 'none');
        guidePath.setAttribute('stroke', 'none');
        g.appendChild(guidePath);

        const textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElem.setAttribute('class', 'wave-path-text');
        textElem.setAttribute('dominant-baseline', 'central');

        const textPathElem = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
        textPathElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#guide-' + c.id);
        textPathElem.setAttribute('href', '#guide-' + c.id);
        textPathElem.setAttribute('startOffset', '50%');
        textPathElem.setAttribute('text-anchor', 'middle');
        textPathElem.setAttribute('dominant-baseline', 'central');
        textPathElem.setAttribute('alignment-baseline', 'central');
        textPathElem.textContent = c.labelText;

        textElem.appendChild(textPathElem);
        g.appendChild(textElem);
      }

      // 4. Hit Proxy Trasparente (esteso all'interno per gli anelli centrali)
      const hitProxy = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const hitProxyClass = INNERMOST_CIRCLE_IDS.has(c.id)
        ? 'circle-hit-proxy circle-hit-proxy--innermost'
        : 'circle-hit-proxy';
      hitProxy.setAttribute('class', hitProxyClass);
      hitProxy.setAttribute('id', 'hit-' + c.id);
      g.appendChild(hitProxy);

      sceneGroup.appendChild(g);

      circleDOM[c.id] = {
        config: c,
        group: g,
        pathVis: pathVis,
        strandA: strandA,
        strandB: strandB,
        guidePath: guidePath,
        hitProxy: hitProxy,
        gapData: computeCircleGapArc(c)
      };
    });

    // 5. Hub Centrali Informativi (Rendono immediatamente chiaro il contenuto di ogni gruppo di onde)
    SYSTEM_HUBS.forEach(function (hub) {
      const hx = isMob ? hub.mobileCx : hub.desktopCx;
      const hy = isMob ? hub.mobileCy : hub.desktopCy;

      const gHub = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      gHub.setAttribute('class', 'system-hub-group');
      gHub.setAttribute('id', 'hub-group-' + hub.id);
      gHub.setAttribute('role', 'button');
      gHub.setAttribute('tabindex', '0');

      const hitCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      hitCircle.setAttribute('class', 'hub-hit-circle');
      hitCircle.setAttribute('cx', hx);
      hitCircle.setAttribute('cy', hy);
      hitCircle.setAttribute('r', isMob ? 46 : 40);
      hitCircle.setAttribute('fill', 'rgba(3, 7, 18, 0.55)');
      hitCircle.setAttribute('stroke', 'rgba(56, 189, 248, 0.28)');
      hitCircle.setAttribute('stroke-width', '1');
      gHub.appendChild(hitCircle);

      const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      title.setAttribute('class', 'system-hub-title');
      title.setAttribute('x', hx);
      title.setAttribute('y', hy - 5);
      title.setAttribute('text-anchor', 'middle');
      title.textContent = hub.title;
      gHub.appendChild(title);

      const sub = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      sub.setAttribute('class', 'system-hub-subtitle');
      sub.setAttribute('x', hx);
      sub.setAttribute('y', hy + 14);
      sub.setAttribute('text-anchor', 'middle');
      sub.textContent = hub.subtitle;
      gHub.appendChild(sub);

      hitCircle.addEventListener('click', function (e) {
        e.stopPropagation();
        ensureAudioUnlocked();
        if (hub.system === 'laboratorio') {
          openCircularPortal('laboratorio', hub.phaseIndex || 0, { x: hx, y: hy });
        } else {
          openCircularPortal(hub.system, null, { x: hx, y: hy });
        }
      });

      sceneGroup.appendChild(gHub);
    });
  }

  // -------------------------------------------------------------------------
  // GENERATORE TRACCIATO ARCO CON DISPERSIONE ARMONICA
  // -------------------------------------------------------------------------
  function generateArcPathString(cx, cy, radius, startAngle, endAngle, waveAmp, cycles, speedPhase) {
    const pointsCount = 100;
    const pathParts = [];

    let totalSpan = endAngle - startAngle;
    while (totalSpan <= 0) totalSpan += Math.PI * 2;

    for (let i = 0; i <= pointsCount; i++) {
      const frac = i / pointsCount;
      const angle = startAngle + frac * totalSpan;

      const ripple = waveAmp * Math.sin(cycles * angle + speedPhase);
      const r = radius + ripple;

      const x = cx + r * Math.sin(angle);
      const y = cy - r * Math.cos(angle);

      if (i === 0) {
        pathParts.push('M', x.toFixed(2), y.toFixed(2));
      } else {
        pathParts.push('L', x.toFixed(2), y.toFixed(2));
      }
    }

    return pathParts.join(' ');
  }

  function generateTextGuideArc(cx, cy, radius, centerAngle, labelText) {
    const textLen = (labelText && labelText.length) ? labelText.length : 12;
    const isMob = isMobileViewport();
    // Calcolo dell'estensione dell'arco guida calibrato su scala desktop e mobile
    const charAngle = (isMob ? 11.5 : 9.0) / radius;
    const span = Math.min(1.35, Math.max(0.60, (textLen * charAngle) / 2 + 0.30));

    // Normalizziamo l'angolo centrale in [0, 2*PI)
    let normAngle = centerAngle % (Math.PI * 2);
    if (normAngle < 0) normAngle += Math.PI * 2;

    const isUpsideDown = normAngle > 0.45 * Math.PI && normAngle < 1.55 * Math.PI;

    const a1 = centerAngle - span;
    const a2 = centerAngle + span;

    if (isUpsideDown) {
      const guideR = radius + (isMob ? 4.0 : 3.0);
      const x1 = cx + guideR * Math.sin(a1);
      const y1 = cy - guideR * Math.cos(a1);
      const x2 = cx + guideR * Math.sin(a2);
      const y2 = cy - guideR * Math.cos(a2);

      return ['M', x2.toFixed(2), y2.toFixed(2), 'A', guideR.toFixed(2), guideR.toFixed(2), 0, 0, 0, x1.toFixed(2), y1.toFixed(2)].join(' ');
    } else {
      const guideR = radius - 0.5;
      const x1 = cx + guideR * Math.sin(a1);
      const y1 = cy - guideR * Math.cos(a1);
      const x2 = cx + guideR * Math.sin(a2);
      const y2 = cy - guideR * Math.cos(a2);

      return ['M', x1.toFixed(2), y1.toFixed(2), 'A', guideR.toFixed(2), guideR.toFixed(2), 0, 0, 1, x2.toFixed(2), y2.toFixed(2)].join(' ');
    }
  }

  // -------------------------------------------------------------------------
  // ANIMATION LOOP A 60 FPS (MULTIFILAMENTO ARMONICO & PULSAZIONE IN-OUT)
  // -------------------------------------------------------------------------
  let animTime = 0;

  function mainAnimationLoop(timestamp) {
    animTime = timestamp * 0.003;

    CIRCLES_REGISTRY.forEach(function (c) {
      const st = state.circles[c.id];
      const dom = circleDOM[c.id];
      if (!dom) return;

      const coords = getCircleCoords(c);

      // Parametri dinamici derivati dallo Stile attivo
      const waveProfile = activeStyle.dynamics.circleWaves[c.id] || { cycles: 12, speed: 2.0 };
      const cycles = waveProfile.cycles;
      const speed = waveProfile.speed;

      // 1. Passaggio del mouse: energia di moto per le ondine
      st.motionEnergy = Math.max(0, st.motionEnergy - activeStyle.dynamics.energyDecay);
      const waveAmplitude = st.motionEnergy * activeStyle.dynamics.maxWaveAmp;

      // 2. Hover stazionario: pulsazione ritmica in-out
      let radiusOffset = 0;
      if (st.isHovered) {
        radiusOffset = Math.sin(animTime * activeStyle.dynamics.hoverPulseSpeed) * activeStyle.dynamics.hoverPulseRadius;
      }
      const currentRadius = coords.radius + radiusOffset;

      // 3. Generazione tracciato cerchio aperto principale
      let dVisible = '';
      let dStrandInner = '';
      let dStrandOuter = '';
      let dHit = '';

      if (dom.gapData.hasGap) {
        // Linea principale
        dVisible = generateArcPathString(
          coords.cx,
          coords.cy,
          currentRadius,
          dom.gapData.arcStartAngle,
          dom.gapData.arcEndAngle,
          waveAmplitude,
          cycles,
          animTime * speed
        );

        // Filamento armonico interno (leggermente sfasato)
        dStrandInner = generateArcPathString(
          coords.cx,
          coords.cy,
          currentRadius - 2.5,
          dom.gapData.arcStartAngle,
          dom.gapData.arcEndAngle,
          waveAmplitude * 0.7,
          cycles,
          animTime * speed + 0.6
        );

        // Filamento armonico esterno (leggermente sfasato)
        dStrandOuter = generateArcPathString(
          coords.cx,
          coords.cy,
          currentRadius + 2.5,
          dom.gapData.arcStartAngle,
          dom.gapData.arcEndAngle,
          waveAmplitude * 0.7,
          cycles,
          animTime * speed - 0.6
        );

        if (dom.guidePath) {
          const dGuide = generateTextGuideArc(coords.cx, coords.cy, currentRadius, dom.gapData.centerAngle, c.labelText);
          dom.guidePath.setAttribute('d', dGuide);
        }

        dHit = generateArcPathString(coords.cx, coords.cy, coords.radius, 0, Math.PI * 2, 0, 1, 0);
      } else {
        dVisible = generateArcPathString(
          coords.cx,
          coords.cy,
          currentRadius,
          0,
          Math.PI * 2,
          waveAmplitude,
          cycles,
          animTime * speed
        );
        dStrandInner = generateArcPathString(
          coords.cx,
          coords.cy,
          currentRadius - 2.5,
          0,
          Math.PI * 2,
          waveAmplitude * 0.7,
          cycles,
          animTime * speed + 0.6
        );
        dStrandOuter = generateArcPathString(
          coords.cx,
          coords.cy,
          currentRadius + 2.5,
          0,
          Math.PI * 2,
          waveAmplitude * 0.7,
          cycles,
          animTime * speed - 0.6
        );
        dHit = dVisible;
      }

      dom.pathVis.setAttribute('d', dVisible);
      dom.strandA.setAttribute('d', dStrandInner);
      dom.strandB.setAttribute('d', dStrandOuter);
      dom.hitProxy.setAttribute('d', dHit);

      if (st.isHovered) {
        dom.pathVis.style.strokeWidth = (1.6 + Math.sin(animTime * activeStyle.dynamics.hoverPulseSpeed) * 0.8).toFixed(2);
        dom.strandA.style.opacity = '0.55';
        dom.strandB.style.opacity = '0.55';
      } else {
        dom.pathVis.style.strokeWidth = '';
        dom.strandA.style.opacity = '';
        dom.strandB.style.opacity = '';
      }

      // 4. Modulazione sonora armonica dei cerchi della Home
      if (audioCtx && audioNodes[c.id]) {
        const voice = audioNodes[c.id];
        const isHoverAudioSuppressed = performance.now() < state.suppressHoverAudioUntil;
        if (state.portalOpen || state.audioMuted || isHoverAudioSuppressed) {
          // Quando si è in una pagina interna, l'audio è spento o durante la propagazione di ritorno alla home,
          // i cerchi della Home non devono produrre suoni di passaggio del mouse
          voice.gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.04);
        } else {
          const combinedIntensity = Math.min(1.0, st.motionEnergy * 1.2 + (st.isHovered ? 0.4 : 0));
          const targetVol = Math.max(0.0001, Math.pow(combinedIntensity, 1.3) * activeStyle.audio.maxVoiceGain);
          const targetCutoff = activeStyle.audio.baseFilterCutoff + combinedIntensity * activeStyle.audio.filterModulationRange;

          voice.gain.gain.setTargetAtTime(targetVol, audioCtx.currentTime, 0.08);
          voice.filter.frequency.setTargetAtTime(targetCutoff, audioCtx.currentTime, 0.08);
        }
      }
    });

    // 5. Animazione del cerchio rotante "Torna alla Home" e dell'immagine
    if (state.portalOpen) {
      animateBackHomeCircle();
      if (state.activeSection === 'laboratorio') {
        animatePortalMediaCircle();
      } else if (audioCtx && audioNodes['portal-media']) {
        audioNodes['portal-media'].gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.03);
      }
      if (state.activeSection === 'gallery') {
        animateGalleryCircles();
      }
    } else {
      // Quando siamo sulla Home: silenzia rigorosamente le voci della pagina interna
      if (audioCtx) {
        if (audioNodes['back-home']) audioNodes['back-home'].gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.03);
        if (audioNodes['portal-media']) audioNodes['portal-media'].gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.03);
      }
      backHomeState.isHovered = false;
      backHomeState.motionEnergy = 0;
      mediaWaveState.isHovered = false;
      mediaWaveState.motionEnergy = 0;
    }

    requestAnimationFrame(mainAnimationLoop);
  }

  // -------------------------------------------------------------------------
  // CERCHIO "TORNA ALLA HOME" (ROTANTE, AD ONDA, INTERATTIVO CON AUDIO)
  // -------------------------------------------------------------------------
  const backHomeState = {
    isHovered: false,
    motionEnergy: 0,
    rotAngle: 0
  };

  const backHomeDOM = {};

  function initBackHomeCircle() {
    const group = document.getElementById('backHomeWaveGroup');
    if (!group) return;
    group.innerHTML = '';

    const strandA = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    strandA.setAttribute('class', 'wave-harmonic-strand strand-inner');
    group.appendChild(strandA);

    const strandB = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    strandB.setAttribute('class', 'wave-harmonic-strand strand-outer');
    group.appendChild(strandB);

    const pathVis = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathVis.setAttribute('class', 'wave-single-circle');
    group.appendChild(pathVis);

    const guidePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    guidePath.setAttribute('id', 'guide-back-home');
    guidePath.setAttribute('fill', 'none');
    guidePath.setAttribute('stroke', 'none');
    group.appendChild(guidePath);

    const textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElem.setAttribute('class', 'wave-path-text');
    textElem.setAttribute('dominant-baseline', 'central');

    const textPathElem = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
    textPathElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#guide-back-home');
    textPathElem.setAttribute('href', '#guide-back-home');
    textPathElem.setAttribute('startOffset', '50%');
    textPathElem.setAttribute('text-anchor', 'middle');
    textPathElem.setAttribute('dominant-baseline', 'central');
    textPathElem.setAttribute('alignment-baseline', 'central');
    textPathElem.textContent = 'TORNA ALLA HOME';

    textElem.appendChild(textPathElem);
    group.appendChild(textElem);

    const hitProxy = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    hitProxy.setAttribute('class', 'circle-hit-proxy');
    group.appendChild(hitProxy);

    hitProxy.addEventListener('pointerenter', function () {
      ensureAudioUnlocked();
      backHomeState.isHovered = true;
      backHomeState.motionEnergy = 1.0;
    });

    hitProxy.addEventListener('pointermove', function () {
      backHomeState.motionEnergy = Math.min(1.0, backHomeState.motionEnergy + 0.15);
    });

    hitProxy.addEventListener('pointerleave', function () {
      backHomeState.isHovered = false;
    });

    hitProxy.addEventListener('click', function (e) {
      e.stopPropagation();
      ensureAudioUnlocked();
      closeCircularPortal();
    });

    backHomeDOM.group = group;
    backHomeDOM.strandA = strandA;
    backHomeDOM.strandB = strandB;
    backHomeDOM.pathVis = pathVis;
    backHomeDOM.guidePath = guidePath;
    backHomeDOM.hitProxy = hitProxy;
  }

  function animateBackHomeCircle() {
    const dom = backHomeDOM;
    if (!dom.pathVis) return;

    const cx = 80;
    const cy = 80;
    const baseRadius = 54;
    const labelText = 'TORNA ALLA HOME';

    // Rotazione continua del cerchio
    backHomeState.rotAngle += 0.007;
    const centerAngle = backHomeState.rotAngle % (Math.PI * 2);

    backHomeState.motionEnergy = Math.max(0, backHomeState.motionEnergy - activeStyle.dynamics.energyDecay);
    const waveAmp = backHomeState.motionEnergy * activeStyle.dynamics.maxWaveAmp;

    let radiusOffset = 0;
    if (backHomeState.isHovered) {
      radiusOffset = Math.sin(animTime * activeStyle.dynamics.hoverPulseSpeed) * activeStyle.dynamics.hoverPulseRadius;
    }
    const currentRadius = baseRadius + radiusOffset;

    const gapData = computeCircleGapArcDynamic(baseRadius, labelText, centerAngle);

    const dVisible = generateArcPathString(cx, cy, currentRadius, gapData.arcStartAngle, gapData.arcEndAngle, waveAmp, 12, animTime * 2.0);
    const dStrandInner = generateArcPathString(cx, cy, currentRadius - 2.5, gapData.arcStartAngle, gapData.arcEndAngle, waveAmp * 0.7, 12, animTime * 2.0 + 0.6);
    const dStrandOuter = generateArcPathString(cx, cy, currentRadius + 2.5, gapData.arcStartAngle, gapData.arcEndAngle, waveAmp * 0.7, 12, animTime * 2.0 - 0.6);
    const dGuide = generateTextGuideArc(cx, cy, currentRadius, centerAngle, labelText);
    const dHit = generateArcPathString(cx, cy, baseRadius, 0, Math.PI * 2, 0, 1, 0);

    dom.pathVis.setAttribute('d', dVisible);
    dom.strandA.setAttribute('d', dStrandInner);
    dom.strandB.setAttribute('d', dStrandOuter);
    dom.guidePath.setAttribute('d', dGuide);
    dom.hitProxy.setAttribute('d', dHit);

    if (backHomeState.isHovered) {
      dom.pathVis.style.strokeWidth = (1.6 + Math.sin(animTime * activeStyle.dynamics.hoverPulseSpeed) * 0.8).toFixed(2);
      dom.strandA.style.opacity = '0.65';
      dom.strandB.style.opacity = '0.65';
    } else {
      dom.pathVis.style.strokeWidth = '';
      dom.strandA.style.opacity = '';
      dom.strandB.style.opacity = '';
    }

    // Modulazione sonora armonica
    if (audioCtx && !state.audioMuted && audioNodes['back-home']) {
      const voice = audioNodes['back-home'];
      const combinedIntensity = Math.min(1.0, backHomeState.motionEnergy * 1.2 + (backHomeState.isHovered ? 0.45 : 0));
      const targetVol = Math.max(0.0001, Math.pow(combinedIntensity, 1.3) * activeStyle.audio.maxVoiceGain);
      const targetCutoff = activeStyle.audio.baseFilterCutoff + combinedIntensity * activeStyle.audio.filterModulationRange;

      voice.gain.gain.setTargetAtTime(targetVol, audioCtx.currentTime, 0.08);
      voice.filter.frequency.setTargetAtTime(targetCutoff, audioCtx.currentTime, 0.08);
    }
  }

  function computeCircleGapArcDynamic(radius, labelText, centerAngle) {
    const textPxWidth = labelText.length * 9.5;
    const paddingPx = 18;
    const totalGapPx = textPxWidth + paddingPx * 2;
    const gapHalfAngle = (totalGapPx / 2) / radius;

    return {
      hasGap: true,
      centerAngle: centerAngle,
      gapHalfAngle: gapHalfAngle,
      arcStartAngle: centerAngle + gapHalfAngle,
      arcEndAngle: centerAngle - gapHalfAngle
    };
  }

  // -------------------------------------------------------------------------
  // BORDO CIRCOLARE D'ONDA PER L'IMMAGINE A LATO (STESSE INTERAZIONI DELLA HOME)
  // -------------------------------------------------------------------------
  const mediaWaveState = {
    isHovered: false,
    motionEnergy: 0
  };

  const portalMediaDOM = {};

  function initPortalMediaCircle() {
    const group = document.getElementById('portalMediaWaveGroup');
    if (!group) return;
    group.innerHTML = '';

    const strandA = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    strandA.setAttribute('class', 'wave-harmonic-strand strand-inner');
    group.appendChild(strandA);

    const strandB = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    strandB.setAttribute('class', 'wave-harmonic-strand strand-outer');
    group.appendChild(strandB);

    const pathVis = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathVis.setAttribute('class', 'wave-single-circle');
    group.appendChild(pathVis);

    const hitProxy = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    hitProxy.setAttribute('class', 'circle-hit-proxy');
    group.appendChild(hitProxy);

    hitProxy.addEventListener('pointerenter', function () {
      ensureAudioUnlocked();
      mediaWaveState.isHovered = true;
      mediaWaveState.motionEnergy = 1.0;
    });

    hitProxy.addEventListener('pointermove', function () {
      mediaWaveState.motionEnergy = Math.min(1.0, mediaWaveState.motionEnergy + 0.15);
    });

    hitProxy.addEventListener('pointerleave', function () {
      mediaWaveState.isHovered = false;
    });

    portalMediaDOM.group = group;
    portalMediaDOM.strandA = strandA;
    portalMediaDOM.strandB = strandB;
    portalMediaDOM.pathVis = pathVis;
    portalMediaDOM.hitProxy = hitProxy;
  }

  function animatePortalMediaCircle() {
    const dom = portalMediaDOM;
    if (!dom.pathVis) return;

    // Centro e raggio tarati sul viewBox 0 0 440 440 (Cornice più grande con padding di stacco)
    const cx = 220;
    const cy = 220;
    const baseRadius = 210;

    mediaWaveState.motionEnergy = Math.max(0, mediaWaveState.motionEnergy - activeStyle.dynamics.energyDecay);
    const waveAmp = mediaWaveState.motionEnergy * activeStyle.dynamics.maxWaveAmp;

    let radiusOffset = 0;
    if (mediaWaveState.isHovered) {
      radiusOffset = Math.sin(animTime * activeStyle.dynamics.hoverPulseSpeed) * activeStyle.dynamics.hoverPulseRadius;
    }
    const currentRadius = baseRadius + radiusOffset;

    const cycles = 18;
    const speed = 1.8;

    const dVisible = generateArcPathString(cx, cy, currentRadius, 0, Math.PI * 2, waveAmp, cycles, animTime * speed);
    const dStrandInner = generateArcPathString(cx, cy, currentRadius - 2.5, 0, Math.PI * 2, waveAmp * 0.7, cycles, animTime * speed + 0.6);
    const dStrandOuter = generateArcPathString(cx, cy, currentRadius + 2.5, 0, Math.PI * 2, waveAmp * 0.7, cycles, animTime * speed - 0.6);
    const dHit = dVisible;

    dom.pathVis.setAttribute('d', dVisible);
    dom.strandA.setAttribute('d', dStrandInner);
    dom.strandB.setAttribute('d', dStrandOuter);
    dom.hitProxy.setAttribute('d', dHit);

    if (mediaWaveState.isHovered) {
      dom.pathVis.style.strokeWidth = (1.6 + Math.sin(animTime * activeStyle.dynamics.hoverPulseSpeed) * 0.8).toFixed(2);
      dom.strandA.style.opacity = '0.65';
      dom.strandB.style.opacity = '0.65';
    } else {
      dom.pathVis.style.strokeWidth = '';
      dom.strandA.style.opacity = '';
      dom.strandB.style.opacity = '';
    }

    // Modulazione sonora armonica
    if (audioCtx && !state.audioMuted && audioNodes['portal-media']) {
      const voice = audioNodes['portal-media'];
      const combinedIntensity = Math.min(1.0, mediaWaveState.motionEnergy * 1.2 + (mediaWaveState.isHovered ? 0.45 : 0));
      const targetVol = Math.max(0.0001, Math.pow(combinedIntensity, 1.3) * activeStyle.audio.maxVoiceGain);
      const targetCutoff = activeStyle.audio.baseFilterCutoff + combinedIntensity * activeStyle.audio.filterModulationRange;

      voice.gain.gain.setTargetAtTime(targetVol, audioCtx.currentTime, 0.08);
      voice.filter.frequency.setTargetAtTime(targetCutoff, audioCtx.currentTime, 0.08);
    }
  }

  // -------------------------------------------------------------------------
  // GALLERY GENERALE: REGISTRO DEI CERCHI D'ONDA INTERATTIVI SULLE FOTO
  // -------------------------------------------------------------------------
  const galleryCirclesRegistry = [];

  function animateGalleryCircles() {
    galleryCirclesRegistry.forEach(function (gc, idx) {
      if (!gc.pathVis) return;
      gc.motionEnergy = Math.max(0, gc.motionEnergy - activeStyle.dynamics.energyDecay);
      const waveAmp = gc.motionEnergy * activeStyle.dynamics.maxWaveAmp;

      let radiusOffset = 0;
      if (gc.isHovered) {
        radiusOffset = Math.sin(animTime * activeStyle.dynamics.hoverPulseSpeed) * 3.5;
      }
      const currentRadius = gc.radius + radiusOffset;
      const cycles = 14;
      const speed = 1.9;

      const dVisible = generateArcPathString(gc.cx, gc.cy, currentRadius, 0, Math.PI * 2, waveAmp, cycles, animTime * speed + idx * 0.2);
      const dStrandInner = generateArcPathString(gc.cx, gc.cy, currentRadius - 2.5, 0, Math.PI * 2, waveAmp * 0.7, cycles, animTime * speed + idx * 0.2 + 0.6);
      const dStrandOuter = generateArcPathString(gc.cx, gc.cy, currentRadius + 2.5, 0, Math.PI * 2, waveAmp * 0.7, cycles, animTime * speed + idx * 0.2 - 0.6);

      gc.pathVis.setAttribute('d', dVisible);
      gc.strandA.setAttribute('d', dStrandInner);
      gc.strandB.setAttribute('d', dStrandOuter);
      gc.hitProxy.setAttribute('d', dVisible);

      if (gc.isHovered) {
        gc.pathVis.style.strokeWidth = '2.2';
        gc.strandA.style.opacity = '0.65';
        gc.strandB.style.opacity = '0.65';
      } else {
        gc.pathVis.style.strokeWidth = '';
        gc.strandA.style.opacity = '';
        gc.strandB.style.opacity = '';
      }
    });
  }

  // Riporta in cima lo scroll dell'overlay quando si cambia sezione o fase
  function resetPortalScrollPosition() {
    const portal = document.getElementById('circularPortal');
    const layout = document.getElementById('portalStandardLayout');

    if (portal) portal.scrollTop = 0;
    if (layout) layout.scrollTop = 0;
  }

  // -------------------------------------------------------------------------
  // GESTIONE DELLA PAGINA (ZOOM IN/OUT & NAVIGAZIONE AD ONDE)
  // -------------------------------------------------------------------------
  function openCircularPortal(sectionKey, phaseIndex, clickOrigin) {
    // Segna subito il portale aperto per evitare il ripple introduttivo sullo sblocco audio
    state.portalOpen = true;
    state.activeSection = sectionKey;
    state.introRippleAudioPlayed = true;

    revealAllCirclesImmediately();
    ensureAudioUnlocked();
    silenceAllVoices(0.02);
    resetPortalScrollPosition();

    const isMob = isMobileViewport();
    const refW = isMob ? 600 : 1600;
    const refH = isMob ? 1700 : 950;

    // 1. Calcolo del centro del cerchio per la transizione di zoom
    let originX = isMob ? '47.50%' : '33.75%';
    let originY = isMob ? '22.94%' : '50%';
    let baseFreq = 220;

    if (clickOrigin && typeof clickOrigin.x === 'number' && typeof clickOrigin.y === 'number') {
      originX = ((clickOrigin.x / refW) * 100).toFixed(2) + '%';
      originY = ((clickOrigin.y / refH) * 100).toFixed(2) + '%';
      if (clickOrigin.id && activeStyle.audio.frequencies[clickOrigin.id]) {
        baseFreq = activeStyle.audio.frequencies[clickOrigin.id];
      }
    } else if (sectionKey === 'laboratorio') {
      originX = isMob ? '47.50%' : '33.75%';
      originY = isMob ? '22.94%' : '50%';
      baseFreq = 220;
    } else if (sectionKey === 'partnership' || sectionKey === 'credits' || sectionKey === 'pubblicazioni') {
      originX = isMob ? '52.50%' : '77.5%';
      originY = isMob ? '52.35%' : '30%';
      baseFreq = 293.7;
    } else if (sectionKey === 'timeline' || sectionKey === 'gallery') {
      originX = isMob ? '47.50%' : '77.5%';
      originY = isMob ? '78.82%' : '72.63%';
      baseFreq = 349.2;
    }

    const soundscapeContainer = document.getElementById('soundscapeContainer');
    if (soundscapeContainer) {
      soundscapeContainer.style.transformOrigin = originX + ' ' + originY;
      soundscapeContainer.classList.add('zoomed-in');
    }

    playZoomInChime(baseFreq);

    // 2. Popolamento dei contenuti nella pagina
    if (sectionKey === 'laboratorio') {
      if (typeof phaseIndex === 'number') {
        state.currentPhaseIndex = phaseIndex;
      }
      renderPortalLabPhase(state.currentPhaseIndex);
    } else {
      if (sectionKey === 'gallery') {
        state.currentGalleryTrioIndex = 0;
      }
      renderPortalSection(sectionKey);
    }

    // 3. Mostra la schermata pagina
    const portal = document.getElementById('circularPortal');
    if (portal) {
      portal.classList.add('visible');
      portal.setAttribute('aria-hidden', 'false');
    }

    updateHeaderActiveStates();
  }

  function closeCircularPortal() {
    if (!state.portalOpen) return;
    if (state.galleryLightboxOpen) {
      closeGalleryLightbox();
    }
    silenceAllVoices(0.02);
    playReturnChime();
    galleryCirclesRegistry.length = 0;

    const portal = document.getElementById('circularPortal');
    const soundscapeContainer = document.getElementById('soundscapeContainer');
    const layout = document.getElementById('portalStandardLayout');
    const fullView = document.getElementById('portalFullView');

    if (layout) layout.classList.remove('gallery-mode');
    if (fullView) fullView.classList.remove('gallery-mode');

    if (portal) {
      portal.classList.remove('visible');
      portal.setAttribute('aria-hidden', 'true');
    }

    if (soundscapeContainer) {
      soundscapeContainer.classList.remove('zoomed-in');
    }

    state.portalOpen = false;
    updateHeaderActiveStates();

    // Silenzia e azzera lo stato hover di tutti i cerchi della home per evitare sovrapposizioni
    CIRCLES_REGISTRY.forEach(function (c) {
      if (state.circles[c.id]) {
        state.circles[c.id].isHovered = false;
        state.circles[c.id].motionEnergy = 0;
      }
    });
    // Soppressione del suono al passaggio del mouse durante la veloce propagazione sonora
    state.suppressHoverAudioUntil = performance.now() + 1100;

    // Effetto di ri-orientamento acustico ad onde centripete/centrifughe verso l'esterno
    setTimeout(triggerIntroExpansionRipple, 300);
  }

  function renderPortalLabPhase(index) {
    if (index < 0) index = LAB_PHASES.length - 1;
    if (index >= LAB_PHASES.length) index = 0;

    resetPortalScrollPosition();

    if (audioCtx && audioNodes['portal-media']) {
      audioNodes['portal-media'].gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.02);
    }
    mediaWaveState.isHovered = false;
    mediaWaveState.motionEnergy = 0;

    state.currentPhaseIndex = index;
    const phaseData = LAB_PHASES[index];

    const splitView = document.getElementById('portalSplitView');
    const fullView = document.getElementById('portalFullView');
    const layout = document.getElementById('portalStandardLayout');

    if (layout) layout.classList.remove('gallery-mode');
    if (fullView) fullView.classList.remove('gallery-mode');
    if (splitView) splitView.style.display = 'flex';
    if (fullView) fullView.style.display = 'none';

    const catElem = document.getElementById('portalCategory');
    const titleElem = document.getElementById('portalTitle');
    const bodyElem = document.getElementById('portalBodyText');
    const imgElem = document.getElementById('portalCircleImg');
    const capElem = document.getElementById('portalMediaCaption');

    function applyPhaseContent() {
      if (catElem) catElem.textContent = 'Laboratorio Virtuale — ' + phaseData.tag;
      if (titleElem) {
        titleElem.textContent = phaseData.title;
        titleElem.style.opacity = '1';
      }

      if (bodyElem) {
        bodyElem.innerHTML = '';
        phaseData.body.forEach(function (pText) {
          const p = document.createElement('p');
          p.textContent = pText;
          bodyElem.appendChild(p);
        });
        bodyElem.style.opacity = '1';
      }

      if (imgElem) {
        imgElem.src = phaseData.image;
        imgElem.alt = phaseData.title;
        imgElem.style.opacity = '1';
      }

      if (capElem) {
        capElem.textContent = phaseData.imageCaption || '';
        capElem.style.opacity = '1';
      }
    }

    if (state.portalOpen && titleElem && titleElem.textContent) {
      if (titleElem) titleElem.style.opacity = '0.35';
      if (bodyElem) bodyElem.style.opacity = '0.35';
      if (imgElem) imgElem.style.opacity = '0.35';
      if (capElem) capElem.style.opacity = '0.35';

      setTimeout(applyPhaseContent, 60);
    } else {
      applyPhaseContent();
    }

    // Aggiorna i cerchi concentrici nell'SVG per la fase attiva
    CIRCLES_REGISTRY.forEach(function (c) {
      if (!c.isPhase) return;
      const dom = circleDOM[c.id];
      if (!dom) return;

      if (c.phaseIndex === index) {
        dom.pathVis.classList.add('active');
      } else {
        dom.pathVis.classList.remove('active');
      }
    });
  }

  function renderPortalSection(sectionKey) {
    resetPortalScrollPosition();

    if (audioCtx && audioNodes['portal-media']) {
      audioNodes['portal-media'].gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.02);
    }
    mediaWaveState.isHovered = false;
    mediaWaveState.motionEnergy = 0;

    const data = DRAWER_DATA[sectionKey];
    if (!data) return;

    const splitView = document.getElementById('portalSplitView');
    const fullView = document.getElementById('portalFullView');
    if (splitView) splitView.style.display = 'none';
    if (fullView) fullView.style.display = 'block';

    const catElem = document.getElementById('portalFullCategory');
    const titleElem = document.getElementById('portalFullTitle');
    const bodyElem = document.getElementById('portalFullBody');

    if (catElem) catElem.textContent = data.category;
    if (titleElem) titleElem.textContent = data.title;

    if (!bodyElem) return;
    bodyElem.innerHTML = '';

    galleryCirclesRegistry.length = 0; // reset
    const layout = document.getElementById('portalStandardLayout');
    if (layout) layout.classList.remove('gallery-mode');
    if (fullView) fullView.classList.remove('gallery-mode');

    // Partiziona le foto in gruppi da 1 su mobile o trii/quad su desktop
    function getGalleryTrios(items) {
      if (isMobileViewport()) {
        return items.map(function (item) {
          return [item];
        });
      }

      const trios = [];
      let i = 0;

      while (i < items.length) {
        const remaining = items.length - i;

        if (remaining === GALLERY_DESKTOP_QUAD_THRESHOLD || remaining === GALLERY_DESKTOP_QUAD_THRESHOLD + 1) {
          trios.push(items.slice(i));
          break;
        }

        trios.push(items.slice(i, i + GALLERY_DESKTOP_GROUP_SIZE));
        i += GALLERY_DESKTOP_GROUP_SIZE;
      }

      return trios;
    }

    // Render del Trio attivo
    function renderGalleryTrioStage() {
      bodyElem.innerHTML = '';
      galleryCirclesRegistry.length = 0;

      const trios = getGalleryTrios(data.items);
      if (trios.length === 0) return;

      if (state.currentGalleryTrioIndex < 0) state.currentGalleryTrioIndex = trios.length - 1;
      if (state.currentGalleryTrioIndex >= trios.length) state.currentGalleryTrioIndex = 0;

      const currentTrio = trios[state.currentGalleryTrioIndex];

      // Stage del Trio (con classe compatta quando il gruppo finale ha 4+ foto)
      const stage = document.createElement('div');
      stage.className = 'gallery-trio-stage';
      if (currentTrio.length >= GALLERY_DESKTOP_QUAD_THRESHOLD) {
        stage.classList.add('gallery-quad');
      }

      currentTrio.forEach(function (item) {
        const globalIdx = data.items.indexOf(item);
        const card = document.createElement('div');
        card.className = 'gallery-trio-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', 'Ingrandisci foto: ' + item.title);
        card.setAttribute('title', 'Ingrandisci foto: ' + item.title);

        card.addEventListener('click', function () {
          ensureAudioUnlocked();
          openGalleryLightbox(globalIdx);
        });

        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            ensureAudioUnlocked();
            openGalleryLightbox(globalIdx);
          }
        });

        const mediaWrap = document.createElement('div');
        mediaWrap.className = 'gallery-trio-media-wrap';

        const mask = document.createElement('div');
        mask.className = 'gallery-trio-img-mask';

        const img = document.createElement('img');
        img.className = 'gallery-trio-img';
        if (item.imageFit === IMAGE_FIT.CONTAIN) {
          img.classList.add('gallery-trio-img--contain');
        }
        img.src = item.image;
        img.alt = item.title;
        img.loading = 'lazy';
        mask.appendChild(img);
        mediaWrap.appendChild(mask);

        // SVG cerchio d'onda proporzionato 215x215 con filamenti armonici identico alla Home
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'gallery-circle-wave-svg');
        svg.setAttribute('viewBox', '0 0 215 215');

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const strandA = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        strandA.setAttribute('class', 'wave-harmonic-strand strand-inner');
        const strandB = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        strandB.setAttribute('class', 'wave-harmonic-strand strand-outer');
        const pathVis = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathVis.setAttribute('class', 'wave-single-circle');
        const hitProxy = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        hitProxy.setAttribute('class', 'circle-hit-proxy');

        g.appendChild(strandA);
        g.appendChild(strandB);
        g.appendChild(pathVis);
        g.appendChild(hitProxy);
        svg.appendChild(g);
        mediaWrap.appendChild(svg);

        const circleEntry = {
          cx: 107.5,
          cy: 107.5,
          radius: 98,
          pathVis: pathVis,
          strandA: strandA,
          strandB: strandB,
          hitProxy: hitProxy,
          isHovered: false,
          motionEnergy: 0
        };

        hitProxy.addEventListener('pointerenter', function () {
          ensureAudioUnlocked();
          circleEntry.isHovered = true;
          circleEntry.motionEnergy = 1.0;
        });
        hitProxy.addEventListener('pointermove', function () {
          circleEntry.motionEnergy = Math.min(1.0, circleEntry.motionEnergy + 0.15);
        });
        hitProxy.addEventListener('pointerleave', function () {
          circleEntry.isHovered = false;
        });

        hitProxy.addEventListener('click', function (e) {
          e.stopPropagation();
          ensureAudioUnlocked();
          openGalleryLightbox(globalIdx);
        });

        galleryCirclesRegistry.push(circleEntry);

        const title = document.createElement('h3');
        title.className = 'gallery-trio-title';
        title.textContent = item.title;

        const cap = document.createElement('p');
        cap.className = 'gallery-trio-caption';
        cap.textContent = item.caption;

        card.appendChild(mediaWrap);
        card.appendChild(title);
        card.appendChild(cap);
        stage.appendChild(card);
      });

      bodyElem.appendChild(stage);

      // Navigazione: Indietro / Avanti (senza box, con ondina circolare animata)
      const navDiv = document.createElement('div');
      navDiv.className = 'gallery-trio-nav';

      const btnPrev = document.createElement('button');
      btnPrev.type = 'button';
      btnPrev.className = 'btn-phase-wave btn-nav-prev';
      btnPrev.title = 'Indietro';
      btnPrev.setAttribute('aria-label', 'Indietro');
      btnPrev.innerHTML = `
        <svg class="nav-arrow-chevron-svg arrow-left" viewBox="0 0 16 16" aria-hidden="true">
          <polyline points="10,3 5,8 10,13" />
        </svg>
        <span class="btn-wave-label">Indietro</span>
      `;
      btnPrev.addEventListener('click', function () {
        ensureAudioUnlocked();
        playPhaseStepSound();
        state.currentGalleryTrioIndex--;
        renderGalleryTrioStage();
      });

      const counter = document.createElement('span');
      counter.className = 'gallery-trio-counter';
      const counterPrefix = isMobileViewport() ? 'Foto' : 'Serie';
      counter.textContent = `${counterPrefix} ${state.currentGalleryTrioIndex + 1} di ${trios.length}`;

      const btnNext = document.createElement('button');
      btnNext.type = 'button';
      btnNext.className = 'btn-phase-wave btn-nav-next';
      btnNext.title = 'Avanti';
      btnNext.setAttribute('aria-label', 'Avanti');
      btnNext.innerHTML = `
        <span class="btn-wave-label">Avanti</span>
        <svg class="nav-arrow-chevron-svg arrow-right" viewBox="0 0 16 16" aria-hidden="true">
          <polyline points="6,3 11,8 6,13" />
        </svg>
      `;
      btnNext.addEventListener('click', function () {
        ensureAudioUnlocked();
        playPhaseStepSound();
        state.currentGalleryTrioIndex++;
        renderGalleryTrioStage();
      });

      navDiv.appendChild(btnPrev);
      navDiv.appendChild(counter);
      navDiv.appendChild(btnNext);
      bodyElem.appendChild(navDiv);
    }

    // Gallery Generale: a scorrimento per trii come le fasi del laboratorio
    if (data.isGallery && Array.isArray(data.items)) {
      renderGalleryTrioStage();
    } else {
      if (layout) layout.classList.remove('gallery-mode');
      if (fullView) fullView.classList.remove('gallery-mode');
      // Loghi Partner: inseriti nei cerchi d'onda come tutte le immagini, con sfondo bianco protettivo e dimensioni generose
      if (data.logos && Array.isArray(data.logos)) {
        const partnerGrid = document.createElement('div');
        partnerGrid.className = 'partner-circular-grid';

        data.logos.forEach(function (logo) {
          const card = document.createElement('div');
          card.className = 'partner-circular-card';

          const mediaWrap = document.createElement('div');
          mediaWrap.className = 'partner-circle-media-wrap';

          const mask = document.createElement('div');
          mask.className = 'partner-circle-img-mask';

          const img = document.createElement('img');
          img.className = 'partner-logo-circle-img';
          img.src = logo.image;
          img.alt = logo.name;
          img.loading = 'lazy';
          mask.appendChild(img);
          mediaWrap.appendChild(mask);

          // SVG cerchio d'onda con filamenti armonici identico alla Home
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('class', 'gallery-circle-wave-svg');
          svg.setAttribute('viewBox', '0 0 220 220');

          const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          const strandA = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          strandA.setAttribute('class', 'wave-harmonic-strand strand-inner');
          const strandB = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          strandB.setAttribute('class', 'wave-harmonic-strand strand-outer');
          const pathVis = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          pathVis.setAttribute('class', 'wave-single-circle');
          const hitProxy = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          hitProxy.setAttribute('class', 'circle-hit-proxy');

          g.appendChild(strandA);
          g.appendChild(strandB);
          g.appendChild(pathVis);
          g.appendChild(hitProxy);
          svg.appendChild(g);
          mediaWrap.appendChild(svg);

          const circleEntry = {
            cx: 110,
            cy: 110,
            radius: 100,
            pathVis: pathVis,
            strandA: strandA,
            strandB: strandB,
            hitProxy: hitProxy,
            isHovered: false,
            motionEnergy: 0
          };

          hitProxy.addEventListener('pointerenter', function () {
            ensureAudioUnlocked();
            circleEntry.isHovered = true;
            circleEntry.motionEnergy = 1.0;
          });
          hitProxy.addEventListener('pointermove', function () {
            circleEntry.motionEnergy = Math.min(1.0, circleEntry.motionEnergy + 0.15);
          });
          hitProxy.addEventListener('pointerleave', function () {
            circleEntry.isHovered = false;
          });

          galleryCirclesRegistry.push(circleEntry);

          const caption = document.createElement('span');
          caption.className = 'partner-circular-name';
          caption.textContent = logo.name;

          card.appendChild(mediaWrap);
          card.appendChild(caption);
          partnerGrid.appendChild(card);
        });

        bodyElem.appendChild(partnerGrid);
      }

      if (Array.isArray(data.sections)) {
        data.sections.forEach(function (sec) {
          const block = document.createElement('div');
          block.className = 'portal-section-block';

          const h3 = document.createElement('h3');
          h3.className = 'portal-block-title';
          h3.textContent = sec.heading;

          const divText = document.createElement('div');
          divText.className = 'portal-block-text';
          if (Array.isArray(sec.text)) {
            sec.text.forEach(function (t) {
              const p = document.createElement('p');
              p.textContent = t;
              divText.appendChild(p);
            });
          } else {
            const p = document.createElement('p');
            p.textContent = sec.text;
            divText.appendChild(p);
          }

          block.appendChild(h3);
          block.appendChild(divText);
          bodyElem.appendChild(block);
        });
      }
    }
  }

  function updateHeaderActiveStates() {
    const labBtn = document.getElementById('navBtnLab');
    const isLabActive = state.portalOpen && state.activeSection === 'laboratorio';
    if (labBtn) labBtn.classList.toggle('active', isLabActive);

    const navMap = {
      timeline: document.getElementById('navBtnTimeline'),
      pubblicazioni: document.getElementById('navBtnPubblicazioni'),
      partnership: document.getElementById('navBtnPartnership'),
      gallery: document.getElementById('navBtnGallery'),
      credits: document.getElementById('navBtnCredits')
    };

    Object.keys(navMap).forEach(function (key) {
      if (navMap[key]) {
        navMap[key].classList.toggle('active', state.portalOpen && state.activeSection === key);
      }
    });

    const drawerMap = {
      laboratorio: document.getElementById('mobileNavLab'),
      timeline: document.getElementById('mobileNavTimeline'),
      gallery: document.getElementById('mobileNavGallery'),
      partnership: document.getElementById('mobileNavPartnership'),
      pubblicazioni: document.getElementById('mobileNavPubblicazioni'),
      credits: document.getElementById('mobileNavCredits')
    };

    Object.keys(drawerMap).forEach(function (key) {
      if (drawerMap[key]) {
        drawerMap[key].classList.toggle('active', state.portalOpen && state.activeSection === key);
      }
    });
  }

  let lastDrawerTrigger = null;
  let lastLightboxTrigger = null;

  // Mantiene la navigazione da tastiera confinata dentro modale o drawer aperti
  function trapDialogFocus(event, containerElem) {
    if (event.key !== 'Tab' || !containerElem) return;

    const focusables = Array.from(containerElem.querySelectorAll(DIALOG_FOCUS_SELECTOR));
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openMobileNavDrawer() {
    const drawer = document.getElementById('mobileNavDrawer');
    const toggle = document.getElementById('btnMobileMenuToggle');
    if (!drawer) return;

    lastDrawerTrigger = document.activeElement;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (toggle) {
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('btnMobileDrawerClose');
    if (closeBtn) closeBtn.focus();
  }

  function closeMobileNavDrawer() {
    const drawer = document.getElementById('mobileNavDrawer');
    const toggle = document.getElementById('btnMobileMenuToggle');
    if (!drawer) return;

    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    if (toggle) {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';

    if (lastDrawerTrigger && typeof lastDrawerTrigger.focus === 'function') {
      lastDrawerTrigger.focus();
      lastDrawerTrigger = null;
    }
  }

  // -------------------------------------------------------------------------
  // GESTIONE LIGHTBOX GALLERY (BANNER SOVRAIMPRESSO CON FRECCE MODERNISTE)
  // -------------------------------------------------------------------------
  function openGalleryLightbox(index) {
    const galleryData = DRAWER_DATA.gallery;
    if (!galleryData || !Array.isArray(galleryData.items) || galleryData.items.length === 0) return;

    const total = galleryData.items.length;
    if (typeof index !== 'number' || index < 0) index = 0;
    if (index >= total) index = total - 1;

    lastLightboxTrigger = document.activeElement;
    state.currentLightboxIndex = index;
    state.galleryLightboxOpen = true;

    renderGalleryLightbox();

    const modal = document.getElementById('galleryLightboxModal');
    if (modal) {
      modal.style.display = 'flex';
      void modal.offsetWidth; // Trigger reflow per transizione CSS fluida
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }

    const closeBtn = document.getElementById('btnLightboxClose');
    if (closeBtn) closeBtn.focus();

    playPhaseStepSound();
  }

  function closeGalleryLightbox() {
    if (!state.galleryLightboxOpen) return;
    state.galleryLightboxOpen = false;

    const modal = document.getElementById('galleryLightboxModal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      setTimeout(function () {
        if (!state.galleryLightboxOpen) {
          modal.style.display = 'none';
        }
      }, 320);
    }

    if (lastLightboxTrigger && typeof lastLightboxTrigger.focus === 'function') {
      lastLightboxTrigger.focus();
      lastLightboxTrigger = null;
    }

    playPhaseStepSound();
  }

  function navigateGalleryLightbox(delta) {
    const galleryData = DRAWER_DATA.gallery;
    if (!galleryData || !Array.isArray(galleryData.items) || galleryData.items.length === 0) return;

    const total = galleryData.items.length;
    let nextIdx = (state.currentLightboxIndex + delta) % total;
    if (nextIdx < 0) nextIdx += total;

    state.currentLightboxIndex = nextIdx;
    renderGalleryLightbox();
    playPhaseStepSound();
  }

  let lightboxFadeTimer = null;

  function renderGalleryLightbox() {
    const galleryData = DRAWER_DATA.gallery;
    if (!galleryData || !Array.isArray(galleryData.items)) return;

    const item = galleryData.items[state.currentLightboxIndex];
    if (!item) return;

    const imgElem = document.getElementById('galleryLightboxImg');
    const counterElem = document.getElementById('lightboxCounter');
    const titleElem = document.getElementById('lightboxTitle');
    const captionElem = document.getElementById('lightboxCaption');

    // Aggiorna l'immagine evitando timer obsoleti su cambi rapidi
    if (imgElem) {
      if (lightboxFadeTimer) {
        clearTimeout(lightboxFadeTimer);
        lightboxFadeTimer = null;
      }

      imgElem.style.opacity = '0.35';
      imgElem.style.transform = 'scale(0.97)';
      imgElem.src = item.image;
      imgElem.alt = item.title;

      lightboxFadeTimer = setTimeout(function () {
        imgElem.style.opacity = '1';
        imgElem.style.transform = 'scale(1)';
        lightboxFadeTimer = null;
      }, LIGHTBOX_FADE_DELAY_MS);
    }

    if (counterElem) {
      counterElem.textContent = `Foto ${state.currentLightboxIndex + 1} di ${galleryData.items.length}`;
    }

    if (titleElem) {
      titleElem.textContent = item.title;
    }

    if (captionElem) {
      captionElem.textContent = item.caption;
    }
  }

  // -------------------------------------------------------------------------
  // GESTIONE EVENTI (HIT PROXY 34PX & CONTROLLI)
  // -------------------------------------------------------------------------
  function activateCircleNavigation(c) {
    ensureAudioUnlocked();
    const coords = getCircleCoords(c);

    if (c.system === 'laboratorio') {
      openCircularPortal('laboratorio', c.phaseIndex, { x: coords.cx, y: coords.cy, id: c.id });
      return;
    }

    if (DRAWER_DATA[c.system]) {
      openCircularPortal(c.system, null, { x: coords.cx, y: coords.cy, id: c.id });
    }
  }

  // Attiva elementi non-button (role="button") anche con Invio e Spazio
  function bindButtonKeyActivation(element, handler) {
    if (!element) return;
    element.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      e.stopPropagation();
      handler();
    });
  }

  function initEventHandlers() {
    // Clic ed hover sull'intero gruppo cerchio (inclusa l'etichetta curva)
    CIRCLES_REGISTRY.forEach(function (c) {
      const dom = circleDOM[c.id];
      if (!dom || !dom.group) return;

      const circleGroup = dom.group;

      circleGroup.addEventListener('pointerenter', function () {
        ensureAudioUnlocked();
        if (performance.now() < state.suppressHoverAudioUntil) {
          return;
        }
        state.circles[c.id].isHovered = true;
        state.circles[c.id].motionEnergy = 1.0;
      });

      circleGroup.addEventListener('pointermove', function () {
        if (performance.now() < state.suppressHoverAudioUntil) {
          return;
        }
        state.circles[c.id].motionEnergy = Math.min(1.0, state.circles[c.id].motionEnergy + 0.15);
      });

      circleGroup.addEventListener('pointerleave', function () {
        state.circles[c.id].isHovered = false;
      });

      circleGroup.addEventListener('click', function (e) {
        e.stopPropagation();
        activateCircleNavigation(c);
      });

      bindButtonKeyActivation(circleGroup, function () {
        activateCircleNavigation(c);
      });
    });

    // Navigazione Header Centrale
    document.getElementById('navBtnLab').addEventListener('click', function () {
      ensureAudioUnlocked();
      if (state.portalOpen && state.activeSection === 'laboratorio') {
        closeCircularPortal();
      } else {
        openCircularPortal('laboratorio', state.currentPhaseIndex, { x: 540, y: 475 });
      }
    });

    const navButtons = [
      { id: 'navBtnTimeline', section: 'timeline', x: 1240, y: 690 },
      { id: 'navBtnPubblicazioni', section: 'pubblicazioni', x: 1240, y: 285 },
      { id: 'navBtnPartnership', section: 'partnership', x: 1240, y: 285 },
      { id: 'navBtnGallery', section: 'gallery', x: 1240, y: 690 },
      { id: 'navBtnCredits', section: 'credits', x: 1240, y: 285 }
    ];

    navButtons.forEach(function (item) {
      const btn = document.getElementById(item.id);
      if (btn) {
        btn.addEventListener('click', function () {
          ensureAudioUnlocked();
          if (state.portalOpen && state.activeSection === item.section) {
            closeCircularPortal();
          } else {
            openCircularPortal(item.section, null, { x: item.x, y: item.y });
          }
        });
      }
    });

    // Click sul Logo AGORA: deve sempre riportare alla home
    const logoBtn = document.getElementById('navBtnLogo');
    if (logoBtn) {
      logoBtn.addEventListener('click', function () {
        ensureAudioUnlocked();
        if (state.portalOpen) {
          closeCircularPortal();
        }
      });
      bindButtonKeyActivation(logoBtn, function () {
        ensureAudioUnlocked();
        if (state.portalOpen) {
          closeCircularPortal();
        }
      });
    }

    // Widget Cerchio "Torna alla Home"
    const backWidget = document.getElementById('btnBackHomeWidget');
    if (backWidget) {
      backWidget.addEventListener('click', function () {
        ensureAudioUnlocked();
        closeCircularPortal();
      });
      bindButtonKeyActivation(backWidget, function () {
        ensureAudioUnlocked();
        closeCircularPortal();
      });
    }

    // Fasi Precedente / Successiva con icone ad onda sonora circolare (Zero frecce)
    const btnPrev = document.getElementById('btnPhasePrev');
    if (btnPrev) {
      btnPrev.addEventListener('click', function () {
        ensureAudioUnlocked();
        playPhaseStepSound();
        renderPortalLabPhase(state.currentPhaseIndex - 1);
      });
    }

    const btnNext = document.getElementById('btnPhaseNext');
    if (btnNext) {
      btnNext.addEventListener('click', function () {
        ensureAudioUnlocked();
        playPhaseStepSound();
        renderPortalLabPhase(state.currentPhaseIndex + 1);
      });
    }

    // Eventi del Lightbox Banner Gallery (Apertura a pieno schermo)
    const btnLbClose = document.getElementById('btnLightboxClose');
    const lbBackdrop = document.getElementById('galleryLightboxBackdrop');
    const btnLbPrev = document.getElementById('btnLightboxPrev');
    const btnLbNext = document.getElementById('btnLightboxNext');

    if (btnLbClose) {
      btnLbClose.addEventListener('click', function (e) {
        e.stopPropagation();
        closeGalleryLightbox();
      });
    }

    if (lbBackdrop) {
      lbBackdrop.addEventListener('click', function (e) {
        e.stopPropagation();
        closeGalleryLightbox();
      });
    }

    if (btnLbPrev) {
      btnLbPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        ensureAudioUnlocked();
        navigateGalleryLightbox(-1);
      });
    }

    if (btnLbNext) {
      btnLbNext.addEventListener('click', function (e) {
        e.stopPropagation();
        ensureAudioUnlocked();
        navigateGalleryLightbox(1);
      });
    }

    // Tasto Escape, Tab trap e frecce per navigazione e chiusura modali/pagine
    window.addEventListener('keydown', function (e) {
      if (state.galleryLightboxOpen) {
        const lightboxModal = document.getElementById('galleryLightboxModal');
        trapDialogFocus(e, lightboxModal);

        if (e.key === 'Escape') {
          e.preventDefault();
          closeGalleryLightbox();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          navigateGalleryLightbox(-1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          navigateGalleryLightbox(1);
        }
        return;
      }

      const drawer = document.getElementById('mobileNavDrawer');
      if (drawer && drawer.classList.contains('open')) {
        trapDialogFocus(e, drawer);
        if (e.key === 'Escape') {
          e.preventDefault();
          closeMobileNavDrawer();
        }
        return;
      }

      if (e.key === 'Escape') {
        if (state.portalOpen) closeCircularPortal();
      } else if (state.portalOpen && e.key === 'ArrowLeft') {
        if (state.activeSection === 'laboratorio') {
          playPhaseStepSound();
          renderPortalLabPhase(state.currentPhaseIndex - 1);
        } else if (state.activeSection === 'gallery') {
          playPhaseStepSound();
          state.currentGalleryTrioIndex--;
          renderPortalSection('gallery');
        }
      } else if (state.portalOpen && e.key === 'ArrowRight') {
        if (state.activeSection === 'laboratorio') {
          playPhaseStepSound();
          renderPortalLabPhase(state.currentPhaseIndex + 1);
        } else if (state.activeSection === 'gallery') {
          playPhaseStepSound();
          state.currentGalleryTrioIndex++;
          renderPortalSection('gallery');
        }
      }
    });

    // Controllo Audio Spento / Attivo centralizzato (Desktop, Mobile Header e Mobile Drawer)
    function toggleAudioMute() {
      ensureAudioUnlocked();
      state.audioMuted = !state.audioMuted;
      updateAudioMuteUI();
      if (state.audioMuted && audioCtx) {
        CIRCLES_REGISTRY.forEach(function (c) {
          if (audioNodes[c.id]) {
            audioNodes[c.id].gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.05);
          }
        });
        if (audioNodes['back-home']) audioNodes['back-home'].gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.05);
        if (audioNodes['portal-media']) audioNodes['portal-media'].gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.05);
      }
    }

    function updateAudioMuteUI() {
      const muteToggle = document.getElementById('btnAudioMute');
      const muteLabel = document.getElementById('audioMuteLabel');
      if (muteToggle) muteToggle.classList.toggle('muted', state.audioMuted);
      if (muteLabel) muteLabel.textContent = state.audioMuted ? 'Audio Spento' : 'Audio Attivo';

      const muteMobile = document.getElementById('btnAudioMuteMobile');
      if (muteMobile) muteMobile.classList.toggle('muted', state.audioMuted);

      const drawerToggle = document.getElementById('btnDrawerAudioToggle');
      const drawerLabel = document.getElementById('drawerAudioStatusLabel') || document.getElementById('drawerAudioLabel');
      if (drawerToggle) drawerToggle.classList.toggle('muted', state.audioMuted);
      if (drawerLabel) drawerLabel.textContent = state.audioMuted ? 'Audio Spento' : 'Audio Attivo';
    }

    const muteToggle = document.getElementById('btnAudioMute');
    if (muteToggle) {
      muteToggle.addEventListener('click', toggleAudioMute);
    }
    const muteMobile = document.getElementById('btnAudioMuteMobile');
    if (muteMobile) {
      muteMobile.addEventListener('click', toggleAudioMute);
    }
    const drawerToggle = document.getElementById('btnDrawerAudioToggle');
    if (drawerToggle) {
      drawerToggle.addEventListener('click', toggleAudioMute);
    }

    // Mobile Hamburger Drawer Eventi
    const btnMobileToggle = document.getElementById('btnMobileMenuToggle');
    if (btnMobileToggle) {
      btnMobileToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const drawer = document.getElementById('mobileNavDrawer');
        if (drawer && drawer.classList.contains('open')) {
          closeMobileNavDrawer();
        } else {
          openMobileNavDrawer();
        }
      });
    }

    const btnDrawerClose = document.getElementById('btnMobileDrawerClose');
    if (btnDrawerClose) {
      btnDrawerClose.addEventListener('click', function (e) {
        e.stopPropagation();
        closeMobileNavDrawer();
      });
    }

    const drawerBackdrop = document.getElementById('mobileNavBackdrop');
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', function (e) {
        e.stopPropagation();
        closeMobileNavDrawer();
      });
    }

    // Link all'interno del drawer mobile
    const mobileNavLinks = [
      { id: 'mobileNavLab', section: 'laboratorio', isLab: true },
      { id: 'mobileNavTimeline', section: 'timeline' },
      { id: 'mobileNavGallery', section: 'gallery' },
      { id: 'mobileNavPartnership', section: 'partnership' },
      { id: 'mobileNavPubblicazioni', section: 'pubblicazioni' },
      { id: 'mobileNavCredits', section: 'credits' }
    ];

    mobileNavLinks.forEach(function (item) {
      const el = document.getElementById(item.id);
      if (el) {
        el.addEventListener('click', function () {
          closeMobileNavDrawer();
          ensureAudioUnlocked();
          if (item.isLab) {
            openCircularPortal('laboratorio', state.currentPhaseIndex || 0);
          } else {
            openCircularPortal(item.section, null);
          }
        });
      }
    });

    // -------------------------------------------------------------------------
    // SCROLL SONORO SU MOBILE: Sintonizzatore Acustico Armonico
    // -------------------------------------------------------------------------
    const interactiveStage = document.querySelector('.interactive-stage');
    let lastActiveCircleId = null;
    let lastChimeTime = 0;
    let scrollRafId = null;

    function handleMobileAcousticScroll() {
      if (!isMobileViewport() || state.portalOpen || state.audioMuted || !state.initialIntroCompleted) {
        return;
      }
      ensureAudioUnlocked();

      if (!interactiveStage) return;
      const stageRect = interactiveStage.getBoundingClientRect();
      const focalY = stageRect.top + stageRect.height * 0.46;

      let bestCircle = null;
      let minDistanceToArc = Infinity;

      CIRCLES_REGISTRY.forEach(function (c) {
        const dom = circleDOM[c.id];
        if (!dom || !dom.hitProxy) return;

        const rect = dom.hitProxy.getBoundingClientRect();
        const circleCenterY = rect.top + rect.height / 2;
        const circleRadiusOnScreen = rect.height / 2;

        if (circleRadiusOnScreen <= 0) return;

        const distFromCenter = Math.abs(focalY - circleCenterY);
        const distToArc = Math.abs(distFromCenter - circleRadiusOnScreen);

        if (distToArc < minDistanceToArc) {
          minDistanceToArc = distToArc;
          bestCircle = c;
        }
      });

      if (bestCircle && minDistanceToArc <= 34) {
        const now = performance.now();
        if (bestCircle.id !== lastActiveCircleId && (now - lastChimeTime > 95)) {
          lastActiveCircleId = bestCircle.id;
          lastChimeTime = now;

          const st = state.circles[bestCircle.id];
          if (st) {
            st.motionEnergy = 1.0;
          }

          const dom = circleDOM[bestCircle.id];
          if (dom && dom.group) {
            dom.group.classList.add('circle-sounding');
            setTimeout(function () {
              dom.group.classList.remove('circle-sounding');
            }, 380);
          }

          const freq = (activeStyle.audio && activeStyle.audio.frequencies[bestCircle.id]) || 220;
          playRipplePulseSound(freq);
        }
      }
    }

    if (interactiveStage) {
      interactiveStage.addEventListener('scroll', function () {
        if (scrollRafId) cancelAnimationFrame(scrollRafId);
        scrollRafId = requestAnimationFrame(handleMobileAcousticScroll);
      }, { passive: true });

      interactiveStage.addEventListener('touchmove', function () {
        ensureAudioUnlocked();
      }, { passive: true });

      interactiveStage.addEventListener('touchstart', function () {
        ensureAudioUnlocked();
      }, { passive: true });
    }

    // Resize listener per aggiornare layout SVG e paginazione gallery al cambio breakpoint
    let lastIsMobile = isMobileViewport();
    window.addEventListener('resize', function () {
      const currentIsMobile = isMobileViewport();
      if (currentIsMobile === lastIsMobile) return;

      lastIsMobile = currentIsMobile;
      updateSvgLayout();

      if (state.portalOpen && state.activeSection === 'gallery') {
        state.currentGalleryTrioIndex = 0;
        renderPortalSection('gallery');
      }
    });
  }

  // -------------------------------------------------------------------------
  // EFFETTO COMPARSA INIZIALE DAL NULLA (SOLO AL PRIMO CARICAMENTO)
  // Dal cerchio più piccolo al più grande con movimento ondoso rapido e fluido
  // -------------------------------------------------------------------------
  function triggerInitialEmergenceIntro() {
    if (state.initialIntroCompleted) return;

    if (audioCtx && audioCtx.state === 'running') {
      state.introRippleAudioPlayed = true;
    }

    // Sequenza di comparsa rapida e ritmica dal cerchio più piccolo al più grande:
    // 1. Centro del Laboratorio (Fase 1 r=80) verso l'esterno (Fase 5 r=320)
    // 2. Menu circolari di destra dai più piccoli ai più grandi
    const emergenceSequence = [
      // Laboratorio Virtuale (dal nucleo più piccolo al più grande)
      { id: 'lab-c1', delay: 100 },  // Fase 1: r=80
      { id: 'lab-c2', delay: 220 },  // Fase 2: r=140
      { id: 'lab-c3', delay: 340 },  // Fase 3: r=200
      { id: 'lab-c4', delay: 460 },  // Fase 4: r=260
      { id: 'lab-c5', delay: 580 },  // Fase 5: r=320
      // Menu di destra (dai più piccoli ai più grandi)
      { id: 'part-c1', delay: 720 }, // Partner (r=65)
      { id: 'cred-c1', delay: 840 }, // Timeline (r=65)
      { id: 'part-c2', delay: 960 }, // Crediti (r=115)
      { id: 'cred-c2', delay: 1080 }, // Gallery (r=110)
      { id: 'part-c3', delay: 1200 }  // Pubblicazioni (r=165)
    ];

    emergenceSequence.forEach(function (step, idx) {
      setTimeout(function () {
        if (state.portalOpen) {
          revealAllCirclesImmediately();
          return;
        }

        const id = step.id;
        const dom = circleDOM[id];
        if (dom && dom.group) {
          dom.group.classList.remove('initial-hidden');
          dom.group.classList.add('circle-revealing', 'intro-pulse');
          setTimeout(function () {
            dom.group.classList.remove('intro-pulse', 'circle-revealing');
            dom.group.classList.add('circle-revealed');
          }, 420);
        }

        if (state.circles[id]) {
          state.circles[id].motionEnergy = 1.0;
        }

        const freq = activeStyle.audio.frequencies[id] || 220;
        playRipplePulseSound(freq);

        if (idx === emergenceSequence.length - 1) {
          state.initialIntroCompleted = true;
        }
      }, step.delay);
    });
  }

  // -------------------------------------------------------------------------
  // EFFETTO ESPANSIONE ACUSTICA CENTRIFUGA (PROPAGAZIONE SU TUTTI I MENU CIRCOLARI)
  // -------------------------------------------------------------------------
  function triggerIntroExpansionRipple() {
    if (audioCtx && audioCtx.state === 'running') {
      state.introRippleAudioPlayed = true;
    }
    // Sequenza rapida di propagazione a onde dal centro del Laboratorio verso l'esterno
    const propagationSequence = [
      { id: 'lab-c1', delay: 90 },
      { id: 'lab-c2', delay: 180 },
      { id: 'lab-c3', delay: 270 },
      { id: 'lab-c4', delay: 360 },
      { id: 'lab-c5', delay: 450 },
      { id: 'part-c1', delay: 550 },
      { id: 'cred-c1', delay: 630 },
      { id: 'part-c2', delay: 710 },
      { id: 'cred-c2', delay: 790 },
      { id: 'part-c3', delay: 870 }
    ];

    propagationSequence.forEach(function (step) {
      setTimeout(function () {
        if (state.portalOpen) return;
        const id = step.id;
        if (state.circles[id]) {
          state.circles[id].motionEnergy = 1.0;
        }
        const dom = circleDOM[id];
        if (dom && dom.group) {
          dom.group.classList.add('intro-pulse');
          setTimeout(function () {
            dom.group.classList.remove('intro-pulse');
          }, 400);
        }
        const freq = activeStyle.audio.frequencies[id] || 220;
        playRipplePulseSound(freq);
      }, step.delay);
    });
  }

  // -------------------------------------------------------------------------
  // AVVIO ALL'ONLOAD (PANORAMICA ONDE CONCENTRICHE INTERATTIVA)
  // -------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    initAudioContext();
    attachUnlockListeners();
    renderSvgScene();
    initBackHomeCircle();
    initPortalMediaCircle();
    initEventHandlers();
    renderPortalLabPhase(0);

    requestAnimationFrame(mainAnimationLoop);

    // Gestione deep-link hash per apertura diretta (es. #lab, #lab-2, #timeline, #gallery, #partner, #crediti)
    try {
      const hash = (window.location.hash || '').toLowerCase().replace('#', '');
      if (hash.startsWith('lab') || hash.startsWith('fase') || hash.startsWith('phase')) {
        let pIdx = 0;
        const match = hash.match(/\d+/);
        if (match) {
          pIdx = parseInt(match[0], 10) - 1;
          if (isNaN(pIdx) || pIdx < 0 || pIdx > 4) pIdx = 0;
        }
        openCircularPortal('laboratorio', pIdx);
      } else if (hash === 'timeline') {
        openCircularPortal('timeline', null);
      } else if (hash === 'gallery') {
        openCircularPortal('gallery', null);
      } else if (hash === 'partner' || hash === 'partnership') {
        openCircularPortal('partnership', null);
      } else if (hash === 'pubblicazioni') {
        openCircularPortal('pubblicazioni', null);
      } else if (hash === 'crediti' || hash === 'credits') {
        openCircularPortal('credits', null);
      }
    } catch (e) {}

    // Comparsa iniziale dal nulla delle ondine dalla più piccola alla più grande (ritmo rapido)
    setTimeout(triggerInitialEmergenceIntro, 180);
  });

  // Esposizione per navigazione e test
  window.openCircularPortal = openCircularPortal;
  window.closeCircularPortal = closeCircularPortal;
  window.openGalleryLightbox = openGalleryLightbox;
  window.closeGalleryLightbox = closeGalleryLightbox;

})();
