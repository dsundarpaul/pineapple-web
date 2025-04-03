import { adminApi } from '@/api'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { PencilIcon, Trash2Icon } from 'lucide-react'

export const Route = createFileRoute('/dashboard/product-settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: ProductsList, isFetching: isFetchingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await adminApi.get('/products', { withCredentials: true })
      return response.data
    },
    // enabled: !!user
  })

  const renderProductsList = () => (
    <div className='space-y-4 pt-6'>
      {ProductsList?.map((item: { id: string; productName: string }) => (
        <div key={item.id} className='flex justify-between items-center p-2 border-slate-300 border rounded-sm'>
          <div>
            {item.productName}
          </div>
          <div className='space-x-2'>
            <Button size='icon' variant={'outline'}><PencilIcon /></Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size='icon' variant={'outline'} className='text-red-600'><Trash2Icon /></Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure you want to delete this product?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    product and remove al your data connected to this product(events, insights, etc) from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <h1 className='text-3xl font-bold'>Product Settings</h1>

      {isFetchingProducts ? <>Loadding...</> : renderProductsList()}

      
    </div>
  )
}
