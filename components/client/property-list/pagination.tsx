import { 
    Pagination,
    PaginationContent, 
    PaginationEllipsis, 
    PaginationItem, 
    PaginationLink, 
    PaginationNext, 
    PaginationPrevious 
} from '@/components/ui/pagination'
import React from 'react'

function PropertyPagination({totalProperties}:{totalProperties: number}) {
    const activePage = 34;
    const limit = 10;
    const pageOffset = Math.ceil(totalProperties / limit);
    
    const createArray = (length: number) => {
        return Array.from({ length }, (_, i) => i + 1);
    }

    const offsetArray = createArray(pageOffset)

    const calculatePaginations = () => {
        const paginate: any[] = [];

        for (let index = 0; index < offsetArray.length; index++) {
            const item = offsetArray[index]
            if(item < activePage) {
                paginate.push("...")
            } else if (item < activePage - 1) {
                paginate.push(item)
            } else if (item > activePage + 2){
                paginate.push(item)
            }
        }

        return paginate;
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                {/* <PaginationItem>
                    <PaginationLink href="#" isActive>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PropertyPagination