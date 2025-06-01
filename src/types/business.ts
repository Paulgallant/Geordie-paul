export interface BusinessCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  city: string;
  postcode: string;
  website: string;
  email: string;
  phone: string;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  images: string[];
  rating: number;
  reviews: number;
  walletAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessReview {
  id: string;
  businessId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
