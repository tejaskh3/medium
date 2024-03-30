import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "../pages/Signup";
import { Signin } from "../pages/Signin";
import { Blogs } from "../pages/Blogs";
import { Blog } from "../pages/Blog";
import { CreateBlog } from "../pages/CreateBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blog/publish" element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
