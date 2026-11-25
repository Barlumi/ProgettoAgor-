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
      title: 'Fase 1: Registrazione del Suono e delle Piazze',
      body: [
        'I ricercatori hanno viaggiato in 5 città dell\'Emilia-Romagna per registrare il paesaggio sonoro di 11 piazze storiche e teatri: da Piazza Duomo a Parma e Piazza Cavour a Rimini, fino a Faenza, Comacchio e Tresigallo.',
        'Al centro di ogni piazza è stata posizionata una speciale sfera con 64 microfoni insieme a una telecamera a 360°. Questo sistema permette di "fotografare" il suono da ogni direzione, catturando la vita autentica del luogo: il vociare sotto i portici, i passi sui ciottoli e il riverbero dei palazzi storici.'
      ],
      image: 'assets/gallery/image27.jpg',
      imageCaption: 'La speciale sfera microfonica a 64 capsule (em64) utilizzata per catturare il suono a 360° nelle piazze storiche.'
    },
    {
      num: 2,
      tag: 'Fase 2',
      title: 'Fase 2: L\'Impronta Sonora dei Monumenti',
      body: [
        'Ogni spazio architettonico possiede una voce unica, determinata dalle sue forme e dai suoi materiali. Per scoprirla, i ricercatori hanno emesso suoni calibrati nelle piazze e nei teatri, registrando come l\'ambiente risponde ed estinguendosi genera l\'eco.',
        'Questa registrazione si chiama "risposta ad impulso": funziona come una vera e propria impronta digitale acustica, capace di descrivere esattamente come uno spazio fa risuonare la musica o la voce umana.'
      ],
      image: 'assets/gallery/image31.jpg',
      imageCaption: 'Misura dell\'impronta acustica in Piazza Cavour a Rimini: la piazza si comporta con un tempo di riverbero simile a una sala da concerto.'
    },
    {
      num: 3,
      tag: 'Fase 3',
      title: 'Fase 3: La Mappa del Suono Nello Spazio',
      body: [
        'Tutti i suoni registrati vengono trasformati in un formato audio tridimensionale (chiamato Ambisonics). Invece di semplici canali stereo destro e sinistro, il suono viene scomposto in una vera e propria sfera sonora avvolgente.',
        'Grazie a questa tecnologia, la registrazione non è legata a un singolo paio di cuffie o a un tipo di altoparlante: può essere ricreata con fedeltà assoluta in qualsiasi ambiente, facendo sentire l\'ascoltatore esattamente al centro della piazza.'
      ],
      image: 'assets/gallery/image28.jpg',
      imageCaption: 'Rappresentazione della sfera acustica 3D: il suono viene catturato e orientato con precisione in tutte le direzioni dello spazio.'
    },
    {
      num: 4,
      tag: 'Fase 4',
      title: 'Fase 4: Camminare nel Suono in Realtà Virtuale',
      body: [
        'Attraverso foto aeree scattate con i droni e scansioni laser, le piazze sono state interamente ricostruite in 3D. A questo modello visivo è stato agganciato il motore sonoro interattivo.',
        'L\'utente può indossare un visore o usare il computer per camminare liberamente nella piazza virtuale: avvicinandosi a un musicista il volume aumenta, allontanandosi o riparandosi sotto un portico l\'acustica cambia in tempo reale, proprio come nella realtà.'
      ],
      image: 'assets/gallery/image35.jpg',
      imageCaption: 'Esplorazione in Realtà Virtuale di Piazzale San Francesco a Parma: l\'utente cammina liberamente ascoltando l\'esecuzione dal vivo de Il Trovatore.'
    },
    {
      num: 5,
      tag: 'Fase 5',
      title: 'Fase 5: Rivivere il Patrimonio per Tutti',
      body: [
        'Il risultato finale del laboratorio apre la cultura a tutti: persone con disabilità motorie o fragilità che non possono viaggiare possono rivivere la magia e il paesaggio sonoro delle piazze storiche da casa o da musei dedicati.',
        'A Tresigallo, nell\'edificio storico "Sogni", è stata inoltre allestita una sala speciale con 32 altoparlanti che ricrea fisicamente il campo sonoro delle piazze, unendo ricerca scientifica, memoria civica e inclusione sociale.'
      ],
      image: 'assets/gallery/image33.jpg',
      imageCaption: 'La sala d\'ascolto immersiva di Tresigallo con impianto a 32 altoparlanti, progettata per far rivivere l\'acustica dei luoghi storici.'
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
            'Programma: POR FESR 2014–2020 / FSC della Regione Emilia-Romagna (Contributo regionale: 501.500 €, durata 24 mesi).',
            'Focus scientifico: documentazione e rilievo dell\'acustica tridimensionale di 7 teatri d\'opera storici regionali (tra cui il Teatro Pavarotti di Modena, il Teatro Masini di Faenza, il Teatro Municipale di Piacenza e il Teatro Comunale di Bologna). Misure MIMO con sorgente sferica a 32 altoparlanti, Eigenmike-32 e fotogrammetria con drone per le prime sale d\'ascolto a Parma e Bologna.'
          ]
        },
        {
          heading: '2024 – 2026: Progetto AGORÀ (Dalle Sale alle Piazze)',
          text: [
            'Programma: PR FESR Emilia-Romagna 2021–2027 (Costo totale: 763.535 €, durata 30 mesi: 30/01/2024 – 29/07/2026).',
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
          heading: 'Inquadramento Programmatico & Finanziamento',
          text: 'AGORÀ — "Atelier sonoro per il GiocO, la RicercA, l\'AcusticA". Cofinanziato dai Fondi Europei della Regione Emilia-Romagna nell\'ambito del PR FESR 2021–2027 (Azione 1.1.2 - Sostegno alla ricerca industriale). Budget totale: 763.535 €, durata 30 mesi (30/01/2024 – 29/07/2026). Il progetto continua ed estende all\'aperto il patrimonio di competenze di SIPARIO (POR FESR 2014–2020).'
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
          title: 'Mappa delle Prime Riflessioni (Trepponti)',
          caption: 'Mappa panoramica delle prime riflessioni (0–80 ms) elaborata dalla sonda a 64 capsule a Comacchio.',
          image: 'assets/gallery/image33.jpg'
        },
        {
          title: 'Flusso di Modellazione VR 6DoF',
          caption: 'Schema della catena: Rilievo Visivo (fotogrammetria) + Rilievo Acustico (IR HOA) → Ambiente Audiovisivo Immersivo a 6DoF.',
          image: 'assets/gallery/image34.jpg'
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

  // Stile attivo applicato: Stile Easy (Onda spettrale su fondo ossidiana)
  let activeStyle = STILE_EASY;

  // -------------------------------------------------------------------------
  // REGISTRO DEI CERCHI (STRUTTURA GEOMETRICA FISSA: Sinistra 5 Fasi | Destra)
  // -------------------------------------------------------------------------
  const CIRCLES_REGISTRY = [
    // --- ONDA GRANDE A SINISTRA (5 Fasi con Titoli Specifici) ---
    {
      id: 'lab-c1',
      system: 'laboratorio',
      cx: 540,
      cy: 475,
      radius: 80,
      labelText: 'Acquisizione 3D',
      labelAngle: 0.85 * Math.PI, // Ore 5
      isPhase: true,
      phaseIndex: 0
    },
    {
      id: 'lab-c2',
      system: 'laboratorio',
      cx: 540,
      cy: 475,
      radius: 140,
      labelText: 'Risposte ad Impulso',
      labelAngle: 0.25 * Math.PI, // Ore 1.5
      isPhase: true,
      phaseIndex: 1
    },
    {
      id: 'lab-c3',
      system: 'laboratorio',
      cx: 540,
      cy: 475,
      radius: 200,
      labelText: 'Armoniche Sferiche',
      labelAngle: 1.25 * Math.PI, // Ore 7.5
      isPhase: true,
      phaseIndex: 2
    },
    {
      id: 'lab-c4',
      system: 'laboratorio',
      cx: 540,
      cy: 475,
      radius: 260,
      labelText: 'Realtà Virtuale 6DoF',
      labelAngle: 1.75 * Math.PI, // Ore 10.5
      isPhase: true,
      phaseIndex: 3
    },
    {
      id: 'lab-c5',
      system: 'laboratorio',
      cx: 540,
      cy: 475,
      radius: 320,
      labelText: 'Restituzione Immersiva',
      labelAngle: 0.00 * Math.PI, // Ore 12
      isPhase: true,
      phaseIndex: 4
    },

    // --- ONDA MEDIA A DESTRA IN ALTO (Partner, Crediti, Pubblicazioni) ---
    {
      id: 'part-c1',
      system: 'partnership',
      cx: 1240,
      cy: 285,
      radius: 65,
      labelText: 'Partner',
      labelAngle: 0.90 * Math.PI, // Ore 5
      isPhase: false
    },
    {
      id: 'part-c2',
      system: 'credits',
      cx: 1240,
      cy: 285,
      radius: 115,
      labelText: 'Crediti',
      labelAngle: 1.65 * Math.PI, // Ore 10
      isPhase: false
    },
    {
      id: 'part-c3',
      system: 'pubblicazioni',
      cx: 1240,
      cy: 285,
      radius: 165,
      labelText: 'Pubblicazioni',
      labelAngle: 0.00 * Math.PI, // Ore 12
      isPhase: false
    },

    // --- ONDA PICCOLA A DESTRA IN BASSO (Timeline & Gallery) ---
    {
      id: 'cred-c1',
      system: 'timeline',
      cx: 1240,
      cy: 690,
      radius: 65,
      labelText: 'Timeline',
      labelAngle: 0.85 * Math.PI, // Ore 5
      isPhase: false
    },
    {
      id: 'cred-c2',
      system: 'gallery',
      cx: 1240,
      cy: 690,
      radius: 110,
      labelText: 'Gallery',
      labelAngle: 0.00 * Math.PI, // Ore 12
      isPhase: false
    }
  ];

  // -------------------------------------------------------------------------
  // STATO DINAMICO DELL'INTERAZIONE
  // -------------------------------------------------------------------------
  const state = {
    activeSection: 'laboratorio',
    currentPhaseIndex: 0,
    drawerOpen: false,
    audioMuted: false,

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
  const audioNodes = {};

  function initAudioContext() {
    if (audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.75, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);

      CIRCLES_REGISTRY.forEach(function (c) {
        // Timbro e accordatura dal blocco di stile attivo ("Stile Easy")
        const freq = activeStyle.audio.frequencies[c.id] || 220;
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
        gainNode.connect(masterGain);

        osc1.start();
        osc2.start();

        audioNodes[c.id] = {
          osc1: osc1,
          osc2: osc2,
          filter: filter,
          gain: gainNode,
          baseFreq: freq
        };
      });
    } catch (err) {
      console.warn('Audio non supportato:', err);
    }
  }

  function ensureAudioUnlocked() {
    if (!audioCtx) initAudioContext();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // -------------------------------------------------------------------------
  // CALCOLO GEOMETRICO: CERCHIO APERTO CON RESPIRO LATERALE PER IL TESTO
  // -------------------------------------------------------------------------
  function computeCircleGapArc(c) {
    if (!c.labelText) {
      return { hasGap: false };
    }

    const textPxWidth = c.labelText.length * 10.5;
    const paddingPx = 22; // Respiro laterale
    const totalGapPx = textPxWidth + paddingPx * 2;

    const gapHalfAngle = (totalGapPx / 2) / c.radius;
    const centerAngle = c.labelAngle;

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

  // -------------------------------------------------------------------------
  // COSTRUZIONE SCENA SVG (CON FILAMENTI ARMONICI MULTIPLI)
  // -------------------------------------------------------------------------
  function renderSvgScene() {
    const sceneGroup = document.getElementById('wavesSceneGroup');
    if (!sceneGroup) return;
    sceneGroup.innerHTML = '';

    CIRCLES_REGISTRY.forEach(function (c) {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'circle-item');
      g.setAttribute('id', 'item-' + c.id);
      g.setAttribute('data-id', c.id);
      g.setAttribute('data-system', c.system);
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

      // 4. Hit Proxy Trasparente da 34px (Hover e click istantanei e omogenei)
      const hitProxy = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      hitProxy.setAttribute('class', 'circle-hit-proxy');
      hitProxy.setAttribute('id', 'hit-' + c.id);
      g.appendChild(hitProxy);

      sceneGroup.appendChild(g);

      circleDOM[c.id] = {
        config: c,
        pathVis: pathVis,
        strandA: strandA,
        strandB: strandB,
        guidePath: guidePath,
        hitProxy: hitProxy,
        gapData: computeCircleGapArc(c)
      };
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
    // Calcolo dell'estensione dell'arco guida:
    // Ciascun carattere a 11px occupa ~8.5px. Sul cerchio di raggio 'radius' corrisponde a un angolo (rad).
    // Lo span deve coprire comodamente il testo senza MAI superare 1.25 rad (~71°, totale < 142°),
    // garantendo che l'arco sia sempre < 180° e NON collassi mai all'interno con large-arc-flag=0.
    const charAngle = 9.0 / radius;
    const span = Math.min(1.25, Math.max(0.60, (textLen * charAngle) / 2 + 0.30));

    // Normalizziamo l'angolo centrale in [0, 2*PI)
    let normAngle = centerAngle % (Math.PI * 2);
    if (normAngle < 0) normAngle += Math.PI * 2;

    // Se l'etichetta ricade nell'emisfero inferiore del cerchio (tra ~80° e ~280°, cioè la metà inferiore),
    // scorrendo in senso orario il testo risulterebbe a testa in giù per l'osservatore (come in foto).
    // Invertendo il senso del tracciato (antiorario con sweep-flag 0),
    // i caratteri si capovolgono dritti e si leggono naturalmente da sinistra verso destra.
    const isUpsideDown = normAngle > 0.45 * Math.PI && normAngle < 1.55 * Math.PI;

    const a1 = centerAngle - span;
    const a2 = centerAngle + span;

    if (isUpsideDown) {
      // Senso antiorario da a2 verso a1: capovolge i caratteri dritti
      // Con una calibrazione fine del raggio guida (+3px), il testo si allinea perfettamente
      // alla linea circolare del varco senza sprofondare verso l'interno.
      const guideR = radius + 3.0;
      const x1 = cx + guideR * Math.sin(a1);
      const y1 = cy - guideR * Math.cos(a1);
      const x2 = cx + guideR * Math.sin(a2);
      const y2 = cy - guideR * Math.cos(a2);

      return ['M', x2.toFixed(2), y2.toFixed(2), 'A', guideR.toFixed(2), guideR.toFixed(2), 0, 0, 0, x1.toFixed(2), y1.toFixed(2)].join(' ');
    } else {
      // Senso orario da a1 verso a2: tracciato naturale sul bordo
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
      const currentRadius = c.radius + radiusOffset;

      // 3. Generazione tracciato cerchio aperto principale
      let dVisible = '';
      let dStrandInner = '';
      let dStrandOuter = '';
      let dHit = '';

      if (dom.gapData.hasGap) {
        // Linea principale
        dVisible = generateArcPathString(
          c.cx,
          c.cy,
          currentRadius,
          dom.gapData.arcStartAngle,
          dom.gapData.arcEndAngle,
          waveAmplitude,
          cycles,
          animTime * speed
        );

        // Filamento armonico interno (leggermente sfasato)
        dStrandInner = generateArcPathString(
          c.cx,
          c.cy,
          currentRadius - 2.5,
          dom.gapData.arcStartAngle,
          dom.gapData.arcEndAngle,
          waveAmplitude * 0.7,
          cycles,
          animTime * speed + 0.6
        );

        // Filamento armonico esterno (leggermente sfasato)
        dStrandOuter = generateArcPathString(
          c.cx,
          c.cy,
          currentRadius + 2.5,
          dom.gapData.arcStartAngle,
          dom.gapData.arcEndAngle,
          waveAmplitude * 0.7,
          cycles,
          animTime * speed - 0.6
        );

        if (dom.guidePath) {
          const dGuide = generateTextGuideArc(c.cx, c.cy, currentRadius, dom.gapData.centerAngle, c.labelText);
          dom.guidePath.setAttribute('d', dGuide);
        }

        dHit = generateArcPathString(c.cx, c.cy, c.radius, 0, Math.PI * 2, 0, 1, 0);
      } else {
        dVisible = generateArcPathString(
          c.cx,
          c.cy,
          currentRadius,
          0,
          Math.PI * 2,
          waveAmplitude,
          cycles,
          animTime * speed
        );
        dStrandInner = generateArcPathString(
          c.cx,
          c.cy,
          currentRadius - 2.5,
          0,
          Math.PI * 2,
          waveAmplitude * 0.7,
          cycles,
          animTime * speed + 0.6
        );
        dStrandOuter = generateArcPathString(
          c.cx,
          c.cy,
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

      // 4. Modulazione sonora armonica
      if (audioCtx && !state.audioMuted && audioNodes[c.id]) {
        const voice = audioNodes[c.id];
        const combinedIntensity = Math.min(1.0, st.motionEnergy * 1.2 + (st.isHovered ? 0.4 : 0));
        const targetVol = Math.max(0.0001, Math.pow(combinedIntensity, 1.3) * activeStyle.audio.maxVoiceGain);
        const targetCutoff = activeStyle.audio.baseFilterCutoff + combinedIntensity * activeStyle.audio.filterModulationRange;

        voice.gain.gain.setTargetAtTime(targetVol, audioCtx.currentTime, 0.08);
        voice.filter.frequency.setTargetAtTime(targetCutoff, audioCtx.currentTime, 0.08);
      }
    });

    requestAnimationFrame(mainAnimationLoop);
  }

  // -------------------------------------------------------------------------
  // GESTIONE DELLE FASI (PANNELLO SINISTRA)
  // -------------------------------------------------------------------------
  function setLabPhase(index) {
    if (index < 0) index = LAB_PHASES.length - 1;
    if (index >= LAB_PHASES.length) index = 0;

    state.currentPhaseIndex = index;
    const phaseData = LAB_PHASES[index];

    const tagElem = document.getElementById('phaseCurrentTag');
    const titleElem = document.getElementById('phaseCurrentTitle');
    const bodyElem = document.getElementById('phaseCurrentBody');

    if (tagElem) tagElem.textContent = phaseData.tag;
    if (titleElem) titleElem.textContent = phaseData.title;

    if (bodyElem) {
      bodyElem.innerHTML = '';
      phaseData.body.forEach(function (pText) {
        const p = document.createElement('p');
        p.textContent = pText;
        bodyElem.appendChild(p);
      });

      if (phaseData.image) {
        const figure = document.createElement('figure');
        figure.className = 'phase-figure';

        const imgWrap = document.createElement('div');
        imgWrap.className = 'phase-img-wrap';

        const img = document.createElement('img');
        img.className = 'phase-img';
        img.src = phaseData.image;
        img.alt = phaseData.title;
        img.loading = 'lazy';
        imgWrap.appendChild(img);
        figure.appendChild(imgWrap);

        if (phaseData.imageCaption) {
          const caption = document.createElement('figcaption');
          caption.className = 'phase-img-caption';
          caption.textContent = phaseData.imageCaption;
          figure.appendChild(caption);
        }

        bodyElem.appendChild(figure);
      }
    }

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

  function showLabPhasesOverlay() {
    const overlay = document.getElementById('labPhasesOverlay');
    if (overlay) overlay.classList.add('visible');
    closeSideDrawer();
    state.activeSection = 'laboratorio';
    updateHeaderActiveStates();
  }

  function hideLabPhasesOverlay() {
    const overlay = document.getElementById('labPhasesOverlay');
    if (overlay) overlay.classList.remove('visible');
    if (state.activeSection === 'laboratorio') {
      state.activeSection = null;
    }
    updateHeaderActiveStates();
  }

  // -------------------------------------------------------------------------
  // GESTIONE DRAWER LATERALE (PARTNER & CREDITS)
  // -------------------------------------------------------------------------
  function openSideDrawer(sectionKey) {
    const data = DRAWER_DATA[sectionKey];
    if (!data) return;

    state.activeSection = sectionKey;
    state.drawerOpen = true;

    document.getElementById('drawerCategory').textContent = data.category;
    document.getElementById('drawerHeading').textContent = data.title;

    const bodyContainer = document.getElementById('drawerContentBody');
    bodyContainer.innerHTML = '';

    // Blocco bianco dedicato ai Loghi Ufficiali dei Partner (Slide 4 della presentazione)
    if (data.logos && Array.isArray(data.logos)) {
      const whiteBlock = document.createElement('div');
      whiteBlock.className = 'partner-logos-white-block';

      const blockLabel = document.createElement('div');
      blockLabel.className = 'partner-logos-label';
      blockLabel.textContent = 'Istituzioni & Partner di Ricerca';
      whiteBlock.appendChild(blockLabel);

      const logosGrid = document.createElement('div');
      logosGrid.className = 'partner-logos-grid';

      data.logos.forEach(function (logo) {
        const item = document.createElement('div');
        item.className = 'partner-logo-item';

        const img = document.createElement('img');
        img.className = 'partner-logo-img';
        img.src = logo.image;
        img.alt = logo.name;

        const caption = document.createElement('span');
        caption.className = 'partner-logo-name';
        caption.textContent = logo.name;

        item.appendChild(img);
        item.appendChild(caption);
        logosGrid.appendChild(item);
      });

      whiteBlock.appendChild(logosGrid);
      bodyContainer.appendChild(whiteBlock);
    }

    if (data.isGallery && Array.isArray(data.items)) {
      const grid = document.createElement('div');
      grid.className = 'gallery-grid';

      data.items.forEach(function (item) {
        const card = document.createElement('div');
        card.className = 'gallery-card';

        const imgWrap = document.createElement('div');
        imgWrap.className = 'gallery-card-img-wrap';

        const img = document.createElement('img');
        img.className = 'gallery-card-img';
        img.src = item.image;
        img.alt = item.title;
        img.loading = 'lazy';

        imgWrap.appendChild(img);
        card.appendChild(imgWrap);

        const info = document.createElement('div');
        info.className = 'gallery-card-info';

        const title = document.createElement('h4');
        title.className = 'gallery-card-title';
        title.textContent = item.title;

        const caption = document.createElement('p');
        caption.className = 'gallery-card-caption';
        caption.textContent = item.caption;

        info.appendChild(title);
        info.appendChild(caption);
        card.appendChild(info);

        grid.appendChild(card);
      });

      bodyContainer.appendChild(grid);
    } else if (Array.isArray(data.sections)) {
      data.sections.forEach(function (sec) {
        const block = document.createElement('div');
        block.className = 'drawer-section-block';

        const h3 = document.createElement('h3');
        h3.className = 'drawer-block-title';
        h3.textContent = sec.heading;

        const divText = document.createElement('div');
        divText.className = 'drawer-block-text';
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
        bodyContainer.appendChild(block);
      });
    }

    const drawer = document.getElementById('sideDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('visible');

    hideLabPhasesOverlay();
    updateHeaderActiveStates();
  }

  function closeSideDrawer() {
    state.drawerOpen = false;
    const drawer = document.getElementById('sideDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('visible');
    updateHeaderActiveStates();
  }

  function updateHeaderActiveStates() {
    const labBtn = document.getElementById('navBtnLab');
    const overlay = document.getElementById('labPhasesOverlay');
    const isLabOverlayOpen = overlay && overlay.classList.contains('visible');

    if (labBtn) labBtn.classList.toggle('active', isLabOverlayOpen && !state.drawerOpen);

    const navMap = {
      timeline: document.getElementById('navBtnTimeline'),
      pubblicazioni: document.getElementById('navBtnPubblicazioni'),
      partnership: document.getElementById('navBtnPartnership'),
      gallery: document.getElementById('navBtnGallery'),
      credits: document.getElementById('navBtnCredits')
    };

    Object.keys(navMap).forEach(function (key) {
      if (navMap[key]) {
        navMap[key].classList.toggle('active', state.activeSection === key && state.drawerOpen);
      }
    });
  }

  // -------------------------------------------------------------------------
  // GESTIONE EVENTI (HIT PROXY 34PX)
  // -------------------------------------------------------------------------
  function initEventHandlers() {
    window.addEventListener('pointerdown', ensureAudioUnlocked, { once: true });
    window.addEventListener('keydown', ensureAudioUnlocked, { once: true });

    CIRCLES_REGISTRY.forEach(function (c) {
      const dom = circleDOM[c.id];
      if (!dom) return;

      const hitProxy = dom.hitProxy;

      hitProxy.addEventListener('pointerenter', function () {
        ensureAudioUnlocked();
        state.circles[c.id].isHovered = true;
        state.circles[c.id].motionEnergy = 1.0;
      });

      hitProxy.addEventListener('pointermove', function () {
        state.circles[c.id].motionEnergy = Math.min(1.0, state.circles[c.id].motionEnergy + 0.15);
      });

      hitProxy.addEventListener('pointerleave', function () {
        state.circles[c.id].isHovered = false;
      });

      hitProxy.addEventListener('click', function (e) {
        e.stopPropagation();
        ensureAudioUnlocked();

        if (c.system === 'laboratorio') {
          showLabPhasesOverlay();
          if (c.isPhase) {
            setLabPhase(c.phaseIndex);
          }
        } else if (DRAWER_DATA[c.system]) {
          openSideDrawer(c.system);
        }
      });
    });

    // Navigazione Header
    document.getElementById('navBtnLab').addEventListener('click', function () {
      ensureAudioUnlocked();
      const overlay = document.getElementById('labPhasesOverlay');
      if (overlay && overlay.classList.contains('visible')) {
        hideLabPhasesOverlay();
      } else {
        showLabPhasesOverlay();
      }
    });

    const navButtons = [
      { id: 'navBtnTimeline', section: 'timeline' },
      { id: 'navBtnPubblicazioni', section: 'pubblicazioni' },
      { id: 'navBtnPartnership', section: 'partnership' },
      { id: 'navBtnGallery', section: 'gallery' },
      { id: 'navBtnCredits', section: 'credits' }
    ];

    navButtons.forEach(function (item) {
      const btn = document.getElementById(item.id);
      if (btn) {
        btn.addEventListener('click', function () {
          ensureAudioUnlocked();
          openSideDrawer(item.section);
        });
      }
    });

    document.getElementById('navBtnLogo').addEventListener('click', function () {
      ensureAudioUnlocked();
      closeSideDrawer();
      showLabPhasesOverlay();
      setLabPhase(0);
    });

    // Fasi Precedente / Successiva e Chiudi Scheda
    document.getElementById('btnPrevPhase').addEventListener('click', function () {
      setLabPhase(state.currentPhaseIndex - 1);
    });

    document.getElementById('btnNextPhase').addEventListener('click', function () {
      setLabPhase(state.currentPhaseIndex + 1);
    });

    document.getElementById('btnClosePhaseCard').addEventListener('click', function () {
      hideLabPhasesOverlay();
    });

    // Chiusura Drawer
    document.getElementById('btnDismissDrawer').addEventListener('click', closeSideDrawer);
    document.getElementById('drawerBackdrop').addEventListener('click', closeSideDrawer);

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (state.drawerOpen) closeSideDrawer();
        else hideLabPhasesOverlay();
      }
    });

    // Audio Mute Toggle
    const muteToggle = document.getElementById('btnAudioMute');
    const muteLabel = document.getElementById('audioMuteLabel');
    if (muteToggle) {
      muteToggle.addEventListener('click', function () {
        state.audioMuted = !state.audioMuted;
        muteLabel.textContent = state.audioMuted ? 'Audio Spento' : 'Audio Attivo';
        muteToggle.classList.toggle('muted', state.audioMuted);
        if (state.audioMuted && audioCtx) {
          CIRCLES_REGISTRY.forEach(function (c) {
            if (audioNodes[c.id]) {
              audioNodes[c.id].gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.05);
            }
          });
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // AVVIO ALL'ONLOAD
  // -------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    renderSvgScene();
    initEventHandlers();
    setLabPhase(0);
    showLabPhasesOverlay();

    requestAnimationFrame(mainAnimationLoop);
  });

})();
