interface Media {
  id?: string;
  name?: string;
  tag?: string;
  type?: string;
  link?: string;
}
interface MediaWithFile extends Media {
  file?: File;
}
export type { Media, MediaWithFile };