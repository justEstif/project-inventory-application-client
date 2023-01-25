import { Link, Route } from "wouter";
import HomePage from "./pages/home";
import Categories from "./pages/categories";
import Brands from "./pages/brands";

const App = () => (
  <div className="container flex mx-auto max-w-3xl min-h-screen">
    <nav className="flex flex-col flex-none gap-7 w-32">
      <Link href="/brands">
        <a className="link">Brands</a>
      </Link>
      <Link href="/categories">
        <a className="link">Categories</a>
      </Link>
      <Link href="/item">
        <a className="link">Item</a>
      </Link>
    </nav>

    <main className="flex-1 bg-indigo-100">
      <Route path="/">
        <HomePage />
      </Route>

      <Route path="/categories">
        <Categories />
      </Route>

      <Route path="/brands">
        <Brands />
      </Route>
    </main>
  </div>
);

export default App;
