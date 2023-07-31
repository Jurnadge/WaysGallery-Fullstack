//import css
import { Navbar, Dropdown, Button, Avatar } from "flowbite-react";
import bigLogo from "../assets/images/LogoLandPage.png";

//import react
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { setAuthToken } from "../config/api";

export default function Header() {
  setAuthToken(localStorage.token);
  const [state, dispatch] = useContext(AppContext);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <Navbar
      fluid={true}
      rounded={true}
      border
      style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}
    >
      <Navbar.Brand>
        <Link to={"/"}>
          <img src={bigLogo} className="w-[90px]" alt="Logo" />
        </Link>
      </Navbar.Brand>
      <div className="flex items-center gap-4">
        <Link to={"/uploads"}>
          <Button gradientDuoTone="greenToBlue">Uploads</Button>
        </Link>
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img={state?.user.image}
              rounded={true}
            />
          }
        >
          <Link to={"/profile"}>
            <Dropdown.Item>Profile {state?.user.fullname}</Dropdown.Item>
          </Link>
          <Link to={"/order"}>
            <Dropdown.Item>Order</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
}
