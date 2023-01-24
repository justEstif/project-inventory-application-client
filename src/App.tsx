import { Link, Route } from "wouter";
import HomePage from "./pages/home";

const App = () => (
  <div className="container flex flex-col mx-auto max-w-3xl min-h-screen">
    <header className="bg-red-50">Inventory App</header>
    <div className="flex flex-col flex-1 sm:flex-row">
      <main className="flex-1 bg-indigo-100">
        <Route path="/">
          <HomePage />
        </Route>
      </main>

      <nav className="flex order-first gap-4 bg-purple-200 sm:flex-col sm:w-32">
        <Link href="/brand">
          <a className="link">Brands</a>
        </Link>
        <Link href="/category">
          <a className="link">Categories</a>
        </Link>
        <Link href="/item">
          <a className="link">Item</a>
        </Link>
      </nav>
    </div>
    <footer className="bg-gray-100">Footer</footer>
  </div>
);

export default App;
