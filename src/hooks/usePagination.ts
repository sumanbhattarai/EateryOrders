import {useState} from 'react';

function usePagination<T>({
  data,
  startPage,
  pageCapacity,
}: {
  data: Array<T>;
  startPage: number;
  pageCapacity: number;
}) {
  const [currentPage, setCurrentPage] = useState<number>(startPage);
  const paginatedData = data.splice(0, pageCapacity * currentPage);
  const hasMore: boolean = paginatedData.length < data.length;
  return {
    paginatedData,
    nextPage: () => setCurrentPage((val) => val + 1),
    currentPage,
    hasMore,
  };
}

export default usePagination;
