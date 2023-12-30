import { getCart } from "@/lib/db/cart";
import CartCard from "./CartCard";
import { setProductQuantity } from "./action";
import formattingPrice from "@/lib/format";
import Link from "next/link";

export const metadata = {
    title: "Your cart - E-bondmerce"
}

export default async function CartPage() {
    const cart = await getCart();
    return (
        <div>
            <h1 className="text-3xl font-bold">
                Your cart
            </h1>
            {cart?.items.map(item => <CartCard cartItem={item} key={item.id} setProductQuantity={setProductQuantity}/>)}
            {!cart?.items.length && <div className="text-xl">Your cart is empty.</div>}
            <div className="flex flex-col items-end sm:items-center ">
                <p className="mb-3 font-bold">
                    Total: {formattingPrice(cart?.subTotal || 0)}
                </p>
                <Link href={"check-out"} className="btn btn-primary sm:w-[10rem]">Checkout</Link>
            </div>
        </div>
    )
}