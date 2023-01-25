import ky from "ky";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { TBrand } from "../../types/api";

type Props = {};

type TState = {
  brands: TBrand[] | null;
  isLoading: boolean;
  isError: boolean;
};

const Page = ({}: Props) => {
  const [data, setData] = useState<TState>({
    isLoading: false,
    isError: false,
    brands: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setData({
        ...data,
        isLoading: true,
      });
      try {
        const resBrands = (await ky.get("/api/brand").json()) as TBrand[];
        setData({
          brands: resBrands,
          isLoading: false,
          isError: false,
        });
        console.log(data);
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
    </div>
  );
};

export default Page;
