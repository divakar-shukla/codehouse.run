import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LucideLogOut, NotebookText, User } from 'lucide-react';
const AccountDropdown = () => {
  return (
<DropdownMenu>
  <DropdownMenuTrigger >
        <img src='https://avatar.iran.liara.run/public/30' className='w-10'/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><User/>Profile</DropdownMenuItem>
    <DropdownMenuItem><NotebookText/>Dashboard</DropdownMenuItem>
    <DropdownMenuItem><LucideLogOut/>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default AccountDropdown