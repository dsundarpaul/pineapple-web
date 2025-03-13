import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ProductRegistrationFormSchema } from '@/utils/formSchemas/product.formschemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { adminApi } from '@/api'

export const Route = createFileRoute('/dashboard/product-registration/')({
  component: ProductRegistation,
})

function ProductRegistation() {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof ProductRegistrationFormSchema>) => {
      return adminApi.post('/products', data);
    },
    onMutate: () => {
        window.alert('Product registered successfully');
    },
  })

  const form = useForm<z.infer<typeof ProductRegistrationFormSchema>>({
    resolver: zodResolver(ProductRegistrationFormSchema),
  })

  const onSubmit = async (data: z.infer<typeof ProductRegistrationFormSchema>) => {
    console.log(data)
    try {
      mutate(data);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div className='m-auto'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Product Registration</h1>
        <p className='text-gray-500'>Register your product to get insights on social media </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem className='w-full items-center'>
                <FormLabel className='w-1/3 text-lg'>Product name<span className='text-red-600 px-1'>*</span></FormLabel>
                <FormControl>
                  <Input {...field} placeholder='e.g., Tech Conference 2025' />
                </FormControl>
                <FormDescription>The official name of your Product. This name will be used to indentify this product.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productDocLink"
            render={({ field }) => (
              <FormItem className='w-full items-center'>
                <FormLabel className='w-1/3 text-lg'>Product documentation Link</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>The official documentation link. We will use this to understand the product and features to analyize social media's prespective.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubRepoLink"
            render={({ field }) => (
              <FormItem className='w-full items-center'>
                <FormLabel className='w-1/3 text-lg'>Github repo link</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>The official/open source githbu link. This will be used to give you insights of your github repo comparing with your competetors.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full flex justify-end mt-3'>
            <Button type='submit'>Submit {isPending && <>...</>}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}