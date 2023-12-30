import { Metadata } from "next"
import { prisma } from "@/lib/db/prisma"
import Image from "next/image"
import { notFound } from "next/navigation"
import { cache } from "react"
import AddToCartButton from "./AddToCartButton"
import { IncreaseProductQuantity } from "./serverAction"
import PriceTag from "@/components/PriceTag"

type ProductPageProps = {
    params: {
        id: string
    }
}

const getProduct = cache(async (id:string) => {
    const product = await prisma.product.findUnique({where: {id}});
    if (!product) return notFound();
    return product
})

export async function generateMetadata({params : {id}}: ProductPageProps): Promise<Metadata> {
    const product = await getProduct(id);
    return{
        title: "E-bondmerce-" + product.name,
        description: product.description,
        openGraph: {
            images: [{
                url: product.imgUrl
            }]
        }  
    }
}


export default async function ProductPage({
    params: {id}
} : ProductPageProps){

    const product = await getProduct(id);

    return(
        <div className="flex flex-col lg:flex-row gap-5">
            <Image src={product.imgUrl} alt={product.name} width={500} height={500} className="rounded-xl" priority/>
            <div>
                <h1 className="text-5xl font-bold pb-5">{product.name}</h1>
                <p className="text-xl mb-3">{product.description}</p>
                <PriceTag price={product.price}/>
                <AddToCartButton productId={product.id} increaseProductQuantity={IncreaseProductQuantity}></AddToCartButton>
            </div>
        </div>
    )
}