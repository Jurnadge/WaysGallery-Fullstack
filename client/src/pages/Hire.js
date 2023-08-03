import { Button, TextInput, Textarea } from "flowbite-react";
import Header from "../component/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";

export default function HireForm() {
  const { id } = useParams();
  console.log("ini state", id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startProject: "",
    endProject: "",
    price: "",
    orderTo: id,
    status: "",
  });

  const {
    title,
    description,
    startProject,
    endProject,
    price,
    orderTo,
    status,
  } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      };

      const body = JSON.stringify({ form });
      console.log("ini body", body);

      const response = await API.post("/hired", form, config);
      console.log("ini response bidding");
      const newToken = response.data.data.token;
      window.snap.pay(newToken, {
        onSuccess: function (result) {
          console.log(result);
          alert("Yey kamu berhasil bayar");
        },
        onPending: function (result) {
          console.log(result);
          alert("Pembayaran mu masih pending");
        },
        onError: function (result) {
          console.log(result);
          alert("Pembayaran mu error");
        },
        onClose: function (result) {
          alert("Oyyyy Bayar dulu lah minimal");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const myMidtransClientKey = "SB-Mid-server-JzKGpbTWEZCCoYoztNSMrPfk";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
      <Header />

      <div className=" max-w-screen-sm mx-auto mb-10 mt-10">
        <div>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div>
              <TextInput
                type="text"
                name="title"
                value={title}
                placeholder="Title"
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <Textarea
                rows={7}
                name="description"
                value={description}
                placeholder="Description"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between justify-center mt-4">
              <div className="w-full me-5">
                <TextInput
                  type="date"
                  placeholder="Start Date"
                  // onFocus={(e) => (e.target.type = "date")}
                  // onBlur={(e) => (e.target.type = "text")}
                  name="startProject"
                  onChange={handleChange}
                  value={startProject}
                />
              </div>
              <div className="w-full ms-5">
                <TextInput
                  type="date"
                  placeholder="End Date"
                  // onFocus={(e) => (e.target.type = "date")}
                  // onBlur={(e) => (e.target.type = "text")}
                  name="endProject"
                  onChange={handleChange}
                  value={endProject}
                />
              </div>
            </div>
            <div className="mt-4">
              <TextInput
                type="number"
                name="price"
                value={price}
                onChange={handleChange}
                placeholder="Price"
              />
            </div>
            <div className="flex justify-center mt-8">
              <div className="me-3">
                <Button size="xs">Cancel</Button>
              </div>
              <div className="ms-3">
                <Button type="submit" size="xs">
                  Bidding
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
