//css here
import Header from "../component/Header";
import searchLogo from "../assets/images/search.svg";

//component here
import { API, setAuthToken } from "../config/api";

//react here
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function HomePage() {
  const [state] = useContext(AppContext);

  const [follFilter, setFollFilter] = useState();

  const [filSearch, setFilSearch] = useState({
    query: "",
    list: [],
  });

  const { data: post, refetch } = useQuery("postCache", async () => {
    const response = await API.get("/posts");
    return response.data.data.post;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const search = post.filter((item) => {
      if (e.target.value === "") return post;
      return (
        item.user.fullname
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.description.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setFilSearch({
      query: e.target.value,
      list: search,
    });
  };

  useEffect(() => {
    if (state.isLogin === true) {
      const token = localStorage.token;
      setAuthToken(token);
      refetch();
    }
  }, [state, refetch]);

  // for naming alt image (must be used for the next project, but for now, im still confuse about this function)
  // const thumbnail = Array.isArray(post)
  //   ? post.map((item) => {
  //       return item.post_image[0];
  //     })
  //   : [];

  return (
    <>
      <Header />
      <div
        className="w-full pt-5 lg:max-w-screen-3xl"
        style={{ paddingLeft: "3.5rem", paddingRight: "4rem" }}
      >
        <div className=" flex justify-between items-center">
          <div>
            <select
              id="countries"
              className="bg-gray-200 border-none text-gray-600 text-xs rounded-md focus:ring-0 focus:border-none block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            >
              <option value="today">Todays</option>
              <option value="US">Followed</option>
            </select>
          </div>

          <div>
            <form className="flex items-center">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <img src={searchLogo} alt="search" width={20} height={20} />
                </div>
                <input
                  type="search"
                  id="simple-search"
                  className="w-48 bg-gray-200 border-none text-gray-900 text-xs rounded-lg focus:ring-0 focus:border-none block pl-10   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  onChange={handleSearch}
                  value={filSearch.query}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="pt-8 font-medium">
          <h1 className="mb-4">today's post</h1>
        </div>

        {/* <div class="columns-2 md:columns-3 lg:columns-4 mt-20 mb-20">
          {post?.map((item) => (
            <Link to={`/detail/${item.ID}`} key={item.ID}>
              {item.post_image
                ?.map((img, index) => (
                  <img
                    src={img.image}
                    key={index}
                    className="w-full mb-5 rounded-md hover:shadow-lg hover:shadow-green-500 hover:transition-shadow hover:ease-in-out hover:scale-110 duration-1000"
                    alt=""
                  />
                ))
                .shift()}
            </Link>
          ))}
        </div> */}

        <div class="columns-2 md:columns-3 lg:columns-4 mt-20 mb-20">
          {filSearch.query === "" ? (
            <>
              {post?.map((item) => (
                <Link to={`/detail/${item.ID}`} key={item.ID}>
                  {item.post_image
                    ?.map((img, index) => (
                      <img
                        src={img.image}
                        key={index}
                        className="w-full mb-5 rounded-md hover:shadow-lg hover:shadow-green-500 hover:transition-shadow hover:ease-in-out hover:scale-110 duration-1000"
                        alt=""
                      />
                    ))
                    .shift()}
                </Link>
              ))}
            </>
          ) : (
            filSearch.list.map((item) => {
              return (
                <Link to={`/detail/${item.ID}`} key={item.ID}>
                  {item.post_image
                    ?.map((img, index) => (
                      <img
                        src={img.image}
                        key={index}
                        className="w-full mb-5 rounded-md hover:shadow-lg hover:shadow-green-500 hover:transition-shadow hover:ease-in-out hover:scale-110 duration-1000"
                        alt=""
                      />
                    ))
                    .shift()}
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
