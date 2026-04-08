export interface Mountain {
  id: string;
  name: string;
  location: string;
  province: string;
  elevation: number;
  description: string;
  image: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  accommodation?: string;
  meals?: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  tripDate: string;
}

export interface Trip {
  id: string;
  mountain: Mountain;
  title: string;
  description: string;
  duration: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Expert';
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  departureDates: string[];
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  whatToBring: string[];
  images: string[];
  reviews: Review[];
  location: string;
  elevationGain: number;
  terrainType: string[];
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  description?: string;
  options: PollOption[];
  createdBy: string;
  createdByName: string;
  createdAt: string;
  deadline: string;
  isActive: boolean;
  totalVotes: number;
  allowMultiple: boolean;
  userVotedOptions: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface UserStats {
  tripsCompleted: number;
  peaksClimbed: number;
  distanceClimbed: number;
  totalDistance: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  role: 'member' | 'moderator' | 'admin';
  joinedAt: string;
  stats: UserStats;
  achievements: Achievement[];
  savedTrips: string[];
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'member' | 'moderator' | 'admin';
  title: string;
  content: string;
  category: 'Tips & Tricks' | 'Trip Report' | 'Question' | 'Gear Review' | 'Discussion';
  tags: string[];
  images?: string[];
  createdAt: string;
  updatedAt?: string;
  likes: number;
  comments: number;
  isPinned: boolean;
  userLiked: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export interface Booking {
  id: string;
  tripId: string;
  tripTitle: string;
  userId: string;
  userName: string;
  participants: number;
  totalPrice: number;
  selectedDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  contactEmail: string;
  contactPhone: string;
}

export interface GalleryItem {
  id: string;
  tripId?: string;
  tripName?: string;
  image: string;
  caption: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  likes: number;
  tags: string[];
}
