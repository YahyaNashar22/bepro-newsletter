import excel from "../assets/excel.png";
import plus from "../assets/plus.png";
import trash from "../assets/trash.png";

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <li>
            <img src={excel} />
          </li>
          <li>
            <img src={plus} />
          </li>
          <li>
            <img src={trash} />
          </li>
        </nav>
      </header>
    </>
  );
};

export default Header;
