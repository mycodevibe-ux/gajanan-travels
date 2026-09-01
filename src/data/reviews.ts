export interface ReviewItem {
  id: number;
  name: string;
  trip: string;
  avatar: string;
  avatarImg?: string;
  comment: string;
  rating: number;
  car?: string;
  date?: string;
}

export const initialReviewsData: ReviewItem[] = [
  {
    id: 1,
    name: 'Rahul Mehta',
    trip: 'Pune → Mahabaleshwar',
    avatar: 'RM',
    avatarImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    comment: 'Driver was on time and the car was very comfortable for our hill trip. Highly recommended Gajanan Travels.',
    rating: 5,
    car: 'Ertiga',
    date: '2 days ago',
  },
  {
    id: 2,
    name: 'Sneha Kulkarni',
    trip: 'Pune → Goa',
    avatar: 'SK',
    avatarImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    comment: 'Very good experience with Gajanan Travels. Clean car and polite driver. Will book again.',
    rating: 5,
    car: 'Innova Crysta',
    date: '1 week ago',
  },
  {
    id: 3,
    name: 'Vikram Patil',
    trip: 'Pune → Shirdi',
    avatar: 'VP',
    avatarImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    comment: 'Booked the 20-seater for a family pilgrimage trip — spacious and the whole day ran smoothly.',
    rating: 5,
    car: 'Tata 20 Seater Bus',
    date: '2 weeks ago',
  },
  {
    id: 4,
    name: 'Pooja Deshmukh',
    trip: 'Pune → Mumbai Airport Drop',
    avatar: 'PD',
    avatarImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    comment: 'Booked for early morning 4 AM Mumbai Airport drop. Driver arrived 15 mins early, drove very safely on Expressway. Excellent service!',
    rating: 5,
    car: 'Swift Dzire',
    date: '3 days ago',
  },
  {
    id: 5,
    name: 'Amit Sharma',
    trip: 'Pune → Lonavala & Khandala',
    avatar: 'AS',
    avatarImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    comment: 'Family weekend getaway to Lonavala was hassle-free. The Innova Crysta was spotless, AC was chilled, and driver knew best scenic spots.',
    rating: 5,
    car: 'Innova Crysta',
    date: '5 days ago',
  },
  {
    id: 6,
    name: 'Aniket Joshi',
    trip: 'Pune Local (8 Hr / 80 Km)',
    avatar: 'AJ',
    avatarImg: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    comment: 'Rented Ertiga for full day local family shopping & temple visits. Driver was very patient and parking was handled smoothly. Great pricing!',
    rating: 5,
    car: 'Ertiga',
    date: '1 week ago',
  },
];
