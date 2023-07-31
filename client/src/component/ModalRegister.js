// import css here
import { Button, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { API } from "../config/api";

// import component here

export default function ModalRegister({ show, showLogin, showSignup }) {
  const handleClose = () => showSignup(false);
  const changeModal = () => {
    handleClose();
    showLogin(true);
  };

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { fullname, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post("/register", form);

      console.log("register success", response);

      setForm({
        fullname: "",
        email: "",
        password: "",
      });
      Swal.fire({
        icon: "success",
        title: "Register Success",
      });
      changeModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Register failed, please try again later",
      });
    }
  });

  return (
    <>
      <Modal
        show={show}
        popup={true}
        dismissible
        size="sm"
        onClose={handleClose}
      >
        <Modal.Header />
        <Modal.Body>
          <h1 className="text-xl text-center font-semibold text-[#2FC4B2]">
            Register
          </h1>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="mt-4">
              <TextInput
                type="text"
                placeholder="Fullname"
                name="fullname"
                value={fullname}
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <TextInput
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <TextInput
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className="mt-3 flex justify-center">
              <Button
                type="submit"
                gradientMonochrome="success"
                className="w-full"
              >
                Signup
              </Button>
            </div>
            <p className="text-center">
              Have an account?
              <b
                variant="link"
                onClick={changeModal}
                style={{
                  cursor: "pointer",
                }}
              >
                Login
              </b>
            </p>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
