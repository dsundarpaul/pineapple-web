import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useZustandStore } from '@/store/context'
import { Product } from '@/utils/types'
import { createFileRoute, Link } from '@tanstack/react-router'
import { PencilIcon } from 'lucide-react'

export const Route = createFileRoute('/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { products } = useZustandStore(state => state)
  return (
    <div>
      <div className='w-full flex justify-between'>
        <div className='text-2xl font-bold'>
          Your products
        </div>
        <div>
          <Link to='/home/product-registration'>
            <Button size={'default'} className='rounded'>New Product</Button>
          </Link>
        </div>
      </div>
      
      <div className='grid grid-cols-3 gap-4 mt-4'>
        {products?.map((product: Product) => (
          <Link to={`/home/${product.id}`} key={product.id}>
            <Card key={product.id}>
              <CardHeader>
                <CardTitle className='flex justify-between items-center'>
                  {product.productName}
                  <Button variant='ghost' size={'sm'} className='rounded'><PencilIcon /></Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Product Description</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
