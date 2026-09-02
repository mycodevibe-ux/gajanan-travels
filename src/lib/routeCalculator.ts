/**
 * Route Distance, Time & Accurate FastTag Toll Calculation Engine for Maharashtra and Interstate Routes
 */

export interface RouteEstimate {
  distanceKm: number;
  durationText: { en: string; mr: string };
  durationHours: number;
  tollEstimate: number; // Accurate FastTag toll for the full trip
  oneWayToll: number;
  roundTripToll: number;
  tollPlazas: string;
  routeTitle: string;
}

interface RouteData {
  km: number;
  durationHours: number;
  oneWayToll: number;
  roundTripToll: number;
  tollPlazas: string;
  aliases: string[];
}

// Comprehensive database of all Maharashtra districts, talukas, tourist & pilgrimage destinations with exact distances from Pune/Katraj and NHAI/MSRDC FastTag toll plaza rates
const routesDatabase: Record<string, RouteData> = {
  // ==========================================
  // --- Marathwada & Central Maharashtra ---
  // ==========================================
  'parbhani': {
    km: 410,
    durationHours: 8.5,
    oneWayToll: 420,
    roundTripToll: 840,
    tollPlazas: 'Ahmednagar + Jalna/Beed Tolls (₹420)',
    aliases: ['parbhani', 'परभणी', 'gangakhed', 'गंगाखेड', 'jintur', 'जिंतूर', 'selu', 'sailu', 'सेलू', 'manwath', 'मानवत', 'pathri', 'पाथरी', 'sonpeth', 'सोनपेठ', 'purna', 'पूर्णा', 'palam', 'पालम'],
  },
  'nanded': {
    km: 440,
    durationHours: 9.0,
    oneWayToll: 480,
    roundTripToll: 960,
    tollPlazas: 'Nagar + Latur + Nanded Highway Tolls (₹480)',
    aliases: ['nanded', 'नांदेड', 'hazur sahib', 'हजूर साहिब', 'mukhed', 'मुखेड', 'degloor', 'देगलूर', 'kandhar', 'कंधार', 'hadgaon', 'हदगाव', 'mudkhed', 'मुदखेड', 'kinwat', 'किनवट', 'biloli', 'बिलोली', 'dharmabad', 'धर्माबाद', 'loha', 'लोहा', 'mahurgad', 'माहूरगड', 'renuka mata', 'रेणुका माता'],
  },
  'latur': {
    km: 335,
    durationHours: 7.0,
    oneWayToll: 320,
    roundTripToll: 640,
    tollPlazas: 'Patas + Barsi/Yedshi Toll Plazas (₹320)',
    aliases: ['latur', 'लातूर', 'udgir', 'उदगीर', 'ahmadpur', 'अहमदपूर', 'ausa', 'औसा', 'nilanga', 'निलंगा', 'renapur', 'रेणापूर', 'chakur', 'चाकूर', 'deoni', 'देवणी', 'shirur anantpal', 'जळकोट', 'jalkot'],
  },
  'beed': {
    km: 235,
    durationHours: 5.5,
    oneWayToll: 240,
    roundTripToll: 480,
    tollPlazas: 'Ahmednagar + Jamkhed/Ashti Tolls (₹240)',
    aliases: ['beed', 'बीड', 'parli', 'परळी', 'vaijnath', 'वैजनाथ', 'parli vaijnath', 'परळी वैजनाथ', 'ambajogai', 'अंबाजोगाई', 'georai', 'गेवराई', 'ashti', 'आष्टी', 'patoda', 'पाटोदा', 'kaij', 'केज', 'majalgaon', 'माजलगाव', 'dharur', 'धारूर', 'wadwani', 'वडवणी', 'shirur kasar'],
  },
  'jalna': {
    km: 295,
    durationHours: 6.5,
    oneWayToll: 290,
    roundTripToll: 580,
    tollPlazas: 'Shikrapur + Shirur + Waluj + Jalna Plazas (₹290)',
    aliases: ['jalna', 'जालना', 'partur', 'परतूर', 'ambad', 'अंबड', 'bhokardan', 'भोकरदन', 'jafrabad', 'जाफ्राबाद', 'badnapur', 'बदनापूर', 'ghansawangi', 'घनसावंगी', 'mantha', 'मंठा'],
  },
  'hingoli': {
    km: 450,
    durationHours: 9.5,
    oneWayToll: 480,
    roundTripToll: 960,
    tollPlazas: 'Nagar + Jalna + Hingoli Plazas (₹480)',
    aliases: ['hingoli', 'हिंगोली', 'aundha nagnath', 'औंढा नागनाथ', 'nagnath', 'basmath', 'वसमत', 'kalamnuri', 'कळमनुरी', 'sengaon', 'सेनगाव'],
  },
  'dharashiv': {
    km: 275,
    durationHours: 5.5,
    oneWayToll: 260,
    roundTripToll: 520,
    tollPlazas: 'Patas + Sawaleshwar + Yedshi (₹260)',
    aliases: ['dharashiv', 'धाराशिव', 'osmanabad', 'उस्मानाबाद', 'kalamb', 'कळंब', 'umarga', 'उमरगा', 'tuljapur', 'तुळजापूर', 'bhum', 'भूूम', 'paranda', 'परांडा', 'lohara', 'लोहारा', 'washi', 'वाशी धाराशिव'],
  },

  // ==========================================
  // --- Konkan & Coastal Maharashtra ---
  // ==========================================
  'dapoli': {
    km: 185,
    durationHours: 4.5,
    oneWayToll: 120,
    roundTripToll: 240,
    tollPlazas: 'Khed Shivapur Toll Plaza (₹120)',
    aliases: ['dapoli', 'दापोली', 'khed', 'खेड', 'chiplun', 'चिपळूण', 'guhagar', 'गुहागर', 'mandangad', 'मंडणगड', 'murud dapoli', 'anjarle', 'आंजर्ले', 'ladghar', 'लाडघर', 'kelsi', 'केळशी', 'harnai', 'हर्णै', 'dabhol', 'दाभोळ'],
  },
  'ganpatipule': {
    km: 325,
    durationHours: 7.0,
    oneWayToll: 315,
    roundTripToll: 630,
    tollPlazas: 'Khed Shivapur (₹120) + Anewadi (₹95) + Taswade (₹100)',
    aliases: ['ganpatipule', 'गणपतीपुळे', 'ratnagiri', 'रत्नागिरी', 'sangameshwar', 'संगमेश्वर', 'lanja', 'लांजा', 'rajapur', 'राजापूर', 'pavas', 'पावस', 'aare ware', 'आरे वारे', 'jaigad', 'जयगड', 'derwan', 'डेरवण', 'malkapur'],
  },
  'alibaug': {
    km: 145,
    durationHours: 3.5,
    oneWayToll: 220,
    roundTripToll: 440,
    tollPlazas: 'Khalapur Toll Plaza (₹150) + Wadkhal (₹70)',
    aliases: ['alibaug', 'alibag', 'अलिबाग', 'kashid', 'काशीद', 'murud janjira', 'मुरुड जंजिरा', 'murud', 'मुरुड', 'nagaon', 'नागाव', 'varsoli', 'वरसोली', 'mandwa', 'मांडवा', 'revdanda', 'रेवदंडा', 'roha', 'रोहा', 'pen', 'पेण', 'shrivardhan', 'श्रीवर्धन', 'diveagar', 'दिवेआगर', 'harihareshwar', 'हरिहरेश्वर', 'pali', 'पाली', 'mahad', 'महाड', 'mangaon', 'माणगाव'],
  },
  'malvan': {
    km: 390,
    durationHours: 8.0,
    oneWayToll: 410,
    roundTripToll: 820,
    tollPlazas: 'Khed Shivapur (₹120) + Anewadi (₹95) + Taswade (₹100) + Kini (₹95)',
    aliases: ['malvan', 'मालवण', 'tarkarli', 'तारकर्ली', 'devgad', 'देवगड', 'vengurla', 'वेगुर्ला', 'sawantwadi', 'सावंतवाडी', 'kudal', 'कुडाळ', 'kankavli', 'कणकवली', 'sindhudurg', 'सिंधुदुर्ग', 'amboli', 'आंबोली', 'vijaydurg', 'विजयदुर्ग', 'achara', 'आचरा', 'shiroda', 'शिरोडा'],
  },
  'goa': {
    km: 460,
    durationHours: 9.0,
    oneWayToll: 600,
    roundTripToll: 1200,
    tollPlazas: 'Khed Shivapur (₹120) + Anewadi (₹95) + Taswade (₹100) + Kini (₹95) + Kognoli (₹90) + Goa Entry (₹100)',
    aliases: ['goa', 'गोवा', 'north goa', 'south goa', 'panaji', 'पणजी', 'calangute', 'कॅलंगूट', 'baga', 'बागा', 'candolim', 'कँडोलिम', 'anjuna', 'अंजुना', 'madgaon', 'मडगाव', 'margao', 'vasco', 'वास्को', 'arambol', 'morjim', 'palolem', 'colva'],
  },

  // ==========================================
  // --- Hill Stations & Weekend Destinations ---
  // ==========================================
  'mahabaleshwar': {
    km: 125,
    durationHours: 3.0,
    oneWayToll: 215,
    roundTripToll: 430,
    tollPlazas: 'Khed Shivapur Toll (₹120) + Anewadi Toll (₹95)',
    aliases: ['mahabaleshwar', 'महाबळेश्वर', 'panchgani', 'पाचगणी', 'pratapgad', 'प्रतापगड', 'tapola', 'तापोळा', 'wai', 'वाई', 'bablis', 'venna lake', 'kate point', 'arthurs seat', 'mapro garden'],
  },
  'lonavala': {
    km: 68,
    durationHours: 1.5,
    oneWayToll: 150,
    roundTripToll: 300,
    tollPlazas: 'Talegaon / Somatane Toll (₹150)',
    aliases: ['lonavala', 'लोणावळा', 'khandala', 'खंडाळा', 'karla', 'कार्ला', 'bhaja', 'भाजा', 'lohagad', 'लोहगड', 'pawna', 'पावना', 'pawna lake', 'kamshet', 'कामशेत', 'tiger point', 'bhushi dam'],
  },
  'matheran': {
    km: 120,
    durationHours: 3.0,
    oneWayToll: 180,
    roundTripToll: 360,
    tollPlazas: 'Khalapur Toll (₹150) + Neral entry (₹30)',
    aliases: ['matheran', 'माथेरान', 'neral', 'नेरळ', 'karjat', 'कर्जत', 'dasturi'],
  },
  'lavasa': {
    km: 58,
    durationHours: 1.75,
    oneWayToll: 0,
    roundTripToll: 0,
    tollPlazas: 'No Highway Toll (₹0)',
    aliases: ['lavasa', 'लवासा', 'mulshi', 'मुळशी', 'temghar', 'pirangut', 'पिरंगुट', 'tamhini', 'ताम्हिणी घाट'],
  },
  'igatpuri': {
    km: 245,
    durationHours: 5.0,
    oneWayToll: 260,
    roundTripToll: 520,
    tollPlazas: 'Rajgurunagar (₹45) + Sangamner (₹110) + Ghoti (₹105)',
    aliases: ['igatpuri', 'इगतपुरी', 'bhandardara', 'भंडारदरा', 'kasara', 'कसारा', 'ghoti', 'घोटी', 'kalsubai', 'काळसूबाई'],
  },

  // ==========================================
  // --- Pilgrimage & Temples ---
  // ==========================================
  'shirdi': {
    km: 205,
    durationHours: 4.5,
    oneWayToll: 190,
    roundTripToll: 380,
    tollPlazas: 'Chakan/Rajgurunagar (₹45) + Chalakwadi (₹60) + Bableshwar (₹85)',
    aliases: ['shirdi', 'शिर्डी', 'sai baba', 'साई बाबा', 'shani shingnapur', 'शनि शिंगणापूर', 'shingnapur', 'शिंगणापूर', 'rahata', 'राहाता', 'kopargaon', 'कोपरगाव', 'sangamner', 'संगमनेर'],
  },
  'bhimashankar': {
    km: 110,
    durationHours: 3.0,
    oneWayToll: 60,
    roundTripToll: 120,
    tollPlazas: 'Chakan Bypass Toll (₹60)',
    aliases: ['bhimashankar', 'भीमाशंकर', 'khed ghat', 'manchar', 'मंचर', 'ghodegaon', 'घोडेगाव', 'junnar', 'जुन्नर', 'shivneri', 'शिवनेरी'],
  },
  'trimbakeshwar': {
    km: 240,
    durationHours: 5.0,
    oneWayToll: 260,
    roundTripToll: 520,
    tollPlazas: 'Rajgurunagar (₹45) + Sangamner (₹110) + Sinnar (₹105)',
    aliases: ['trimbakeshwar', 'त्र्यंबकेश्वर', 'nashik', 'नाशिक', 'saptashrungi', 'सप्तशृंगी', 'vani', 'वणी', 'panchavati', 'पंचवटी', 'sinnar', 'सिन्नर'],
  },
  'kolhapur': {
    km: 235,
    durationHours: 4.5,
    oneWayToll: 410,
    roundTripToll: 820,
    tollPlazas: 'Khed Shivapur (₹120) + Anewadi (₹95) + Taswade (₹100) + Kini (₹95)',
    aliases: ['kolhapur', 'कोल्हापूर', 'mahalaxmi', 'महालक्ष्मी', 'karad', 'कराड', 'sangli', 'सांगली', 'miraj', 'मिरज', 'jaysingpur', 'जयसिंगपूर', 'ichalkaranji', 'इचलकरंजी', 'panhala', 'पन्हाळा', 'kaneri math', 'कणेरी मठ'],
  },
  'pandharpur': {
    km: 215,
    durationHours: 4.5,
    oneWayToll: 190,
    roundTripToll: 380,
    tollPlazas: 'Patas Toll (₹95) + Tembhurni Toll (₹95)',
    aliases: ['pandharpur', 'पंढरपूर', 'vitthal', 'विठ्ठल', 'rukmini', 'रुक्मिणी', 'isbavi', 'tembhurni', 'टेंभुर्णी', 'mangalore', 'kurduvadi'],
  },
  'tuljapur': {
    km: 300,
    durationHours: 6.0,
    oneWayToll: 290,
    roundTripToll: 580,
    tollPlazas: 'Patas (₹95) + Sawaleshwar (₹115) + Naldurg Toll (₹80)',
    aliases: ['tuljapur', 'तुळजापूर', 'bhavani mata', 'भवानी माता', 'tulja bhavani', 'तुळजाभवानी', 'naldurg', 'नळदुर्ग'],
  },
  'akkalkot': {
    km: 290,
    durationHours: 6.0,
    oneWayToll: 260,
    roundTripToll: 520,
    tollPlazas: 'Patas (₹95) + Sawaleshwar (₹115) + Solapur bypass (₹50)',
    aliases: ['akkalkot', 'अक्कलकोट', 'swami samarth', 'स्वामी समर्थ', 'gangapur', 'गाणगापूर', 'dattatreya'],
  },
  'shegaon': {
    km: 450,
    durationHours: 9.0,
    oneWayToll: 480,
    roundTripToll: 960,
    tollPlazas: 'Nagar Highway + Aurangabad + Khamgaon Tolls (₹480)',
    aliases: ['shegaon', 'शेगाव', 'gajanan maharaj', 'गजानन महाराज शेगाव', 'buldhana', 'बुलढाणा', 'khamgaon', 'खामगाव', 'akola', 'अकोला', 'anand sagar', 'आनंद सागर', 'malkapur'],
  },
  'jejuri': {
    km: 50,
    durationHours: 1.2,
    oneWayToll: 60,
    roundTripToll: 120,
    tollPlazas: 'Dive Ghat / Saswad Toll (₹60)',
    aliases: ['jejuri', 'जेजुरी', 'khandoba', 'खंडोबा', 'saswad', 'सासवड', 'morgaon', 'मोरगाव', 'mayureshwar', 'मयुरेश्वर'],
  },
  'ashtavinayak': {
    km: 350,
    durationHours: 8.0,
    oneWayToll: 320,
    roundTripToll: 640,
    tollPlazas: 'Highway Plazas (Theur, Morgaon, Siddhatek, Ranjangaon, Ozar, Lenyadri, Mahad, Pali)',
    aliases: ['ashtavinayak', 'अष्टविनायक', 'ranjangaon', 'रांजणगाव', 'lenyadri', 'लेण्याद्री', 'ozar', 'ओझर', 'theur', 'थेऊर', 'siddhatek', 'सिद्धटेक', 'mahad ganpati', 'pali ballaleshwar'],
  },

  // ==========================================
  // --- Major Cities & Interstate Hubs ---
  // ==========================================
  'mumbai': {
    km: 155,
    durationHours: 3.0,
    oneWayToll: 320,
    roundTripToll: 640,
    tollPlazas: 'Talegaon (₹90) + Khalapur Expressway Plaza (₹230) = ₹320',
    aliases: ['mumbai', 'मुंबई', 'bombay', 'dadar', 'दादर', 'borivali', 'बोरिवली', 'bandra', 'वांद्रे', 'chembur', 'andheri', 'अंधेरी', 'vashi', 'वाशी', 'navi mumbai', 'नवी मुंबई', 'thane', 'ठाणे', 'panvel', 'पनवेल', 'kalyan', 'कल्याण', 'dombivli', 'डोंबिवली', 'ghatkopar', 'kurla', 'bkc'],
  },
  'mumbai airport': {
    km: 165,
    durationHours: 3.5,
    oneWayToll: 320,
    roundTripToll: 640,
    tollPlazas: 'Mumbai-Pune Expressway Toll (₹320)',
    aliases: ['mumbai airport', 't2', 't1', 'csia', 'chhatrapati shivaji airport', 'santacruz airport', 'विमानतळ मुंबई', 'mumbai airport drop'],
  },
  'satara': {
    km: 115,
    durationHours: 2.2,
    oneWayToll: 215,
    roundTripToll: 430,
    tollPlazas: 'Khed Shivapur (₹120) + Anewadi (₹95)',
    aliases: ['satara', 'सातारा', 'khas', 'कास पठार', 'sajjangad', 'सज्जनगड', 'thoseghar', 'ठोसेघर', 'koregaon', 'कोरेगाव', 'karad', 'कराड', 'phaltan', 'फलटण', 'shirwal', 'शिरवळ', 'bhor', 'भोर'],
  },
  'solapur': {
    km: 250,
    durationHours: 5.0,
    oneWayToll: 210,
    roundTripToll: 420,
    tollPlazas: 'Patas Toll (₹95) + Sawaleshwar Toll (₹115)',
    aliases: ['solapur', 'सोलापूर', 'sholapur', 'mohol', 'मोहोल', 'kurduvadi', 'कुर्डुवाडी', 'barshi', 'बार्शी', 'karmala', 'करमाळा', 'sangola', 'सांगोला'],
  },
  'sangli': {
    km: 230,
    durationHours: 4.5,
    oneWayToll: 320,
    roundTripToll: 640,
    tollPlazas: 'Khed Shivapur (₹120) + Anewadi (₹95) + Taswade (₹100)',
    aliases: ['sangli', 'सांगली', 'miraj', 'मिरज', 'tasgaon', 'तासगाव', 'islampur', 'इस्लामपूर', 'vita', 'विटा', 'jat', 'जत', 'ashta', 'आष्टा'],
  },
  'aurangabad': {
    km: 235,
    durationHours: 5.0,
    oneWayToll: 260,
    roundTripToll: 520,
    tollPlazas: 'Shikrapur (₹65) + Shirur (₹85) + Waluj (₹110)',
    aliases: ['aurangabad', 'औरंगाबाद', 'chhatrapati sambhajinagar', 'छत्रपती संभाजीनगर', 'sambhajinagar', 'संभाजीनगर', 'ellora', 'verul', 'वेरूळ', 'ajanta', 'अजिंठा', 'daulatabad', 'दौलताबाद', 'paithan', 'पैठण', 'gangapur aurangabad', 'vaijapur', 'वैजापूर', 'kannad', 'कन्नड', 'sillod', 'सिल्लोड'],
  },
  'ahmednagar': {
    km: 125,
    durationHours: 2.5,
    oneWayToll: 150,
    roundTripToll: 300,
    tollPlazas: 'Shikrapur Toll (₹65) + Shirur Toll (₹85)',
    aliases: ['ahmednagar', 'अहमदनगर', 'ahilyanagar', 'अहिल्यानगर', 'nagar', 'नगर', 'shirur', 'शिरूर', 'shikrapur', 'शिक्रापूर', 'parner', 'पारनेर', 'shrigonda', 'श्रीगोंदा', 'karjat nagar', 'कर्जत नगर', 'shevgaon', 'शेवगाव', 'nevasa', 'नेवासा', 'pathardi', 'पाथर्डी', 'jamkhed', 'जामखेड', 'rahuri', 'राहुरी'],
  },
  'jalgaon': {
    km: 380,
    durationHours: 8.0,
    oneWayToll: 410,
    roundTripToll: 820,
    tollPlazas: 'Nagar + Aurangabad + Chalisgaon Tolls (₹410)',
    aliases: ['jalgaon', 'जळगाव', 'bhusawal', 'भुसावळ', 'chalisgaon', 'चाळीसगाव', 'pachora', 'पाचोरा', 'amalner', 'अमळनेर', 'chopda', 'चोपडा', 'jamner', 'जामनेर', 'erandol', 'एरंडोल', 'parola', 'पारोळा', 'raver', 'रावेर', 'yawal', 'यावल'],
  },
  'dhule': {
    km: 340,
    durationHours: 7.0,
    oneWayToll: 360,
    roundTripToll: 720,
    tollPlazas: 'Pune-Nashik + Malegaon/Dhule Plazas (₹360)',
    aliases: ['dhule', 'धुळे', 'shirpur', 'शिरपूर', 'sakri', 'साक्री', 'sindkheda', 'शिंदखेडा', 'dondaicha', 'दोंडाईचा'],
  },
  'nandurbar': {
    km: 420,
    durationHours: 8.5,
    oneWayToll: 420,
    roundTripToll: 840,
    tollPlazas: 'Nashik + Dhule + Nandurbar Plazas (₹420)',
    aliases: ['nandurbar', 'नंदुरबार', 'shahada', 'शहादा', 'toranmal', 'तोरणमाळ', 'navapur', 'नवापूर', 'taloda', 'तळोदा', 'akkalkuwa', 'अक्कलकुवा'],
  },
  'nagpur': {
    km: 710,
    durationHours: 11.5,
    oneWayToll: 1150,
    roundTripToll: 2300,
    tollPlazas: 'Hindu Hrudaysamrat Balasaheb Thackeray Samruddhi Expressway (₹1,150)',
    aliases: ['nagpur', 'नागपूर', 'samruddhi', 'समृद्धी महामार्ग', 'kamthi', 'कामठी', 'umred', 'उमरेड', 'ramtek', 'रामटेक', 'katol', 'काटोल', 'saoner', 'सावनेर', 'hingna', 'हिंगणा', 'kalmeshwar'],
  },
  'amravati': {
    km: 560,
    durationHours: 9.5,
    oneWayToll: 780,
    roundTripToll: 1560,
    tollPlazas: 'Samruddhi / Karanja / Amravati Tolls (₹780)',
    aliases: ['amravati', 'अमरावती', 'badnera', 'बडनेरा', 'achlapur', 'अचलपूर', 'morshi', 'मोर्शी', 'chikhaldara', 'चिखलदरा', 'daryapur', 'दर्यापूर', 'warud', 'वरूड', 'chandur railway', 'धामणगाव रेल्वे'],
  },
  'akola': {
    km: 480,
    durationHours: 8.5,
    oneWayToll: 620,
    roundTripToll: 1240,
    tollPlazas: 'Aurangabad + Khamgaon + Akola Tolls (₹620)',
    aliases: ['akola', 'अकोला', 'murtizapur', 'मुर्तिजापूर', 'akot', 'आकोट', 'telhara', 'तेल्हारा', 'balapur', 'बाळापूर', 'patur', 'पातूर', 'barshitakli', 'बार्शिटाकळी'],
  },
  'buldhana': {
    km: 410,
    durationHours: 7.5,
    oneWayToll: 460,
    roundTripToll: 920,
    tollPlazas: 'Aurangabad + Jalna + Chikhli Tolls (₹460)',
    aliases: ['buldhana', 'बुलढाणा', 'lonar', 'लोणार', 'lonar crater', 'लोणार सरोवर', 'chikhli', 'चिखली', 'mehkar', 'मेहकर', 'sindkhed raja', 'सिंदखेड राजा', 'deulgaon raja', 'देऊळगाव राजा'],
  },
  'yavatmal': {
    km: 580,
    durationHours: 10.0,
    oneWayToll: 790,
    roundTripToll: 1580,
    tollPlazas: 'Nanded / Karanja / Yavatmal Tolls (₹790)',
    aliases: ['yavatmal', 'यवतमाळ', 'pusad', 'पुसद', 'digras', 'दिग्रस', 'wani', 'वणी यवतमाळ', 'darwha', 'दारव्हा', 'pandharkawada', 'पांढरकवडा', 'ner', 'नेर', 'umarkhed', 'उमरखेड', 'ralegaon', 'राळेगाव', 'mahagaon', 'महागाव'],
  },
  'washim': {
    km: 460,
    durationHours: 8.0,
    oneWayToll: 540,
    roundTripToll: 1080,
    tollPlazas: 'Jalna + Mehkar + Washim Tolls (₹540)',
    aliases: ['washim', 'वाशिम', 'karanja lad', 'कारंजा लाड', 'risod', 'रिसोड', 'manora', 'मानोरा', 'malegaon washim', 'मालेगाव वाशिम', 'mangrulpir', 'मंगरुळपीर'],
  },
  'wardha': {
    km: 640,
    durationHours: 10.5,
    oneWayToll: 920,
    roundTripToll: 1840,
    tollPlazas: 'Samruddhi Expressway Wardha Interchange (₹920)',
    aliases: ['wardha', 'वर्धा', 'sevagram', 'सेवाग्राम', 'hinganghat', 'हिंगणघाट', 'arvi', 'आर्वी', 'deoli', 'देवळी', 'pulgaon', 'पुलगाव', 'seloo'],
  },
  'chandrapur': {
    km: 710,
    durationHours: 12.0,
    oneWayToll: 980,
    roundTripToll: 1960,
    tollPlazas: 'Yavatmal + Wani + Chandrapur Tolls (₹980)',
    aliases: ['chandrapur', 'चंद्रपूर', 'tadoba', 'ताडोबा', 'tadoba tiger reserve', 'ballarpur', 'बल्लारपूर', 'warora', 'वरोरा', 'bhadravati', 'भद्रावती', 'mul', 'मुल', 'chimur', 'चिमूर'],
  },
  'gadchiroli': {
    km: 790,
    durationHours: 13.5,
    oneWayToll: 1050,
    roundTripToll: 2100,
    tollPlazas: 'Nagpur / Chandrapur + Gadchiroli Plazas',
    aliases: ['gadchiroli', 'गडचिरोली', 'armori', 'आरमोरी', 'chamorshi', 'चामोर्शी', 'kurkheda', 'कुरखेडा', 'aheri', 'अहेरी', 'wadsa', 'वडसा'],
  },
  'bhandara': {
    km: 770,
    durationHours: 12.5,
    oneWayToll: 1200,
    roundTripToll: 2400,
    tollPlazas: 'Samruddhi + Nagpur-Bhandara NH-53 Plazas',
    aliases: ['bhandara', 'भंडारा', 'tumsar', 'तुमसर', 'pauni', 'पवनी', 'sakoli', 'साकोली', 'lakhani', 'लाखनी'],
  },
  'gondia': {
    km: 840,
    durationHours: 13.5,
    oneWayToll: 1280,
    roundTripToll: 2560,
    tollPlazas: 'Samruddhi + Nagpur-Gondia NH-53 Plazas',
    aliases: ['gondia', 'गोंदिया', 'tiroda', 'तिरोडा', 'goregaon gondia', 'amgaon', 'आमगाव', 'salekasa', 'सालेकसा', 'arjuna', 'deori'],
  },
  'baramati': {
    km: 100,
    durationHours: 2.0,
    oneWayToll: 60,
    roundTripToll: 120,
    tollPlazas: 'Saswad / Patas Highway Plaza (₹60)',
    aliases: ['baramati', 'बारामती', 'indapur', 'इंदापूर', 'daund', 'दौंड', 'bhor', 'भोर', 'shirwal', 'शिरवळ', 'purandar', 'पुरंदर', 'supa', 'सुपा'],
  },

  // --- Interstate Destinations ---
  'hyderabad': {
    km: 560,
    durationHours: 10.5,
    oneWayToll: 650,
    roundTripToll: 1300,
    tollPlazas: 'NH-65 Maharashtra & Telangana FastTag Plazas (₹650)',
    aliases: ['hyderabad', 'हैदराबाद', 'secunderabad', 'सिकंदराबाद', 'hitec city', 'charminar', 'telangana'],
  },
  'bangalore': {
    km: 840,
    durationHours: 14.0,
    oneWayToll: 980,
    roundTripToll: 1960,
    tollPlazas: 'NH-48 Maharashtra & Karnataka FastTag Plazas (₹980)',
    aliases: ['bangalore', 'बंगलोर', 'bengaluru', 'बेंगळुरू', 'belgaum', 'बेळगाव', 'belagavi', 'hubli', 'हुबळी', 'dharwad', 'धारवाड', 'davangere', 'tumkur', 'karnataka'],
  },
  'surat': {
    km: 415,
    durationHours: 8.0,
    oneWayToll: 540,
    roundTripToll: 1080,
    tollPlazas: 'Mumbai Expressway + NH-48 Gujarat Plazas (₹540)',
    aliases: ['surat', 'सुरत', 'vapi', 'वापी', 'valsad', 'वलसाड', 'navsari', 'नवसारी', 'daman', 'दमण', 'silvassa', 'सिलवासा', 'gujarat'],
  },
  'ahmedabad': {
    km: 660,
    durationHours: 12.0,
    oneWayToll: 820,
    roundTripToll: 1640,
    tollPlazas: 'NH-48 Gujarat National Highway Plazas (₹820)',
    aliases: ['ahmedabad', 'अहमदाबाद', 'vadodara', 'वडोदरा', 'baroda', 'बडोदा', 'anand', 'आणंद', 'gandhinagar', 'गांधीनगर'],
  },
};

/**
 * Calculates estimated distance, duration, and accurate FastTag toll for given pickup and destination
 */
export function getRouteEstimate(pickup = '', destination = '', isRoundTrip = true): RouteEstimate {
  const cleanDest = (destination || '').toLowerCase().trim();
  const cleanPickup = (pickup || '').toLowerCase().trim();

  // If destination is empty, default everything to 0
  if (!cleanDest || cleanDest.length < 2) {
    const pTitle = cleanPickup ? (pickup.charAt(0).toUpperCase() + pickup.slice(1)) : 'Pune';
    return {
      distanceKm: 0,
      durationHours: 0,
      durationText: { en: '--', mr: '--' },
      tollEstimate: 0,
      oneWayToll: 0,
      roundTripToll: 0,
      tollPlazas: 'Enter Destination',
      routeTitle: cleanPickup ? `${pTitle} → ...` : 'Select Route',
    };
  }

  // Helper to test if a keyword matches a search string
  const matchesKeyword = (text: string, kw: string) => {
    return text.includes(kw) || kw.includes(text);
  };

  // 1. First, search for destination match in routesDatabase
  let matchedData: RouteData | null = null;
  let matchedKeyName: string | null = null;

  for (const [key, route] of Object.entries(routesDatabase)) {
    const isMatch = route.aliases.some(alias => matchesKeyword(cleanDest, alias.toLowerCase()));
    if (isMatch) {
      matchedData = route;
      matchedKeyName = key;
      break;
    }
  }

  let distanceKm = 0;
  let durationHours = 0;
  let oneWayToll = 0;
  let roundTripToll = 0;
  let tollPlazas = 'Highway FastTag Plazas';

  if (matchedData) {
    distanceKm = matchedData.km;
    durationHours = matchedData.durationHours;
    oneWayToll = matchedData.oneWayToll;
    roundTripToll = matchedData.roundTripToll;
    tollPlazas = matchedData.tollPlazas;
  } else {
    // Intelligent heuristic estimation for unlisted destinations
    distanceKm = 280;
    durationHours = 5.5;
    oneWayToll = 280;
    roundTripToll = 560;
    tollPlazas = `FastTag Toll Plazas (~₹${oneWayToll} each side)`;
  }

  // Check if trip is completely local within Pune / PCMC
  const puneKeywords = [
    'katraj', 'कात्रज', 'swargate', 'स्वारगेट', 'kothrud', 'कोथरूड', 'wakad', 'वाकड',
    'hinjewadi', 'हिंजवडी', 'hadapsar', 'हडपसर', 'vimannagar', 'विमाननगर', 'baner', 'बाणेर',
    'airport', 'विमानतळ', 'shivajinagar', 'शिवाजीनगर', 'pimpri', 'पिंपरी', 'chinchwad', 'चिंचवड',
    'kondhwa', 'कोंढवा', 'kharadi', 'खराडी', 'bhosari', 'भोसरी', 'nigdi', 'निगडी',
    'pune station', 'पुणे स्टेशन', 'deccan', 'डेक्कन', 'camp', 'कॅम्प', 'magarpatta', 'मगरपट्टा',
    'yerwada', 'येरवडा', 'aundh', 'औंध', 'pashan', 'पाषाण', 'dhayari', 'धायरी', 'narhe', 'नऱ्हे',
    'ambegaon', 'आंबेगाव', 'warje', 'वारजे', 'karvenagar', 'कर्वेनगर', 'bavdhan', 'बावधन'
  ];

  const isPickupLocal = puneKeywords.some(k => cleanPickup.includes(k)) || cleanPickup.includes('pune') || cleanPickup.includes('पुणे');
  const isDestLocal = puneKeywords.some(k => cleanDest.includes(k));

  if (isPickupLocal && isDestLocal) {
    distanceKm = 28;
    durationHours = 1.0;
    oneWayToll = 0;
    roundTripToll = 0;
    tollPlazas = 'No Toll Plaza (Local Pune City)';
  }

  const tollEstimate = isRoundTrip ? roundTripToll : oneWayToll;

  // Format hours and minutes
  const fullHours = Math.floor(durationHours);
  const minutes = Math.round((durationHours - fullHours) * 60);

  let durationEn = '';
  let durationMr = '';

  if (fullHours > 0 && minutes > 0) {
    durationEn = `~ ${fullHours} hr ${minutes} min`;
    durationMr = `~ ${fullHours} तास ${minutes} मिनिटे`;
  } else if (fullHours > 0) {
    durationEn = `~ ${fullHours} hrs`;
    durationMr = `~ ${fullHours} तास`;
  } else if (minutes > 0) {
    durationEn = `~ ${minutes} mins`;
    durationMr = `~ ${minutes} मिनिटे`;
  } else {
    durationEn = '--';
    durationMr = '--';
  }

  const pTitle = pickup ? (pickup.charAt(0).toUpperCase() + pickup.slice(1)) : 'Pune';
  const dTitle = destination ? (destination.charAt(0).toUpperCase() + destination.slice(1)) : 'Destination';

  return {
    distanceKm,
    durationHours,
    durationText: { en: durationEn, mr: durationMr },
    tollEstimate,
    oneWayToll,
    roundTripToll,
    tollPlazas,
    routeTitle: `${pTitle} → ${dTitle}`,
  };
}

/**
 * Calculates estimated cab fare based on vehicle type, distance and number of days
 */
export function getCabFareEstimate(vehicleType: string, distanceKm: number, days: number = 1): number {
  if (!distanceKm || distanceKm <= 0) {
    return 0;
  }

  let ratePerKm = 12; // Sedan default
  let minKmPerDay = 300;
  let driverAllowancePerDay = 350;

  const v = (vehicleType || '').toLowerCase();
  if (v.includes('suv') && !v.includes('luxury') && !v.includes('innova')) {
    ratePerKm = 15; // Ertiga
    driverAllowancePerDay = 400;
  } else if (v.includes('innova') || v.includes('luxury suv')) {
    ratePerKm = 18; // Innova Crysta
    driverAllowancePerDay = 400;
  } else if (v.includes('tempo') || v.includes('17')) {
    ratePerKm = 26; // Tempo 17
    driverAllowancePerDay = 500;
  } else if (v.includes('bus') || v.includes('20')) {
    ratePerKm = 32; // Bus 20
    driverAllowancePerDay = 600;
  } else if (v.includes('urbania')) {
    ratePerKm = 28; // Urbania
    driverAllowancePerDay = 500;
  }

  const validDays = Math.max(1, days);
  const minBillableKm = minKmPerDay * validDays;
  const actualKm = distanceKm * 2; // Roundtrip
  const billableKm = Math.max(minBillableKm, actualKm);
  return (billableKm * ratePerKm) + (driverAllowancePerDay * validDays);
}
