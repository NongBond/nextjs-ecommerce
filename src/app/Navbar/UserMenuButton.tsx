"use client";
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Session } from 'next-auth'
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';


type UserMenuButtonProps = {
    session: Session | null
}

export default function UserMenuButton({session}: UserMenuButtonProps) {
    const user = session?.user
  return (
    <div className='dropdown dropdown-end'>
        <label tabIndex={0} className='btn btn-ghost btn-circle'>
            {
                user 
                ? <Image src={user?.image || "/profile.png" } alt='Profile Image' width={40} height={40} className='w-10 rounded-full'/> 
                : <UserCircleIcon />
            }
        </label>
        <ul tabIndex={0} className='dropdown-content menu menu-sm z-30 mt-3 w-52 rounded-box bg-base-100 p-2 shadow' >
            <li>
                { user
                    ? <button onClick={() => signOut({callbackUrl: "/"})}>Sign Out</button>
                    : <button onClick={() => signIn()}>Sign In</button>
                }
            </li>
        </ul>
    </div>
  )
}
