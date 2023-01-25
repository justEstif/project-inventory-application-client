import ky from "ky";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { TCategory } from "../../types/api";

type Props = {};

type TState = {
  categories: TCategory[] | null;
  isLoading: boolean;
  isError: boolean;
};

const Page = ({}: Props) => {
  const [data, setData] = useState<TState>({
    isLoading: false,
    isError: false,
    categories: [],
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
        setData({
          categories: resCategories,
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
    </div>
  );
};

export default Page;
