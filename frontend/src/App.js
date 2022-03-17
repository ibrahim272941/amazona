import './App.css';
import data from './data';

function App() {
  return (
    <div>
      <header>
        <a href="/">Amazon</a>
      </header>
      <main>
        <h1>Featured Products</h1>
        <div className="products">
          {data.products.map((item, i) => (
            <div className="product" key={item.slug}>
              <a href={`/product/${item.slug}`}>
                <img src={item.image} alt="" />
              </a>
              <div className="product-info">
                <p>{item.name}</p>
                <a href={`/product/${item.slug}`}>
                  <p>
                    {' '}
                    <strong>{item.price}€</strong>
                  </p>
                </a>
                <button>Add Chart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
