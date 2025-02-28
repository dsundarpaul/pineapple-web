import { z } from "zod"

export const CreateEditEventFormSchema = z.object({
  eventName: z.string().min(2).max(50),
  eventDescription: z.string().min(2).max(500),
  eventDateTime: z.string().min(2).max(50),
  eventLocation: z.string().min(2).max(50),
  eventOrganizer: z.string().min(2).max(50),
  eventCapacity: z.number().int().min(1).max(1000),
  eventTurnoutRatio: z.number().int().min(1).max(100),
  eventRSVPfilename: z.string().min(2).max(50),
  speakers: z.array(z.object({
    speakerName: z.string().min(2).max(50),
    speakerBio: z.string().min(2).max(500).optional(),
    speakerPhoto: z.string().min(2).max(50).optional(),
    speakerCompany: z.string().min(2).max(50).optional(),
    speakerTitle: z.string().min(2).max(50).optional(),
    speakerEmail: z.string().min(2).max(50).optional(),
    speakerSocials: z.array(z.object({
      socialName: z.string().min(2).max(50),
      socialLink: z.string().min(2).max(50),
    }).nonstrict()).min(1).max(10).optional(),
  }).nonstrict()).min(1).max(10),
  sponsors: z.array(z.object({
    sponsorName: z.string().min(2).max(50),
    sponsorLogo: z.string().min(2).max(50).optional(),
    sponsorWebsite: z.string().min(2).max(50).optional(),
  }).nonstrict()).min(1).max(10).optional(),
})
