import { Alert, Avatar, Button, Modal } from "flowbite-react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ModalFollowing({ show, showModalFollowing }) {
  const handleClose = () => showModalFollowing(false);
  const [state] = useContext(AppContext);

  const { data: profilePage, refetch } = useQuery(
    "DataProfileFollowingPageCache",
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
    <Modal show={show} size="sm" dismissible popup={true} onClose={handleClose}>
      <Modal.Header>
        <p className="text-center">{state.user.fullname} Following</p>
      </Modal.Header>
      <Modal.Body>
        <div className="h-56">
          {profilePage?.following === null ? (
            <>
              <Alert variant="dark">
                <h1>Follow someone to be a SIMP</h1>
              </Alert>
            </>
          ) : (
            <>
              {profilePage?.following.map((item, index) => (
                <div key={index} className="flex justify-between mt-3">
                  <div className="flex">
                    <Avatar rounded={true} img={item.image} />
                    <p className="text-bold flex items-center ms-2">
                      <b>{item.fullname}</b>
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button
                      size="xs"
                      color="failure"
                      onClick={async () => {
                        try {
                          await API.delete(
                            "/users/follow/" + item.ID
                          );
                          refetch();
                          Swal.fire({
                            icon: "success",
                            title: "unfollow success",
                          });
                        } catch (error) {
                          Swal.fire({
                            icon: "error",
                            title: "Unfollow error",
                          });
                        }
                      }}
                      className="mx-2"
                    >
                      Unfollow
                    </Button>
                    <Link to={"/detail-user/" + item.ID}>
                      <Button size="xs">Profile</Button>
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
