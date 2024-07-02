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

type TodoPaginationProps = {
  setCurrentPage: (value: ((prevState: number) => number) | number) => void;
  currentPage: number;
  paginationPages: number[];
};

export default function TodoPagination({
  setCurrentPage,
  currentPage,
  paginationPages,
}: TodoPaginationProps) {
  return (
    <Pagination className={"mt-4"}>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst href="#" onClick={() => setCurrentPage(1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => setCurrentPage((c) => (c - 1 >= 1 ? c - 1 : 1))}
          />
        </PaginationItem>
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {paginationPages
          .filter((page) => page > currentPage - 3 && page < currentPage + 3)
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
        {currentPage < paginationPages.length - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              setCurrentPage((c) =>
                c + 1 <= paginationPages.length
                  ? c + 1
                  : paginationPages.length,
              )
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            href="#"
            onClick={() => setCurrentPage(paginationPages.length)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
