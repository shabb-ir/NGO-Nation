import { Helmet } from "react-helmet-async";
import { Navbar, Products, ShopHeader } from "../../components";

const ShopLanding = () => {
  return (
    <>
      <Helmet>

        <title>NGO-Social | Shop</title>
        <meta name="description" content="Welcome to NGO-Social's shop. Anything you buy from here helps out the charities." />
        <link rel="canonical" href="/" />
      </Helmet>
      <Navbar />
      <ShopHeader />
      <Products />
    </>
  );
};

export default ShopLanding;
