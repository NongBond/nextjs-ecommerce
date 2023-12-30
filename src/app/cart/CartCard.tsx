"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import formattingPrice from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { setProductQuantity } from "./action";

type CartCardProps = {
    cartItem: CartItemWithProduct,
    setProductQuantity: (productId: string, quantity: number) => Promise<void>
};

export default function CartCard({ cartItem: {product, quantity}, setProductQuantity }: CartCardProps) {
    const [isPending, startTransition] = useTransition();
    const quantityOptions: JSX.Element[] = [];
    for (let i = 1; i <= 99; i++) {
        quantityOptions.push(<option value={i} key={i}>{i}</option>);
    }
    return(
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Image src={product.imgUrl} alt={product.name} width={200} height={200} className="rounded-lg"/>
                <div>
                    <Link href={"products/" + product.id} className="font-bold text-xl">
                        {product.name}
                    </Link>
                    <div>
                        Price: {formattingPrice(product.price)}
                    </div>
                    <div className="my-3 flex items-center gap-2">
                        Quantity:
                        <select className="select select-bordered w-full max-w-[70px]" defaultValue={quantity} onChange={e => {
                            const newQuantity = parseInt(e.currentTarget.value);
                            startTransition(async () => {
                                await setProductQuantity(product.id, newQuantity);
                            });
                        }}>
                            <option value={0}>0 (Remove)</option> 
                            {quantityOptions}
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        Total: {formattingPrice(product.price * quantity)}
                        {isPending && <div className="loading loading-spinner loading-sm"/>}
                    </div>
                </div>
            </div>
            <div className="divider"/>
        </div>
    )
}