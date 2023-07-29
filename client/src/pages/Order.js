import { Button, Dropdown, Table } from "flowbite-react";
import Header from "../component/Header";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

export default function Order() {
  return (
    <>
      <Header />
      <div className="w-full pt-10 lg:max-w-screen-3xl">
        <div className="ms-10">
          <select
            id="countries"
            className="bg-gray-200 border-none text-gray-600 text-xs rounded-md focus:ring-0 focus:border-none block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          >
            <option value="today">My Order</option>
            <option value="US">My Offer</option>
          </select>
        </div>

        {/* offer */}
        <div className="flex justify-center mt-6">
          <table className="border-2 text-left">
            <tr className="border-2">
              <th className="border-2 w-12">No</th>
              <th className="border-2 w-32">Vendor</th>
              <th className="border-2 w-40">Order</th>
              <th className="border-2 w-48">Start Project</th>
              <th className="border-2 w-48">End Project</th>
              <th className="border-2 w-44">Status</th>
              <th className="border-2 w-48">Action</th>
            </tr>
            <tr>
              <td className="border-2">1</td>
              <td className="border-2">Geralt</td>
              <td className="border-2">Landing Design</td>
              <td className="border-2">20 December 2020</td>
              <td className="border-2">21 January 2020</td>
              <td className="border-2">Waiting Accept</td>
              <td className="border-2">Wait</td>
            </tr>
          </table>
        </div>

        {/* order */}
        <div className="flex justify-center mt-6">
          <table className="border-2 text-left">
            <tr className="border-2">
              <th className="border-2 w-12">No</th>
              <th className="border-2 w-32">Vendor</th>
              <th className="border-2 w-40">Order</th>
              <th className="border-2 w-48">Start Project</th>
              <th className="border-2 w-48">End Project</th>
              <th className="border-2 w-44">Status</th>
              <th className="border-2 w-48">Action</th>
            </tr>
            <tr>
              <td className="border-2">1</td>
              <td className="border-2">Geralt</td>
              <td className="border-2">Landing Design</td>
              <td className="border-2">20 December 2020</td>
              <td className="border-2">21 January 2020</td>
              <td className="border-2">Waiting Accept</td>
              <td className="border-2">
                <div className="flex">
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
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
