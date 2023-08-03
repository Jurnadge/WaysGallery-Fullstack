import { Button, Dropdown, Table } from "flowbite-react";
import Header from "../component/Header";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

export default function Order() {
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

  return (
    <>
      <Header />
      <div className="w-full pt-10 lg:max-w-screen-3xl">
        <div className="ms-10">
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="bg-gray-200 border-none text-gray-600 text-xs rounded-md focus:ring-0 focus:border-none block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            <option value="My Order">My Order</option>
            <option value="My Offer">My Offer</option>
          </select>
        </div>

        {/* Conditional Rendering berdasarkan selectedOption */}
        {selectedOption === "My Order" ? (
          // Tampilkan dataOrder disini sesuai kebutuhan
          <div className="flex justify-center mt-6">
            <table className="border-2 text-left">
              <tr className="border-2">
                <th className="border-2 w-12">No</th>
                <th className="border-2 w-32">Ini kita order ke orang</th>
                <th className="border-2 w-40">Title</th>
                <th className="border-2 w-48">Start Project</th>
                <th className="border-2 w-48">End Project</th>
                <th className="border-2 w-44">Status</th>
                <th className="border-2 w-48">Action</th>
              </tr>
              {dataOffer?.map((item, index) => (
                <>
                  <tr>
                    <td className="border-2">{index + 1}</td>
                    <td className="border-2">{item.orderBy.fullname}</td>
                    <td className="border-2">{item.title}</td>
                    <td className="border-2">{item.startProject}</td>
                    <td className="border-2">{item.endProject}</td>
                    <td className="border-2">{item.status}</td>
                    <td className="border-2">
                      {item?.status === "pending" ? (
                        <>
                          <p>WAITING</p>
                        </>
                      ) : (
                        <>
                          <Button>Send Project</Button>
                        </>
                      )}
                    </td>
                  </tr>
                </>
              ))}
            </table>
          </div>
        ) : (
          // Tampilkan dataOffer disini sesuai kebutuhan
          <div className="flex justify-center mt-6">
            <table className="border-2 text-left">
              <tr className="border-2">
                <th className="border-2 w-12">No</th>
                <th className="border-2 w-32">Ini orang offer ke kita</th>
                <th className="border-2 w-40">Title</th>
                <th className="border-2 w-48">Start Project</th>
                <th className="border-2 w-48">End Project</th>
                <th className="border-2 w-44">Status</th>
                <th className="border-2 w-48">Action</th>
              </tr>
              {dataOrder?.map((item, index) => (
                <>
                  <tr>
                    <td className="border-2">{index + 1}</td>
                    <td className="border-2">{item.orderBy.fullname}</td>
                    <td className="border-2">{item.title}</td>
                    <td className="border-2">{item.startProject}</td>
                    <td className="border-2">{item.endProject}</td>
                    <td className="border-2">{item.status}</td>
                    <td className="border-2">
                      <div className="flex">
                        {item?.status === "pending" ? (
                          <>
                            <div className="mx-5">
                              <Button size="xs" gradientMonochrome="success">
                                Approve
                              </Button>
                            </div>
                            <div>
                              <Button size="xs" color="failure">
                                Cancel
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="mx-auto">
                              <Button size="xs" gradientMonochrome="success">
                                Check Project
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </table>
          </div>
        )}
      </div>
    </>
  );
}
