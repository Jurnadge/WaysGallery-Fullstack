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

export default function Profile() {
  const { data: profilePage } = useQuery("DataProfilePageCache", async () => {
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
  });

  console.log("ini data profile", profilePage);

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
          <div className="flex pt-16 flex-row md:max-w-screen-md lg:max-w-screen-2xl mr-56 ml-16 gap-10 w-full">
            <div className="flex justify-between items-start gap-3">
              <div className="w-full flex flex-col items-start">
                <Avatar size="lg" rounded={true} img={profilePage?.avatar} />
                <h1 className="font-semibold">{profilePage?.fullname}</h1>
                <h1 className="text-4xl w-full font-semibold ">
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
                className="w-[600px] h-[500px] rounded-md border border-emerald-500"
              />
            </div>
          </div>

          <div className="py-16 lg:max-w-screen-3xl ml-16 mr-20">
            <h3 className="font-semibold">My Work</h3>

            <div className="grid grid-cols-4 gap-4 pt-6">
              {profilePage?.posts.length !== 0 ? (
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
