import React from 'react'
import Link from 'next/link'
import { BuildingStorefrontIcon, HomeIcon } from '@heroicons/react/24/outline'
import {redirect} from "next/navigation"
import { getCart } from '@/lib/db/cart'
import ShoppingCartButton from './ShoppingCartButton'
import UserMenuButton from './UserMenuButton'
import { getServerSession } from 'next-auth'
import authOptions from '../api/auth/[...nextauth]/options'


async function search(formData: FormData) {
    "use server";
    const searchProduct = formData.get("search")?.toString();
    if (searchProduct) redirect("/search?query=" + searchProduct);
}

export default async function Navbar() {
    const cart = await getCart();
    const session = await getServerSession(authOptions);
  return (
        <div className='bg-base-100'>
            <div className='navbar items-center max-w-7xl min-w-[200] mx-auto flex-col sm:flex-row gap-3'>
                <div className='flex-1'>
                    <Link href='/'>
                        <BuildingStorefrontIcon width={60} height={60} className='w-[60] h-auto' />
                    </Link>
                </div>
                <div className=' gap-3'>
                    <form action={search}>
                        <div className='form-control'>
                            <input
                                type='text'
                                name='search'
                                placeholder='Search...'
                                className='input input-bordered w-80'
                            />
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart} />
                    <UserMenuButton session={session} />
                </div>
            </div>
        </div>
  )
}
