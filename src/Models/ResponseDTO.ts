interface ResponseDTO<T> {
  code: string;
  message: string;
  data: T;
  help: string;
}

interface PageableResponseDTO<T> extends ResponseDTO<T> {
  data: PageableResponseData<T> | any;
}
interface PageableResponseData<T> {
  totalRowCount: number;
  totalPageCount: number;
  data: T;
}
export type { ResponseDTO, PageableResponseDTO, PageableResponseData };
