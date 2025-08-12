import React from 'react';
import './Home.css'; // Import CSS file for styling
import NavBar from './NavBar';

const Home = () => {
  // Example online image URLs
  const bannerImageUrl = 'https://th.bing.com/th/id/R.b3dbe15006dcc4273fac7e8cb839c996?rik=zF1qJBb1%2b1lGCg&riu=http%3a%2f%2fwww.katehewko.com%2fcdn%2fshop%2farticles%2fDepositphotos_23753813_XL.jpg%3fv%3d1669860332&ehk=jxq7khJmmAiprSWGM7uxYrQAFTg856M%2bT8HCegvSqgI%3d&risl=&pid=ImgRaw&r=0';
  const productImage1Url = 'https://i.pinimg.com/736x/79/37/be/7937be9c92b88bb8e003d40cc726cf53.jpg';
  const productImage2Url = 'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/500x/040ec09b1e35df139433887a97daa66f/h/a/hand-embroidered-art-silk-jacquard-kurta-set-in-maroon-v1-mlc671_4.jpg';
  const productImage3Url = 'https://i.pinimg.com/564x/da/bf/c2/dabfc276313e8829db86c825f4ad0a4e.jpg';
  const categoryImage1Url = 'https://static.vecteezy.com/system/resources/previews/002/179/047/large_2x/website-landing-page-mockup-for-e-commerce-free-vector.jpg';
  const categoryImage2Url = 'https://thumbs.dreamstime.com/z/ecommerce-online-shopping-seamless-background-pattern-vector-illustration-36937192.jpg';

  return (
    <div>
      <NavBar />
      <div className="home">
        {/* Hero Section */}
        <div className="hero-section" style={{ backgroundImage: `url(${bannerImageUrl})` }}>
          <div className="hero-content">
            <h1>Welcome to FashionHub</h1>
            <p>Explore the latest trends in fashion and discover exclusive collections.</p>
            <a href="/products" className="btn btn-primary">Shop Now</a>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="featured-products">
          <h2>Featured Products</h2>
          <div className="product-grid">
            <div className="product-card">
              <img src={productImage1Url} alt="Mustard Handwork Kurta" />
              <div className="product-info">
                <h3>Mustard Handwork Kurta</h3>
                <p>$2078.91</p>
                <a href="/products/5" className="btn btn-secondary">View Details</a>
              </div>
            </div>
            <div className="product-card">
              <img src={productImage2Url} alt="Cotton Silk Kurta" />
              <div className="product-info">
                <h3>Cotton Silk Kurta</h3>
                <p>$1253.30</p>
                <a href="/products/3" className="btn btn-secondary">View Details</a>
              </div>
            </div>
            <div className="product-card">
              <img src={productImage3Url} alt="Nawaratri Design Sherwani" />
              <div className="product-info">
                <h3>Nawaratri Design Sherwani</h3>
                <p>$2999.90</p>
                <a href="/products/4" className="btn btn-secondary">View Details</a>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="categories">
          <h2>Shop by Category</h2>
          <div className="category-grid">
            <div className="category-card">
              <img src={categoryImage1Url} alt="Men's Clothing" />
              <div className="category-info">
                <h3>Men's Clothing</h3>
              </div>
            </div>
            <div className="category-card">
              <img src={categoryImage2Url} alt="Women's Clothing" />
              <div className="category-info">
                <h3>Women's Clothing</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="promo-banner">
          <h2>Summer Sale</h2>
          <p>Up to 50% off on selected items!</p>
          <a href="/products" className="btn btn-primary">Shop Sale</a>
        </div>

        {/* Newsletter Signup */}
        <div className="newsletter-signup">
          <h2>Stay Updated</h2>
          <p>Sign up for our newsletter to receive updates on new arrivals and special offers.</p>
          <form>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
