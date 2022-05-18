import './App.css';
import Cart from './components/Cart';
import Products from './pages/Products';

function App() {
  return (
    <div className="App">
      <nav>
          <div className='logo'>
              <span><strong>Clothing.LK</strong></span>
          </div>
          <div>
              <Cart />
          </div>
      </nav>
      <main>
        <Products />
      </main>
    </div>
  );
}

export default App;
