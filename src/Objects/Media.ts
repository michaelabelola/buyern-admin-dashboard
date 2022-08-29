import { userInfo } from "os";

interface Media {
  id?: string;
  name?: string;
  tag?: string;
  type?: string;
  link?: string;
}
interface MediaWithFile extends Media, Media {
  file?: File;
}
export type { Media, MediaWithFile };