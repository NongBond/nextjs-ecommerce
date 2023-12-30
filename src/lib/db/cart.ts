import { Cart, CartItem, Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/dist/client/components/headers"
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

export type CartWithProduct = Prisma.CartGetPayload<{
    include: {items: {include: {product: true}}}
}>

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: {product: true}
}>

export type ShoppingCart = CartWithProduct & {
    size: number,
    subTotal: number
}

export async function getCart(): Promise<ShoppingCart | null> {
    const session = await getServerSession(authOptions);
    let cart: CartWithProduct | null = null;

    if (session){
        cart = await prisma.cart.findFirst({
            where: {userId: session.user.id},
            include: {items: {include: {product: true}}}
        })
    }else{ 
        const localCartId = cookies().get("localCartId")?.value;
        cart = localCartId ?
        await prisma.cart.findUnique({
            where: {id: localCartId},
            include: {items: {include: {product: true}}}
        })
        : null;
    }

    if (!cart) return null;

    return{
        ...cart,
        size: cart.items.reduce((accumulate, item) => accumulate + item.quantity, 0),
        subTotal: cart.items.reduce((accumulate, item) => accumulate + item.quantity * item.product.price, 0)
    }
}

export async function createCart(): Promise<ShoppingCart>{
    const session = await getServerSession(authOptions);
    let newCart: Cart;

    if (session){
        newCart = await prisma.cart.create({
            data: {
                userId: session.user.id
            }
        })
    
    }
    else{
        newCart = await prisma.cart.create({
            data: {},
        });
        cookies().set("localCartId", newCart.id);
    }

    return{
        ...newCart,
        items: [],
        size: 0,
        subTotal: 0
    }
}

