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
import { State } from "@hookstate/core";

type TodoPaginationProps = {
  pagination: State<{ current: number; pages: Array<number> }>;
};

export default function TodoPagination({ pagination }: TodoPaginationProps) {
  return (
    <Pagination className={"mt-4"}>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst href="#" onClick={() => pagination.current.set(1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() =>
              pagination.current.set((c) => (c - 1 >= 1 ? c - 1 : 1))
            }
          />
        </PaginationItem>
        {pagination.current.get() > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pagination.pages
          .get()
          .filter(
            (page) =>
              page > pagination.current.get() - 3 &&
              page < pagination.current.get() + 3,
          )
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={() => pagination.current.set(page)}
                className={cn(page === pagination.current.get() && "border-2")}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        {pagination.current.get() < pagination.pages.length - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              pagination.current.set((c) =>
                c + 1 <= pagination.pages.length
                  ? c + 1
                  : pagination.pages.length,
              )
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            href="#"
            onClick={() => pagination.current.set(pagination.pages.length)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
