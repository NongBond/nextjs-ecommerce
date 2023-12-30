"use client";
import { ShoppingCart } from '@/lib/db/cart'
import formattingPrice from '@/lib/format'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

type ShoppingCartButtonProps = {
    cart: ShoppingCart | null
}

function closeDropdown() {
    const dropdown = document.activeElement as HTMLElement;
    if (dropdown) dropdown.blur();
}

export default function ShoppingCartButton({cart}: ShoppingCartButtonProps) {
  return (
    <div className='dropdown dropdown-end'>
        <label tabIndex={0} className='btn btn-ghost btn-circle '>
            <div tabIndex={0} className='indicator'>
                <ShoppingBagIcon width={20} height={20} />
                <span className='badge badge-sm indicator-item'>{cart?.size || 0}</span>
            </div>
        </label>
        <div tabIndex={0} className='card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow z-30'>
            <div className='card card-body'>
                <span className='text-lg font-bold'> {cart?.size || 0} items </span>
                <span className='text-info'> Subtotal: {formattingPrice(cart?.subTotal || 0)} </span>
                <div className='card-actions'>
                    <Link href='/cart' className='btn btn-primary btn-block' onClick={closeDropdown}>
                        Go to cart
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
