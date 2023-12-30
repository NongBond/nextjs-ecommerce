export default function formattingPrice(price: Number){
    return(
        price.toLocaleString("th-TH", {
            style: "currency",
            currency: "THB"
        })
    )
}