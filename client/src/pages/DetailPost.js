//css here
import { Avatar, Button, Carousel } from "flowbite-react";

//component here
import Header from "../component/Header";
import { API } from "../config/api";

//react here
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";

export default function DetailPost() {
  const [state] = useContext(AppContext);

  const { id } = useParams();

  const { data: detailPost, refetch } = useQuery(
    "detailPostCache",
    async () => {
      const response = await API.get("/post/" + id);
      return response.data.data.post;
    }
  );

  const kampret = detailPost?.user?.followers?.map((item) => item.ID);

  const handleFollow = async () => {
    try {
      const response = await API.post("/users/follow/" + detailPost?.user.ID);
      console.log(response);
      refetch();
      Swal.fire({
        title: "Success Follow",
        icon: "success",
      });
    } catch (error) {
      alert("error");
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await API.delete("/users/follow/" + detailPost?.user.ID);
      console.log(response);
      refetch();
      Swal.fire({
        title: "Success Unfollow",
        icon: "success",
      });
    } catch (error) {
      alert("error");
    }
  };

  return (
    <>
      <Header />
      <div className=" max-w-screen-sm mx-auto mb-10">
        <div className="flex justify-center items-center mt-10 justify-between">
          <div className="flex gap-5">
            {state.user.ID !== detailPost?.user.ID ? (
              <>
                <Link to={"/detail-user/" + detailPost?.user.ID}>
                  <Avatar
                    className=""
                    rounded={true}
                    img={detailPost?.user.image}
                  />
                </Link>
              </>
            ) : (
              <>
                <Link to={"/profile"}>
                  <Avatar
                    className=""
                    rounded={true}
                    img={detailPost?.user.image}
                  />
                </Link>
              </>
            )}
            <div>
              <p>
                <b>{detailPost?.user.fullname}</b>
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            {state.user.ID !== detailPost?.user.ID ? (
              <>
                <Link to={"/hire/" + detailPost?.user?.ID}>
                  <Button>Hire</Button>
                </Link>
                {kampret?.includes(state.user.ID) ? (
                  <>
                    <Button onClick={() => handleUnfollow()}>Unfollow</Button>
                  </>
                ) : (
                  <Button onClick={() => handleFollow()}>Follow</Button>
                )}
              </>
            ) : (
              null
            )}
          </div>
        </div>
        <div className=" w-full h-[500px]">
          <Carousel>
            {detailPost?.post_image.map((item, index) => (
              <img src={item.image} alt="" key={index} />
            ))}
          </Carousel>
        </div>
        <div className="mt-2">
          Say Hello 👏 <b>{detailPost?.user.fullname}</b>
        </div>
        <div>
          <p>{detailPost?.title}</p>
        </div>
        <div className="pt-5">{detailPost?.description}</div>
      </div>
    </>
  );
}
