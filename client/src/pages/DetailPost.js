//css here
import { Avatar, Button, Carousel } from "flowbite-react";
import imgDetail from "../assets/images/detailpost.png";

//component here
import Header from "../component/Header";
import { API } from "../config/api";

//react here
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function DetailPost() {
  const { id } = useParams();

  const { data: detailPost } = useQuery("detailPostCache", async () => {
    const response = await API.get("/post/" + id);
    return response.data.data.post;
  });

  console.log("data detail", detailPost);

  return (
    <>
      <Header />
      <div className=" max-w-screen-sm mx-auto mb-10">
        <div className="flex justify-center items-center mt-10 justify-between">
          <div className="flex gap-5">
            <Link to={"/detail-user/"+ detailPost?.user.ID}>
              <Avatar
                className=""
                rounded={true}
                img={detailPost?.user.image}
              />
            </Link>
            <div>
              <p>
                <b>{detailPost?.title}</b>
              </p>
              <p>{detailPost?.user.fullname}</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Link to={"/hire"}>
              <Button>Hire</Button>
            </Link>
            <Button>Follow</Button>
          </div>
        </div>
        <div className=" w-full h-[500px]">
          <Carousel>
            {detailPost?.post_image.map((item, index) => (
              <img src={item.image} alt="" key={index} />
            ))}
          </Carousel>
        </div>
        <div className="mt-2">Say Hello 👏 {detailPost?.user.fullname}</div>
        <div className="pt-5">{detailPost?.description}</div>
      </div>
    </>
  );
}
