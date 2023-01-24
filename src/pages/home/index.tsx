import useFetch from "../../hooks/useFetch";

type Props = {};

const Page = ({}: Props) => {
  const { data, error } = useFetch("/api");
  console.log(data);
  return <div className="bg-red-500">Home Page</div>;
};

export default Page;
