import {InferGetStaticPropsType} from "next";

import getAllProducts from "@framework/product/get-all-products";
import {getConfig} from "@framework/api/config";

export const getStaticProps = async () => {
  const config = getConfig()
  const products = await getAllProducts(config)

  return {props: {products}}
}

export default function Home({products}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <div>
      {JSON.stringify(products)}
    </div>
  )
}
