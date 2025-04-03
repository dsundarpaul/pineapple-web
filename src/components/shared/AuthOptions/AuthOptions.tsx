import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react"
import { Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { adminApi } from "@/api"
import { PlusIcon } from "lucide-react"
import { useZustandStore } from "@/store/context"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"

type AuthOptionsProps = {
  inLanginPage?: boolean
  hideProductSelect?: boolean
}

const AuthOptions = ({ inLanginPage = false, hideProductSelect = false }: AuthOptionsProps) => {
  const { user } = useUser()

  const { setSelectedProduct, setProducts }= useZustandStore(state => state)

  const { data: ProductsList, isFetching: isFetchingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await adminApi.get('/products', { withCredentials: true })
      setProducts(response.data)
      return response.data
    },
    enabled: !!user
  })

  const renderSelect = () => (
    <>
      <Select onValueChange={(value) => setSelectedProduct(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {ProductsList?.map((item: { id: string; productName: string }) => (
            <SelectItem value={item.id} key={item.id}>{item.productName}</SelectItem>
          ))}
          {isFetchingProducts && (
            <SelectItem value={'SelectItem-add-product'}>
              <Link to={''}>
                Loading...
              </Link>
            </SelectItem>
          )}
            <Link to={'/dashboard/product-registration'}>
              <Button variant="outline" className='w-full' onClick={() => null}>
                Add Product <PlusIcon />
              </Button>
            </Link>
        </SelectContent>
      </Select>
    </>
  )

  return (
    <div className='flex space-x-4'>
      <Button className="rounded flex items-center" variant={'outline'}><QuestionMarkCircledIcon /></Button>
      <SignedIn>
        <div className='flex items-center gap-4'>
          {hideProductSelect && renderSelect()}
          <Button className='rounded'>Upgrade</Button>
          <p>{user?.fullName}</p>
          <UserButton />
          {inLanginPage && (
            <Link to='/home'>
              <Button>Dashboard</Button>
            </Link>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <Button>
          <SignInButton />
        </Button>
      </SignedOut>
    </div>
  );
}

export default AuthOptions