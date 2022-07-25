import { InferGetStaticPropsType } from "next";

import getAllProducts from "@framework/product/get-all-products";
import { getConfig } from "@framework/api/config";
import { Layout } from "@components/common";

export const getStaticProps = async () => {
  const config = getConfig();
  const products = await getAllProducts(config);

  return { props: { products } };
};

export const Home = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div>{JSON.stringify(products)}</div>;
};

Home.Layout = Layout;
