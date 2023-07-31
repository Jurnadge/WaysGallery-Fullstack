// css here
import { Alert, Avatar } from "flowbite-react";
import rectangle from "../assets/images/Rectangle.png";

//component here
import Header from "../component/Header";

//react here
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";

export default function DetailUser() {
  const [state] = useContext(AppContext);
  const { id } = useParams();

  const { data: dataUser, refetch } = useQuery("detailUserCache", async () => {
    const response = await API.get("/user/" + id);
    return response.data.data;
  });

  const handleFollow = async () => {
    try {
      await API.post("/users/follow/" + dataUser?.id);
      refetch();
      Swal.fire({
        title: "Success Followed",
        icon: "success",
      });
    } catch (error) {
      alert("error");
    }
  };

  const handleUnfollow = async () => {
    try {
      await API.delete("/users/follow/" + id);
      refetch();
      Swal.fire({
        title: "Success Unfollowed",
        icon: "success",
      });
    } catch (error) {
      alert("error");
    }
  };

  const kampret = dataUser?.followers?.map((item) => item.ID);

  return (
    <>
      <div className="w-screen h-screen">
        <Header />

        <div className="absolute overflow-hidden w-screen">
          <div className="absolute right-0 top-0 -z-10">
            <img
              src={rectangle}
              alt="rectangle"
              className=" h-[600px] w-[400px]"
            />
          </div>
          <div className="grid grid-cols-3 pt-16 flex-row md:max-w-screen-md lg:max-w-screen-2xl mr-56 ml-16 gap-10 w-full">
            <div className="flex justify-between items-start gap-3">
              <div className="w-full flex flex-col items-center">
                <Avatar size="lg" rounded={true} img={dataUser?.avatar} />
                <h1 className="font-semibold">{dataUser?.fullname}</h1>
                <div className="grid grid-cols-3 w-full">
                  <div className="text-center">
                    <p>{dataUser?.posts.length}</p>
                    <p>Post</p>
                  </div>

                  <div className="text-center">
                    <p className="">
                      {dataUser?.followers == null
                        ? 0
                        : dataUser?.followers.length}
                    </p>
                    <p className="">Followers</p>
                  </div>

                  <div className="text-center">
                    <p className="">
                      {dataUser?.following == null
                        ? 0
                        : dataUser?.following.length}
                    </p>
                    <p className="">Following</p>
                  </div>
                </div>
                <h1 className="text-4xl text-center w-full font-semibold ">
                  {dataUser?.greeting}
                </h1>
                <div className="mt-12 flex items-center gap-3">
                  {kampret?.includes(state.user.ID) ? (
                    <>
                      <button
                        onClick={() => handleUnfollow()}
                        className="px-4 py-2 rounded text-white bg-[#2FC4B2] hover:bg-[#167065] hover:transition hover:ease-in-out font-semibold"
                      >
                        Unfollow
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          handleFollow();
                        }}
                        className="px-4 py-2 rounded text-white bg-[#2FC4B2] hover:bg-[#167065] hover:transition hover:ease-in-out font-semibold"
                      >
                        Follow
                      </button>
                    </>
                  )}

                  <Link to={"/hire" + dataUser?.id}>
                    <button className="px-4 py-2 rounded text-white bg-[#2FC4B2] hover:bg-[#167065] hover:transition hover:ease-in-out font-semibold">
                      Hire
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-max">
              <img
                src={dataUser?.arts}
                alt=""
                className="w-[600px] h-[500px] rounded-md border border-emerald-500"
              />
            </div>
          </div>

          <div className="py-16 lg:max-w-screen-3xl ml-16 mr-20">
            <h3 className="font-semibold">{dataUser?.fullname} Work</h3>

            <div className="grid grid-cols-4 gap-4 pt-6">
              {dataUser?.posts.length !== 0 ? (
                <>
                  {dataUser?.posts.map((item) => (
                    <Link to={"/detail/" + item.ID}>
                      <img
                        alt="post"
                        key={item?.post_image[0].post_id}
                        src={item?.post_image[0].image}
                        className="w-full h-64 rounded-md object-cover hover:shadow-md hover:shadow-green-500 hover:transition-shadow hover:ease-in-out"
                      />
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  <Alert variant="dark">
                    Sorry, there is no list of data yet.
                  </Alert>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
