import formattingPrice from '@/lib/format'
import React from 'react'

type PriceTagProps = {
    price: Number,
    className?: string
}

const PriceTag = ({price, className} : PriceTagProps) => {
  return (
    <span className={`badge p-4 ${className}`}>{formattingPrice(price)}</span>
  )
}

export default PriceTag