import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, Trash2Icon } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';

const SponsorshipForm = () => {
  const form = useForm({})

  const {
    fields: sponsorFields,
    append: appendSponsor,
    remove: removeSponsor,
  } = useFieldArray({
    control: form.control,
    name: 'sponsors',
  });

  return (
    <div>
      {/* Sponsors Section */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium'>Sponsors</h3>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={() =>
              appendSponsor({
                sponsorName: '',
                sponsorLogo: '',
                sponsorWebsite: '',
              })
            }
          >
            <Plus className='w-4 h-4 mr-2' />
            Add Sponsor
          </Button>
        </div>

        {sponsorFields.map((field, index) => (
          <div key={field.id} className='p-4 border rounded-lg space-y-4'>
            <div className='flex justify-end'>
              <Button type='button' variant='outline' size='sm' onClick={() => removeSponsor(index)}>
                <Trash2Icon className='text-red-700' /> Remove Speaker
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
              render={() => (
                <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                  <FormLabel className='w-1/3 text-lg'>Logo</FormLabel>
                  <div className='w-full'>
                    <FormControl>
                      <Input type='file' onChange={(e) => console.log(e)} />
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
                      <Input {...field} type='url' />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorshipForm;
