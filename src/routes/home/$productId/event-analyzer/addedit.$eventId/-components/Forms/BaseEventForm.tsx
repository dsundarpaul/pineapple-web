import RangeDatePicker from '@/components/shared/RangeDatePicker/RangeDatePicker';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BasicEventFromSchema } from '@/utils/formSchemas/event-analyzer.formschema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { InferedBasicEventFromSchemaType } from '../../../-utils/event-types';

type BaseEventFormProps = {
  onBaseEventFormSubmit: (data: InferedBasicEventFromSchemaType) => void;
  isBasicEventSavePending: boolean;
}
const BaseEventForm = ({ onBaseEventFormSubmit, isBasicEventSavePending }: BaseEventFormProps) => {
  const { eventId } = useParams({ from: '/home/$productId/event-analyzer/addedit/$eventId/' });
  const router = useRouter();

  const form = useForm<InferedBasicEventFromSchemaType>({
    resolver: zodResolver(BasicEventFromSchema),
    defaultValues: {
      eventName: '',
      eventDescription: '',
      eventStartDateTime: new Date(),
      eventEndDateTime: new Date(),
      eventLocation: '',
      // eventOrganizer: '',
      eventVenueCapacity: 100,
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log('Uploaded file:', file);
    }
  };


  const handleAutoFillForm = () => {
    form.setValue('eventName', 'New auto event name')
    form.setValue('eventDescription', 'New auto event description')
    form.setValue('eventAgenda', 'New auto event agenda')
    form.setValue('eventStartDateTime', new Date())
    form.setValue('eventEndDateTime', new Date())
    form.setValue('eventLocation', 'New auto event Location')
    form.setValue('eventVenue', 'New auto event venue')
    form.setValue('eventVenueCapacity', 100)
  }

  console.log('base event form errors:', form.formState.errors);

  return (
    <div className=''>
      <Button variant={'link'} onClick={() => handleAutoFillForm()}>Auto fill form</Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => onBaseEventFormSubmit(data))} className='space-y-4'>
          <FormField
            control={form.control}
            name='eventName'
            render={({ field }) => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Event Name</FormLabel>
                <div className='w-full'>
                  <FormControl>
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
            name='eventDescription'
            render={({ field }) => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Event Description</FormLabel>
                <div className='w-full'>
                  <FormControl>
                    <Textarea {...field} placeholder='e.g., 123 Conference Center Dr. or Virtual Link' />
                  </FormControl>
                  <FormDescription>
                    A detailed description of your event. Include key highlights, agenda, and what attendees can expect.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='eventAgenda'
            render={({ field }) => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Event Agenda</FormLabel>
                <div className='w-full'>
                  <FormControl>
                    <Textarea {...field} placeholder='e.g., 123 Conference Center Dr. or Virtual Link' />
                  </FormControl>
                  <FormDescription>
                    A detailed Agenda of your event. Include key highlights, agenda, and what attendees can expect.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/*<FormField
            control={form.control}
            name='eventDateTime'
            render={() => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Date and Time</FormLabel>
                <div className='w-full'>
                  <RangeDatePicker />
                  <FormDescription>
                    When will your event take place? Include start time and expected duration.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />*/}

          <FormField
            control={form.control}
            name='eventLocation'
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
            name='eventVenue'
            render={({ field }) => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Event Venue</FormLabel>
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

          {/*<FormField
            control={form.control}
            name='eventOrganizer'
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
          />*/}

          <FormField
            control={form.control}
            name='eventVenueCapacity'
            render={({ field }) => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Capacity</FormLabel>
                <div className='w-full'>
                  <FormControl>
                    <Input type='number' {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormDescription>Maximum number of attendees that can participate in the event.</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name='eventTurnoutRatio'
            render={({ field }) => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>Expected Turnout Ratio (%)</FormLabel>
                <div className='w-full'>
                  <FormControl>
                    <Input type='number' {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormDescription>
                    Expected percentage of registered attendees who will actually attend (1-100%).
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />*/}

          {/*<FormField
            control={form.control}
            name='eventRSVPfilename'
            render={() => (
              <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                <FormLabel className='w-1/3 text-lg'>RSVP List</FormLabel>
                <div className='w-full'>
                  <FormControl>
                    <Input type='file' onChange={(e) => handleFileUpload(e)} />
                  </FormControl>
                  <FormDescription>
                    Upload a file containing the list of registered attendees. Accepted formats: CSV, Excel"
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />*/}
          
          <div className='flex justify-end space-x-4'>
            <Button type='button' variant={'outline'} onClick={() => router.history.back()}>
              Cancel
            </Button>
            <Button type='submit' disabled={isBasicEventSavePending}>
              {eventId === 'new' ? 'Submit' : 'Update'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BaseEventForm;
