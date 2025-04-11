/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, PlusIcon, Trash2Icon } from "lucide-react"
import { useFieldArray } from "react-hook-form"

const socialPlatforms = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
  { value: "github", label: "GitHub" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
];

type FormStep3Props = {
  form: any; // Replace with the actual type of your form
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, field: any) => void; // Replace with the actual type of your file upload handler
};

const FormStep3 = ({ form, handleFileUpload }: FormStep3Props) => {

  const {
    fields: speakerFields,
    append: appendSpeaker,
    remove: removeSpeaker,
  } = useFieldArray({
    control: form.control,
    name: 'speakers',
  });

  return (
    <div>
      {/* Speakers Section */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium'>Speakers</h3>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={() =>
              appendSpeaker({
                speakerName: '',
                speakerBio: '',
                speakerPhoto: '',
                speakerCompany: '',
                speakerTitle: '',
                speakerEmail: '',
                speakerSocials: [],
              })
            }
          >
            <Plus className='w-4 h-4 mr-2' />
            Add Speaker
          </Button>
        </div>

        {speakerFields.map((field, index) => (
          <div key={field.id} className='p-4 border rounded-lg space-y-4'>
            <div className='flex justify-end'>
              {index > 0 && (
                <Button type='button' variant='outline' size='sm' onClick={() => removeSpeaker(index)}>
                  <Trash2Icon className='text-red-700' /> Remove Speaker
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
                      <Input type='file' onChange={(e) => handleFileUpload(e, field)} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Speaker Socials */}
            <div className='space-y-2'>
              <FormLabel className='w-1/3 text-lg'>Social Media</FormLabel>
              <div className='space-y-2'>
                {form.watch(`speakers.${index}.speakerSocials`)?.map((_: any, socialIndex: number) => (
                  <div key={socialIndex} className='flex gap-2'>
                    <FormField
                      control={form.control}
                      name={`speakers.${index}.speakerSocials.${socialIndex}.socialName`}
                      render={({ field }) => (
                        <FormItem className='flex w-full items-center max-md:flex-col max-md:items-start'>
                          <div className='w-full'>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select platform' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {socialPlatforms.map((platform) => (
                                  <SelectItem key={platform.value} value={platform.value}>
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
                              <Input {...field} placeholder='Profile URL' />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button type='button' variant='ghost' size='sm' onClick={() => form.trigger()}>
                      <PlusIcon />
                    </Button>
                    <Button type='button' variant='ghost' size='sm' onClick={() => form.trigger()}>
                      <Trash2Icon className='text-red-700' />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormStep3