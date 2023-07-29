import { Button, TextInput, Textarea } from "flowbite-react";
import Header from "../component/Header";

export default function HireForm() {
  return (
    <>
      <Header />

      <div className=" max-w-screen-sm mx-auto mb-10 mt-10">
        <div>
          <form>
            <div>
              <TextInput type="text" placeholder="Title" />
            </div>
            <div className="mt-4">
              <Textarea rows={7} placeholder="Description" />
            </div>
            <div className="flex justify-between justify-center mt-4">
              <div className="w-full me-5">
                <TextInput
                  type="text"
                  placeholder="Start Date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
              <div className="w-full ms-5">
                <TextInput
                  type="text"
                  placeholder="End Date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </div>
            <div className="mt-4">
              <TextInput type="number" placeholder="Price" />
            </div>
            <div className="flex justify-center mt-8">
              <div className="me-3">
                <Button size="xs">Cancel</Button>
              </div>
              <div className="ms-3">
                <Button size="xs">Bidding</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
