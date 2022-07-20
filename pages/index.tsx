import {InferGetStaticPropsType} from "next";

import getAllProducts from "@framework/product/get-all-products";

export const getStaticProps = async () => {
  const products = await getAllProducts()

  return {props: {products}}
}

export default function Home({products}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <div>
      {JSON.stringify(products)}
    </div>
  )
}
