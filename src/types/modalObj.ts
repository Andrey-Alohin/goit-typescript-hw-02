export interface ModalImage {
  likes: number;
  description: string | null;
  alt: string;
  imgUrl: string;
  sourceLink: string;
  user: {
    name: string;
    profImg: string;
    link: string;
  };
}
