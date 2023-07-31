// css here
import { Alert, Avatar } from "flowbite-react";
import rectangle from "../assets/images/Rectangle.png";
// import art from "../assets/images/sample-art.png";

//import component here
import Header from "../component/Header";
import { API } from "../config/api";

// react here
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import ModalFollowers from "../component/ModalFollowers";
import ModalFollowing from "../component/ModalFollowing";

export default function Profile() {
  const [showFollowers, setShowFollowers] = useState();
  const [showFollowing, setShowFollowing] = useState();

  const { data: profilePage, refetch } = useQuery(
    "DataProfilePageCache",
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
    <>
      <div className="w-screen h-screen">
        <Header />

        <div className="overflow-hidden w-screen">
          <div className="absolute overflow-hidden right-0 top-0 -z-10">
            <img
              src={rectangle}
              alt="rectangle"
              className="h-[600px] w-[400px]"
            />
          </div>
          <div className="grid grid-cols-3 pt-16 flex-row md:max-w-screen-md lg:max-w-screen-2xl mr-56 ml-16 w-full">
            <div className="flex justify-between items-start gap-3">
              <div className="w-full flex flex-col items-center">
                <Avatar size="lg" rounded={true} img={profilePage?.avatar} />
                <h1 className="font-semibold">{profilePage?.fullname}</h1>
                <div className="grid grid-cols-3 w-full">
                  <div className="text-center">
                    <p>{profilePage?.posts.length}</p>
                    <p>Post</p>
                  </div>

                  <div
                    className="text-center"
                    onClick={() => setShowFollowers(true)}
                  >
                    <p className="">
                      {profilePage?.followers == null
                        ? 0
                        : profilePage?.followers.length}
                    </p>
                    <p className="">Followers</p>
                  </div>

                  <div
                    className="text-center"
                    onClick={() => {
                      setShowFollowing(true);
                      refetch();
                    }}
                  >
                    <p className="">
                      {profilePage?.following == null
                        ? 0
                        : profilePage?.following.length}
                    </p>
                    <p className="">Following</p>
                  </div>
                </div>
                <h1 className="text-4xl text-center w-full font-semibold ">
                  {profilePage?.greeting}
                </h1>
                <div className="mt-12 flex items-center gap-3">
                  <Link to={"/edit-profile"}>
                    <button className="px-4 py-2 rounded text-white bg-[#2FC4B2] hover:bg-[#167065] hover:transition hover:ease-in-out font-semibold">
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-max">
              <img
                src={profilePage?.arts}
                alt=""
                className="w-[500px] h-[400px] rounded-md border border-emerald-500"
              />
            </div>
          </div>

          <div className="py-16 lg:max-w-screen-3xl ml-16 mr-20">
            <h3 className="font-semibold">My Work</h3>

            {profilePage?.posts.length !== 0 ? (
              <div className="grid grid-cols-4 gap-4 pt-6">
                <>
                  {profilePage?.posts.map((item) => (
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
              </div>
            ) : (
              <>
                <Alert variant="dark" className="w-full mt-6">
                  POST SOMETHING!!!!!!
                </Alert>
              </>
            )}
          </div>
        </div>
      </div>
      <ModalFollowers
        show={showFollowers}
        showModalFollowers={setShowFollowers}
      />
      <ModalFollowing
        show={showFollowing}
        showModalFollowing={setShowFollowing}
      />
    </>
  );
}
