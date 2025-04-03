import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/clerk-react';
import { ExitIcon } from '@radix-ui/react-icons';

const NavFooter = () => {
  const { signOut } = useClerk()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
          onClick={() => signOut()}
        >
          <Button
            variant={'ghost'}
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-2'
          >
            <ExitIcon />
          </Button>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>Sign Out</span>
            {/* <span className="truncate text-xs">{activeTeam.plan}</span> */}
          </div>
          {/* <ChevronsUpDown className="ml-auto" /> */}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default NavFooter