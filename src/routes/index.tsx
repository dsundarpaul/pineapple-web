import AuthOptions from '@/components/shared/AuthOptions/AuthOptions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className='p-4'>
      <div className='flex w-full justify-between items-center'>
        <div className='flex'>
          <div className='text-lg'>Pineapple AI 🍍</div>
        </div>
        <AuthOptions inLanginPage />
      </div>
      <div className='w-full flex flex-col justify-center items-center'>
        <h1>This is landing page. Deal with it.</h1>
        <h1 className='text-[25rem]'>🍍</h1>
      </div>
    </div>
  )
}
