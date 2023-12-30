import React from 'react'
import {redirect} from 'next/navigation'
import { prisma } from '@/lib/db/prisma';
import FormSubmitButton from '@/components/FormSubmitButton';
import { getServerSession } from 'next-auth';
import authOptions from '../api/auth/[...nextauth]/options';




export const metadata = {
    title: "E-bondmerce - Add product",
    description: "Add product to sell"
}

async function addProduct(formData: FormData){
    "use server";

    const session = await getServerSession(authOptions);
    if (!session) redirect("/api/auth/signin?callbackUrl=/add-product");
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imgUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price")) || 0;

    if (!name || !description || !imgUrl || !price){
        throw Error("You must fill all of the field!!")
    }

    await prisma.product.create({
        data:{
            name, description, imgUrl, price
        }
    })

    redirect("/");
}

const AddProductPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/api/auth/signin?callbackUrl=/add-product");
  return (
    <div>
        <h1>Add Product Here Ja</h1>
        <form action={addProduct}>
            <input required name='name' placeholder='Name' className='input input-bordered mb-5 w-full' />
            <textarea required name='description' placeholder='Description' className='textarea textarea-bordered mb-5 w-full'/>
            <input required name='imageUrl' placeholder='URL from unsplash only' type='url' className='input input-bordered mb-5 w-full' />
            <input required name='price' placeholder='999999' type='number' className='input input-bordered mb-5 w-full' />
            <FormSubmitButton className='btn-block'>Add Product</FormSubmitButton>
        </form>
    </div>
  )
}

export default AddProductPage