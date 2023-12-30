"use client";

import { useState, useTransition } from "react";

type AddToCartButtonProps = {
    productId: string,
    increaseProductQuantity: (productId: string) => Promise<void>
}

export default function AddToCartButton({ productId, increaseProductQuantity }: AddToCartButtonProps){
    const [isPending, startTransition] = useTransition();
    const [isAdded, setIsAdded] = useState(false);

    return(
        <div className="flex items-center gap-3 pt-4">
            <button className="btn btn-primary"  onClick={() => {
                setIsAdded(false);
                startTransition(() => {
                    increaseProductQuantity(productId);
                    setIsAdded(true);
                });
            }}>
                Add to cart
            </button>
            {isPending && (<span className="loading loading-spinner loading-md" />)}
            {!isPending && isAdded && (<span className="text-sm text-success">Added to cart</span>)}
        </div>
    )
}