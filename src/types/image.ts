export interface Image {
  id: string;
  alt_description: string;
  description: string | null;
  likes: number;
  urls: {
    small: string;
    regular: string;
  };
  links: {
    html: string;
  };
  user: {
    name: string;
    profile_image: {
      small: string;
    };
    links: {
      html: string;
    };
  };
}
