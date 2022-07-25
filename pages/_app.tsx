import { FC, ReactNode } from "react";
import { AppProps } from "next/app";

type PropsFC = {
  children: ReactNode;
};

type CustomFC = FC<PropsFC>;

interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: AppProps["Component"] & { Layout: CustomFC };
}

const Noop: CustomFC = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: CustomAppProps) => {
  const Layout = Component.Layout ?? Noop;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default CustomApp;
