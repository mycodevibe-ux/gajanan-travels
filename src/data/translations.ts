export type Language = 'en' | 'mr';

export interface Translations {
  // Navigation
  nav_home: string;
  nav_about: string;
  nav_fleet: string;
  nav_services: string;
  nav_reviews: string;
  nav_contact: string;
  nav_book_now: string;

  // Hero Section
  hero_title_1: string;
  hero_title_2: string;
  hero_subtitle: string;
  hero_btn_book: string;
  hero_pill_clean: string;
  hero_pill_drivers: string;
  hero_pill_inclusive: string;
  hero_badge_trips: string;
  hero_badge_experience: string;

  // Plan Ride Search Form
  search_title: string;
  search_pickup: string;
  search_pickup_placeholder: string;
  search_drop: string;
  search_drop_placeholder: string;
  search_pickup_date: string;
  search_drop_date: string;
  search_passengers: string;
  search_vehicle_type: string;
  search_btn: string;

  // About Story
  about_tag: string;
  about_title: string;
  about_desc: string;
  about_feat_1_title: string;
  about_feat_1_desc: string;
  about_feat_2_title: string;
  about_feat_2_desc: string;
  about_feat_3_title: string;
  about_feat_3_desc: string;

  // Vehicles Fleet Section
  fleet_tag: string;
  fleet_title: string;
  fleet_subtitle: string;
  fleet_tab_all: string;
  fleet_tab_sedan: string;
  fleet_tab_suv: string;
  fleet_tab_tempo: string;
  fleet_tab_bus: string;
  fleet_per_km: string;
  fleet_starting_at: string;
  fleet_seating: string;
  fleet_luggage: string;
  fleet_fuel: string;
  fleet_btn_details: string;
  fleet_btn_book: string;

  // Services Section
  services_tag: string;
  services_title: string;
  services_subtitle: string;
  service_outstation_title: string;
  service_outstation_desc: string;
  service_local_title: string;
  service_local_desc: string;
  service_group_title: string;
  service_group_desc: string;
  service_corporate_title: string;
  service_corporate_desc: string;
  service_family_title: string;
  service_family_desc: string;
  service_support_title: string;
  service_support_desc: string;

  // Why Choose Us
  why_tag: string;
  why_title: string;
  why_card_1_title: string;
  why_card_1_desc: string;
  why_card_2_title: string;
  why_card_2_desc: string;
  why_card_3_title: string;
  why_card_3_desc: string;
  why_card_4_title: string;
  why_card_4_desc: string;

  // Reviews
  reviews_tag: string;
  reviews_title: string;
  reviews_google: string;

  // FAQ
  faq_tag: string;
  faq_title: string;
  faq_subtitle: string;

  // Contact
  contact_tag: string;
  contact_title: string;
  contact_subtitle: string;
  contact_form_name: string;
  contact_form_phone: string;
  contact_form_date: string;
  contact_form_vehicle: string;
  contact_form_pickup: string;
  contact_form_dest: string;
  contact_form_notes: string;
  contact_btn_send: string;

  // Footer
  footer_tagline: string;
  footer_quick_links: string;
  footer_popular_routes: string;
  footer_office: string;
  footer_copyright: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    nav_home: 'HOME',
    nav_about: 'ABOUT',
    nav_fleet: 'FLEET',
    nav_services: 'SERVICES',
    nav_reviews: 'REVIEWS',
    nav_contact: 'CONTACT',
    nav_book_now: 'BOOK NOW',

    // Hero Section
    hero_title_1: 'YOUR JOURNEY,',
    hero_title_2: 'OUR RESPONSIBILITY.',
    hero_subtitle: 'Outstation trips, local city travel, and group tours – all at your service. Clean cars, transparent per-km billing, and drivers who know every turn.',
    hero_btn_book: 'Book your ride',
    hero_pill_clean: 'Clean sanitized vehicles',
    hero_pill_drivers: 'Road-tested drivers',
    hero_pill_inclusive: 'All-inclusive options',
    hero_badge_trips: 'Happy Trips',
    hero_badge_experience: 'Years on the road',

    // Search Form
    search_title: 'Plan your ride',
    search_pickup: 'Pickup location',
    search_pickup_placeholder: 'Enter pickup location',
    search_drop: 'Drop location',
    search_drop_placeholder: 'Enter drop location',
    search_pickup_date: 'Pickup date',
    search_drop_date: 'Drop date',
    search_passengers: 'Passengers',
    search_vehicle_type: 'Vehicle type',
    search_btn: 'Search',

    // About Story
    about_tag: 'ABOUT GAJANAN TRAVELS',
    about_title: 'Built by drivers who love the road.',
    about_desc: 'Founded with a passion for punctuality, safety, and transparent fares. We take pride in spotless AC cabs, well-mannered chauffeurs, and 24/7 dedicated support across Maharashtra.',
    about_feat_1_title: 'Honest transparent pricing',
    about_feat_1_desc: 'No hidden surge pricing or surprise toll bills at trip end.',
    about_feat_2_title: 'Verified & trained drivers',
    about_feat_2_desc: 'Experienced highway professionals with complete background checks.',
    about_feat_3_title: '24/7 on-road assistance',
    about_feat_3_desc: 'Live vehicle tracking and support from pickup to final drop.',

    // Vehicles Fleet
    fleet_tag: 'OUR VEHICLES',
    fleet_title: 'Our Fleet',
    fleet_subtitle: 'Sedans to 20-seater buses — all cleaned, serviced, and AC ready.',
    fleet_tab_all: 'All vehicles',
    fleet_tab_sedan: 'Sedans',
    fleet_tab_suv: 'SUVs & MUVs',
    fleet_tab_tempo: 'Tempo Travellers',
    fleet_tab_bus: 'Tourist Buses',
    fleet_per_km: '/ KM',
    fleet_starting_at: 'Starting at',
    fleet_seating: 'Seats',
    fleet_luggage: 'Bags',
    fleet_fuel: 'Fuel',
    fleet_btn_details: 'View details',
    fleet_btn_book: 'Book this car',

    // Services
    services_tag: 'OUR SERVICES',
    services_title: 'What we offer',
    services_subtitle: 'From local city rentals to multi-day outstation family tours, we handle it all.',
    service_outstation_title: 'Outstation trips',
    service_outstation_desc: 'Goa, Mahabaleshwar, Shirdi, Konkan and all outstation destinations.',
    service_local_title: 'Local rental',
    service_local_desc: 'Flexible hourly or full-day sanitized cab rentals within Pune.',
    service_group_title: 'Group travel',
    service_group_desc: '17 to 20 seater luxury tempo travellers & buses for group tours.',
    service_corporate_title: 'Corporate travel',
    service_corporate_desc: 'Reliable executive employee transit and VIP corporate travel.',
    service_family_title: 'Family tours',
    service_family_desc: 'Comfortable, spacious AC rides with courteous verified drivers.',
    service_support_title: '24/7 support',
    service_support_desc: 'Instant booking confirmation and dedicated round-the-clock support.',

    // Why Choose Us
    why_tag: 'WHY CHOOSE US?',
    why_title: 'Why choose Gajanan Travels',
    why_card_1_title: 'Zero surge pricing',
    why_card_1_desc: 'Fixed, fair tariffs with zero midnight surge surprises.',
    why_card_2_title: 'Spotless clean cars',
    why_card_2_desc: 'Sanitized cabins, chilled AC, and comfortable seating.',
    why_card_3_title: 'Courteous drivers',
    why_card_3_desc: 'Police verified, non-smoking, professional highway drivers.',
    why_card_4_title: 'Punctual on-time pickup',
    why_card_4_desc: 'Cab arrives 15 minutes before your scheduled departure.',

    // Reviews
    reviews_tag: 'TESTIMONIALS',
    reviews_title: 'What our customers say',
    reviews_google: '4.9/5 Rating based on 1,850+ Google Reviews',

    // FAQ
    faq_tag: 'COMMON QUESTIONS',
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'Got questions? We have answers to help you plan with confidence.',

    // Contact
    contact_tag: 'PLAN YOUR TRIP',
    contact_title: 'Plan your trip',
    contact_subtitle: 'Tell us where you want to go. We will confirm your ride within minutes.',
    contact_form_name: 'Your name',
    contact_form_phone: 'Phone number',
    contact_form_date: 'Travel date',
    contact_form_vehicle: 'Preferred vehicle',
    contact_form_pickup: 'Pickup location',
    contact_form_dest: 'Destination',
    contact_form_notes: 'Additional notes or requirements',
    contact_btn_send: 'Send inquiry on WhatsApp',

    // Footer
    footer_tagline: 'Pune’s premier tourist taxi and bus rental service for outstation tours, local travel, and group trips.',
    footer_quick_links: 'Quick links',
    footer_popular_routes: 'Popular routes',
    footer_office: 'Office address',
    footer_copyright: 'All rights reserved.',
  },

  mr: {
    // Navigation
    nav_home: 'मुख्यपृष्ठ',
    nav_about: 'आमच्याबद्दल',
    nav_fleet: 'आमचा ताफा',
    nav_services: 'आमच्या सेवा',
    nav_reviews: 'अभिप्राय',
    nav_contact: 'संपर्क',
    nav_book_now: 'गाडी बुक करा',

    // Hero Section
    hero_title_1: 'तुमचा प्रवास,',
    hero_title_2: 'आमची जबाबदारी.',
    hero_subtitle: 'पुण्याबाहेरचे आऊटस्टेशन प्रवास, स्थानिक शहरात फिरणे आणि ग्रुप ट्रॅव्हल – सर्व काही तुमच्या सेवेत. स्वच्छ गाड्या, पारदर्शक बिलिंग आणि अनुभवी ड्रायव्हर्स.',
    hero_btn_book: 'गाडी बुक करा',
    hero_pill_clean: 'स्वच्छ व सॅनिटाईझ्ड गाड्या',
    hero_pill_drivers: 'अनुभवी व विश्वासू ड्रायव्हर्स',
    hero_pill_inclusive: 'सर्वसमावेशक पॅकेजेस',
    hero_badge_trips: 'यशस्वी सहली',
    hero_badge_experience: 'वर्षांचा अखंड अनुभव',

    // Search Form
    search_title: 'तुमचा प्रवास प्लॅन करा',
    search_pickup: 'पिकअप ठिकाण',
    search_pickup_placeholder: 'उदा. पुणे, स्वारगेट, कोथरूड',
    search_drop: 'ड्रॉप ठिकाण',
    search_drop_placeholder: 'उदा. महाबळेश्वर, गोवा, शिर्डी',
    search_pickup_date: 'प्रवासाची तारीख',
    search_drop_date: 'परतीची तारीख',
    search_passengers: 'प्रवासी संख्या',
    search_vehicle_type: 'गाडीचा प्रकार',
    search_btn: 'शोधा',

    // About Story
    about_tag: 'गजानन ट्रॅव्हल्स बद्दल',
    about_title: 'रस्त्यांची उत्तम माहिती असलेल्या चालकांनी सुरू केलेले.',
    about_desc: 'वेळेचे काटेकोर नियोजन, सुरक्षितता आणि पारदर्शक दर हीच आमची ओळख. संपूर्ण महाराष्ट्रात दर्जेदार एसी गाड्या आणि २४ तास तत्पर सेवेचा विश्वास.',
    about_feat_1_title: 'पारदर्शक आणि योग्य दर',
    about_feat_1_desc: 'कोणतेही छुपे शुल्क नाही, पूर्णपणे पारदर्शक बिलिंग.',
    about_feat_2_title: 'प्रशिक्षित आणि अनुभवी चालक',
    about_feat_2_desc: 'महामार्गांची खडान् खडा माहिती असलेले नम्र चालक.',
    about_feat_3_title: '२४/७ ऑन-रोड मदत',
    about_feat_3_desc: 'संपूर्ण प्रवासात थेट संपर्क आणि सुरक्षा सहाय्य.',

    // Vehicles Fleet
    fleet_tag: 'आमचा ताफा',
    fleet_title: 'आमच्या उपलब्ध गाड्या',
    fleet_subtitle: 'सेडान पासून २०-सीटर लक्झरी बसेस — सर्व सुस्थितीत आणि एसी सज्ज.',
    fleet_tab_all: 'सर्व गाड्या',
    fleet_tab_sedan: 'सेडान (Dzire)',
    fleet_tab_suv: 'एसयूव्ही (Ertiga/Innova)',
    fleet_tab_tempo: 'टेम्पो ट्रॅव्हलर (१७ सीटर)',
    fleet_tab_bus: 'टूरिस्ट बस (२० सीटर)',
    fleet_per_km: '/ किमी',
    fleet_starting_at: 'सुरुवातीचे दर',
    fleet_seating: 'आसने',
    fleet_luggage: 'बॅग्स',
    fleet_fuel: 'इंधन',
    fleet_btn_details: 'माहिती पहा',
    fleet_btn_book: 'ही गाडी बुक करा',

    // Services
    services_tag: 'आमच्या सेवा',
    services_title: 'आम्ही देतो त्या खास सेवा',
    services_subtitle: 'स्थानिक पुणे शहरापासून ते कौटुंबिक आऊटस्टेशन सहलींपर्यंत सर्व काही.',
    service_outstation_title: 'आऊटस्टेशन सहली',
    service_outstation_desc: 'गोवा, महाबळेश्वर, शिर्डी, कोकण आणि सर्व तीर्थक्षेत्र सहली.',
    service_local_title: 'स्थानिक पुणे प्रवास',
    service_local_desc: 'तास किंवा संपूर्ण दिवसासाठी पुण्यात सोयीस्कर कॅब.',
    service_group_title: 'ग्रुप व कौटुंबिक प्रवास',
    service_group_desc: '१७ ते २० सीटर लक्झरी टेम्पो ट्रॅव्हलर व टूरिस्ट बसेस.',
    service_corporate_title: 'कॉर्पोरेट प्रवास',
    service_corporate_desc: 'कंपन्या आणि व्हीआयपी पाहुण्यांसाठी दर्जेदार कार सेवा.',
    service_family_title: 'कौटुंबिक सहली',
    service_family_desc: 'कुटुंबासोबत आरामदायक आणि सुरक्षित प्रवासाची हमी.',
    service_support_title: '२४/७ कस्टमर सपोर्ट',
    service_support_desc: 'त्वरित बुकिंग आणि २४ तास तत्पर फोन सपोर्ट.',

    // Why Choose Us
    why_tag: 'गजानन ट्रॅव्हल्स का निवडावे?',
    why_title: 'विश्वासू आणि सुरक्षित प्रवासाची हमी',
    why_card_1_title: 'वाजवी व निश्चित दर',
    why_card_1_desc: 'कोणतीही छुपी दरवाढ नाही, स्पष्ट व पारदर्शक दरपत्रक.',
    why_card_2_title: 'चकाचक स्वच्छ गाड्या',
    why_card_2_desc: 'सॅनिटाईझ्ड इंटिरिअर, थंड एसी आणि आरामदायी सीट्स.',
    why_card_3_title: 'नम्र आणि अनुभवी ड्रायव्हर्स',
    why_card_3_desc: 'वेळेवर पोहोचणारे, निर्व्यसनी आणि सुरक्षित चालवणारे ड्रायव्हर्स.',
    why_card_4_title: 'काटेकोर वेळेचे पालन',
    why_card_4_desc: 'गाडी ठरलेल्या वेळेच्या १५ मिनिटे आधी दारात हजर.',

    // Reviews
    reviews_tag: 'ग्राहकांचे अभिप्राय',
    reviews_title: 'आमचे समाधानी ग्राहक काय म्हणतात',
    reviews_google: '४.९/५ रेटिंग (१,८५०+ गुगल रिव्ह्यूजवर आधारित)',

    // FAQ
    faq_tag: 'वारंवार विचारले जाणारे प्रश्न',
    faq_title: 'नेहमी विचारले जाणारे प्रश्न (FAQ)',
    faq_subtitle: 'काही शंका आहेत? प्रवासाचे नियोजन सोपे करण्यासाठी उत्तरे येथे आहेत.',

    // Contact
    contact_tag: 'प्रवासाचे नियोजन',
    contact_title: 'तुमचा प्रवास प्लॅन करा',
    contact_subtitle: 'तुम्हाला कुठे जायचे आहे ते सांगा, आम्ही काही मिनिटांत दर व गाडी कन्फर्म करू.',
    contact_form_name: 'तुमचे नाव',
    contact_form_phone: 'मोबाईल नंबर',
    contact_form_date: 'प्रवासाची तारीख',
    contact_form_vehicle: 'गाडीची निवड',
    contact_form_pickup: 'पिकअप ठिकाण',
    contact_form_dest: 'जाण्याचे ठिकाण',
    contact_form_notes: 'काही विशेष सूचना किंवा माहिती',
    contact_btn_send: 'व्हॉट्सॲपवर माहिती पाठवा',

    // Footer
    footer_tagline: 'पुण्यातील आघाडीची टूरिस्ट टॅक्सी आणि बस भाडेतत्त्व सेवा — आऊटस्टेशन व कौटुंबिक सहलींसाठी.',
    footer_quick_links: 'महत्त्वाचे दुवे',
    footer_popular_routes: 'लोकप्रिय मार्ग',
    footer_office: 'कार्यालयाचा पत्ता',
    footer_copyright: 'सर्व हक्क राखीव.',
  },
};
