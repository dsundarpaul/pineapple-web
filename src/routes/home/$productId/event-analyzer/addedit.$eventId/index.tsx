import { Button } from '@/components/ui/button';

import { ArrowLeft } from 'lucide-react';

import { createFileRoute, useNavigate, useParams, useRouter } from '@tanstack/react-router';

import { adminApi } from '@/api';
import Stepper from '@/components/shared/Stepper/Stepper';
import { useState } from 'react';
import BaseEventForm from './-components/Forms/BaseEventForm';
import SponsorshipForm from './-components/Forms/SponsorshipForm';

import { useToast } from '@/hooks/use-toast';

import { useMutation } from '@tanstack/react-query'
import { InferedBasicEventFromSchemaType } from '../-utils/event-types';

export const Route = createFileRoute('/home/$productId/event-analyzer/addedit/$eventId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId, eventId } = useParams({ from: '/home/$productId/event-analyzer/addedit/$eventId/' });

  const router = useRouter();
  const navigate = useNavigate()
  const { toast } = useToast()

  const [currentStep, setCurrentStep] = useState(0);

  const { mutate: mutateBasicEvent, isPending: isBasicEventSavePending } = useMutation({
    mutationFn: (data: InferedBasicEventFromSchemaType) => {
      return adminApi.post(`/events/products/${productId}`, data);
    },
    onMutate: () => {
      toast({ title: "Mutating Event" })
    },
    onError: (data: any) => {
      const errorDesc = data?.response?.data?.statusCode + ': ' + data?.response?.data?.message;

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong',
        description: errorDesc || 'someting todo'
      })
    },
    onSuccess: (data) => {
      console.log('data:', data)
      const newEventId = data?.data?.id;
      toast({ title: "Successfully Created Event" })
      
      if(!newEventId) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong',
          description: 'Event id is missing from the reponse',
        })
        return;
      }

      navigate({
        to: '/home/$productId/event-analyzer/addedit/$eventId/',
        params: { eventId: newEventId },
        replace: true
      })
      setCurrentStep(1)
    }
  })

  function onBaseEventFormSubmit(values: InferedBasicEventFromSchemaType) {
    console.log('Base Event Form Values:', values);
    mutateBasicEvent(values)
  }

  return (
    <div className='pb-6'>

      <div className='text-2xl font-bold flex items-center'>
        <Button type='button' variant='ghost' onClick={() => router.history.back()}>
          <ArrowLeft />
        </Button>
        <h1>{eventId === 'new' ? 'Craete Event' : 'Edit event'}</h1>
      </div>
      <div className='px-5'>
        <Stepper
          steps={[
            <BaseEventForm onBaseEventFormSubmit={onBaseEventFormSubmit} isBasicEventSavePending={isBasicEventSavePending} />,
            // <FormStep3
            //   form={form}
            //   handleFileUpload={handleFileUpload}
            // />,
            <SponsorshipForm />,
            <div>Step 3</div>,
          ]}
          stepsLabels={['Core Event Details', 'Speakers Details', 'Sponsorships Details']}
          currentStep={currentStep}
          onStepClick={(value) => setCurrentStep(value)}
          disableOtherSteps={eventId === 'new'}
        />
      </div>

    </div>
  );
}
