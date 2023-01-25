import ky from "ky";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { TCategory, TBrand, TItem } from "../../types/api";

type Props = {};

type TState = {
  categories: TCategory[] | null;
  brands: TBrand[] | null;
  items: TItem[] | null;
  isLoading: boolean;
  isError: boolean;
};

const Page = ({}: Props) => {
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
        {data.categories &&
          data.categories.length &&
          data.categories.map((category) => (
            <div key={nanoid()} className="flex-1">
              <p>{category.name}</p>
              <div className="w-20 rounded-md border-4">
                <img
                  src={category.image}
                  className="block object-cover w-full"
                />
              </div>
            </div>
          ))}
      </div>

      <div className="flex">
        {data.brands &&
          data.brands.length &&
          data.brands.map((brand) => (
            <div key={nanoid()} className="flex-1">
              <p>{brand.name}</p>
              <div className="w-20 rounded-md border-4">
                <img src={brand.image} className="block object-cover w-full" />
              </div>
            </div>
          ))}
      </div>

      <div className="flex">
        {data.items &&
          data.items.length &&
          data.items.map((item) => (
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
