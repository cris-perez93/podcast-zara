import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="">
      <div className="border-b py-1 w-full">
        <Link to="/">
          <h1 className="text-sky-800 text-lg font-bold">Podcaster</h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;
