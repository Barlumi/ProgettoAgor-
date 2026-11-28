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

  // Posizionamenti predefiniti per ritagli circolari decentrati
  const IMAGE_POSITION = Object.freeze({
    DEFAULT: '50% 50%',
    SPHERICAL_HARMONICS: '60.5% 50%'
  });

  // Tipologie multimediali e categorie filtro della Gallery
  const MEDIA_TYPE = Object.freeze({
    IMAGE: 'image',
    VIDEO: 'video'
  });

  const MEDIA_BADGE = Object.freeze({
    NONE: 'none',
    VIDEO: 'video',
    MAP: 'map'
  });

  const VIDEO_MIME = Object.freeze({
    WEBM: 'video/webm',
    MP4: 'video/mp4'
  });

  const EMILIA_ROMAGNA_MAP_GEOM = Object.freeze({
    SVG_NS: 'http://www.w3.org/2000/svg',
    REGION_PATH: 'M 24 24 L 78 20 L 145 28 L 218 32 L 292 26 L 368 30 L 386 46 L 378 72 L 362 94 L 384 118 L 418 148 L 404 160 L 360 162 L 326 144 L 278 140 L 236 124 L 186 118 L 138 104 L 84 90 L 44 68 Z',
    VIA_EMILIA_PATH: 'M 64 34 L 122 56 L 194 74 L 258 92 L 318 112 L 404 142',
    REF_CITY_X: 258,
    REF_CITY_Y: 92,
    REF_CITY_LABEL: 'Bologna'
  });

  const CAMPAIGN_CITIES = Object.freeze([
    Object.freeze({
      id: 'parma',
      name: 'Parma',
      scenesCount: '6 scene 3D',
      scenes: 'Piazza Duomo (2 scene), Piazza Garibaldi, Piazzale San Francesco (28 × 50 m, 2 sorgenti × 6 microfoni), Parco Ducale e Lungo Parma – Piazza Ghiaia.',
      openLabel: 'Apri mappa punti San Francesco →',
      x: 122,
      y: 56,
      dx: 11,
      dy: -6,
      anchor: 'start',
      lightboxIndex: 0
    }),
    Object.freeze({
      id: 'tresigallo',
      name: 'Tresigallo',
      scenesCount: '1 piazza + Sala WFS',
      scenes: 'Piazza della Repubblica (registrazione "Chitarra" HOA di 3° ordine davanti alla fontana), Teatro del \'900 e Sala Immersiva AGORÀ.',
      openLabel: 'Apri video Chitarra Live →',
      x: 326,
      y: 46,
      dx: -11,
      dy: -4,
      anchor: 'end',
      lightboxIndex: 5
    }),
    Object.freeze({
      id: 'comacchio',
      name: 'Comacchio',
      scenesCount: '1 piazza',
      scenes: 'Piazza Trepponti: rilievo ESS su 9 posizioni (T30 tra 1,4 e 1,9 s), mappa prime riflessioni 0–80 ms, acqua, avifauna e dialetto locale.',
      openLabel: 'Apri mappa Trepponti →',
      x: 368,
      y: 66,
      dx: 11,
      dy: -2,
      anchor: 'start',
      lightboxIndex: 4
    }),
    Object.freeze({
      id: 'faenza',
      name: 'Faenza',
      scenesCount: '1 piazza + Teatro',
      scenes: 'Piazza del Popolo (rilievi sotto i portici storici con sorgente a dodecaedro ed em64) e Teatro Masini (campagne 2020 e 2025).',
      openLabel: 'Apri rilievo Faenza →',
      x: 318,
      y: 112,
      dx: -10,
      dy: 14,
      anchor: 'end',
      lightboxIndex: 9
    }),
    Object.freeze({
      id: 'rimini',
      name: 'Rimini',
      scenesCount: '2 scene 3D',
      scenes: 'Piazza Cavour (kit completo em64 + KU 100 + Insta360, misure MIMO con decadimento ≈ 1,6 s) e Piazza Tre Martiri.',
      openLabel: 'Apri kit Piazza Cavour →',
      x: 404,
      y: 142,
      dx: -11,
      dy: 4,
      anchor: 'end',
      lightboxIndex: 2
    })
  ]);

  const GALLERY_CATEGORY = Object.freeze({
    ALL: 'all',
    SQUARES: 'squares',
    TRESIGALLO: 'tresigallo',
    VIDEOS: 'videos'
  });

  const GALLERY_CATEGORY_FILTERS = Object.freeze([
    Object.freeze({ id: GALLERY_CATEGORY.ALL, label: 'Tutti' }),
    Object.freeze({ id: GALLERY_CATEGORY.SQUARES, label: 'Piazze & Rilievi' }),
    Object.freeze({ id: GALLERY_CATEGORY.TRESIGALLO, label: 'Sala Tresigallo' }),
    Object.freeze({ id: GALLERY_CATEGORY.VIDEOS, label: 'Video' })
  ]);

  // -------------------------------------------------------------------------
  // DATI DETTAGLIATI PROGETTO AGORÀ (CIRI-EC Università di Bologna)
  // -------------------------------------------------------------------------
  const LAB_PHASES = [
    {
      num: 1,
      tag: 'Fase 1',
      title: 'Fase 1: Acquisizione 3D e Soundscape',
      body: [
        'I ricercatori hanno condotto una campagna sperimentale in 5 città dell\'Emilia-Romagna (Parma, Rimini, Faenza, Comacchio e Tresigallo), registrando il soundscape di 11 piazze storiche insieme a rilievi comparativi in teatri storici e in camera anecoica.',
        'Al centro di ogni piazza il kit di acquisizione integra microfono sferico Eigenmike em64 (64 capsule), camera 360° in 8K, testa binaurale Neumann KU 100, microfono B-format Sennheiser Ambeo e microfono ECM-8000 su rete Dante a 48 kHz.'
      ],
      image: 'assets/gallery/image31.jpg',
      imageCaption: 'Rilievo in Piazza Cavour a Rimini: microfono sferico Eigenmike em64 (con antivento), telecamera 360° e testa binaurale per la registrazione del soundscape.',
      hasCampaignMap: true,
      mediaStripTag: 'Mappe & Foto sul Campo · 5 Città',
      mediaActionLabel: 'Mappe & Foto',
      mediaLightboxTag: 'Campagna Sperimentale · Fase 1',
      mediaGallery: [
        {
          title: 'Parma, Piazzale San Francesco · Mappa Punti IR',
          shortLabel: 'Mappa Parma',
          badge: MEDIA_BADGE.MAP,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/campagna/parma_san_francesco_mappa_punti.jpg',
          caption: 'Planimetria delle posizioni di misura in Piazzale San Francesco (Parma): 2 sorgenti (SA, SB) × 6 microfoni su distanze da 4,03 m a 37,40 m.',
          featured: true
        },
        {
          title: 'Parma, Piazzale San Francesco · Vista Aerea',
          shortLabel: 'Aerea Parma',
          badge: MEDIA_BADGE.MAP,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/campagna/parma_san_francesco_aerea.jpg',
          caption: 'Inquadramento urbanistico dell\'area di misura (28 × 50 m) tra la Chiesa di San Francesco, la Casa della Musica e Borgo degli Studi.',
          featured: true
        },
        {
          title: 'Rimini · Kit Completo di Ripresa in Piazza',
          shortLabel: 'Kit Ripresa',
          badge: MEDIA_BADGE.NONE,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/gallery/kit_acquisizione_rimini.jpg',
          caption: 'Postazione multi-sensore co-localizzata in Piazza Cavour: Eigenmike em64, Insta360, testa artificiale KU 100, Sennheiser Ambeo, ECM-8000 e Zoom F8.',
          featured: true
        },
        {
          title: 'Parma · Mappa Acustica 3D su Immagine 360°',
          shortLabel: 'Mappa 3D',
          badge: MEDIA_BADGE.MAP,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/gallery/image29.jpg',
          caption: 'Distribuzione spaziale a colori della pressione e provenienza sonora sovrapposta alla ripresa 360° (Farina et al., Urban Science 2025).',
          featured: true
        },
        {
          title: 'Comacchio, Trepponti · Mappa Prime Riflessioni',
          shortLabel: 'Trepponti 80ms',
          badge: MEDIA_BADGE.MAP,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/gallery/image33.jpg',
          caption: 'Mappa panoramica delle prime riflessioni (0–80 ms) estratta dalla sonda sferica a 64 capsule a Piazza Trepponti.',
          featured: true
        },
        {
          title: 'Tresigallo · Chitarra Live HOA 3° Ordine (Video)',
          shortLabel: 'Chitarra Live',
          badge: MEDIA_BADGE.VIDEO,
          mediaType: MEDIA_TYPE.VIDEO,
          image: 'assets/videos/chitarra_tresigallo_poster.jpg',
          videoSrc: 'assets/videos/chitarra_tresigallo.mp4',
          videoWebmSrc: 'assets/videos/chitarra_tresigallo.webm',
          caption: 'Registrazione dal vivo con sorgente reale in Piazza della Repubblica (Tresigallo) davanti alla fontana monumentale.',
          featured: true
        },
        {
          title: 'Parma · Campagna in Piazzale San Francesco',
          shortLabel: 'Rilievo Parma',
          badge: MEDIA_BADGE.NONE,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/campagna/parma_san_francesco_rilievo.jpg',
          caption: 'Sorgente omnidirezionale e microfoni posizionati davanti alla facciata della Chiesa di San Francesco durante il rilievo ESS.',
          featured: false
        },
        {
          title: 'Rimini · Setup in Piazza Cavour',
          shortLabel: 'Piazza Cavour',
          badge: MEDIA_BADGE.NONE,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/campagna/rimini_kit_piazza_cavour.jpg',
          caption: 'Allestimento del cavalletto con sonda sferica e testa artificiale al centro di Piazza Cavour (Rimini, 2024).',
          featured: false
        },
        {
          title: 'Rimini · Ripresa Equirettangolare 360° 8K',
          shortLabel: 'Panorama 360°',
          badge: MEDIA_BADGE.NONE,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/gallery/image16.jpg',
          caption: 'Fotogramma equirettangolare a 360° acquisito in sincronia temporale con i 64 canali dell\'Eigenmike em64.',
          featured: false
        },
        {
          title: 'Faenza, Piazza del Popolo · Misure sotto i Portici',
          shortLabel: 'Faenza Piazza',
          badge: MEDIA_BADGE.NONE,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/gallery/image13.jpg',
          caption: 'Il gruppo di ricerca CIRI-EC dell\'Università di Bologna durante i rilievi acustici affacciati su Piazza del Popolo.',
          featured: false
        },
        {
          title: 'Tresigallo · Sessione Chitarra in 3° Ordine HOA',
          shortLabel: 'Tresigallo HOA',
          badge: MEDIA_BADGE.NONE,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/campagna/tresigallo_chitarra_live.jpg',
          caption: 'Ripresa Ambisonics a 64 capsule per lo scenario musicale in Piazza della Repubblica a Tresigallo.',
          featured: false
        },
        {
          title: 'Bologna · Teatro Comunale senza Poltrone',
          shortLabel: 'Teatro Bologna',
          badge: MEDIA_BADGE.NONE,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/campagna/bologna_teatro_comunale.jpg',
          caption: 'Indagine acustica nella cavea storica del Teatro Comunale di Bologna per il confronto metodologico teatri-piazze.',
          featured: false
        },
        {
          title: 'Bologna · Chiesa del SS. Salvatore',
          shortLabel: 'SS. Salvatore',
          badge: MEDIA_BADGE.NONE,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/campagna/bologna_chiesa_ss_salvatore.jpg',
          caption: 'Rilievo della risposta all\'impulso 3D in architettura monumentale ecclesiastica con em64 e testa binaurale.',
          featured: false
        },
        {
          title: 'Zagabria · Teatro Nazionale Croato',
          shortLabel: 'Zagabria TNC',
          badge: MEDIA_BADGE.NONE,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/campagna/zagabria_teatro_nazionale.jpg',
          caption: 'Campagna internazionale comparativa in sala d\'opera storica con catena di acquisizione multicanale.',
          featured: false
        },
        {
          title: 'Ferrara · Camera Anecoica Universitaria',
          shortLabel: 'Cam. Anecoica',
          badge: MEDIA_BADGE.NONE,
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/campagna/ferrara_camera_anecoica.jpg',
          caption: 'Registrazioni anecoiche di riferimento utilizzate come sorgenti asciutte per l\'auralizzazione nelle piazze.',
          featured: false
        }
      ]
    },
    {
      num: 2,
      tag: 'Fase 2',
      title: 'Fase 2: Risposta all\'Impulso e Metodo ESS',
      body: [
        'Facciate, colonne e portici riflettono il suono definendo l\'acustica di ogni piazza. Le misure seguono lo standard ISO 3382, applicando allo spazio aperto i parametri utilizzati per teatri e sale da concerto.',
        'Attraverso il metodo ESS (Exponential Sine Sweep), una sorgente a dodecaedro emette uno sweep a frequenza crescente che permette di calcolare la Risposta all\'Impulso (IR 3D). Con l\'approccio multicanale MIMO si ricavano il tempo di riverberazione (T30 di circa 1,6 s a Rimini) e la direzione delle prime riflessioni.'
      ],
      image: 'assets/gallery/image12.jpg',
      imageCaption: 'Misura acustica in Piazza Cavour a Rimini: sorgente omnidirezionale a dodecaedro per il calcolo della risposta all\'impulso (ESS) e del tempo di riverberazione.',
      hasEssDemo: true
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
      imageCaption: 'Mappa acustica in formato AmbiX: scomposizione in armoniche sferiche e intensità del suono nello spazio 3D.',
      imagePosition: IMAGE_POSITION.SPHERICAL_HARMONICS,
      hasShExplorer: true
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
        'Oltre all\'ascolto individuale in cuffia tramite filtri binaurali (HRTF), nell\'Urban Center "Sogni" di Tresigallo è stata realizzata la sala modulare Agorà Immersive Room: un ottagono da 6 m di diametro (lati da 2,5 m, altezza 3,8 m) in profilati Bosch Rexroth da 40 mm (160 kg) progettato per la fruizione inclusiva anche da parte di persone con disabilità motorie.',
        'La diffusione sonora combina un array WFS (Wave Field Synthesis) a 128 canali con soundbar dedicate e amplificatori ZOTech, insieme a una cupola Ambisonics da 24 altoparlanti (3 anelli ottagonali da 8 più diffusore zenitale), pilotati da tracce master AmbiX di 3° ordine (16 canali) con AllRADecoder, WFSMixer e Plogue Bidule.',
        'La proiezione ottagonale a 360° impiega 4 proiettori a ottica corta Optoma 4K400STx e un Mac Studio, gestiti da una pipeline open-source (Python + OpenCV per warp prospettico e keystone, 4 istanze mpv sincronizzate, blocco UUID dei display con displayplacer e Web UI Python).'
      ],
      image: 'assets/gallery/tresigallo_wfs_room.jpg',
      imageCaption: 'Sala immersiva AGORÀ a Tresigallo (Urban Center "Sogni"): struttura ottagonale da 6 m con array WFS a 128 canali, 24 diffusori Ambisonics e proiezione 360° a 4 proiettori 4K.',
      model3dUrl: 'https://e-muse.it/tresigallo',
      model3dTitle: 'Sala Immersiva WFS — Tresigallo',
      specs: [
        { label: 'Struttura', value: 'Ottagono 6 × 3,8 m · Bosch Rexroth (160 kg)' },
        { label: 'Audio WFS', value: 'Array 128 canali · Amplificatori ZOTech' },
        { label: 'Ambisonics', value: '24 diffusori (3 anelli × 8) + zenith' },
        { label: 'Video & Software', value: '4× Optoma 4K400STx · Mac Studio, OpenCV, mpv' }
      ],
      specsLinkUrl: 'https://adrianofarina.it/projects/2026/09/tresigallo/',
      specsLinkLabel: 'Documentazione tecnica completa (adrianofarina.it) ↗',
      mediaStripTag: 'Dietro le quinte · Tresigallo',
      mediaActionLabel: 'Foto & Video',
      mediaLightboxTag: 'Sala Immersiva · Tresigallo',
      mediaGallery: [
        {
          title: 'Progetto CAD 3D Ottagono',
          shortLabel: 'Progetto 3D',
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/tresigallo/cad_ottagono.jpg',
          caption: 'Modello CAD Blender dell\'ottagono da 6 m: struttura portante, barre WFS, 4 proiettori e diffusori Ambisonics.',
          featured: true
        },
        {
          title: 'Profilati Bosch Rexroth (160 kg)',
          shortLabel: 'Profilati 40mm',
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/tresigallo/profilati_trasporto.jpg',
          caption: 'Travi modulari in alluminio estruso Bosch Rexroth da 40 mm pronte per il trasporto e il montaggio a Tresigallo.',
          featured: false
        },
        {
          title: 'Piastre Base Zincate 40×40',
          shortLabel: 'Piastre base',
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/tresigallo/piastra_base.jpg',
          caption: 'Giunto di ancoraggio a terra con piastra base in acciaio galvanizzato Bosch Rexroth e tasselli M8.',
          featured: false
        },
        {
          title: 'Erezione Struttura Ottagonale',
          shortLabel: 'Telaio 6 m',
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/tresigallo/telaio_ottagono.jpg',
          caption: 'Montaggio dello scheletro ottagonale da 6 m di diametro e 3,8 m di altezza all\'interno dell\'Urban Center "Sogni".',
          featured: true
        },
        {
          title: 'Montaggio Barre WFS 128 Canali',
          shortLabel: 'Montaggio WFS',
          mediaType: MEDIA_TYPE.VIDEO,
          image: 'assets/videos/montaggio_wfs_poster.jpg',
          videoSrc: 'assets/videos/montaggio_wfs.mp4',
          videoWebmSrc: 'assets/videos/montaggio_wfs.webm',
          caption: 'Installazione in quota della cornice modulare e delle soundbar per la Wave Field Synthesis a 128 canali.',
          featured: true
        },
        {
          title: 'Banco Test Array WFS in Laboratorio',
          shortLabel: 'Banco WFS',
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/tresigallo/test_wfs_hub.jpg',
          caption: 'Premontaggio e collaudo dei moduli di altoparlanti WFS prima dell\'installazione a Tresigallo.',
          featured: false
        },
        {
          title: 'Teli di Proiezione & Soundbar WFS',
          shortLabel: 'Teli & WFS',
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/tresigallo/schermi_wfs_alto.jpg',
          caption: 'Vista dall\'alto dell\'anello continuo dei pannelli di proiezione e dell\'anello inferiore di trasduttori WFS.',
          featured: true
        },
        {
          title: 'Calibrazione Proiettori Optoma 4K',
          shortLabel: 'Warp OpenCV',
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/tresigallo/calibrazione_proiezione.jpg',
          caption: 'Allineamento prospettico tramite griglia di calibrazione OpenCV e quattro proiettori a ottica corta Optoma 4K400STx.',
          featured: false
        },
        {
          title: 'Proiezione Panoramica 360° Attiva',
          shortLabel: 'Video 360°',
          mediaType: MEDIA_TYPE.VIDEO,
          image: 'assets/videos/proiezione_360_poster.jpg',
          videoSrc: 'assets/videos/proiezione_360.mp4',
          videoWebmSrc: 'assets/videos/proiezione_360.webm',
          caption: 'Prova dinamica della proiezione immersiva a 360° lungo i teli ottagonali della sala con audio spazializzato.',
          featured: true
        },
        {
          title: 'Sala Agorà Pronta per l\'Apertura',
          shortLabel: 'Sala pronta',
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/tresigallo/sala_pronta.jpg',
          caption: 'Vista d\'insieme dell\'ottagono completo con sedute, diffusori Ambisonics su 3 anelli e barre WFS perimetrali.',
          featured: false
        },
        {
          title: 'Giornata Inaugurale a Tresigallo',
          shortLabel: 'Inaugurazione',
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/tresigallo/inaugurazione_pubblico.jpg',
          caption: 'Il pubblico e le istituzioni all\'interno della sala immersiva durante l\'inaugurazione all\'Urban Center "Sogni".',
          featured: false
        },
        {
          title: 'Pubblico Immerso nella Piazza 360°',
          shortLabel: 'Esperienza live',
          mediaType: MEDIA_TYPE.VIDEO,
          image: 'assets/videos/inaugurazione_sala_poster.jpg',
          videoSrc: 'assets/videos/inaugurazione_sala.mp4',
          videoWebmSrc: 'assets/videos/inaugurazione_sala.webm',
          caption: 'Visitatori immersi nella ricostruzione audiovisiva della piazza storica durante la prima dimostrazione pubblica.',
          featured: true
        },
        {
          title: 'Sessione d\'Ascolto Collettiva',
          shortLabel: 'Ascolto 3D',
          mediaType: MEDIA_TYPE.IMAGE,
          image: 'assets/tresigallo/ascolto_collettivo.jpg',
          caption: 'Fruizione condivisa inclusiva dentro il cerchio immersivo della Città del \'900 senza barriere motorie.',
          featured: false
        }
      ]
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
          caption: 'Sorgente acustica omnidirezionale a dodecaedro posizionata in Piazza Cavour per la misura della risposta all\'impulso (ESS).',
          image: 'assets/gallery/image12.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Faenza, Piazza del Popolo',
          caption: 'Il gruppo di ricerca CIRI-EC dell\'Università di Bologna con la sorgente omnidirezionale a dodecaedro affacciato su Piazza del Popolo.',
          image: 'assets/gallery/image13.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Tresigallo, Piazza della Repubblica',
          caption: 'Postazione di acquisizione con microfono sferico Eigenmike em64, telecamera 360° e microfono di riferimento presso la fontana monumentale.',
          image: 'assets/gallery/image14.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Faenza, Teatro Masini',
          caption: 'Misura delle risposte all\'impulso 3D (IR 3D) dai palchi verso il palcoscenico con microfono sferico Eigenmike em64, telecamera 360° e testa binaurale.',
          image: 'assets/gallery/image15.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Rimini, Piazza Cavour (Ripresa 360°)',
          caption: 'Scatto fotografico panoramico equirettangolare a 360° abbinato all\'acquisizione audio multicanale.',
          image: 'assets/gallery/image16.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Il Team di Misura al Teatro Masini',
          caption: 'I ricercatori di CIRI-EC (UniBo), CIDEA (UniPr) e Gruppo C.S.A. durante le sessioni sperimentali a Faenza.',
          image: 'assets/gallery/image17.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Sorgente a Dodecaedro sul Cavalletto',
          caption: 'Dettaglio della sorgente sonora omnidirezionale a dodecaedro su cavalletto in Piazza Cavour (Rimini, 2024).',
          image: 'assets/gallery/image27.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Misura MIMO in Teatro (SIPARIO)',
          caption: 'Sorgente sferica a 32 altoparlanti e microfono Eigenmike sul palco nei teatri storici dell\'Emilia-Romagna.',
          image: 'assets/gallery/image23.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Sorgente Sferica a 32 Trasduttori',
          caption: 'Diffusore sferico multicanale a 32 trasduttori controllati singolarmente per misure acustiche MIMO.',
          image: 'assets/gallery/image24.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Rilievo Aerofotogrammetrico con Drone',
          caption: 'Scansione volumetrica e fotogrammetrica con drone all\'interno del Teatro Comunale Pavarotti di Modena.',
          image: 'assets/gallery/image26.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Armoniche Sferiche fino al 3° Ordine',
          caption: 'Rappresentazione spaziale dei 16 canali Ambix (ACN/SN3D) dall\'ordine 0 (W) all\'ordine 3 (Q, O, M, K, L, N, P).',
          image: 'assets/gallery/image28.jpg',
          imagePosition: IMAGE_POSITION.SPHERICAL_HARMONICS,
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Mappa Acustica 3D a Colori (Parma)',
          caption: 'Mappa di intensità e provenienza direzionale del paesaggio sonoro 3D sovrapposta a immagine 360 (Farina et al., Urban Science 2025).',
          image: 'assets/gallery/image29.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Profili di Loudness nel Tempo (sone)',
          caption: 'Analisi psicoacustica comparata tra Piazza Garibaldi (forte variabilità), Piazza Duomo (silenziosa) e Piazzale Pilotta.',
          image: 'assets/gallery/image30.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Piazza Cavour come Sala da Concerto',
          caption: 'Postazione di acquisizione in Piazza Cavour con Eigenmike em64, telecamera 360° e testa binaurale (decadimento misurato ≈ 1,6 s, analogo a una sala d\'opera media).',
          image: 'assets/gallery/image31.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Comacchio, Piazza Trepponti',
          caption: 'Prima caratterizzazione acustica dei ponti monumentali: sweep ESS su 9 posizioni con T30 tra 1,4 s e 1,9 s.',
          image: 'assets/gallery/image32.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Sala Immersiva WFS di Tresigallo (Edificio Sogni)',
          caption: 'Allestimento della sala d\'ascolto con array circolare di diffusori Wave Field Synthesis e sistema di videoproiezione a 360°.',
          image: 'assets/gallery/tresigallo_wfs_room.jpg',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Mappa delle Prime Riflessioni (Trepponti)',
          caption: 'Mappa panoramica delle prime riflessioni (0–80 ms) elaborata dalla sonda a 64 capsule a Comacchio.',
          image: 'assets/gallery/image33.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Flusso di Modellazione VR 6DoF',
          caption: 'Schema della catena: Rilievo Visivo (fotogrammetria) + Rilievo Acustico (IR HOA) → Ambiente Audiovisivo Immersivo a 6DoF.',
          image: 'assets/gallery/image34.jpg',
          imageFit: 'contain',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Piazzale San Francesco in Unreal Engine',
          caption: 'Ricostruzione 3D e navigazione libera a 6 gradi di libertà con auralizzazione in tempo reale di un brano da Il Trovatore.',
          image: 'assets/gallery/image35.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Kit Completo di Acquisizione in Piazza',
          caption: 'Configurazione operativa in Piazza Cavour: Eigenmike em64, Insta360 8K, testa artificiale KU 100, Sennheiser Ambeo, ECM-8000 e Zoom F8.',
          image: 'assets/gallery/kit_acquisizione_rimini.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Catena Hardware MIMO & Dante',
          caption: 'Architettura di misura multicanale: PC e switch PoE su rete Dante, scheda RME Digiface Dante, amplificatore 32 ch Classe D e sorgente sferica.',
          image: 'assets/gallery/catena_dante_mimo.jpg',
          imageFit: 'contain',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Spettrogramma Exponential Sine Sweep',
          caption: 'Analisi tempo-frequenza di uno sweep esponenziale da 20 Hz a 20 kHz e distorsioni armoniche separate nella deconvoluzione di Farina.',
          image: 'assets/gallery/spettrogramma_ess.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Chitarra Live in Piazza della Repubblica (Video)',
          caption: 'Esecuzione di una sorgente sonora reale (chitarra classica) davanti alla fontana di Tresigallo per validare la localizzazione 3D.',
          image: 'assets/videos/chitarra_tresigallo_poster.jpg',
          videoSrc: 'assets/videos/chitarra_tresigallo.mp4',
          videoWebmSrc: 'assets/videos/chitarra_tresigallo.webm',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.VIDEO
        },
        {
          title: 'Modello CAD 3D della Sala Ottagonale',
          caption: 'Progetto tridimensionale in Blender dell\'ottagono da 6 m all\'Urban Center "Sogni" con coni di proiezione e diffusori.',
          image: 'assets/tresigallo/cad_ottagono.jpg',
          imageFit: 'contain',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Profilati Bosch Rexroth da 40 mm',
          caption: 'Trasporto dei profilati strutturali in alluminio estruso Bosch Rexroth (160 kg complessivi) verso il cantiere di Tresigallo.',
          image: 'assets/tresigallo/profilati_trasporto.jpg',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Piastre Base Zincate in Acciaio',
          caption: 'Assemblaggio delle piastre base Bosch Rexroth 40×40 (galvanizzate, fissaggio M8) per l\'ancoraggio dei montanti dell\'ottagono.',
          image: 'assets/tresigallo/piastra_base.jpg',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Erezione del Telaio Ottagonale (6 × 3,8 m)',
          caption: 'Montaggio su trabattello della struttura portante smontabile nella sala principale dell\'edificio razionalista "Sogni".',
          image: 'assets/tresigallo/telaio_ottagono.jpg',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Montaggio in Quota delle Barre WFS (Video)',
          caption: 'Installazione della cornice superiore e delle barre per l\'array Wave Field Synthesis a 128 canali nella sala di Tresigallo.',
          image: 'assets/videos/montaggio_wfs_poster.jpg',
          videoSrc: 'assets/videos/montaggio_wfs.mp4',
          videoWebmSrc: 'assets/videos/montaggio_wfs.webm',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.VIDEO
        },
        {
          title: 'Banco Test Array WFS al Creative Hub',
          caption: 'Premontaggio e verifica acustica dei moduli di soundbar WFS e cablaggi audio prima del trasferimento in sala.',
          image: 'assets/tresigallo/test_wfs_hub.jpg',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Vista dall\'Alto: Teli & Anello WFS',
          caption: 'Allestimento dall\'interno con gli schermi bianchi a 360° e il perimetro continuo delle soundbar Wave Field Synthesis.',
          image: 'assets/tresigallo/schermi_wfs_alto.jpg',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Calibrazione Proiettori Optoma 4K400STx',
          caption: 'Fase di taratura ottica e warp prospettico con OpenCV sui quattro proiettori a ottica corta sincronizzati da Mac Studio.',
          image: 'assets/tresigallo/calibrazione_proiezione.jpg',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Proiezione Panoramica 360° Attiva (Video)',
          caption: 'Test completo di proiezione avvolgente a 360° e restituzione spaziale del paesaggio sonoro dentro l\'ottagono di Tresigallo.',
          image: 'assets/videos/proiezione_360_poster.jpg',
          videoSrc: 'assets/videos/proiezione_360.mp4',
          videoWebmSrc: 'assets/videos/proiezione_360.webm',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.VIDEO
        },
        {
          title: 'Sala Immersiva Agorà Completata',
          caption: 'Configurazione finale della sala con accessibilità priva di barriere, 24 diffusori Ambisonics su 3 anelli più zenit e array WFS.',
          image: 'assets/tresigallo/sala_pronta.jpg',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Inaugurazione all\'Urban Center "Sogni"',
          caption: 'Il pubblico e gli ospiti all\'interno della sala immersiva di Tresigallo durante l\'apertura ufficiale al pubblico.',
          image: 'assets/tresigallo/inaugurazione_pubblico.jpg',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Visitatori Dentro la Piazza 360° (Video)',
          caption: 'Esperienza dal vivo durante l\'inaugurazione: i cittadini esplorano la piazza storica immersi tra suono 3D e video panoramico.',
          image: 'assets/videos/inaugurazione_sala_poster.jpg',
          videoSrc: 'assets/videos/inaugurazione_sala.mp4',
          videoWebmSrc: 'assets/videos/inaugurazione_sala.webm',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.VIDEO
        },
        {
          title: 'Fruizione Inclusiva e Ascolto Condiviso',
          caption: 'Gruppi di visitatori seduti all\'interno dell\'ottagono di Tresigallo durante le dimostrazioni acustiche e visive.',
          image: 'assets/tresigallo/ascolto_collettivo.jpg',
          category: GALLERY_CATEGORY.TRESIGALLO,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Parma · Mappa Punti IR in Piazzale San Francesco',
          caption: 'Planimetria acustica della campagna in Piazzale San Francesco: 2 sorgenti omnidirezionali (SA, SB) × 6 ricevitori da 4,03 m a 37,40 m.',
          image: 'assets/campagna/parma_san_francesco_mappa_punti.jpg',
          imageFit: 'contain',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Parma · Vista Aerea Piazzale San Francesco',
          caption: 'Rilievo dall\'alto della geometria urbanistica (28 × 50 m) collegata al modello acustico tridimensionale.',
          image: 'assets/campagna/parma_san_francesco_aerea.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Parma · Acquisizione davanti alla Chiesa',
          caption: 'Rilievo sul campo in Piazzale San Francesco con sorgente omnidirezionale e microfoni su cavalletto.',
          image: 'assets/campagna/parma_san_francesco_rilievo.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Bologna · Teatro Comunale senza Poltrone',
          caption: 'Sessione sperimentale nella cavea del Teatro Comunale di Bologna per lo studio comparato di spazi monumentali.',
          image: 'assets/campagna/bologna_teatro_comunale.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
        },
        {
          title: 'Ferrara · Camera Anecoica Universitaria',
          caption: 'Cattura di sorgenti sonore anecoiche asciutte da convolvere con le risposte all\'impulso delle piazze.',
          image: 'assets/campagna/ferrara_camera_anecoica.jpg',
          category: GALLERY_CATEGORY.SQUARES,
          mediaType: MEDIA_TYPE.IMAGE
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

    // Parametri sonori specifici dello Stile Easy (Web Audio API — accordatura pentatonica La maggiore)
    audio: {
      masterVolume: 0.62,
      osc1Type: 'sine',               // Oscillatore 1: sinusoidale puro
      osc2Type: 'sine',               // Oscillatore 2: armonica sinusoidale pura
      baseFilterCutoff: 280,          // Cutoff filtro passa-basso a riposo (Hz)
      filterModulationRange: 880,     // Escursione morbida del filtro al movimento mouse
      filterQ: 0.7,                   // Roll-off naturale Butterworth senza picchi risonanti
      maxVoiceGain: 0.095,            // Guadagno massimo della voce durante il moto
      frequencies: {
        'lab-c1': 110.00, // La2
        'lab-c2': 138.59, // Do#3
        'lab-c3': 164.81, // Mi3
        'lab-c4': 220.00, // La3
        'lab-c5': 277.18, // Do#4
        'part-c1': 185.00, // Fa#3 (Partner)
        'part-c2': 246.94, // Si3 (Crediti)
        'part-c3': 329.63, // Mi4 (Pubblicazioni)
        'cred-c1': 369.99, // Fa#4 (Timeline)
        'cred-c2': 440.00  // La4 (Gallery)
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

  const SCRUB_CONFIG = Object.freeze({
    OUTER_MARGIN_SVG: 24,
    CLICK_SUPPRESS_MS: 450,
    HAPTIC_MS: 8
  });

  const SCRUB_HINT = Object.freeze({
    RELEASE_TO_OPEN: 'Rilascia per aprire',
    RELEASE_TO_CANCEL: 'Rilascia fuori per annullare',
    CANCEL_LABEL: 'Selezione annullata'
  });

  const SCRUB_MODE = Object.freeze({
    IDLE: 'idle',
    ACTIVE: 'active'
  });

  const LIGHTBOX_SOURCE = Object.freeze({
    GALLERY: 'gallery',
    PHASE: 'phase',
    PHASE_MEDIA: 'phase_media'
  });

  const LIGHTBOX_TAG = Object.freeze({
    GALLERY: 'Archivio Sperimentale',
    PHASE: 'Laboratorio Virtuale',
    PHASE_MEDIA: 'Sala Immersiva · Tresigallo',
    VIDEO: 'Video Sperimentale'
  });

  const ROOM_3D_BLANK_URL = 'about:blank';

  const ESS_SIGNAL_TYPE = Object.freeze({
    SWEEP: 'sweep',
    INVERSE: 'inverse',
    DELTA: 'delta'
  });

  const FFT_DIRECTION = Object.freeze({
    FORWARD: 1,
    INVERSE: -1
  });

  const ESS_CONFIG = Object.freeze({
    F1_HZ: 80,
    F2_HZ: 8000,
    DURATION_SEC: 1.25,
    FADE_SEC: 0.015,
    FALLBACK_SAMPLE_RATE: 48000,
    SWEEP_PLAYBACK_GAIN: 0.16,
    DELTA_PLAYBACK_GAIN: 0.24,
    DELTA_PLAYBACK_WINDOW_SEC: 0.28,
    DELTA_PEAK_OFFSET_SEC: 0.04,
    DELTA_VISUAL_HALF_WINDOW_SEC: 0.04,
    SIDELOBE_GUARD_SEC: 0.002,
    CANVAS_BG: '#030712'
  });

  const ESS_LABELS = Object.freeze({
    SWEEP_FORMULA: 'x(t) · Sweep 80 Hz → 8 kHz (1,25 s)',
    INVERSE_FORMULA: 'f(t) · Filtro inverso (−6 dB/ott)',
    DELTA_FORMULA: 'x(t) * f(t) = δ(t) · Impulso di Dirac',
    SWEEP_STATUS: 'Sweep esponenziale x(t): la frequenza cresce esponenzialmente nel tempo.',
    INVERSE_STATUS: 'Filtro inverso f(t): sweep invertito nel tempo con inviluppo −6 dB/ottava.',
    MUTED_SUFFIX: ' (audio silenziato)'
  });

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
    galleryCategory: GALLERY_CATEGORY.ALL,
    galleryLightboxOpen: false,
    lightboxSource: LIGHTBOX_SOURCE.GALLERY,
    lightboxPhaseIndex: 0,
    lightboxPhaseMediaIndex: 0,
    currentLightboxIndex: 0,
    activeMapCityId: CAMPAIGN_CITIES[0].id,
    room3dOpen: false,
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
  // SINTESI ACUSTICA (Web Audio API — Motore Armonico Morbido & Riverbero)
  // -------------------------------------------------------------------------
  const AUDIO_WAVEFORM = Object.freeze({
    SINE: 'sine',
    LOWPASS: 'lowpass'
  });

  const AUDIO_BUS_CONFIG = Object.freeze({
    MASTER_FILTER_HZ: 3200,
    MASTER_FILTER_Q: 0.5,
    COMP_THRESHOLD_DB: -16,
    COMP_KNEE_DB: 24,
    COMP_RATIO: 4,
    COMP_ATTACK_SEC: 0.02,
    COMP_RELEASE_SEC: 0.25,
    REVERB_DURATION_SEC: 1.6,
    REVERB_DECAY_RATE: 3.0,
    REVERB_DAMPING_HZ: 2400,
    DRY_MIX: 0.85,
    WET_MIX: 0.28,
    DEFAULT_VOICE_FREQ: 220.0,
    BACK_HOME_FREQ: 329.63,
    PORTAL_MEDIA_FREQ: 246.94
  });

  const VOICE_HARMONICS = Object.freeze({
    CHORUS_DETUNE_CENTS: 3.5,
    CHORUS_GAIN: 0.32,
    OCTAVE_RATIO: 2.0,
    OCTAVE_GAIN: 0.20,
    FIFTH_RATIO: 1.5,
    FIFTH_GAIN: 0.12
  });

  const VOICE_ENVELOPE = Object.freeze({
    GAIN_FLOOR: 0.0001,
    INTENSITY_CURVE_EXP: 1.6,
    ATTACK_TAU_SEC: 0.14,
    RELEASE_TAU_SEC: 0.24,
    FILTER_TAU_SEC: 0.18,
    SILENCE_FADE_SEC: 0.12,
    MUTE_FADE_SEC: 0.08,
    UNMUTE_FADE_SEC: 0.12
  });

  const CHIME_CONFIG = Object.freeze({
    ZOOM_PARTIALS: Object.freeze([
      Object.freeze({ ratio: 1.0, gain: 0.070 }),
      Object.freeze({ ratio: VOICE_HARMONICS.FIFTH_RATIO, gain: 0.035 }),
      Object.freeze({ ratio: VOICE_HARMONICS.OCTAVE_RATIO, gain: 0.025 })
    ]),
    ZOOM_FILTER_MULT: 3.2,
    ZOOM_FILTER_Q: 0.7,
    ZOOM_ATTACK_SEC: 0.09,
    ZOOM_DECAY_SEC: 0.95,
    ZOOM_STOP_SEC: 1.05,
    RETURN_CHORD_HZ: Object.freeze([440.00, 329.63, 277.18, 220.00]),
    RETURN_STAGGER_SEC: 0.09,
    RETURN_ATTACK_SEC: 0.07,
    RETURN_DECAY_SEC: 0.95,
    RETURN_STOP_SEC: 1.05,
    RETURN_PEAK_GAIN: 0.055,
    RETURN_FILTER_MULT: 3.2,
    STEP_BASE_HZ: 329.63,
    STEP_OVERTONE_HZ: 440.00,
    STEP_BASE_GAIN: 0.055,
    STEP_OVERTONE_GAIN: 0.020,
    STEP_FILTER_HZ: 1600,
    STEP_ATTACK_SEC: 0.045,
    STEP_DECAY_SEC: 0.48,
    STEP_STOP_SEC: 0.55,
    RIPPLE_FILTER_MULT: 3.5,
    RIPPLE_ATTACK_SEC: 0.06,
    RIPPLE_DECAY_SEC: 0.90,
    RIPPLE_STOP_SEC: 0.98,
    RIPPLE_PEAK_GAIN: 0.045,
    RIPPLE_OCTAVE_RATIO: 0.22
  });

  let audioCtx = null;
  let masterGainNode = null;
  let masterCompressorNode = null;
  let essDryGainNode = null;
  const audioNodes = {};

  function getAudioOutputNode() {
    return masterGainNode || audioCtx.destination;
  }

  function getEssDryOutputNode() {
    return essDryGainNode || masterCompressorNode || audioCtx.destination;
  }

  // Genera una risposta all'impulso stereo morbida per dare coda acustica naturale ai toni
  function createHarmonicReverbBuffer(ctx, durationSec, decayRate) {
    try {
      const sampleRate = ctx.sampleRate;
      const length = Math.max(1, Math.floor(sampleRate * durationSec));
      const impulse = ctx.createBuffer(2, length, sampleRate);
      const rcCoeff = 1 / (2 * Math.PI * AUDIO_BUS_CONFIG.REVERB_DAMPING_HZ);
      const dt = 1 / sampleRate;
      const alpha = dt / (rcCoeff + dt);

      for (let ch = 0; ch < 2; ch++) {
        const channelData = impulse.getChannelData(ch);
        let prevSample = 0;

        for (let i = 0; i < length; i++) {
          const progress = i / length;
          const fadeIn = Math.min(1, i / (sampleRate * 0.015));
          const env = fadeIn * Math.pow(1 - progress, decayRate);
          const white = Math.random() * 2 - 1;
          prevSample = prevSample + alpha * (white - prevSample);
          channelData[i] = prevSample * env;
        }
      }

      return impulse;
    } catch (e) {
      return null;
    }
  }

  function initAudioContext() {
    if (audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audioCtx = new AudioContext();

      // Bus master: somma segnale dry + riverbero morbido, filtro caldo e limiter dolce
      masterGainNode = audioCtx.createGain();
      const initialMaster = state.audioMuted ? VOICE_ENVELOPE.GAIN_FLOOR : activeStyle.audio.masterVolume;
      masterGainNode.gain.setValueAtTime(initialMaster, audioCtx.currentTime);

      const masterFilter = audioCtx.createBiquadFilter();
      masterFilter.type = AUDIO_WAVEFORM.LOWPASS;
      masterFilter.frequency.setValueAtTime(AUDIO_BUS_CONFIG.MASTER_FILTER_HZ, audioCtx.currentTime);
      masterFilter.Q.setValueAtTime(AUDIO_BUS_CONFIG.MASTER_FILTER_Q, audioCtx.currentTime);

      const compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(AUDIO_BUS_CONFIG.COMP_THRESHOLD_DB, audioCtx.currentTime);
      compressor.knee.setValueAtTime(AUDIO_BUS_CONFIG.COMP_KNEE_DB, audioCtx.currentTime);
      compressor.ratio.setValueAtTime(AUDIO_BUS_CONFIG.COMP_RATIO, audioCtx.currentTime);
      compressor.attack.setValueAtTime(AUDIO_BUS_CONFIG.COMP_ATTACK_SEC, audioCtx.currentTime);
      compressor.release.setValueAtTime(AUDIO_BUS_CONFIG.COMP_RELEASE_SEC, audioCtx.currentTime);

      const dryGain = audioCtx.createGain();
      dryGain.gain.setValueAtTime(AUDIO_BUS_CONFIG.DRY_MIX, audioCtx.currentTime);
      masterGainNode.connect(dryGain);
      dryGain.connect(masterFilter);

      const reverbBuffer = createHarmonicReverbBuffer(
        audioCtx,
        AUDIO_BUS_CONFIG.REVERB_DURATION_SEC,
        AUDIO_BUS_CONFIG.REVERB_DECAY_RATE
      );
      if (reverbBuffer) {
        const convolver = audioCtx.createConvolver();
        convolver.buffer = reverbBuffer;
        const wetGain = audioCtx.createGain();
        wetGain.gain.setValueAtTime(AUDIO_BUS_CONFIG.WET_MIX, audioCtx.currentTime);
        masterGainNode.connect(convolver);
        convolver.connect(wetGain);
        wetGain.connect(masterFilter);
      }

      masterCompressorNode = compressor;
      masterFilter.connect(compressor);
      compressor.connect(audioCtx.destination);

      // Ramo dry per segnali di laboratorio ESS senza riverbero artificiale
      essDryGainNode = audioCtx.createGain();
      essDryGainNode.gain.setValueAtTime(initialMaster, audioCtx.currentTime);
      essDryGainNode.connect(compressor);

      CIRCLES_REGISTRY.forEach(function (c) {
        const freq = activeStyle.audio.frequencies[c.id] || AUDIO_BUS_CONFIG.DEFAULT_VOICE_FREQ;
        createAudioVoice(c.id, freq);
      });

      // Voci audio dedicate per il pulsante rotante "Torna alla Home" e l'immagine circolare
      createAudioVoice('back-home', AUDIO_BUS_CONFIG.BACK_HOME_FREQ);
      createAudioVoice('portal-media', AUDIO_BUS_CONFIG.PORTAL_MEDIA_FREQ);

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
      const now = audioCtx.currentTime;
      const filter = audioCtx.createBiquadFilter();
      filter.type = AUDIO_WAVEFORM.LOWPASS;
      filter.frequency.setValueAtTime(activeStyle.audio.baseFilterCutoff, now);
      filter.Q.setValueAtTime(activeStyle.audio.filterQ, now);

      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(VOICE_ENVELOPE.GAIN_FLOOR, now);

      // Tre parziali sinusoidali pure: fondamentale, coro caldo e ottava soffice
      const partials = [
        { freq: freq, detune: 0, level: 1.0 },
        { freq: freq, detune: VOICE_HARMONICS.CHORUS_DETUNE_CENTS, level: VOICE_HARMONICS.CHORUS_GAIN },
        { freq: freq * VOICE_HARMONICS.OCTAVE_RATIO, detune: 0, level: VOICE_HARMONICS.OCTAVE_GAIN }
      ];
      const oscillators = [];

      partials.forEach(function (spec) {
        const osc = audioCtx.createOscillator();
        osc.type = AUDIO_WAVEFORM.SINE;
        osc.frequency.setValueAtTime(spec.freq, now);
        if (spec.detune !== 0) {
          osc.detune.setValueAtTime(spec.detune, now);
        }

        const subGain = audioCtx.createGain();
        subGain.gain.setValueAtTime(spec.level, now);

        osc.connect(subGain);
        subGain.connect(filter);
        osc.start(now);
        oscillators.push(osc);
      });

      filter.connect(gainNode);
      gainNode.connect(getAudioOutputNode());

      const voiceObj = {
        osc1: oscillators[0],
        osc2: oscillators[2],
        oscillators: oscillators,
        filter: filter,
        gain: gainNode,
        baseFreq: freq,
        currentGain: VOICE_ENVELOPE.GAIN_FLOOR
      };

      audioNodes[id] = voiceObj;
      return voiceObj;
    } catch (e) {
      return null;
    }
  }

  // Modula volume e filtro di una voce con attacco fluido e rilascio piu lungo
  function modulateHarmonicVoice(voice, intensity) {
    if (!audioCtx || !voice || !voice.gain || !voice.filter) return;

    const now = audioCtx.currentTime;
    const clamped = Math.max(0, Math.min(1.0, intensity));
    const targetVol = Math.max(
      VOICE_ENVELOPE.GAIN_FLOOR,
      Math.pow(clamped, VOICE_ENVELOPE.INTENSITY_CURVE_EXP) * activeStyle.audio.maxVoiceGain
    );
    const targetCutoff = activeStyle.audio.baseFilterCutoff + clamped * activeStyle.audio.filterModulationRange;
    const tau = targetVol >= (voice.currentGain || VOICE_ENVELOPE.GAIN_FLOOR)
      ? VOICE_ENVELOPE.ATTACK_TAU_SEC
      : VOICE_ENVELOPE.RELEASE_TAU_SEC;

    voice.currentGain = targetVol;
    voice.gain.gain.setTargetAtTime(targetVol, now, tau);
    voice.filter.frequency.setTargetAtTime(targetCutoff, now, VOICE_ENVELOPE.FILTER_TAU_SEC);
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
    const ramp = fadeSec || VOICE_ENVELOPE.SILENCE_FADE_SEC;

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
          audioNodes[c.id].currentGain = VOICE_ENVELOPE.GAIN_FLOOR;
          audioNodes[c.id].gain.gain.cancelScheduledValues(time);
          audioNodes[c.id].gain.gain.setTargetAtTime(VOICE_ENVELOPE.GAIN_FLOOR, time, ramp);
        } catch (e) {}
      }
    });

    if (audioNodes['back-home'] && audioNodes['back-home'].gain) {
      try {
        audioNodes['back-home'].currentGain = VOICE_ENVELOPE.GAIN_FLOOR;
        audioNodes['back-home'].gain.gain.cancelScheduledValues(time);
        audioNodes['back-home'].gain.gain.setTargetAtTime(VOICE_ENVELOPE.GAIN_FLOOR, time, ramp);
      } catch (e) {}
    }

    if (audioNodes['portal-media'] && audioNodes['portal-media'].gain) {
      try {
        audioNodes['portal-media'].currentGain = VOICE_ENVELOPE.GAIN_FLOOR;
        audioNodes['portal-media'].gain.gain.cancelScheduledValues(time);
        audioNodes['portal-media'].gain.gain.setTargetAtTime(VOICE_ENVELOPE.GAIN_FLOOR, time, ramp);
      } catch (e) {}
    }
  }

  // Crea una nota sinusoidale filtrata con inviluppo privo di scatti
  function triggerSoftFilteredNote(freq, peakGain, attackSec, decaySec, stopSec, filterHz, delaySec) {
    const startAt = audioCtx.currentTime + (delaySec || 0);
    const osc = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();

    osc.type = AUDIO_WAVEFORM.SINE;
    osc.frequency.setValueAtTime(freq, startAt);

    filter.type = AUDIO_WAVEFORM.LOWPASS;
    filter.frequency.setValueAtTime(filterHz, startAt);
    filter.Q.setValueAtTime(CHIME_CONFIG.ZOOM_FILTER_Q, startAt);

    gain.gain.setValueAtTime(VOICE_ENVELOPE.GAIN_FLOOR, startAt);
    gain.gain.exponentialRampToValueAtTime(peakGain, startAt + attackSec);
    gain.gain.exponentialRampToValueAtTime(VOICE_ENVELOPE.GAIN_FLOOR, startAt + decaySec);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(getAudioOutputNode());

    osc.start(startAt);
    osc.stop(startAt + stopSec);
  }

  // -------------------------------------------------------------------------
  // SINTESI EFFETTI SONORI TRANSIZIONI (TRIADE MORBIDA, RITORNO, FASI)
  // -------------------------------------------------------------------------
  function playZoomInChime(baseFreq) {
    if (!audioCtx || state.audioMuted) return;
    try {
      const freq = baseFreq || AUDIO_BUS_CONFIG.DEFAULT_VOICE_FREQ;
      const filterHz = freq * CHIME_CONFIG.ZOOM_FILTER_MULT;

      CHIME_CONFIG.ZOOM_PARTIALS.forEach(function (partial) {
        triggerSoftFilteredNote(
          freq * partial.ratio,
          partial.gain,
          CHIME_CONFIG.ZOOM_ATTACK_SEC,
          CHIME_CONFIG.ZOOM_DECAY_SEC,
          CHIME_CONFIG.ZOOM_STOP_SEC,
          filterHz,
          0
        );
      });
    } catch (e) {
      // Ignora errori di contesto non inizializzato
    }
  }

  function playReturnChime() {
    if (!audioCtx || state.audioMuted) return;
    try {
      CHIME_CONFIG.RETURN_CHORD_HZ.forEach(function (freq, i) {
        triggerSoftFilteredNote(
          freq,
          CHIME_CONFIG.RETURN_PEAK_GAIN,
          CHIME_CONFIG.RETURN_ATTACK_SEC,
          CHIME_CONFIG.RETURN_DECAY_SEC,
          CHIME_CONFIG.RETURN_STOP_SEC,
          freq * CHIME_CONFIG.RETURN_FILTER_MULT,
          i * CHIME_CONFIG.RETURN_STAGGER_SEC
        );
      });
    } catch (e) {
      // Ignora errori
    }
  }

  function playPhaseStepSound() {
    if (!audioCtx || state.audioMuted) return;
    try {
      triggerSoftFilteredNote(
        CHIME_CONFIG.STEP_BASE_HZ,
        CHIME_CONFIG.STEP_BASE_GAIN,
        CHIME_CONFIG.STEP_ATTACK_SEC,
        CHIME_CONFIG.STEP_DECAY_SEC,
        CHIME_CONFIG.STEP_STOP_SEC,
        CHIME_CONFIG.STEP_FILTER_HZ,
        0
      );
      triggerSoftFilteredNote(
        CHIME_CONFIG.STEP_OVERTONE_HZ,
        CHIME_CONFIG.STEP_OVERTONE_GAIN,
        CHIME_CONFIG.STEP_ATTACK_SEC,
        CHIME_CONFIG.STEP_DECAY_SEC,
        CHIME_CONFIG.STEP_STOP_SEC,
        CHIME_CONFIG.STEP_FILTER_HZ,
        0
      );
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
      const filterHz = freq * CHIME_CONFIG.RIPPLE_FILTER_MULT;
      triggerSoftFilteredNote(
        freq,
        CHIME_CONFIG.RIPPLE_PEAK_GAIN,
        CHIME_CONFIG.RIPPLE_ATTACK_SEC,
        CHIME_CONFIG.RIPPLE_DECAY_SEC,
        CHIME_CONFIG.RIPPLE_STOP_SEC,
        filterHz,
        0
      );
      triggerSoftFilteredNote(
        freq * VOICE_HARMONICS.OCTAVE_RATIO,
        CHIME_CONFIG.RIPPLE_PEAK_GAIN * CHIME_CONFIG.RIPPLE_OCTAVE_RATIO,
        CHIME_CONFIG.RIPPLE_ATTACK_SEC,
        CHIME_CONFIG.RIPPLE_DECAY_SEC,
        CHIME_CONFIG.RIPPLE_STOP_SEC,
        filterHz,
        0
      );
    } catch (e) {
      // Ignora errori
    }
  }

  // -------------------------------------------------------------------------
  // LABORATORIO INTERATTIVO ESS (Farina 2000: Sweep, Filtro Inverso, FFT)
  // -------------------------------------------------------------------------
  const essDemoState = {
    activeSignal: ESS_SIGNAL_TYPE.SWEEP,
    activeSource: null,
    playheadRafId: null,
    cache: new Map()
  };

  function nextPowerOfTwo(n) {
    let size = 1;
    while (size < n) size <<= 1;
    return size;
  }

  // FFT iterativa Radix-2 Cooley-Tukey (direction = FFT_DIRECTION.FORWARD | INVERSE)
  function fftRadix2(re, im, direction) {
    const n = re.length;
    let j = 0;

    for (let i = 1; i < n; i++) {
      let bit = n >> 1;
      while (j & bit) {
        j ^= bit;
        bit >>= 1;
      }
      j ^= bit;

      if (i < j) {
        const tmpRe = re[i];
        re[i] = re[j];
        re[j] = tmpRe;

        const tmpIm = im[i];
        im[i] = im[j];
        im[j] = tmpIm;
      }
    }

    const sign = direction === FFT_DIRECTION.INVERSE ? 1 : -1;

    for (let len = 2; len <= n; len <<= 1) {
      const halfLen = len >> 1;
      const angleStep = sign * ((2 * Math.PI) / len);
      const wStepRe = Math.cos(angleStep);
      const wStepIm = Math.sin(angleStep);

      for (let start = 0; start < n; start += len) {
        let wRe = 1;
        let wIm = 0;

        for (let k = 0; k < halfLen; k++) {
          const evenIdx = start + k;
          const oddIdx = evenIdx + halfLen;
          const tRe = wRe * re[oddIdx] - wIm * im[oddIdx];
          const tIm = wRe * im[oddIdx] + wIm * re[oddIdx];

          re[oddIdx] = re[evenIdx] - tRe;
          im[oddIdx] = im[evenIdx] - tIm;
          re[evenIdx] += tRe;
          im[evenIdx] += tIm;

          const nextWRe = wRe * wStepRe - wIm * wStepIm;
          wIm = wRe * wStepIm + wIm * wStepRe;
          wRe = nextWRe;
        }
      }
    }

    if (direction === FFT_DIRECTION.INVERSE) {
      const invN = 1 / n;
      for (let i = 0; i < n; i++) {
        re[i] *= invN;
        im[i] *= invN;
      }
    }
  }

  // Esegue convoluzione lineare reale a * b nel dominio della frequenza tramite FFT
  function convolveViaFft(sigA, sigB) {
    const outLen = sigA.length + sigB.length - 1;
    const fftSize = nextPowerOfTwo(outLen);

    const aRe = new Float64Array(fftSize);
    const aIm = new Float64Array(fftSize);
    const bRe = new Float64Array(fftSize);
    const bIm = new Float64Array(fftSize);

    aRe.set(sigA);
    bRe.set(sigB);

    fftRadix2(aRe, aIm, FFT_DIRECTION.FORWARD);
    fftRadix2(bRe, bIm, FFT_DIRECTION.FORWARD);

    for (let i = 0; i < fftSize; i++) {
      const prodRe = aRe[i] * bRe[i] - aIm[i] * bIm[i];
      const prodIm = aRe[i] * bIm[i] + aIm[i] * bRe[i];
      aRe[i] = prodRe;
      aIm[i] = prodIm;
    }

    fftRadix2(aRe, aIm, FFT_DIRECTION.INVERSE);

    const result = new Float32Array(outLen);
    let maxAbs = 0;
    let peakIndex = 0;

    for (let i = 0; i < outLen; i++) {
      const val = aRe[i];
      result[i] = val;
      const absVal = Math.abs(val);
      if (absVal > maxAbs) {
        maxAbs = absVal;
        peakIndex = i;
      }
    }

    if (maxAbs > 0) {
      const invMax = 1 / maxAbs;
      for (let i = 0; i < outLen; i++) {
        result[i] *= invMax;
      }
    }

    return { samples: result, peakIndex: peakIndex };
  }

  // Sintetizza sweep ESS x(t), filtro inverso f(t) a -6 dB/ott e convoluzione δ(t)
  function generateEssBuffers(sampleRate) {
    if (essDemoState.cache.has(sampleRate)) {
      return essDemoState.cache.get(sampleRate);
    }

    const numSamples = Math.round(sampleRate * ESS_CONFIG.DURATION_SEC);
    const fadeSamples = Math.min(Math.floor(numSamples / 4), Math.round(sampleRate * ESS_CONFIG.FADE_SEC));
    const lnRatio = Math.log(ESS_CONFIG.F2_HZ / ESS_CONFIG.F1_HZ);
    const k = (2 * Math.PI * ESS_CONFIG.F1_HZ * ESS_CONFIG.DURATION_SEC) / lnRatio;

    const sweep = new Float32Array(numSamples);
    const rawInverse = new Float32Array(numSamples);
    const inverseDisplay = new Float32Array(numSamples);

    for (let n = 0; n < numSamples; n++) {
      const tNorm = n / (numSamples - 1);
      let win = 1;
      if (n < fadeSamples) {
        win = 0.5 * (1 - Math.cos((Math.PI * n) / fadeSamples));
      } else if (n >= numSamples - fadeSamples) {
        const rem = numSamples - 1 - n;
        win = 0.5 * (1 - Math.cos((Math.PI * rem) / fadeSamples));
      }

      const phase = k * (Math.exp(tNorm * lnRatio) - 1);
      sweep[n] = win * Math.sin(phase);
    }

    // Filtro inverso: sweep invertito nel tempo con attenuazione -6 dB/ottava (Farina 2000)
    let invPeak = 0;
    for (let n = 0; n < numSamples; n++) {
      const revVal = sweep[numSamples - 1 - n];
      const decayWeight = Math.exp(-(n / (numSamples - 1)) * lnRatio);
      const val = revVal * decayWeight;
      rawInverse[n] = val;
      const absVal = Math.abs(val);
      if (absVal > invPeak) invPeak = absVal;
    }

    if (invPeak > 0) {
      const invScale = 1 / invPeak;
      for (let n = 0; n < numSamples; n++) {
        inverseDisplay[n] = rawInverse[n] * invScale;
      }
    }

    const conv = convolveViaFft(sweep, rawInverse);
    const guardHalfSamples = Math.round(sampleRate * ESS_CONFIG.SIDELOBE_GUARD_SEC);
    let sidelobeSqSum = 0;
    let sidelobeCount = 0;

    for (let i = 0; i < conv.samples.length; i++) {
      if (Math.abs(i - conv.peakIndex) <= guardHalfSamples) continue;
      sidelobeSqSum += conv.samples[i] * conv.samples[i];
      sidelobeCount++;
    }

    const sidelobeRms = sidelobeCount > 0 ? Math.sqrt(sidelobeSqSum / sidelobeCount) : 1e-6;
    const snrDb = 20 * Math.log10(1 / Math.max(1e-6, sidelobeRms));

    // Finestra visiva centrata sul picco per mostrare nitidamente l'impulso di Dirac
    const visHalf = Math.round(sampleRate * ESS_CONFIG.DELTA_VISUAL_HALF_WINDOW_SEC);
    const visStart = Math.max(0, conv.peakIndex - visHalf);
    const visEnd = Math.min(conv.samples.length, conv.peakIndex + visHalf + 1);
    const deltaVisual = conv.samples.slice(visStart, visEnd);

    // Finestra audio breve attorno all'impulso per riprodurre uno scatto secco e fedele
    const playLen = Math.round(sampleRate * ESS_CONFIG.DELTA_PLAYBACK_WINDOW_SEC);
    const playOffset = Math.round(sampleRate * ESS_CONFIG.DELTA_PEAK_OFFSET_SEC);
    const deltaAudio = new Float32Array(playLen);
    const srcStart = conv.peakIndex - playOffset;

    for (let i = 0; i < playLen; i++) {
      const srcIdx = srcStart + i;
      if (srcIdx >= 0 && srcIdx < conv.samples.length) {
        deltaAudio[i] = conv.samples[srcIdx];
      }
    }

    const bundle = {
      sampleRate: sampleRate,
      sweep: sweep,
      inverse: inverseDisplay,
      deltaVisual: deltaVisual,
      deltaAudio: deltaAudio,
      deltaPeak: Math.abs(conv.samples[conv.peakIndex]),
      snrDb: snrDb
    };

    essDemoState.cache.set(sampleRate, bundle);
    return bundle;
  }

  function stopEssDemoPlayback() {
    if (essDemoState.playheadRafId) {
      cancelAnimationFrame(essDemoState.playheadRafId);
      essDemoState.playheadRafId = null;
    }

    if (essDemoState.activeSource) {
      try {
        essDemoState.activeSource.stop();
        essDemoState.activeSource.disconnect();
      } catch (e) {}
      essDemoState.activeSource = null;
    }
  }

  // Disegna forma d'onda min/max ad alta nitidezza HiDPI sul canvas del widget ESS
  function drawEssWaveform(signalType, samples, playProgress) {
    const canvas = document.getElementById('essWaveCanvas');
    if (!canvas || !samples || samples.length === 0) return;

    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssWidth = canvas.clientWidth || 480;
    const cssHeight = canvas.clientHeight || 86;
    const targetW = Math.max(1, Math.round(cssWidth * dpr));
    const targetH = Math.max(1, Math.round(cssHeight * dpr));

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx2d.save();
    ctx2d.scale(dpr, dpr);

    ctx2d.fillStyle = ESS_CONFIG.CANVAS_BG;
    ctx2d.fillRect(0, 0, cssWidth, cssHeight);

    const midY = cssHeight / 2;

    // Griglia discreta di riferimento
    ctx2d.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx2d.lineWidth = 1;
    ctx2d.beginPath();
    ctx2d.moveTo(0, midY);
    ctx2d.lineTo(cssWidth, midY);
    ctx2d.stroke();

    const grad = ctx2d.createLinearGradient(0, 0, cssWidth, 0);
    if (signalType === ESS_SIGNAL_TYPE.DELTA) {
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.5, '#fbbf24');
      grad.addColorStop(1, '#38bdf8');
    } else if (signalType === ESS_SIGNAL_TYPE.INVERSE) {
      grad.addColorStop(0, '#fbbf24');
      grad.addColorStop(0.45, '#22d3ee');
      grad.addColorStop(1, '#38bdf8');
    } else {
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.6, '#22d3ee');
      grad.addColorStop(1, '#f59e0b');
    }

    ctx2d.strokeStyle = grad;
    ctx2d.lineWidth = signalType === ESS_SIGNAL_TYPE.DELTA ? 1.8 : 1.3;
    ctx2d.beginPath();

    const ampScale = cssHeight * 0.42;
    const step = samples.length / cssWidth;

    for (let x = 0; x < cssWidth; x++) {
      const startIdx = Math.floor(x * step);
      const endIdx = Math.min(samples.length, Math.max(startIdx + 1, Math.floor((x + 1) * step)));
      let minVal = 1;
      let maxVal = -1;

      for (let i = startIdx; i < endIdx; i++) {
        const v = samples[i];
        if (v < minVal) minVal = v;
        if (v > maxVal) maxVal = v;
      }

      const yTop = midY - maxVal * ampScale;
      const yBot = midY - minVal * ampScale;
      ctx2d.moveTo(x + 0.5, yTop);
      ctx2d.lineTo(x + 0.5, Math.max(yTop + 1, yBot));
    }
    ctx2d.stroke();

    if (typeof playProgress === 'number' && playProgress >= 0 && playProgress <= 1) {
      const px = playProgress * cssWidth;
      ctx2d.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx2d.lineWidth = 1.5;
      ctx2d.beginPath();
      ctx2d.moveTo(px, 0);
      ctx2d.lineTo(px, cssHeight);
      ctx2d.stroke();
    }

    ctx2d.restore();
  }

  function updateEssWidgetUi(signalType, bundle) {
    const widget = document.getElementById('essDemoWidget');
    const formulaEl = document.getElementById('essSignalFormula');
    const statusEl = document.getElementById('essDemoStatus');
    const btnSweep = document.getElementById('btnEssPlaySweep');
    const btnInv = document.getElementById('btnEssPlayInverse');
    const btnConv = document.getElementById('btnEssConvolve');

    if (widget) {
      widget.classList.toggle('is-delta', signalType === ESS_SIGNAL_TYPE.DELTA);
      widget.setAttribute('data-ess-mode', signalType);
      if (signalType === ESS_SIGNAL_TYPE.DELTA) {
        widget.setAttribute('data-delta-peak', bundle.deltaPeak.toFixed(2));
        widget.setAttribute('data-delta-snr', bundle.snrDb.toFixed(1));
      }
    }

    if (btnSweep) btnSweep.classList.toggle('active', signalType === ESS_SIGNAL_TYPE.SWEEP);
    if (btnInv) btnInv.classList.toggle('active', signalType === ESS_SIGNAL_TYPE.INVERSE);
    if (btnConv) btnConv.classList.toggle('active', signalType === ESS_SIGNAL_TYPE.DELTA);

    const mutedSuffix = state.audioMuted ? ESS_LABELS.MUTED_SUFFIX : '';

    if (signalType === ESS_SIGNAL_TYPE.DELTA) {
      if (formulaEl) formulaEl.textContent = ESS_LABELS.DELTA_FORMULA;
      if (statusEl) {
        statusEl.textContent = `Convoluzione FFT completata: picco δ(t) = ${bundle.deltaPeak.toFixed(2)}, SNR ≈ ${bundle.snrDb.toFixed(1)} dB${mutedSuffix}.`;
      }
      return;
    }

    if (signalType === ESS_SIGNAL_TYPE.INVERSE) {
      if (formulaEl) formulaEl.textContent = ESS_LABELS.INVERSE_FORMULA;
      if (statusEl) statusEl.textContent = ESS_LABELS.INVERSE_STATUS + mutedSuffix;
      return;
    }

    if (formulaEl) formulaEl.textContent = ESS_LABELS.SWEEP_FORMULA;
    if (statusEl) statusEl.textContent = ESS_LABELS.SWEEP_STATUS + mutedSuffix;
  }

  function playEssAudioBuffer(signalType, audioSamples, visualSamples, sampleRate) {
    if (state.audioMuted || !audioCtx || audioCtx.state !== 'running') {
      drawEssWaveform(signalType, visualSamples, -1);
      return;
    }

    const buffer = audioCtx.createBuffer(1, audioSamples.length, sampleRate);
    buffer.copyToChannel(audioSamples, 0);

    const src = audioCtx.createBufferSource();
    src.buffer = buffer;

    const gain = audioCtx.createGain();
    const level = signalType === ESS_SIGNAL_TYPE.DELTA
      ? ESS_CONFIG.DELTA_PLAYBACK_GAIN
      : ESS_CONFIG.SWEEP_PLAYBACK_GAIN;
    gain.gain.setValueAtTime(level, audioCtx.currentTime);

    src.connect(gain);
    gain.connect(getEssDryOutputNode());

    const durationMs = (audioSamples.length / sampleRate) * 1000;
    const startedAt = performance.now();
    essDemoState.activeSource = src;

    src.onended = function () {
      if (essDemoState.activeSource === src) {
        essDemoState.activeSource = null;
      }
      if (essDemoState.playheadRafId) {
        cancelAnimationFrame(essDemoState.playheadRafId);
        essDemoState.playheadRafId = null;
      }
      drawEssWaveform(signalType, visualSamples, -1);
    };

    src.start();

    function stepPlayhead() {
      const elapsed = performance.now() - startedAt;
      const progress = Math.min(1, elapsed / Math.max(1, durationMs));
      drawEssWaveform(signalType, visualSamples, progress);

      if (progress < 1 && essDemoState.activeSource === src) {
        essDemoState.playheadRafId = requestAnimationFrame(stepPlayhead);
      }
    }

    essDemoState.playheadRafId = requestAnimationFrame(stepPlayhead);
  }

  function triggerEssAction(signalType) {
    ensureAudioUnlocked();
    stopEssDemoPlayback();

    const sampleRate = audioCtx ? audioCtx.sampleRate : ESS_CONFIG.FALLBACK_SAMPLE_RATE;
    const bundle = generateEssBuffers(sampleRate);
    essDemoState.activeSignal = signalType;

    let visualSamples = bundle.sweep;
    let audioSamples = bundle.sweep;

    if (signalType === ESS_SIGNAL_TYPE.INVERSE) {
      visualSamples = bundle.inverse;
      audioSamples = bundle.inverse;
    } else if (signalType === ESS_SIGNAL_TYPE.DELTA) {
      visualSamples = bundle.deltaVisual;
      audioSamples = bundle.deltaAudio;
    }

    updateEssWidgetUi(signalType, bundle);
    drawEssWaveform(signalType, visualSamples, -1);

    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().then(function () {
        if (audioCtx.state === 'running' && essDemoState.activeSignal === signalType) {
          playEssAudioBuffer(signalType, audioSamples, visualSamples, sampleRate);
        }
      }).catch(function () {});
      return;
    }

    playEssAudioBuffer(signalType, audioSamples, visualSamples, sampleRate);
  }

  function syncEssWidgetVisibility(phaseData) {
    const widget = document.getElementById('essDemoWidget');
    const bodyElem = document.getElementById('portalBodyText');
    const showEss = Boolean(phaseData && phaseData.hasEssDemo);

    if (bodyElem) {
      bodyElem.classList.toggle('has-ess-demo', showEss);
    }

    if (!widget) return;

    widget.style.display = showEss ? 'flex' : 'none';
    if (!showEss) return;

    const sampleRate = audioCtx ? audioCtx.sampleRate : ESS_CONFIG.FALLBACK_SAMPLE_RATE;
    const bundle = generateEssBuffers(sampleRate);
    essDemoState.activeSignal = ESS_SIGNAL_TYPE.SWEEP;
    updateEssWidgetUi(ESS_SIGNAL_TYPE.SWEEP, bundle);

    requestAnimationFrame(function () {
      drawEssWaveform(ESS_SIGNAL_TYPE.SWEEP, bundle.sweep, -1);
    });
  }

  // -------------------------------------------------------------------------
  // ESPLORATORE INTERATTIVO ARMONICHE SFERICHE HOA / AMBIX (FASE 3)
  // Visualizza le 16 armoniche reali SN3D (ACN 0-15) e la sintesi direzionale
  // -------------------------------------------------------------------------
  const SH_MODE = Object.freeze({
    BASIS: 'basis',
    SYNTHESIS: 'synthesis'
  });

  const SH_ANIM_STATE = Object.freeze({
    STOPPED: 'stopped',
    RUNNING: 'running'
  });

  const SH_AXIS_STYLE = Object.freeze({
    REFERENCE: 'reference',
    TARGET: 'target'
  });

  const SH_MAX_ORDER = 3;
  const SH_CHANNELS_TOTAL = 16;

  const SH_CONFIG = Object.freeze({
    GRID_THETA_STEPS: 22,
    GRID_PHI_STEPS: 40,
    DEFAULT_ACN: 7,
    DEFAULT_ORDER: 3,
    DEFAULT_AZIMUTH_DEG: 0,
    DEFAULT_ELEVATION_DEG: 20,
    DEFAULT_YAW_RAD: 0.72,
    DEFAULT_PITCH_RAD: 0.36,
    MIN_PITCH_RAD: -1.35,
    MAX_PITCH_RAD: 1.35,
    AUTO_SPIN_RAD_PER_SEC: 0.32,
    DRAG_SENSITIVITY: 0.0085,
    BALLOON_RADIUS_FRACTION: 0.38,
    SYNTH_RADIUS_FRACTION: 0.42,
    AXIS_LENGTH_SCALE: 1.18,
    TARGET_LENGTH_SCALE: 1.26,
    CAMERA_FOV: 3.2,
    CAMERA_DEPTH_FACTOR: 0.42,
    QUAD_MIN_RADIUS: 0.003,
    CANVAS_MIN_WIDTH: 260,
    CANVAS_DEFAULT_HEIGHT: 210,
    TWO_PI: Math.PI * 2,
    DEG_TO_RAD: Math.PI / 180,
    REDUCED_MOTION_QUERY: '(prefers-reduced-motion: reduce)'
  });

  const SH_HARMONICS = Object.freeze([
    Object.freeze({ acn: 0, order: 0, degree: 0, letter: 'W', label: 'Y₀⁰', formula: 'Y₀⁰ = 1', desc: 'Ordine 0 · Componente omnidirezionale: cattura la pressione acustica totale da tutte le direzioni.' }),
    Object.freeze({ acn: 1, order: 1, degree: -1, letter: 'Y', label: 'Y₁⁻¹', formula: 'Y₁⁻¹ = sen(φ)·cos(θ) = y', desc: 'Ordine 1 · Dipolo laterale Sinistra–Destra lungo l\'asse Y.' }),
    Object.freeze({ acn: 2, order: 1, degree: 0, letter: 'Z', label: 'Y₁⁰', formula: 'Y₁⁰ = sen(θ) = z', desc: 'Ordine 1 · Dipolo verticale Alto–Basso lungo l\'asse Z (elevazione).' }),
    Object.freeze({ acn: 3, order: 1, degree: 1, letter: 'X', label: 'Y₁⁺¹', formula: 'Y₁⁺¹ = cos(φ)·cos(θ) = x', desc: 'Ordine 1 · Dipolo frontale Avanti–Dietro lungo l\'asse X.' }),
    Object.freeze({ acn: 4, order: 2, degree: -2, letter: 'V', label: 'Y₂⁻²', formula: 'Y₂⁻² = (√3 / 2)·cos²(θ)·sen(2φ)', desc: 'Ordine 2 · Quadrifoglio sul piano orizzontale XY a 45° dagli assi.' }),
    Object.freeze({ acn: 5, order: 2, degree: -1, letter: 'T', label: 'Y₂⁻¹', formula: 'Y₂⁻¹ = √3·sen(θ)·cos(θ)·sen(φ)', desc: 'Ordine 2 · Lobi inclinati sul piano verticale laterale YZ.' }),
    Object.freeze({ acn: 6, order: 2, degree: 0, letter: 'R', label: 'Y₂⁰', formula: 'Y₂⁰ = ½·(3·sen²(θ) − 1)', desc: 'Ordine 2 · Armonica zonale a doppia polarità (lobi ai poli Z e anello equatoriale).' }),
    Object.freeze({ acn: 7, order: 2, degree: 1, letter: 'S', label: 'Y₂⁺¹', formula: 'Y₂⁺¹ = √3·sen(θ)·cos(θ)·cos(φ)', desc: 'Ordine 2 · Lobi inclinati sul piano verticale frontale XZ.' }),
    Object.freeze({ acn: 8, order: 2, degree: 2, letter: 'U', label: 'Y₂⁺²', formula: 'Y₂⁺² = (√3 / 2)·cos²(θ)·cos(2φ)', desc: 'Ordine 2 · Quadrifoglio allineato lungo gli assi orizzontali X e Y.' }),
    Object.freeze({ acn: 9, order: 3, degree: -3, letter: 'Q', label: 'Y₃⁻³', formula: 'Y₃⁻³ = √(5/8)·cos³(θ)·sen(3φ)', desc: 'Ordine 3 · Esapolo azimutale sul piano orizzontale (6 lobi alternati).' }),
    Object.freeze({ acn: 10, order: 3, degree: -2, letter: 'O', label: 'Y₃⁻²', formula: 'Y₃⁻² = (√15 / 2)·sen(θ)·cos²(θ)·sen(2φ)', desc: 'Ordine 3 · Otto lobi tridimensionali ruotati tra i piani diagonali e l\'elevazione.' }),
    Object.freeze({ acn: 11, order: 3, degree: -1, letter: 'M', label: 'Y₃⁻¹', formula: 'Y₃⁻¹ = √(3/8)·cos(θ)·(5·sen²(θ) − 1)·sen(φ)', desc: 'Ordine 3 · Struttura tesseralizzata lungo Y con fascia intermedia opposta.' }),
    Object.freeze({ acn: 12, order: 3, degree: 0, letter: 'K', label: 'Y₃⁰', formula: 'Y₃⁰ = ½·sen(θ)·(5·sen²(θ) − 3)', desc: 'Ordine 3 · Armonica zonale a tre bande verticali lungo l\'asse Z.' }),
    Object.freeze({ acn: 13, order: 3, degree: 1, letter: 'L', label: 'Y₃⁺¹', formula: 'Y₃⁺¹ = √(3/8)·cos(θ)·(5·sen²(θ) − 1)·cos(φ)', desc: 'Ordine 3 · Struttura tesseralizzata lungo X per affinare la provenienza frontale.' }),
    Object.freeze({ acn: 14, order: 3, degree: 2, letter: 'N', label: 'Y₃⁺²', formula: 'Y₃⁺² = (√15 / 2)·sen(θ)·cos²(θ)·cos(2φ)', desc: 'Ordine 3 · Otto lobi tridimensionali simmetrici attorno agli assi X e Y.' }),
    Object.freeze({ acn: 15, order: 3, degree: 3, letter: 'P', label: 'Y₃⁺³', formula: 'Y₃⁺³ = √(5/8)·cos³(θ)·cos(3φ)', desc: 'Ordine 3 · Esapolo azimutale con lobo principale lungo l\'asse X.' })
  ]);

  const SH_ORDER_SPECS = Object.freeze([
    Object.freeze({ order: 0, channels: 1, label: 'O0 · 1 ch', desc: 'Ordine 0 (1 canale): pattern omnidirezionale privo di selettività spaziale.' }),
    Object.freeze({ order: 1, channels: 4, label: 'O1 · 4 ch', desc: 'Ordine 1 (4 canali): pattern cardioide ampio per localizzazione iniziale.' }),
    Object.freeze({ order: 2, channels: 9, label: 'O2 · 9 ch', desc: 'Ordine 2 (9 canali): lobo iperdirettivo intermedio che separa facciate e portici.' }),
    Object.freeze({ order: 3, channels: 16, label: 'O3 · 16 ch', desc: 'Ordine 3 (16 canali AmbiX): massima selettività spaziale delle 64 capsule dell\'Eigenmike em64.' })
  ]);

  const SQRT_3 = Math.sqrt(3);
  const SQRT_3_HALF = SQRT_3 * 0.5;
  const SQRT_15_HALF = Math.sqrt(15) * 0.5;
  const SQRT_5_8 = Math.sqrt(5 / 8);
  const SQRT_3_8 = Math.sqrt(3 / 8);

  const shExplorerState = {
    initialized: false,
    visible: false,
    mode: SH_MODE.BASIS,
    selectedAcn: SH_CONFIG.DEFAULT_ACN,
    synthOrder: SH_CONFIG.DEFAULT_ORDER,
    azimuthDeg: SH_CONFIG.DEFAULT_AZIMUTH_DEG,
    elevationDeg: SH_CONFIG.DEFAULT_ELEVATION_DEG,
    yawRad: SH_CONFIG.DEFAULT_YAW_RAD,
    pitchRad: SH_CONFIG.DEFAULT_PITCH_RAD,
    animState: SH_ANIM_STATE.STOPPED,
    rafId: null,
    lastFrameMs: 0,
    isDragging: false,
    activePointerId: null,
    dragLastX: 0,
    dragLastY: 0,
    trigGrid: null
  };

  // Valuta un'armonica sferica reale AmbiX (ACN 0-15, normalizzazione SN3D, senza fase Condon-Shortley)
  function evalSphericalHarmonicSn3d(acn, phi, theta) {
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    const cosP = Math.cos(phi);
    const sinP = Math.sin(phi);
    const cosT2 = cosT * cosT;
    const sinT2 = sinT * sinT;

    switch (acn) {
      case 0: return 1;
      case 1: return cosT * sinP;
      case 2: return sinT;
      case 3: return cosT * cosP;
      case 4: return SQRT_3_HALF * cosT2 * Math.sin(2 * phi);
      case 5: return SQRT_3 * sinT * cosT * sinP;
      case 6: return 0.5 * (3 * sinT2 - 1);
      case 7: return SQRT_3 * sinT * cosT * cosP;
      case 8: return SQRT_3_HALF * cosT2 * Math.cos(2 * phi);
      case 9: return SQRT_5_8 * cosT2 * cosT * Math.sin(3 * phi);
      case 10: return SQRT_15_HALF * sinT * cosT2 * Math.sin(2 * phi);
      case 11: return SQRT_3_8 * cosT * (5 * sinT2 - 1) * sinP;
      case 12: return 0.5 * sinT * (5 * sinT2 - 3);
      case 13: return SQRT_3_8 * cosT * (5 * sinT2 - 1) * cosP;
      case 14: return SQRT_15_HALF * sinT * cosT2 * Math.cos(2 * phi);
      case 15: return SQRT_5_8 * cosT2 * cosT * Math.cos(3 * phi);
      default: return 0;
    }
  }

  // Calcola i 16 pesi AmbiX SN3D per un'onda piana proveniente da (azRad, elRad)
  function computeAmbiXWeights(azRad, elRad) {
    const weights = new Float32Array(SH_CHANNELS_TOTAL);
    for (let acn = 0; acn < SH_CHANNELS_TOTAL; acn += 1) {
      weights[acn] = evalSphericalHarmonicSn3d(acn, azRad, elRad);
    }
    return weights;
  }

  // Sintetizza il fascio direzionale HOA troncato all'ordine N (somma ponderata (2n + 1) / (N + 1)^2)
  function evalBeamSynthesis(maxOrder, weights, phi, theta) {
    const channelLimit = (maxOrder + 1) * (maxOrder + 1);
    const normFactor = 1 / channelLimit;
    let total = 0;

    for (let acn = 0; acn < channelLimit; acn += 1) {
      const order = SH_HARMONICS[acn].order;
      const orderWeight = 2 * order + 1;
      total += orderWeight * weights[acn] * evalSphericalHarmonicSn3d(acn, phi, theta);
    }

    return total * normFactor;
  }

  // Precalcola la griglia angolare (theta, phi) per mantenere il rendering 3D leggero
  function buildShTrigGrid() {
    if (shExplorerState.trigGrid) return shExplorerState.trigGrid;

    const tSteps = SH_CONFIG.GRID_THETA_STEPS;
    const pSteps = SH_CONFIG.GRID_PHI_STEPS;
    const rows = tSteps + 1;
    const cols = pSteps + 1;
    const phiArr = new Float32Array(cols);
    const cosPhi = new Float32Array(cols);
    const sinPhi = new Float32Array(cols);
    const thetaArr = new Float32Array(rows);
    const cosTheta = new Float32Array(rows);
    const sinTheta = new Float32Array(rows);

    for (let j = 0; j < cols; j += 1) {
      const phi = (j / pSteps) * SH_CONFIG.TWO_PI;
      phiArr[j] = phi;
      cosPhi[j] = Math.cos(phi);
      sinPhi[j] = Math.sin(phi);
    }

    for (let i = 0; i < rows; i += 1) {
      const theta = (0.5 - i / tSteps) * Math.PI;
      thetaArr[i] = theta;
      cosTheta[i] = Math.cos(theta);
      sinTheta[i] = Math.sin(theta);
    }

    shExplorerState.trigGrid = {
      rows: rows,
      cols: cols,
      tSteps: tSteps,
      pSteps: pSteps,
      phi: phiArr,
      cosPhi: cosPhi,
      sinPhi: sinPhi,
      theta: thetaArr,
      cosTheta: cosTheta,
      sinTheta: sinTheta
    };

    return shExplorerState.trigGrid;
  }

  // Proietta un punto 3D nello spazio camera right-handed coerente con la figura AmbiX
  function projectShPoint(px, py, pz, cam, halfW, halfH, scalePx) {
    const rightVal = px * cam.rx + py * cam.ry;
    const upVal = px * cam.ux + py * cam.uy + pz * cam.uz;
    const depthVal = px * cam.fx + py * cam.fy + pz * cam.fz;
    const persp = SH_CONFIG.CAMERA_FOV / (SH_CONFIG.CAMERA_FOV - depthVal * SH_CONFIG.CAMERA_DEPTH_FACTOR);

    return {
      x: halfW + rightVal * scalePx * persp,
      y: halfH - upVal * scalePx * persp,
      depth: depthVal,
      persp: persp
    };
  }

  // Disegna un asse 3D di riferimento (X/Y/Z) oppure il vettore bersaglio della sintesi
  function drawShAxisLine(ctx2d, px, py, pz, label, axisStyle, cam, halfW, halfH, scalePx) {
    const origin = projectShPoint(0, 0, 0, cam, halfW, halfH, scalePx);
    const tip = projectShPoint(px, py, pz, cam, halfW, halfH, scalePx);

    ctx2d.save();
    if (axisStyle === SH_AXIS_STYLE.TARGET) {
      ctx2d.strokeStyle = '#fbbf24';
      ctx2d.lineWidth = 2.1;
      ctx2d.beginPath();
      ctx2d.moveTo(origin.x, origin.y);
      ctx2d.lineTo(tip.x, tip.y);
      ctx2d.stroke();

      ctx2d.fillStyle = '#fde68a';
      ctx2d.beginPath();
      ctx2d.arc(tip.x, tip.y, 4, 0, SH_CONFIG.TWO_PI);
      ctx2d.fill();
    } else {
      ctx2d.strokeStyle = 'rgba(148, 163, 184, 0.34)';
      ctx2d.lineWidth = 1;
      ctx2d.beginPath();
      ctx2d.moveTo(origin.x, origin.y);
      ctx2d.lineTo(tip.x, tip.y);
      ctx2d.stroke();

      ctx2d.fillStyle = 'rgba(203, 213, 225, 0.72)';
      ctx2d.font = '600 10px Inter, system-ui, sans-serif';
      ctx2d.fillText(label, tip.x + 4, tip.y + 3);
    }
    ctx2d.restore();
  }

  // Restituisce il colore ombreggiato del pannello in base al segno del lobo e alla luce
  function computeShFacetFill(valSign, nx, ny, nz, cam) {
    const lightCamX = -0.36;
    const lightCamY = 0.56;
    const lightCamZ = 0.74;

    const camNx = nx * cam.rx + ny * cam.ry;
    const camNy = nx * cam.ux + ny * cam.uy + nz * cam.uz;
    const camNz = nx * cam.fx + ny * cam.fy + nz * cam.fz;
    const diffuse = Math.max(0, Math.abs(camNx * lightCamX + camNy * lightCamY + camNz * lightCamZ));
    const shade = 0.34 + 0.66 * diffuse;

    if (valSign >= 0) {
      const r = Math.round(130 + 125 * shade);
      const g = Math.round(35 + 115 * shade * shade);
      const b = Math.round(12 + 34 * Math.pow(shade, 3));
      return `rgb(${r}, ${g}, ${b})`;
    }

    const r = Math.round(10 + 52 * Math.pow(shade, 2));
    const g = Math.round(62 + 138 * shade);
    const b = Math.round(145 + 108 * shade);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Campiona i quad 3D del pallone polare (singola armonica o fascio sintetizzato)
  function computeShSurfaceQuads(weights, cam, halfW, halfH, scalePx) {
    const grid = buildShTrigGrid();
    const rows = grid.rows;
    const cols = grid.cols;
    const sx = new Float32Array(rows * cols);
    const sy = new Float32Array(rows * cols);
    const sDepth = new Float32Array(rows * cols);
    const wx = new Float32Array(rows * cols);
    const wy = new Float32Array(rows * cols);
    const wz = new Float32Array(rows * cols);
    const sVal = new Float32Array(rows * cols);

    const isSynthesis = shExplorerState.mode === SH_MODE.SYNTHESIS;

    for (let i = 0; i < rows; i += 1) {
      const theta = grid.theta[i];
      const cosT = grid.cosTheta[i];
      const sinT = grid.sinTheta[i];

      for (let j = 0; j < cols; j += 1) {
        const idx = i * cols + j;
        const phi = grid.phi[j];
        const val = isSynthesis
          ? evalBeamSynthesis(shExplorerState.synthOrder, weights, phi, theta)
          : evalSphericalHarmonicSn3d(shExplorerState.selectedAcn, phi, theta);

        const radius = Math.abs(val);
        const px = radius * cosT * grid.cosPhi[j];
        const py = radius * cosT * grid.sinPhi[j];
        const pz = radius * sinT;

        const proj = projectShPoint(px, py, pz, cam, halfW, halfH, scalePx);
        sx[idx] = proj.x;
        sy[idx] = proj.y;
        sDepth[idx] = proj.depth;
        wx[idx] = px;
        wy[idx] = py;
        wz[idx] = pz;
        sVal[idx] = val;
      }
    }

    const quads = [];
    for (let i = 0; i < grid.tSteps; i += 1) {
      for (let j = 0; j < grid.pSteps; j += 1) {
        const a = i * cols + j;
        const b = a + 1;
        const c = (i + 1) * cols + j + 1;
        const d = (i + 1) * cols + j;

        const maxR = Math.max(Math.abs(sVal[a]), Math.abs(sVal[b]), Math.abs(sVal[c]), Math.abs(sVal[d]));
        if (maxR < SH_CONFIG.QUAD_MIN_RADIUS) continue;

        const ux = wx[c] - wx[a];
        const uy = wy[c] - wy[a];
        const uz = wz[c] - wz[a];
        const vx = wx[d] - wx[b];
        const vy = wy[d] - wy[b];
        const vz = wz[d] - wz[b];
        let nx = uy * vz - uz * vy;
        let ny = uz * vx - ux * vz;
        let nz = ux * vy - uy * vx;
        const nLen = Math.hypot(nx, ny, nz) || 1;
        nx /= nLen;
        ny /= nLen;
        nz /= nLen;

        const avgVal = (sVal[a] + sVal[b] + sVal[c] + sVal[d]) * 0.25;
        const avgDepth = (sDepth[a] + sDepth[b] + sDepth[c] + sDepth[d]) * 0.25;

        quads.push({
          ax: sx[a], ay: sy[a],
          bx: sx[b], by: sy[b],
          cx: sx[c], cy: sy[c],
          dx: sx[d], dy: sy[d],
          depth: avgDepth,
          fill: computeShFacetFill(avgVal, nx, ny, nz, cam)
        });
      }
    }

    quads.sort(function (q1, q2) {
      return q1.depth - q2.depth;
    });

    return quads;
  }

  // Renderizza la vista 3D dell'esploratore nel canvas della Fase 3
  function renderShCanvas() {
    if (!shExplorerState.visible) return;

    const canvas = document.getElementById('shCanvas');
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    const rect = canvas.getBoundingClientRect();
    const cssWidth = Math.max(SH_CONFIG.CANVAS_MIN_WIDTH, rect.width || canvas.clientWidth || 440);
    const cssHeight = Math.max(SH_CONFIG.CANVAS_DEFAULT_HEIGHT, rect.height || canvas.clientHeight || SH_CONFIG.CANVAS_DEFAULT_HEIGHT);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(cssWidth * dpr);
    const targetH = Math.round(cssHeight * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx2d.save();
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx2d.clearRect(0, 0, cssWidth, cssHeight);

    const cosP = Math.cos(shExplorerState.pitchRad);
    const sinP = Math.sin(shExplorerState.pitchRad);
    const cosY = Math.cos(shExplorerState.yawRad);
    const sinY = Math.sin(shExplorerState.yawRad);

    const cam = {
      fx: cosP * cosY,
      fy: cosP * sinY,
      fz: sinP,
      rx: -sinY,
      ry: cosY,
      ux: -sinP * cosY,
      uy: -sinP * sinY,
      uz: cosP
    };

    const halfW = cssWidth * 0.5;
    const halfH = cssHeight * 0.52;
    const radiusFrac = shExplorerState.mode === SH_MODE.SYNTHESIS
      ? SH_CONFIG.SYNTH_RADIUS_FRACTION
      : SH_CONFIG.BALLOON_RADIUS_FRACTION;
    const scalePx = Math.min(cssWidth, cssHeight) * radiusFrac;

    const azRad = shExplorerState.azimuthDeg * SH_CONFIG.DEG_TO_RAD;
    const elRad = shExplorerState.elevationDeg * SH_CONFIG.DEG_TO_RAD;
    const weights = shExplorerState.mode === SH_MODE.SYNTHESIS
      ? computeAmbiXWeights(azRad, elRad)
      : null;

    const axisLen = SH_CONFIG.AXIS_LENGTH_SCALE;
    drawShAxisLine(ctx2d, axisLen, 0, 0, 'X', SH_AXIS_STYLE.REFERENCE, cam, halfW, halfH, scalePx);
    drawShAxisLine(ctx2d, 0, axisLen, 0, 'Y', SH_AXIS_STYLE.REFERENCE, cam, halfW, halfH, scalePx);
    drawShAxisLine(ctx2d, 0, 0, axisLen, 'Z', SH_AXIS_STYLE.REFERENCE, cam, halfW, halfH, scalePx);

    const quads = computeShSurfaceQuads(weights, cam, halfW, halfH, scalePx);
    for (let i = 0; i < quads.length; i += 1) {
      const q = quads[i];
      ctx2d.fillStyle = q.fill;
      ctx2d.strokeStyle = 'rgba(2, 6, 23, 0.22)';
      ctx2d.lineWidth = 0.4;
      ctx2d.beginPath();
      ctx2d.moveTo(q.ax, q.ay);
      ctx2d.lineTo(q.bx, q.by);
      ctx2d.lineTo(q.cx, q.cy);
      ctx2d.lineTo(q.dx, q.dy);
      ctx2d.closePath();
      ctx2d.fill();
      ctx2d.stroke();
    }

    if (shExplorerState.mode === SH_MODE.SYNTHESIS) {
      const tx = SH_CONFIG.TARGET_LENGTH_SCALE * Math.cos(elRad) * Math.cos(azRad);
      const ty = SH_CONFIG.TARGET_LENGTH_SCALE * Math.cos(elRad) * Math.sin(azRad);
      const tz = SH_CONFIG.TARGET_LENGTH_SCALE * Math.sin(elRad);
      drawShAxisLine(ctx2d, tx, ty, tz, '', SH_AXIS_STYLE.TARGET, cam, halfW, halfH, scalePx);
    }

    ctx2d.restore();
  }

  function stopShExplorerAnimation() {
    shExplorerState.animState = SH_ANIM_STATE.STOPPED;
    shExplorerState.visible = false;
    if (shExplorerState.rafId) {
      cancelAnimationFrame(shExplorerState.rafId);
      shExplorerState.rafId = null;
    }
  }

  function startShExplorerAnimation() {
    if (!shExplorerState.visible) return;
    if (shExplorerState.animState === SH_ANIM_STATE.RUNNING) return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia(SH_CONFIG.REDUCED_MOTION_QUERY).matches;
    if (prefersReducedMotion) {
      renderShCanvas();
      return;
    }

    shExplorerState.animState = SH_ANIM_STATE.RUNNING;
    shExplorerState.lastFrameMs = performance.now();

    function stepShFrame(nowMs) {
      if (!shExplorerState.visible || shExplorerState.animState !== SH_ANIM_STATE.RUNNING) {
        shExplorerState.rafId = null;
        return;
      }

      const dtSec = Math.min(0.05, Math.max(0, (nowMs - shExplorerState.lastFrameMs) / 1000));
      shExplorerState.lastFrameMs = nowMs;

      if (!shExplorerState.isDragging) {
        shExplorerState.yawRad += dtSec * SH_CONFIG.AUTO_SPIN_RAD_PER_SEC;
      }

      renderShCanvas();
      shExplorerState.rafId = requestAnimationFrame(stepShFrame);
    }

    shExplorerState.rafId = requestAnimationFrame(stepShFrame);
  }

  // Costruisce la piramide dei 16 bottoni AmbiX (ordini 0..3)
  function buildShPyramidUi() {
    const pyramidEl = document.getElementById('shPyramid');
    if (!pyramidEl) return;

    pyramidEl.innerHTML = '';
    for (let order = 0; order <= SH_MAX_ORDER; order += 1) {
      const row = document.createElement('div');
      row.className = 'sh-pyramid-row';

      const rowLabel = document.createElement('span');
      rowLabel.className = 'sh-row-order';
      rowLabel.textContent = `O${order}`;
      row.appendChild(rowLabel);

      for (let acn = 0; acn < SH_CHANNELS_TOTAL; acn += 1) {
        const spec = SH_HARMONICS[acn];
        if (spec.order !== order) continue;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'sh-harmonic-btn';
        btn.setAttribute('data-acn', String(spec.acn));
        btn.setAttribute('title', `ACN ${spec.acn} · ${spec.label} (${spec.letter})`);
        btn.textContent = spec.letter;
        row.appendChild(btn);
      }

      pyramidEl.appendChild(row);
    }
  }

  function buildShOrderButtonsUi() {
    const container = document.getElementById('shOrderButtons');
    if (!container) return;

    container.innerHTML = '';
    SH_ORDER_SPECS.forEach(function (spec) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sh-order-btn';
      btn.setAttribute('data-order', String(spec.order));
      btn.textContent = spec.label;
      container.appendChild(btn);
    });
  }

  function buildShWeightsUi() {
    const container = document.getElementById('shWeightsBars');
    if (!container) return;

    container.innerHTML = '';
    for (let acn = 0; acn < SH_CHANNELS_TOTAL; acn += 1) {
      const spec = SH_HARMONICS[acn];
      const col = document.createElement('div');
      col.className = 'sh-weight-col';
      col.setAttribute('data-acn', String(acn));
      col.setAttribute('title', `ACN ${acn} (${spec.letter})`);

      const track = document.createElement('div');
      track.className = 'sh-weight-track';

      const mid = document.createElement('div');
      mid.className = 'sh-weight-mid';

      const fill = document.createElement('div');
      fill.className = 'sh-weight-fill';

      track.appendChild(mid);
      track.appendChild(fill);

      const lbl = document.createElement('span');
      lbl.className = 'sh-weight-lbl';
      lbl.textContent = spec.letter;

      col.appendChild(track);
      col.appendChild(lbl);
      container.appendChild(col);
    }
  }

  function updateShExplorerUi() {
    const widget = document.getElementById('shExplorerWidget');
    const btnBasis = document.getElementById('btnShModeBasis');
    const btnSynth = document.getElementById('btnShModeSynth');
    const basisPanel = document.getElementById('shBasisPanel');
    const synthPanel = document.getElementById('shSynthPanel');
    const badgeEl = document.getElementById('shCanvasBadge');
    const formulaEl = document.getElementById('shInfoFormula');
    const descEl = document.getElementById('shInfoDesc');
    const azValEl = document.getElementById('shAzimuthVal');
    const elValEl = document.getElementById('shElevationVal');

    const isSynth = shExplorerState.mode === SH_MODE.SYNTHESIS;

    if (widget) {
      widget.setAttribute('data-sh-mode', shExplorerState.mode);
      widget.setAttribute('data-sh-acn', String(shExplorerState.selectedAcn));
      widget.setAttribute('data-sh-order', String(shExplorerState.synthOrder));
    }

    if (btnBasis) {
      btnBasis.classList.toggle('active', !isSynth);
      btnBasis.setAttribute('aria-selected', !isSynth ? 'true' : 'false');
    }
    if (btnSynth) {
      btnSynth.classList.toggle('active', isSynth);
      btnSynth.setAttribute('aria-selected', isSynth ? 'true' : 'false');
    }
    if (basisPanel) basisPanel.style.display = isSynth ? 'none' : 'block';
    if (synthPanel) synthPanel.style.display = isSynth ? 'flex' : 'none';

    const harmBtns = document.querySelectorAll('#shPyramid .sh-harmonic-btn');
    harmBtns.forEach(function (btn) {
      const btnAcn = Number(btn.getAttribute('data-acn'));
      const isSelected = btnAcn === shExplorerState.selectedAcn;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

    const orderBtns = document.querySelectorAll('#shOrderButtons .sh-order-btn');
    orderBtns.forEach(function (btn) {
      const btnOrder = Number(btn.getAttribute('data-order'));
      const isSelected = btnOrder === shExplorerState.synthOrder;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

    if (azValEl) azValEl.textContent = `${shExplorerState.azimuthDeg}°`;
    if (elValEl) elValEl.textContent = `${shExplorerState.elevationDeg}°`;

    if (!isSynth) {
      const activeHarm = SH_HARMONICS[shExplorerState.selectedAcn] || SH_HARMONICS[0];
      if (badgeEl) badgeEl.textContent = `ACN ${activeHarm.acn} · ${activeHarm.label} (${activeHarm.letter})`;
      if (formulaEl) formulaEl.textContent = `${activeHarm.formula}  ·  Ordine ${activeHarm.order}`;
      if (descEl) descEl.textContent = activeHarm.desc;
      return;
    }

    const orderSpec = SH_ORDER_SPECS[shExplorerState.synthOrder] || SH_ORDER_SPECS[SH_MAX_ORDER];
    const weights = computeAmbiXWeights(
      shExplorerState.azimuthDeg * SH_CONFIG.DEG_TO_RAD,
      shExplorerState.elevationDeg * SH_CONFIG.DEG_TO_RAD
    );
    const activeChannels = orderSpec.channels;

    const cols = document.querySelectorAll('#shWeightsBars .sh-weight-col');
    cols.forEach(function (col) {
      const acn = Number(col.getAttribute('data-acn'));
      col.classList.toggle('is-inactive', acn >= activeChannels);
      const fill = col.querySelector('.sh-weight-fill');
      if (!fill) return;

      const w = weights[acn];
      const magPct = Math.min(50, Math.abs(w) * 50);
      fill.classList.toggle('is-pos', w >= 0);
      fill.classList.toggle('is-neg', w < 0);
      if (w >= 0) {
        fill.style.top = `${50 - magPct}%`;
        fill.style.height = `${Math.max(1.5, magPct)}%`;
      } else {
        fill.style.top = '50%';
        fill.style.height = `${Math.max(1.5, magPct)}%`;
      }
    });

    if (badgeEl) badgeEl.textContent = `Ordine ${orderSpec.order} · ${activeChannels} ch · φ=${shExplorerState.azimuthDeg}° θ=${shExplorerState.elevationDeg}°`;
    if (formulaEl) formulaEl.textContent = `B_${orderSpec.order}(φ, θ) = (1 / ${activeChannels}) · Σ (2n + 1) Yₙᵐ(φ₀, θ₀) Yₙᵐ(φ, θ)`;
    if (descEl) descEl.textContent = orderSpec.desc;
  }

  function setShMode(mode) {
    shExplorerState.mode = mode;
    updateShExplorerUi();
    renderShCanvas();
  }

  function syncShExplorerVisibility(phaseData) {
    const widget = document.getElementById('shExplorerWidget');
    const bodyElem = document.getElementById('portalBodyText');
    const showExplorer = Boolean(phaseData && phaseData.hasShExplorer);

    if (bodyElem) {
      bodyElem.classList.toggle('has-sh-explorer', showExplorer);
    }

    if (!widget) return;

    if (!showExplorer) {
      widget.style.display = 'none';
      stopShExplorerAnimation();
      return;
    }

    if (!shExplorerState.initialized) {
      buildShPyramidUi();
      buildShOrderButtonsUi();
      buildShWeightsUi();
      shExplorerState.initialized = true;
    }

    widget.style.display = 'flex';
    shExplorerState.visible = true;
    updateShExplorerUi();

    requestAnimationFrame(function () {
      renderShCanvas();
      startShExplorerAnimation();
    });
  }

  function bindShExplorerEvents() {
    const btnBasis = document.getElementById('btnShModeBasis');
    const btnSynth = document.getElementById('btnShModeSynth');
    const pyramidEl = document.getElementById('shPyramid');
    const orderBtnsEl = document.getElementById('shOrderButtons');
    const azSlider = document.getElementById('shAzimuthSlider');
    const elSlider = document.getElementById('shElevationSlider');
    const canvas = document.getElementById('shCanvas');

    if (btnBasis) {
      btnBasis.addEventListener('click', function () {
        setShMode(SH_MODE.BASIS);
      });
    }

    if (btnSynth) {
      btnSynth.addEventListener('click', function () {
        setShMode(SH_MODE.SYNTHESIS);
      });
    }

    if (pyramidEl) {
      pyramidEl.addEventListener('click', function (e) {
        const btn = e.target.closest('.sh-harmonic-btn');
        if (!btn) return;
        shExplorerState.selectedAcn = Number(btn.getAttribute('data-acn'));
        updateShExplorerUi();
        renderShCanvas();
      });
    }

    if (orderBtnsEl) {
      orderBtnsEl.addEventListener('click', function (e) {
        const btn = e.target.closest('.sh-order-btn');
        if (!btn) return;
        shExplorerState.synthOrder = Number(btn.getAttribute('data-order'));
        updateShExplorerUi();
        renderShCanvas();
      });
    }

    if (azSlider) {
      azSlider.addEventListener('input', function () {
        shExplorerState.azimuthDeg = Number(azSlider.value);
        updateShExplorerUi();
        renderShCanvas();
      });
    }

    if (elSlider) {
      elSlider.addEventListener('input', function () {
        shExplorerState.elevationDeg = Number(elSlider.value);
        updateShExplorerUi();
        renderShCanvas();
      });
    }

    if (canvas) {
      canvas.addEventListener('pointerdown', function (e) {
        shExplorerState.isDragging = true;
        shExplorerState.activePointerId = e.pointerId;
        shExplorerState.dragLastX = e.clientX;
        shExplorerState.dragLastY = e.clientY;
        canvas.classList.add('is-dragging');
        if (typeof canvas.setPointerCapture === 'function') {
          try {
            canvas.setPointerCapture(e.pointerId);
          } catch (_) {}
        }
      });

      canvas.addEventListener('pointermove', function (e) {
        if (!shExplorerState.isDragging || e.pointerId !== shExplorerState.activePointerId) return;
        const dx = e.clientX - shExplorerState.dragLastX;
        const dy = e.clientY - shExplorerState.dragLastY;
        shExplorerState.dragLastX = e.clientX;
        shExplorerState.dragLastY = e.clientY;
        shExplorerState.yawRad -= dx * SH_CONFIG.DRAG_SENSITIVITY;
        shExplorerState.pitchRad = Math.max(
          SH_CONFIG.MIN_PITCH_RAD,
          Math.min(SH_CONFIG.MAX_PITCH_RAD, shExplorerState.pitchRad + dy * SH_CONFIG.DRAG_SENSITIVITY)
        );
        renderShCanvas();
      });

      function endCanvasDrag(e) {
        if (!shExplorerState.isDragging || e.pointerId !== shExplorerState.activePointerId) return;
        shExplorerState.isDragging = false;
        shExplorerState.activePointerId = null;
        canvas.classList.remove('is-dragging');
      }

      canvas.addEventListener('pointerup', endCanvasDrag);
      canvas.addEventListener('pointercancel', endCanvasDrag);
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
          voice.currentGain = VOICE_ENVELOPE.GAIN_FLOOR;
          voice.gain.gain.setTargetAtTime(VOICE_ENVELOPE.GAIN_FLOOR, audioCtx.currentTime, VOICE_ENVELOPE.SILENCE_FADE_SEC);
        } else {
          const combinedIntensity = Math.min(1.0, st.motionEnergy * 1.2 + (st.isHovered ? 0.4 : 0));
          modulateHarmonicVoice(voice, combinedIntensity);
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
      const combinedIntensity = Math.min(1.0, backHomeState.motionEnergy * 1.2 + (backHomeState.isHovered ? 0.45 : 0));
      modulateHarmonicVoice(audioNodes['back-home'], combinedIntensity);
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
      const combinedIntensity = Math.min(1.0, mediaWaveState.motionEnergy * 1.2 + (mediaWaveState.isHovered ? 0.45 : 0));
      modulateHarmonicVoice(audioNodes['portal-media'], combinedIntensity);
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
        state.galleryCategory = GALLERY_CATEGORY.ALL;
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
    if (state.room3dOpen) {
      closeRoom3dModal();
    }
    stopEssDemoPlayback();
    stopShExplorerAnimation();
    stopLightboxVideo();
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
    stopEssDemoPlayback();
    stopShExplorerAnimation();

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
        imgElem.style.objectPosition = phaseData.imagePosition || IMAGE_POSITION.DEFAULT;
        imgElem.style.opacity = '1';
      }

      if (capElem) {
        capElem.textContent = phaseData.imageCaption || '';
        capElem.style.opacity = '1';
      }

      syncEssWidgetVisibility(phaseData);
      syncShExplorerVisibility(phaseData);
      syncPhaseCampaignMap(phaseData);
      syncPhaseSpecsCard(phaseData);
      syncPhaseMediaStrip(phaseData);

      const btnRoom3D = document.getElementById('btnPhaseRoom3D');
      if (btnRoom3D) {
        btnRoom3D.style.display = phaseData.model3dUrl ? 'inline-flex' : 'none';
      }

      const btnMakingOf = document.getElementById('btnPhaseMakingOf');
      const btnMakingOfLbl = document.getElementById('btnPhaseMakingOfLabel');
      const phaseMediaCount = Array.isArray(phaseData.mediaGallery) ? phaseData.mediaGallery.length : 0;
      const actionLabel = phaseData.mediaActionLabel || 'Foto & Video';
      if (btnMakingOf) {
        btnMakingOf.style.display = phaseMediaCount > 0 ? 'inline-flex' : 'none';
      }
      if (btnMakingOfLbl && phaseMediaCount > 0) {
        btnMakingOfLbl.textContent = `${actionLabel} (${phaseMediaCount})`;
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

  // Costruisce la mappa vettoriale Emilia-Romagna con le 5 città rilevate
  function buildCampaignMapSvg() {
    const svg = document.getElementById('phaseCampaignSvg');
    if (!svg || svg.children.length > 0) return;

    const svgNs = EMILIA_ROMAGNA_MAP_GEOM.SVG_NS;

    const regionPath = document.createElementNS(svgNs, 'path');
    regionPath.setAttribute('class', 'map-region-shape');
    regionPath.setAttribute('d', EMILIA_ROMAGNA_MAP_GEOM.REGION_PATH);
    svg.appendChild(regionPath);

    const viaEmilia = document.createElementNS(svgNs, 'path');
    viaEmilia.setAttribute('class', 'map-via-emilia');
    viaEmilia.setAttribute('d', EMILIA_ROMAGNA_MAP_GEOM.VIA_EMILIA_PATH);
    svg.appendChild(viaEmilia);

    const refDot = document.createElementNS(svgNs, 'circle');
    refDot.setAttribute('class', 'map-ref-dot');
    refDot.setAttribute('cx', String(EMILIA_ROMAGNA_MAP_GEOM.REF_CITY_X));
    refDot.setAttribute('cy', String(EMILIA_ROMAGNA_MAP_GEOM.REF_CITY_Y));
    refDot.setAttribute('r', '2.4');
    svg.appendChild(refDot);

    const refLbl = document.createElementNS(svgNs, 'text');
    refLbl.setAttribute('class', 'map-ref-label');
    refLbl.setAttribute('x', String(EMILIA_ROMAGNA_MAP_GEOM.REF_CITY_X));
    refLbl.setAttribute('y', String(EMILIA_ROMAGNA_MAP_GEOM.REF_CITY_Y - 8));
    refLbl.setAttribute('text-anchor', 'middle');
    refLbl.textContent = EMILIA_ROMAGNA_MAP_GEOM.REF_CITY_LABEL;
    svg.appendChild(refLbl);

    CAMPAIGN_CITIES.forEach(function (city) {
      const group = document.createElementNS(svgNs, 'g');
      group.setAttribute('class', 'map-city-pin');
      group.setAttribute('data-city-id', city.id);
      group.setAttribute('role', 'button');
      group.setAttribute('tabindex', '0');
      group.setAttribute('aria-label', `${city.name}: ${city.scenesCount}`);

      const hitCircle = document.createElementNS(svgNs, 'circle');
      hitCircle.setAttribute('class', 'map-city-hit');
      hitCircle.setAttribute('cx', String(city.x));
      hitCircle.setAttribute('cy', String(city.y));
      hitCircle.setAttribute('r', '16');

      const ring = document.createElementNS(svgNs, 'circle');
      ring.setAttribute('class', 'map-city-ring');
      ring.setAttribute('cx', String(city.x));
      ring.setAttribute('cy', String(city.y));
      ring.setAttribute('r', '7.5');

      const dot = document.createElementNS(svgNs, 'circle');
      dot.setAttribute('class', 'map-city-dot');
      dot.setAttribute('cx', String(city.x));
      dot.setAttribute('cy', String(city.y));
      dot.setAttribute('r', '3.8');

      const label = document.createElementNS(svgNs, 'text');
      label.setAttribute('class', 'map-city-label');
      label.setAttribute('x', String(city.x + city.dx));
      label.setAttribute('y', String(city.y + city.dy));
      label.setAttribute('text-anchor', city.anchor);
      label.textContent = city.name;

      group.appendChild(hitCircle);
      group.appendChild(ring);
      group.appendChild(dot);
      group.appendChild(label);

      group.addEventListener('click', function () {
        ensureAudioUnlocked();
        playPhaseStepSound();
        selectCampaignCity(city.id);
      });

      bindButtonKeyActivation(group, function () {
        ensureAudioUnlocked();
        playPhaseStepSound();
        selectCampaignCity(city.id);
      });

      svg.appendChild(group);
    });
  }

  function selectCampaignCity(cityId) {
    const city = CAMPAIGN_CITIES.find(function (c) {
      return c.id === cityId;
    }) || CAMPAIGN_CITIES[0];
    if (!city) return;

    state.activeMapCityId = city.id;

    const pins = document.querySelectorAll('#phaseCampaignSvg .map-city-pin');
    pins.forEach(function (pin) {
      const isSelected = pin.getAttribute('data-city-id') === city.id;
      pin.classList.toggle('active', isSelected);
      pin.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

    const titleEl = document.getElementById('phaseMapCityTitle');
    const badgeEl = document.getElementById('phaseMapCityBadge');
    const scenesEl = document.getElementById('phaseMapCityScenes');
    const openBtn = document.getElementById('btnPhaseMapOpenMedia');

    if (titleEl) titleEl.textContent = city.name;
    if (badgeEl) badgeEl.textContent = city.scenesCount;
    if (scenesEl) scenesEl.textContent = city.scenes;
    if (openBtn) openBtn.textContent = city.openLabel;
  }

  // Mostra o nasconde la mappa interattiva della campagna nella Fase 1
  function syncPhaseCampaignMap(phaseData) {
    const mapCard = document.getElementById('phaseMapCard');
    const bodyElem = document.getElementById('portalBodyText');
    const showMap = Boolean(phaseData && phaseData.hasCampaignMap);

    if (bodyElem) {
      bodyElem.classList.toggle('has-phase-map', showMap);
    }

    if (!mapCard) return;
    mapCard.style.display = showMap ? 'flex' : 'none';
    if (!showMap) return;

    buildCampaignMapSvg();
    selectCampaignCity(state.activeMapCityId);
  }

  // Aggiorna la striscia multimediale (mappe, foto e video) nella fase attiva
  function syncPhaseMediaStrip(phaseData) {
    const strip = document.getElementById('phaseMediaStrip');
    const grid = document.getElementById('phaseMediaStripGrid');
    const tagEl = document.getElementById('phaseMediaStripTag');
    const countEl = document.getElementById('phaseMediaStripCount');
    if (!strip || !grid) return;

    const allItems = phaseData && Array.isArray(phaseData.mediaGallery) ? phaseData.mediaGallery : [];
    const hasMedia = allItems.length > 0;
    grid.innerHTML = '';
    strip.style.display = hasMedia ? 'flex' : 'none';

    if (!hasMedia) return;

    if (tagEl) {
      tagEl.textContent = phaseData.mediaStripTag || 'Galleria della Fase';
    }

    const videoCount = allItems.filter(function (entry) {
      return entry.mediaType === MEDIA_TYPE.VIDEO;
    }).length;
    const mapCount = allItems.filter(function (entry) {
      return entry.badge === MEDIA_BADGE.MAP;
    }).length;
    const photoCount = Math.max(0, allItems.length - videoCount - mapCount);

    if (countEl) {
      const parts = [];
      if (photoCount > 0) parts.push(`${photoCount} foto`);
      if (mapCount > 0) parts.push(`${mapCount} mappe`);
      if (videoCount > 0) parts.push(`${videoCount} video`);
      countEl.textContent = parts.join(' · ');
    }

    const featuredItems = allItems.filter(function (entry) {
      return entry.featured;
    });
    const tiles = featuredItems.length > 0 ? featuredItems : allItems.slice(0, 6);

    tiles.forEach(function (entry) {
      const fullIndex = allItems.indexOf(entry);
      const tileBtn = document.createElement('button');
      tileBtn.type = 'button';
      tileBtn.className = 'phase-media-tile';
      tileBtn.setAttribute('aria-label', `${entry.title}`);
      tileBtn.setAttribute('title', entry.title);

      const thumb = document.createElement('img');
      thumb.className = 'phase-media-tile-img';
      thumb.src = entry.image;
      thumb.alt = entry.title;
      thumb.loading = 'lazy';
      tileBtn.appendChild(thumb);

      if (entry.mediaType === MEDIA_TYPE.VIDEO) {
        const playBadge = document.createElement('span');
        playBadge.className = 'media-play-badge';
        playBadge.textContent = '▶ Video';
        tileBtn.appendChild(playBadge);
      } else if (entry.badge === MEDIA_BADGE.MAP) {
        const mapBadge = document.createElement('span');
        mapBadge.className = 'media-map-badge';
        mapBadge.textContent = 'Mappa';
        tileBtn.appendChild(mapBadge);
      }

      const labelEl = document.createElement('span');
      labelEl.className = 'phase-media-tile-label';
      labelEl.textContent = entry.shortLabel || entry.title;
      tileBtn.appendChild(labelEl);

      tileBtn.addEventListener('click', function () {
        ensureAudioUnlocked();
        openPhaseMediaLightbox(fullIndex);
      });

      grid.appendChild(tileBtn);
    });
  }

  // Filtra gli elementi della Gallery per categoria o tipologia video
  function getFilteredGalleryItems(items, category) {
    if (!Array.isArray(items)) return [];
    if (category === GALLERY_CATEGORY.ALL) return items;

    if (category === GALLERY_CATEGORY.VIDEOS) {
      return items.filter(function (entry) {
        return entry.mediaType === MEDIA_TYPE.VIDEO;
      });
    }

    return items.filter(function (entry) {
      return entry.category === category;
    });
  }

  // Aggiorna la scheda delle specifiche tecniche quando prevista dalla fase
  function syncPhaseSpecsCard(phaseData) {
    const card = document.getElementById('phaseSpecsCard');
    const grid = document.getElementById('phaseSpecsGrid');
    const link = document.getElementById('phaseSpecsLink');
    const bodyElem = document.getElementById('portalBodyText');

    const hasSpecs = Boolean(phaseData && Array.isArray(phaseData.specs) && phaseData.specs.length > 0);

    if (bodyElem) {
      bodyElem.classList.toggle('has-phase-specs', hasSpecs);
    }

    if (!card || !grid) return;

    grid.innerHTML = '';
    card.style.display = hasSpecs ? 'flex' : 'none';

    if (!hasSpecs) return;

    phaseData.specs.forEach(function (spec) {
      const item = document.createElement('div');
      item.className = 'phase-spec-item';

      const labelEl = document.createElement('span');
      labelEl.className = 'phase-spec-label';
      labelEl.textContent = spec.label;

      const valueEl = document.createElement('span');
      valueEl.className = 'phase-spec-value';
      valueEl.textContent = spec.value;

      item.appendChild(labelEl);
      item.appendChild(valueEl);
      grid.appendChild(item);
    });

    if (link) {
      if (phaseData.specsLinkUrl) {
        link.href = phaseData.specsLinkUrl;
        link.textContent = phaseData.specsLinkLabel || phaseData.specsLinkUrl;
        link.style.display = 'inline-block';
      } else {
        link.style.display = 'none';
      }
    }
  }

  function renderPortalSection(sectionKey) {
    resetPortalScrollPosition();
    stopEssDemoPlayback();

    const essWidget = document.getElementById('essDemoWidget');
    if (essWidget) essWidget.style.display = 'none';

    const shWidget = document.getElementById('shExplorerWidget');
    if (shWidget) shWidget.style.display = 'none';
    stopShExplorerAnimation();

    const specsCard = document.getElementById('phaseSpecsCard');
    if (specsCard) specsCard.style.display = 'none';

    const mediaStrip = document.getElementById('phaseMediaStrip');
    if (mediaStrip) mediaStrip.style.display = 'none';

    const mapCard = document.getElementById('phaseMapCard');
    if (mapCard) mapCard.style.display = 'none';

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

    // Render del Trio attivo con barra filtri multimediale
    function renderGalleryTrioStage() {
      bodyElem.innerHTML = '';
      galleryCirclesRegistry.length = 0;

      const filterBar = document.createElement('div');
      filterBar.className = 'gallery-filter-bar';
      filterBar.setAttribute('role', 'group');
      filterBar.setAttribute('aria-label', 'Filtra contenuti gallery');

      GALLERY_CATEGORY_FILTERS.forEach(function (flt) {
        const count = getFilteredGalleryItems(data.items, flt.id).length;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'gallery-filter-btn';
        btn.setAttribute('data-gallery-filter', flt.id);
        const isActive = state.galleryCategory === flt.id;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        btn.textContent = `${flt.label} (${count})`;

        btn.addEventListener('click', function () {
          ensureAudioUnlocked();
          if (state.galleryCategory === flt.id) return;
          state.galleryCategory = flt.id;
          state.currentGalleryTrioIndex = 0;
          playPhaseStepSound();
          renderGalleryTrioStage();
        });

        filterBar.appendChild(btn);
      });

      bodyElem.appendChild(filterBar);

      const filteredItems = getFilteredGalleryItems(data.items, state.galleryCategory);
      const trios = getGalleryTrios(filteredItems);
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
        const filteredIdx = filteredItems.indexOf(item);
        const card = document.createElement('div');
        card.className = 'gallery-trio-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        const actionLabel = item.mediaType === MEDIA_TYPE.VIDEO ? 'Riproduci video: ' : 'Ingrandisci foto: ';
        card.setAttribute('aria-label', actionLabel + item.title);
        card.setAttribute('title', actionLabel + item.title);

        card.addEventListener('click', function () {
          ensureAudioUnlocked();
          openGalleryLightbox(filteredIdx);
        });

        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            ensureAudioUnlocked();
            openGalleryLightbox(filteredIdx);
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
        img.style.objectPosition = item.imagePosition || IMAGE_POSITION.DEFAULT;
        img.src = item.image;
        img.alt = item.title;
        img.loading = 'lazy';
        mask.appendChild(img);

        if (item.mediaType === MEDIA_TYPE.VIDEO) {
          const badge = document.createElement('span');
          badge.className = 'gallery-video-badge';
          badge.textContent = '▶ Video';
          mask.appendChild(badge);
        }

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
  let lastRoom3dTrigger = null;

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
  // GESTIONE LIGHTBOX (GALLERY & IMMAGINI FASI DEL LABORATORIO)
  // -------------------------------------------------------------------------
  function showLightboxModal() {
    const modal = document.getElementById('galleryLightboxModal');
    if (modal) {
      modal.style.display = 'flex';
      void modal.offsetWidth; // Trigger reflow per transizione CSS fluida
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }

    renderGalleryLightbox();

    const videoElem = document.getElementById('galleryLightboxVideo');
    const isVideoVisible = Boolean(videoElem && videoElem.style.display !== 'none');
    if (isVideoVisible) {
      videoElem.focus();
    } else {
      const closeBtn = document.getElementById('btnLightboxClose');
      if (closeBtn) closeBtn.focus();
    }

    playPhaseStepSound();
  }

  // Svuota le sorgenti <source> e l'attributo src del player video
  function clearLightboxVideoSources(videoElem) {
    if (!videoElem) return;
    if (!videoElem.paused) {
      videoElem.pause();
    }
    const hadSource = Boolean(videoElem.getAttribute('src') || videoElem.children.length > 0);
    videoElem.removeAttribute('src');
    videoElem.innerHTML = '';
    return hadSource;
  }

  // Arresta e scarica l'eventuale video in riproduzione nel lightbox
  function stopLightboxVideo() {
    const videoElem = document.getElementById('galleryLightboxVideo');
    if (!videoElem) return;
    const hadSource = clearLightboxVideoSources(videoElem);
    if (hadSource) {
      videoElem.load();
    }
    videoElem.style.display = 'none';
  }

  function openGalleryLightbox(index) {
    const galleryData = DRAWER_DATA.gallery;
    const filteredItems = getFilteredGalleryItems(galleryData ? galleryData.items : [], state.galleryCategory);
    if (filteredItems.length === 0) return;

    const total = filteredItems.length;
    if (typeof index !== 'number' || index < 0) index = 0;
    if (index >= total) index = total - 1;

    lastLightboxTrigger = document.activeElement;
    state.lightboxSource = LIGHTBOX_SOURCE.GALLERY;
    state.currentLightboxIndex = index;
    state.galleryLightboxOpen = true;

    showLightboxModal();
  }

  // Apre il lightbox a schermo intero partendo dall'immagine circolare della fase attiva
  function openPhaseLightbox(phaseIndex) {
    if (!Array.isArray(LAB_PHASES) || LAB_PHASES.length === 0) return;

    const total = LAB_PHASES.length;
    if (typeof phaseIndex !== 'number' || phaseIndex < 0) phaseIndex = 0;
    if (phaseIndex >= total) phaseIndex = total - 1;

    lastLightboxTrigger = document.activeElement;
    state.lightboxSource = LIGHTBOX_SOURCE.PHASE;
    state.lightboxPhaseIndex = phaseIndex;
    state.galleryLightboxOpen = true;

    showLightboxModal();
  }

  // Apre il lightbox multimediale (foto e video assemblaggio) della Fase 5
  function openPhaseMediaLightbox(itemIndex) {
    const phase = LAB_PHASES[state.currentPhaseIndex];
    const items = phase && Array.isArray(phase.mediaGallery) ? phase.mediaGallery : [];
    if (items.length === 0) return;

    const total = items.length;
    if (typeof itemIndex !== 'number' || itemIndex < 0) itemIndex = 0;
    if (itemIndex >= total) itemIndex = total - 1;

    lastLightboxTrigger = document.activeElement;
    state.lightboxSource = LIGHTBOX_SOURCE.PHASE_MEDIA;
    state.lightboxPhaseMediaIndex = itemIndex;
    state.galleryLightboxOpen = true;

    showLightboxModal();
  }

  function closeGalleryLightbox() {
    if (!state.galleryLightboxOpen) return;
    state.galleryLightboxOpen = false;
    stopLightboxVideo();

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
    if (state.lightboxSource === LIGHTBOX_SOURCE.PHASE) {
      const totalPhases = LAB_PHASES.length;
      if (totalPhases === 0) return;
      let nextPhase = (state.lightboxPhaseIndex + delta) % totalPhases;
      if (nextPhase < 0) nextPhase += totalPhases;
      state.lightboxPhaseIndex = nextPhase;
      renderGalleryLightbox();
      playPhaseStepSound();
      return;
    }

    if (state.lightboxSource === LIGHTBOX_SOURCE.PHASE_MEDIA) {
      const activePhase = LAB_PHASES[state.currentPhaseIndex];
      const mediaItems = activePhase && Array.isArray(activePhase.mediaGallery) ? activePhase.mediaGallery : [];
      if (mediaItems.length === 0) return;
      let nextMediaIdx = (state.lightboxPhaseMediaIndex + delta) % mediaItems.length;
      if (nextMediaIdx < 0) nextMediaIdx += mediaItems.length;
      state.lightboxPhaseMediaIndex = nextMediaIdx;
      renderGalleryLightbox();
      playPhaseStepSound();
      return;
    }

    const galleryData = DRAWER_DATA.gallery;
    const filteredItems = getFilteredGalleryItems(galleryData ? galleryData.items : [], state.galleryCategory);
    if (filteredItems.length === 0) return;

    const total = filteredItems.length;
    let nextIdx = (state.currentLightboxIndex + delta) % total;
    if (nextIdx < 0) nextIdx += total;

    state.currentLightboxIndex = nextIdx;
    renderGalleryLightbox();
    playPhaseStepSound();
  }

  let lightboxFadeTimer = null;

  function renderGalleryLightbox() {
    let item = null;
    let counterText = '';
    let tagText = LIGHTBOX_TAG.GALLERY;

    if (state.lightboxSource === LIGHTBOX_SOURCE.PHASE) {
      const phase = LAB_PHASES[state.lightboxPhaseIndex];
      if (!phase) return;
      item = {
        image: phase.image,
        mediaType: MEDIA_TYPE.IMAGE,
        title: phase.title,
        caption: phase.imageCaption || ''
      };
      counterText = `Fase ${state.lightboxPhaseIndex + 1} di ${LAB_PHASES.length}`;
      tagText = LIGHTBOX_TAG.PHASE;
    } else if (state.lightboxSource === LIGHTBOX_SOURCE.PHASE_MEDIA) {
      const activePhase = LAB_PHASES[state.currentPhaseIndex];
      const mediaItems = activePhase && Array.isArray(activePhase.mediaGallery) ? activePhase.mediaGallery : [];
      item = mediaItems[state.lightboxPhaseMediaIndex];
      if (!item) return;
      counterText = `Media ${state.lightboxPhaseMediaIndex + 1} di ${mediaItems.length}`;
      tagText = item.mediaType === MEDIA_TYPE.VIDEO
        ? LIGHTBOX_TAG.VIDEO
        : (activePhase.mediaLightboxTag || LIGHTBOX_TAG.PHASE_MEDIA);
    } else {
      const galleryData = DRAWER_DATA.gallery;
      const filteredItems = getFilteredGalleryItems(galleryData ? galleryData.items : [], state.galleryCategory);
      item = filteredItems[state.currentLightboxIndex];
      if (!item) return;
      const prefix = item.mediaType === MEDIA_TYPE.VIDEO ? 'Video' : 'Foto';
      counterText = `${prefix} ${state.currentLightboxIndex + 1} di ${filteredItems.length}`;
      tagText = item.mediaType === MEDIA_TYPE.VIDEO ? LIGHTBOX_TAG.VIDEO : LIGHTBOX_TAG.GALLERY;
    }

    const imgElem = document.getElementById('galleryLightboxImg');
    const videoElem = document.getElementById('galleryLightboxVideo');
    const counterElem = document.getElementById('lightboxCounter');
    const tagElem = document.getElementById('lightboxTag');
    const titleElem = document.getElementById('lightboxTitle');
    const captionElem = document.getElementById('lightboxCaption');

    if (lightboxFadeTimer) {
      clearTimeout(lightboxFadeTimer);
      lightboxFadeTimer = null;
    }

    if (item.mediaType === MEDIA_TYPE.VIDEO && (item.videoSrc || item.videoWebmSrc) && videoElem) {
      if (imgElem) {
        imgElem.style.display = 'none';
      }

      clearLightboxVideoSources(videoElem);

      if (item.videoWebmSrc) {
        const webmSource = document.createElement('source');
        webmSource.src = item.videoWebmSrc;
        webmSource.type = VIDEO_MIME.WEBM;
        videoElem.appendChild(webmSource);
      }

      if (item.videoSrc) {
        const mp4Source = document.createElement('source');
        mp4Source.src = item.videoSrc;
        mp4Source.type = VIDEO_MIME.MP4;
        videoElem.appendChild(mp4Source);
      }

      videoElem.poster = item.image || '';
      videoElem.style.display = 'block';
      videoElem.load();
      videoElem.currentTime = 0;
      videoElem.setAttribute('aria-label', item.title);
      silenceAllVoices(VOICE_ENVELOPE.SILENCE_FADE_SEC);

      const playPromise = videoElem.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {});
      }
    } else if (imgElem) {
      stopLightboxVideo();
      imgElem.style.display = 'block';
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

    if (counterElem) counterElem.textContent = counterText;
    if (tagElem) tagElem.textContent = tagText;
    if (titleElem) titleElem.textContent = item.title;
    if (captionElem) captionElem.textContent = item.caption;
  }

  // -------------------------------------------------------------------------
  // MODALE MODELLO 3D SALA IMMERSIVA TRESIGALLO
  // -------------------------------------------------------------------------
  function openRoom3dModal(url, title) {
    if (!url) return;

    stopEssDemoPlayback();
    stopShExplorerAnimation();
    silenceAllVoices(VOICE_ENVELOPE.SILENCE_FADE_SEC);

    lastRoom3dTrigger = document.activeElement;
    state.room3dOpen = true;

    const modal = document.getElementById('room3dModal');
    const titleEl = document.getElementById('room3dTitle');
    const extLink = document.getElementById('room3dExternalLink');
    const loadingEl = document.getElementById('room3dLoading');
    const iframe = document.getElementById('room3dIframe');

    if (titleEl && title) titleEl.textContent = title;
    if (extLink) extLink.href = url;
    if (loadingEl) loadingEl.classList.remove('loaded');
    if (iframe) iframe.src = url;

    if (modal) {
      modal.style.display = 'flex';
      void modal.offsetWidth;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }

    const closeBtn = document.getElementById('btnRoom3dClose');
    if (closeBtn) closeBtn.focus();

    playPhaseStepSound();
  }

  function closeRoom3dModal() {
    if (!state.room3dOpen) return;
    state.room3dOpen = false;

    const modal = document.getElementById('room3dModal');
    const iframe = document.getElementById('room3dIframe');

    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      setTimeout(function () {
        if (!state.room3dOpen) {
          modal.style.display = 'none';
        }
      }, 320);
    }

    // Scarica il contesto WebGL remoto alla chiusura per liberare risorse
    if (iframe) {
      iframe.src = ROOM_3D_BLANK_URL;
    }

    if (lastRoom3dTrigger && typeof lastRoom3dTrigger.focus === 'function') {
      lastRoom3dTrigger.focus();
      lastRoom3dTrigger = null;
    }

    playPhaseStepSound();
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
    // Stato dello scrub tattile sui cerchi su mobile
    const mobileScrubState = {
      mode: SCRUB_MODE.IDLE,
      pointerId: null,
      activeCircle: null,
      suppressClickUntil: 0
    };

    // Raggruppa i cerchi per centro mobile per calcolare l'anello più vicino al dito
    const mobileGroups = (function buildMobileCircleGroups() {
      const byCenter = new Map();

      CIRCLES_REGISTRY.forEach(function (c) {
        const cx = c.mobileCx || c.cx;
        const cy = c.mobileCy || c.cy;
        const radius = c.mobileRadius || c.radius;
        const key = cx + ',' + cy;

        if (!byCenter.has(key)) {
          byCenter.set(key, { cx: cx, cy: cy, outerRadius: radius, circles: [] });
        }

        const group = byCenter.get(key);
        group.circles.push(c);
        if (radius > group.outerRadius) {
          group.outerRadius = radius;
        }
      });

      return Array.from(byCenter.values());
    })();

    // Converte coordinate schermo del puntatore nel sistema di coordinate SVG
    function clientToSvgPoint(svg, clientX, clientY) {
      if (!svg || typeof svg.getScreenCTM !== 'function') return null;

      const ctm = svg.getScreenCTM();
      if (!ctm) return null;

      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      return pt.matrixTransform(ctm.inverse());
    }

    // Trova il cerchio mobile agganciato alla posizione corrente del dito
    function findMobileCircleAtPoint(clientX, clientY) {
      const svg = document.getElementById('soundWavesSvg');
      const svgPt = clientToSvgPoint(svg, clientX, clientY);
      if (!svgPt) return null;

      let matchedGroup = null;
      let minGroupDist = Infinity;

      for (let i = 0; i < mobileGroups.length; i++) {
        const group = mobileGroups[i];
        const dist = Math.hypot(svgPt.x - group.cx, svgPt.y - group.cy);
        if (dist <= group.outerRadius + SCRUB_CONFIG.OUTER_MARGIN_SVG && dist < minGroupDist) {
          minGroupDist = dist;
          matchedGroup = group;
        }
      }

      if (!matchedGroup) return null;

      let bestCircle = null;
      let minRingDist = Infinity;

      matchedGroup.circles.forEach(function (c) {
        const radius = c.mobileRadius || c.radius;
        const distFromCenter = Math.hypot(svgPt.x - matchedGroup.cx, svgPt.y - matchedGroup.cy);
        const ringDist = (INNERMOST_CIRCLE_IDS.has(c.id) && distFromCenter <= radius)
          ? 0
          : Math.abs(distFromCenter - radius);

        if (ringDist < minRingDist) {
          minRingDist = ringDist;
          bestCircle = c;
        }
      });

      return bestCircle;
    }

    function updateMobileScrubIndicator(circle) {
      const indicator = document.getElementById('mobileScrubIndicator');
      const labelEl = document.getElementById('mobileScrubLabel');
      const hintEl = document.getElementById('mobileScrubHint');
      if (!indicator || !labelEl || !hintEl) return;

      if (mobileScrubState.mode !== SCRUB_MODE.ACTIVE) {
        indicator.classList.remove('visible', 'is-canceling');
        indicator.setAttribute('aria-hidden', 'true');
        return;
      }

      indicator.classList.add('visible');
      indicator.setAttribute('aria-hidden', 'false');

      if (!circle) {
        indicator.classList.add('is-canceling');
        labelEl.textContent = SCRUB_HINT.CANCEL_LABEL;
        hintEl.textContent = SCRUB_HINT.RELEASE_TO_CANCEL;
        return;
      }

      indicator.classList.remove('is-canceling');
      labelEl.textContent = circle.labelText;
      hintEl.textContent = SCRUB_HINT.RELEASE_TO_OPEN;
    }

    // Aggiorna anello evidenziato, energia d'onda, suono e aptica al cambio anello
    function setScrubActiveCircle(nextCircle) {
      const prevCircle = mobileScrubState.activeCircle;
      const prevId = prevCircle ? prevCircle.id : null;
      const nextId = nextCircle ? nextCircle.id : null;

      if (prevId === nextId) return;

      if (prevId) {
        const prevDom = circleDOM[prevId];
        if (prevDom && prevDom.group) {
          prevDom.group.classList.remove('circle-scrub-active');
        }
        if (state.circles[prevId]) {
          state.circles[prevId].isHovered = false;
        }
      }

      mobileScrubState.activeCircle = nextCircle || null;

      if (nextCircle) {
        const nextDom = circleDOM[nextCircle.id];
        if (nextDom && nextDom.group) {
          nextDom.group.classList.add('circle-scrub-active');
        }
        if (state.circles[nextCircle.id]) {
          state.circles[nextCircle.id].isHovered = true;
          state.circles[nextCircle.id].motionEnergy = 1.0;
        }

        const freq = (activeStyle.audio && activeStyle.audio.frequencies[nextCircle.id]) || AUDIO_BUS_CONFIG.DEFAULT_VOICE_FREQ;
        playRipplePulseSound(freq);

        try {
          if (typeof navigator.vibrate === 'function') {
            navigator.vibrate(SCRUB_CONFIG.HAPTIC_MS);
          }
        } catch (e) {}
      }

      updateMobileScrubIndicator(nextCircle);
    }

    function clearMobileScrub() {
      const prevCircle = mobileScrubState.activeCircle;
      if (prevCircle) {
        const prevDom = circleDOM[prevCircle.id];
        if (prevDom && prevDom.group) {
          prevDom.group.classList.remove('circle-scrub-active');
        }
        if (state.circles[prevCircle.id]) {
          state.circles[prevCircle.id].isHovered = false;
        }
      }

      mobileScrubState.mode = SCRUB_MODE.IDLE;
      mobileScrubState.pointerId = null;
      mobileScrubState.activeCircle = null;

      const soundscapeContainer = document.getElementById('soundscapeContainer');
      if (soundscapeContainer) {
        soundscapeContainer.classList.remove('is-scrubbing');
      }

      updateMobileScrubIndicator(null);
    }

    // Gestione scrub tattile sull'SVG: trascina tra gli anelli e rilascia per aprire
    const soundWavesSvg = document.getElementById('soundWavesSvg');
    if (soundWavesSvg) {
      soundWavesSvg.addEventListener('pointerdown', function (e) {
        if (!isMobileViewport() || state.portalOpen) return;

        const hit = findMobileCircleAtPoint(e.clientX, e.clientY);
        if (!hit) return;

        mobileScrubState.mode = SCRUB_MODE.ACTIVE;
        mobileScrubState.pointerId = e.pointerId;

        try {
          soundWavesSvg.setPointerCapture(e.pointerId);
        } catch (err) {}

        const soundscapeContainer = document.getElementById('soundscapeContainer');
        if (soundscapeContainer) {
          soundscapeContainer.classList.add('is-scrubbing');
        }

        ensureAudioUnlocked();
        setScrubActiveCircle(hit);
      });

      soundWavesSvg.addEventListener('touchmove', function (e) {
        if (mobileScrubState.mode === SCRUB_MODE.ACTIVE) {
          e.preventDefault();
        }
      }, { passive: false });

      window.addEventListener('pointermove', function (e) {
        if (mobileScrubState.mode !== SCRUB_MODE.ACTIVE || e.pointerId !== mobileScrubState.pointerId) {
          return;
        }
        const nextCircle = findMobileCircleAtPoint(e.clientX, e.clientY);
        setScrubActiveCircle(nextCircle);
      });

      window.addEventListener('pointerup', function (e) {
        if (mobileScrubState.mode !== SCRUB_MODE.ACTIVE || e.pointerId !== mobileScrubState.pointerId) {
          return;
        }

        try {
          soundWavesSvg.releasePointerCapture(e.pointerId);
        } catch (err) {}

        const selected = mobileScrubState.activeCircle;
        clearMobileScrub();
        mobileScrubState.suppressClickUntil = performance.now() + SCRUB_CONFIG.CLICK_SUPPRESS_MS;

        if (selected) {
          activateCircleNavigation(selected);
        }
      });

      window.addEventListener('pointercancel', function (e) {
        if (mobileScrubState.mode !== SCRUB_MODE.ACTIVE || e.pointerId !== mobileScrubState.pointerId) {
          return;
        }
        clearMobileScrub();
      });
    }

    // Clic ed hover sull'intero gruppo cerchio (inclusa l'etichetta curva)
    CIRCLES_REGISTRY.forEach(function (c) {
      const dom = circleDOM[c.id];
      if (!dom || !dom.group) return;

      const circleGroup = dom.group;

      circleGroup.addEventListener('pointerenter', function (e) {
        if (mobileScrubState.mode === SCRUB_MODE.ACTIVE || (isMobileViewport() && e.pointerType === 'touch')) {
          return;
        }
        ensureAudioUnlocked();
        if (performance.now() < state.suppressHoverAudioUntil) {
          return;
        }
        state.circles[c.id].isHovered = true;
        state.circles[c.id].motionEnergy = 1.0;
      });

      circleGroup.addEventListener('pointermove', function (e) {
        if (mobileScrubState.mode === SCRUB_MODE.ACTIVE || (isMobileViewport() && e.pointerType === 'touch')) {
          return;
        }
        if (performance.now() < state.suppressHoverAudioUntil) {
          return;
        }
        state.circles[c.id].motionEnergy = Math.min(1.0, state.circles[c.id].motionEnergy + 0.15);
      });

      circleGroup.addEventListener('pointerleave', function (e) {
        if (mobileScrubState.mode === SCRUB_MODE.ACTIVE || (isMobileViewport() && e.pointerType === 'touch')) {
          return;
        }
        state.circles[c.id].isHovered = false;
      });

      circleGroup.addEventListener('click', function (e) {
        e.stopPropagation();
        if (performance.now() < mobileScrubState.suppressClickUntil) {
          return;
        }
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

    // Controlli interattivi ESS in Fase 2
    const btnEssSweep = document.getElementById('btnEssPlaySweep');
    if (btnEssSweep) {
      btnEssSweep.addEventListener('click', function () {
        triggerEssAction(ESS_SIGNAL_TYPE.SWEEP);
      });
    }

    const btnEssInverse = document.getElementById('btnEssPlayInverse');
    if (btnEssInverse) {
      btnEssInverse.addEventListener('click', function () {
        triggerEssAction(ESS_SIGNAL_TYPE.INVERSE);
      });
    }

    const btnEssConvolve = document.getElementById('btnEssConvolve');
    if (btnEssConvolve) {
      btnEssConvolve.addEventListener('click', function () {
        triggerEssAction(ESS_SIGNAL_TYPE.DELTA);
      });
    }

    // Controlli esploratore interattivo delle armoniche sferiche in Fase 3
    bindShExplorerEvents();

    // Azioni media delle fasi: espansione immagine a schermo intero e modello 3D Fase 5
    const phaseMediaWrapper = document.getElementById('portalCircleMediaWrapper');
    if (phaseMediaWrapper) {
      phaseMediaWrapper.addEventListener('click', function () {
        ensureAudioUnlocked();
        openPhaseLightbox(state.currentPhaseIndex);
      });
      bindButtonKeyActivation(phaseMediaWrapper, function () {
        ensureAudioUnlocked();
        openPhaseLightbox(state.currentPhaseIndex);
      });
    }

    const btnPhaseFullscreen = document.getElementById('btnPhaseMediaFullscreen');
    if (btnPhaseFullscreen) {
      btnPhaseFullscreen.addEventListener('click', function () {
        ensureAudioUnlocked();
        openPhaseLightbox(state.currentPhaseIndex);
      });
    }

    const btnPhaseRoom3D = document.getElementById('btnPhaseRoom3D');
    if (btnPhaseRoom3D) {
      btnPhaseRoom3D.addEventListener('click', function () {
        ensureAudioUnlocked();
        const activePhase = LAB_PHASES[state.currentPhaseIndex];
        if (!activePhase || !activePhase.model3dUrl) return;
        openRoom3dModal(activePhase.model3dUrl, activePhase.model3dTitle);
      });
    }

    const btnPhaseMakingOf = document.getElementById('btnPhaseMakingOf');
    if (btnPhaseMakingOf) {
      btnPhaseMakingOf.addEventListener('click', function () {
        ensureAudioUnlocked();
        openPhaseMediaLightbox(0);
      });
    }

    const btnPhaseMapOpenMedia = document.getElementById('btnPhaseMapOpenMedia');
    if (btnPhaseMapOpenMedia) {
      btnPhaseMapOpenMedia.addEventListener('click', function () {
        ensureAudioUnlocked();
        const city = CAMPAIGN_CITIES.find(function (c) {
          return c.id === state.activeMapCityId;
        }) || CAMPAIGN_CITIES[0];
        if (!city) return;
        openPhaseMediaLightbox(city.lightboxIndex);
      });
    }

    const galleryLightboxVideo = document.getElementById('galleryLightboxVideo');
    if (galleryLightboxVideo) {
      galleryLightboxVideo.addEventListener('play', function () {
        stopEssDemoPlayback();
        silenceAllVoices(VOICE_ENVELOPE.SILENCE_FADE_SEC);
      });
    }

    const btnRoom3dClose = document.getElementById('btnRoom3dClose');
    const room3dBackdrop = document.getElementById('room3dBackdrop');
    const room3dIframe = document.getElementById('room3dIframe');

    if (btnRoom3dClose) {
      btnRoom3dClose.addEventListener('click', function (e) {
        e.stopPropagation();
        closeRoom3dModal();
      });
    }

    if (room3dBackdrop) {
      room3dBackdrop.addEventListener('click', function (e) {
        e.stopPropagation();
        closeRoom3dModal();
      });
    }

    if (room3dIframe) {
      room3dIframe.addEventListener('load', function () {
        if (!state.room3dOpen) return;
        const loadingEl = document.getElementById('room3dLoading');
        if (loadingEl) loadingEl.classList.add('loaded');
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
      if (state.room3dOpen) {
        const roomModal = document.getElementById('room3dModal');
        trapDialogFocus(e, roomModal);

        if (e.key === 'Escape') {
          e.preventDefault();
          closeRoom3dModal();
        }
        return;
      }

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

    // Controllo Audio Spento / Attivo centralizzato (Desktop e Mobile Drawer)
    function toggleAudioMute() {
      ensureAudioUnlocked();
      state.audioMuted = !state.audioMuted;
      updateAudioMuteUI();

      if (!audioCtx) return;

      if (masterGainNode) {
        const targetMaster = state.audioMuted ? VOICE_ENVELOPE.GAIN_FLOOR : activeStyle.audio.masterVolume;
        const fadeTau = state.audioMuted ? VOICE_ENVELOPE.MUTE_FADE_SEC : VOICE_ENVELOPE.UNMUTE_FADE_SEC;
        masterGainNode.gain.setTargetAtTime(targetMaster, audioCtx.currentTime, fadeTau);
        if (essDryGainNode) {
          essDryGainNode.gain.setTargetAtTime(targetMaster, audioCtx.currentTime, fadeTau);
        }
      }

      if (state.audioMuted) {
        stopEssDemoPlayback();
        silenceAllVoices(VOICE_ENVELOPE.MUTE_FADE_SEC);
      }
    }

    function updateAudioMuteUI() {
      const muteToggle = document.getElementById('btnAudioMute');
      const muteLabel = document.getElementById('audioMuteLabel');
      if (muteToggle) muteToggle.classList.toggle('muted', state.audioMuted);
      if (muteLabel) muteLabel.textContent = state.audioMuted ? 'Audio Spento' : 'Audio Attivo';

      const drawerToggle = document.getElementById('btnDrawerAudioToggle');
      const drawerLabel = document.getElementById('drawerAudioStatusLabel') || document.getElementById('drawerAudioLabel');
      if (drawerToggle) drawerToggle.classList.toggle('muted', state.audioMuted);
      if (drawerLabel) drawerLabel.textContent = state.audioMuted ? 'Audio Spento' : 'Audio Attivo';
    }

    const muteToggle = document.getElementById('btnAudioMute');
    if (muteToggle) {
      muteToggle.addEventListener('click', toggleAudioMute);
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
      if (!isMobileViewport() || state.portalOpen || state.audioMuted || !state.initialIntroCompleted || mobileScrubState.mode === SCRUB_MODE.ACTIVE) {
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
