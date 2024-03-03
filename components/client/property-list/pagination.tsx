import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

function PaginatedItems({
    totalProperties,
    itemsPerPage,
    path
}:{
    totalProperties: number;
    itemsPerPage: number;
    path: string;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const pageCount = Math.ceil(totalProperties / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
      const newOffset = (event.selected * itemsPerPage) % totalProperties;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      const params = new URLSearchParams(searchParams.toString())
      params.set("limit", event.selected)
      console.log(params.toString());
      router.push(`${path}?${params.toString()}`)
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="flex items-center gap-2 justify-center"
          pageClassName="h-8 w-8 rounded-full grid place-content-center font-medium hover:bg-primary hover:text-white"
          activeClassName="bg-orange text-white"
          previousClassName="h-8 rounded hover:bg-primary hover:text-white px-4 grid place-content-center"
          nextClassName="h-8 rounded hover:bg-primary hover:text-white px-4 grid place-content-center"
        />
      </>
    );
}

export default PaginatedItems;