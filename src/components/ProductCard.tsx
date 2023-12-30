import { Product } from "@prisma/client"
import Link from "next/link"
import PriceTag from "./PriceTag"
import Image from "next/image"

type ProductCardProps = {
    product: Product
}

const ProductCard = ({product} : ProductCardProps) => {
    const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7
  return (
    <Link href={"/products/" + product.id} className="card w-full bg-base-100 hover:shadow-xl transition-shadow">
        <div className="card-body relative">
            {isNew && <span className="badge badge-secondary absolute top-3 -left-1.5 -rotate-45 mr-[-20]">NEW</span>}
            <figure>
                <Image src={product.imgUrl} alt={product.name} width={800} height={400} className="h-48 object-cover"/>
            </figure>
            <h2 className="card-title">
                {product.name}
            </h2>
            <p>
                {product.description}
            </p>
            <PriceTag price={product.price}/>
            
        </div>
    </Link>
  )
}

export default ProductCard