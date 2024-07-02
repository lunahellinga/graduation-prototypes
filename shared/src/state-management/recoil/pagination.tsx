import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {currentPageAtom, pagesAtom} from "@/state-management/recoil/atoms";


export default function TodoPagination() {
  const [currentPage,setCurrentPage] = useRecoilState(currentPageAtom)
  const pages = useRecoilValue(pagesAtom)

  return (
    <Pagination className={"mt-4"}>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst href="#" onClick={() => setCurrentPage(1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() =>
              setCurrentPage((c) => (c - 1 >= 1 ? c - 1 : 1))
            }
          />
        </PaginationItem>
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pages
          .filter(
            (page) =>
              page > currentPage - 3 &&
              page < currentPage + 3,
          )
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(page)}
                className={cn(page === currentPage && "border-2")}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        {currentPage < pages.length - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              setCurrentPage((c) =>
                c + 1 <= pages.length
                  ? c + 1
                  : pages.length,
              )
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            href="#"
            onClick={() => setCurrentPage(pages.length)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
