import { VIEW_MODE } from "../constants";

export type VIEW_MODE_TYPE = (typeof VIEW_MODE)[keyof typeof VIEW_MODE]

export type Product = {
  id: string;
  productName: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  viewMode: VIEW_MODE_TYPE;
}

export type User = {
  avatar?: string 
  blockedFrom?: string 
  createdAt?: string | Date
  deletedAt?: string | Date
  email: string
  id: string
  internalComment?: string
  isActive : boolean
  isArchived : boolean
  name: string
  phone?: string
  type: string
  updatedAt?: string | Date
  userId: string
}


export type Event = {
  createdBy: User
  deletedAt?: string | Date
  eventAgenda?: string
  eventDescription?: string
  eventEndDateTime: string | Date
  eventLocation?: string
  eventName?: string 
  eventStartDateTime: string | Date
  eventVenue?: string
  eventVenueCapacity: number 
  id: string
  internalComment?: string
  isActive: boolean 
  isArchived: boolean
  rsvpList?: object[] 
  speakers?: object[]
  updatedAt?: string | User
  updatedBy?: string | User
}

export type EventStat = {
  key: string
  label: string
  value: number 
  percentageChange: number
}