import excel from "../assets/excel.png";
import plus from "../assets/plus.png";
import trash from "../assets/trash.png";

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li className="navLink">
              <img src={excel} width={64} height={64} alt="nav icons" />
            </li>
            <li className="navLink">
              <img src={plus} width={64} height={64} alt="nav icons" />
            </li>
            <li className="navLink">
              <img src={trash} width={64} height={64} alt="nav icons" />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
