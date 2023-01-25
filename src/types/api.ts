export type TCategory = {
  name: string;
  id: string;
  image: string;
};

export type TBrand = {
  name: string;
  id: string;
  image: string;
};

export type TItem = {
  name: string;
  id: string;
  image: string;
  description: string;
  price: number;
  inStock: number;
  categoryId: string;
  brandId: string;
};
