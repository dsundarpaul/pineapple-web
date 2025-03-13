import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DateTimePicker } from '@/components/ui/date-time-picker'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { ArrowLeft, Plus, PlusIcon, Trash2Icon } from 'lucide-react'

import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute, useParams, useRouter } from '@tanstack/react-router'
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { CreateEditEventFormSchema } from '@/utils/formSchemas/event-analyzer.formschema'

export const Route = createFileRoute('/dashboard/event-analyzer/addedit/$eventId/')({
  component: RouteComponent,
})

const socialPlatforms = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
  { value: "github", label: "GitHub" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
];

function RouteComponent() {
  const { eventId } = useParams({ from: '/dashboard/event-analyzer/addedit/$eventId/' })
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateEditEventFormSchema>>({
    resolver: zodResolver(CreateEditEventFormSchema),
    reValidateMode: "onBlur",
    defaultValues: {
      eventName: "",
      eventDescription: "",
      eventDateTime: "",
      eventLocation: "",
      eventOrganizer: "",
      // eventCapacity: 100,
      // eventTurnoutRatio: 100,
      eventRSVPfilename: "",
      speakers: [{
        speakerName: "",
        speakerBio: "",
        speakerPhoto: "",
        speakerCompany: "",
        speakerTitle: "",
        speakerEmail: "",
        speakerSocials: [{ socialName: "", socialLink: "" }]
      }],
      sponsors: []
    },
  })

  const { fields: speakerFields, append: appendSpeaker, remove: removeSpeaker } = 
    useFieldArray({
      control: form.control,
      name: "speakers"
    });

  const { fields: sponsorFields, append: appendSponsor, remove: removeSponsor } = 
    useFieldArray({
      control: form.control,
      name: "sponsors"
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      field.onChange(file.name); // For now just storing filename
    }
  };

  function onSubmit(values: z.infer<typeof CreateEditEventFormSchema>) {
    console.log(values)
  }
  
  return (
    <div className='pb-6'>
      <div className='text-2xl font-bold flex items-center'>
        <Button type='button' variant='ghost' onClick={() => router.history.back()}>
          <ArrowLeft />
        </Button>
        <h1>
          {eventId === 'new' ? 'Craete Event' : 'Edit event'}
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='eventName'
            render={({ field }) => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Event Name</FormLabel>
                <div className='w-full'>
                  <FormControl >
                    <Input {...field} placeholder='e.g., Tech Conference 2025' />
                  </FormControl>
                  <FormDescription>The official name of your event. Keep it clear and memorable.</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="eventDescription"
            render={({ field }) => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Event Description</FormLabel>
                <div className='w-full'>
                  <FormControl>
                    <Textarea {...field} placeholder='e.g., 123 Conference Center Dr. or Virtual Link' />
                  </FormControl>
                  <FormDescription>A detailed description of your event. Include key highlights, agenda, and what attendees can expect.</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDateTime"
            render={() => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Date and Time</FormLabel>
                <div className='w-full'>
                  <div className='flex gap-3 w-full'>
                    <DateTimePicker />
                    <DateTimePicker />
                  </div>
                  <FormDescription>When will your event take place? Include start time and expected duration.</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventLocation"
            render={({ field }) => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Location</FormLabel>
                <div className='w-full'>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Physical address or virtual meeting link for your event.</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventOrganizer"
            render={({ field }) => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Organizer</FormLabel>
                <div className='w-full'>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventCapacity"
            render={({ field }) => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Capacity</FormLabel>
                <div className='w-full'>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                  </FormControl>
                  <FormDescription>Maximum number of attendees that can participate in the event.</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventTurnoutRatio"
            render={({ field }) => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Expected Turnout Ratio (%)</FormLabel>
                <div className='w-full'>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Expected percentage of registered attendees who will actually attend (1-100%).</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventRSVPfilename"
            render={({ field }) => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>RSVP List</FormLabel>
                <div className='w-full'>
                  <FormControl>
                    <Input 
                      type="file" 
                      onChange={(e) => handleFileUpload(e, field)}
                      />
                  </FormControl>
                  <FormDescription>Upload a file containing the list of registered attendees. Accepted formats: CSV, Excel"</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
       

          {/* Speakers Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Speakers</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendSpeaker({
                  speakerName: "",
                  speakerBio: "",
                  speakerPhoto: "",
                  speakerCompany: "",
                  speakerTitle: "",
                  speakerEmail: "",
                  speakerSocials: []
                })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Speaker
              </Button>
            </div>

            {speakerFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-end">
                  {index > 0 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeSpeaker(index)}>
                      <Trash2Icon className='text-red-700'/> Remove Speaker
                    </Button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name={`speakers.${index}.speakerName`}
                  render={({ field }) => (
                    <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                      <FormLabel className='w-1/3 text-lg'>Speaker Name</FormLabel>
                      <div className='w-full'>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`speakers.${index}.speakerBio`}
                  render={({ field }) => (
                    <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                      <FormLabel className='w-1/3 text-lg'>Bio</FormLabel>
                      <div className='w-full'>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`speakers.${index}.speakerPhoto`}
                  render={({ field }) => (
                    <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                      <FormLabel className='w-1/3 text-lg'>Photo</FormLabel>
                      <div className='w-full'>
                        <FormControl>
                          <Input 
                            type="file" 
                            onChange={(e) => handleFileUpload(e, field)}
                            />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Speaker Socials */}
                <div className="space-y-2">
                  <FormLabel className='w-1/3 text-lg'>Social Media</FormLabel>
                  <div className="space-y-2">
                    {form.watch(`speakers.${index}.speakerSocials`)?.map((_, socialIndex) => (
                      <div key={socialIndex} className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`speakers.${index}.speakerSocials.${socialIndex}.socialName`}
                          render={({ field }) => (
                            <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                              <div className='w-full'>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select platform" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {socialPlatforms.map((platform) => (
                                      <SelectItem
                                        key={platform.value}
                                        value={platform.value}
                                      >
                                        {platform.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`speakers.${index}.speakerSocials.${socialIndex}.socialLink`}
                          render={({ field }) => (
                            <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                              <div className='w-full'>
                                <FormControl>
                                  <Input {...field} placeholder="Profile URL" />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => form.trigger()}
                        >
                          <PlusIcon />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => form.trigger()}
                        >
                          <Trash2Icon className='text-red-700'/>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sponsors Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Sponsors</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendSponsor({
                  sponsorName: "",
                  sponsorLogo: "",
                  sponsorWebsite: ""
                })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Sponsor
              </Button>
            </div>

            {sponsorFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-end">
                  <Button type="button" variant="outline" size="sm" onClick={() => removeSponsor(index)}>
                    <Trash2Icon className='text-red-700'/> Remove Speaker
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name={`sponsors.${index}.sponsorName`}
                  render={({ field }) => (
                    <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                      <FormLabel className='w-1/3 text-lg'>Name</FormLabel>
                      <div className='w-full'>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`sponsors.${index}.sponsorLogo`}
                  render={({ field }) => (
                    <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                      <FormLabel className='w-1/3 text-lg'>Logo</FormLabel>
                      <div className='w-full'>
                        <FormControl>
                          <Input 
                            type="file" 
                            onChange={(e) => handleFileUpload(e, field)}
                            />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`sponsors.${index}.sponsorWebsite`}
                  render={({ field }) => (
                    <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                      <FormLabel className='w-1/3 text-lg'>Website</FormLabel>
                      <div className='w-full'>
                        <FormControl>
                          <Input {...field} type="url" />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <div className='flex justify-end space-x-4'>
            <Button type='button' variant={'outline'} onClick={() => router.history.back()}>Cancel</Button>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
