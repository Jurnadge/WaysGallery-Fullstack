import { useContext, useEffect, useState } from "react";
import { API, setAuthToken } from "../config/api";
import { AppContext } from "../context/AppContext";
import { useQuery } from "react-query";

export const useFetchOrder = () => {
  const [selectedOption, setSelectedOption] = useState("My Order");
  const [dataOrder, setDataOrder] = useState([]);
  const [dataOffer, setDataOffer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await API.get("/order");
        const offerResponse = await API.get("/offer");
        setDataOrder(orderResponse.data.hired);
        setDataOffer(offerResponse.data.hired);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return { selectedOption, dataOrder, dataOffer, handleSelectChange };
};

export const useFetchHome = () => {
  const [state] = useContext(AppContext);

  const [filSearch, setFilSearch] = useState({
    query: "",
    list: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { data: post, refetch } = useQuery("postCache", async () => {
    try {
      const response = await API.get("/posts");
      if (response.status === 404) {
        throw Error("gelo");
      }
      setIsLoading(false);
      return response.data.data.post;
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
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

  return { filSearch, isLoading, error, post, handleSearch };
};
