import Home from "./Home"
import BlogPage from "./BlogPage"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  return (
    <div>
    <Navbar />
    <Router>
      <div>
          <Route path="/" exact component={Home} />
          <Route path="/blogpage" component={BlogPage} />
      </div>
    </Router>
    </div>
  );
}

export default App;
