import { ArrowLeftCircleIcon, ArrowRightCircleIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

type PaginationBarProps = {
    currentPage: number,
    totalPage: number,
}

export default function PaginationBar({currentPage, totalPage}: PaginationBarProps){
    const maxPage = Math.min(Math.max(currentPage + 4, 10), totalPage)
    const minPage = Math.max(Math.min(currentPage - 5, maxPage - 9), 1)

    const pageNumbers: JSX.Element[] = []
    for (let page = minPage; page <= maxPage; page++){
        pageNumbers.push(
            <Link href={"?page=" + page} key={page} className={`join-item btn ${currentPage === page ? "btn-active pointer-events-none": ""}`}>
                {page}
            </Link>
        )
    }
    return(
        <>
            <div className="join hidden sm:block ">
                {pageNumbers}
            </div>
            <div className="join block sm:hidden">
                {
                    currentPage > 1 && 
                    <Link href={"?page=" + (currentPage - 1)} className="btn join-item text-base">«</Link>
                }
                <button className="join-item btn pointer-events-none text-base">PAGE {currentPage}</button>
                {
                    currentPage < totalPage && 
                    <Link href={"?page=" + (currentPage + 1)} className="btn join-item text-base">»</Link>
                }
            </div>
        </>
    )
} 