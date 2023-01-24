import ky from "ky";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

type Props = {};

type TCategory = {
  name: string;
  id: string;
  image: string;
};

type TBrand = {
  name: string;
  id: string;
  image: string;
};

type TItem = {
  name: string;
  id: string;
  image: string;
  description: string;
  price: number;
  inStock: number;
  categoryId: string;
  brandId: string;
};

type TState = {
  categories: TCategory[];
  brands: TBrand[];
  items: TItem[];
  isLoading: boolean;
  isError: boolean;
};

const Page = ({ }: Props) => {
  const [data, setData] = useState<TState>({
    isLoading: false,
    isError: false,
    categories: [],
    brands: [],
    items: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setData({
        ...data,
        isLoading: true,
      });
      try {
        const resCategories = (await ky
          .get("/api/category")
          .json()) as TCategory[];
        const resBrands = (await ky.get("/api/brand").json()) as TBrand[];
        const resItems = (await ky.get("/api/item").json()) as TItem[];
        setData({
          categories: resCategories,
          brands: resBrands,
          items: resItems,
          isLoading: false,
          isError: false,
        });
      } catch (error) {
        setData({
          ...data,
          isError: true,
        });
      }
    };
    fetchData();
  }, []);

  if (data.isError) {
    return <p>Error ...</p>;
  }
  if (data.isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <div className="flex">
        {data.categories.map((category) => (
          <div key={nanoid()} className="flex-1">
            <p>{category.name}</p>
            <div className="w-20 rounded-md border-4">
              <img src={category.image} className="block object-cover w-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        {data.brands.map((brand) => (
          <div key={nanoid()} className="flex-1">
            <p>{brand.name}</p>
            <div className="w-20 rounded-md border-4">
              <img src={brand.image} className="block object-cover w-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        {data.items.map((item) => (
          <div key={nanoid()} className="flex-1">
            <p>{item.name}</p>
            <div className="w-20 rounded-md border-4">
              <img src={item.image} className="block object-cover w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
