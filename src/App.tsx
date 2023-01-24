import { Link, Route } from "wouter";
import HomePage from "./pages/home";

const App = () => (
  <div>
    {/* <Link href="/users/1"> */}
    {/*   <a className="link">Profile</a> */}
    {/* </Link> */}

    <Route path="/">
      <HomePage />
    </Route>

    {/* <Route path="/users/:name"> */}
    {/*   {(params) => <div>Hello, {params.name}!</div>} */}
    {/* </Route> */}
  </div>
);

export default App;
