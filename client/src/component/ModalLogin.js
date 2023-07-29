// import css here
import { useContext, useState } from "react";
import { Modal, TextInput, Button } from "flowbite-react";

// import react here
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useMutation } from "react-query";
import { API } from "../config/api";

// import component here

export default function ModalLogin({ show, showLogin, showSignup }) {
  const handleClose = () => showLogin(false);
  const changeModal = () => {
    handleClose();
    showSignup(true);
  };

  const navigate = useNavigate();
  const [state, dispatch] = useContext(AppContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", form);
      console.log("login success :", response);

      if (response.data != null) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });
        alert("Welcome Byack");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("login failed");
    }
  });

  return (
    <>
      <Modal size="sm" show={show} popup={true} onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <h1 className="text-xl text-center font-semibold text-[#2FC4B2]">
            Login
          </h1>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="mt-4">
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required={true}
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="mt-4">
              <TextInput
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required={true}
                onChange={handleChange}
                value={password}
              />
            </div>

            <div className="mt-3 flex justify-center">
              <Button
                type="submit"
                gradientMonochrome="success"
                className="w-full"

              >
                Login
              </Button>
            </div>

            <div>
              <p className="text-center">
                Didnt have an account? Register{" "}
                <b
                  variant="link"
                  onClick={changeModal}
                  style={{ cursor: "pointer" }}
                >
                  here
                </b>
              </p>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
