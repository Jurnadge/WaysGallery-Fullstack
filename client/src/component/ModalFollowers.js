import { Alert, Avatar, Button, Modal } from "flowbite-react";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ModalFollowers({ show, showModalFollowers }) {
  const handleClose = () => showModalFollowers(false);
  const [state] = useContext(AppContext);

  const { data: profilePage } = useQuery(
    "DataProfileModalPageCache",
    async () => {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        };

        const response = await API.get("/user", config);
        return response.data.data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  return (
    <Modal size="sm" show={show} popup={true} dismissible onClose={handleClose}>
      <Modal.Header>
        <p className="text-center">{state.user.fullname} Followers</p>
      </Modal.Header>
      <Modal.Body>
        <div className="h-56">
          {profilePage?.followers === null ? (
            <>
              <Alert variant="dark">
                <h1>MAKANYA GANTENG BLOG!!!</h1>
              </Alert>
            </>
          ) : (
            <>
              {profilePage?.followers.map((item, index) => (
                <div key={index} className="flex justify-between mt-3">
                  <div className="flex">
                    <Avatar rounded={true} img={item.image} />
                    <p className="text-bold flex items-center ms-2">
                      <b>{item.fullname}</b>
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Link to={"/detail-user/" + item.ID}>
                      <Button size="xs">Check Profile</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
