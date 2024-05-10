import React from "react";
import view from "../../assets/view.svg";

function ConfirmationPage({ formData }) {
  const renderLocations = () => {
    if (formData && formData.location) {
      return formData.location.map((loc, index) => (
        <td key={index} className="border border-gray-400 p-2">
          {loc.display_name}
        </td>
      ));
    }
    return <td className="border border-gray-400 p-2">N/A</td>;
  };

  return (
    <div>
      <div className="p-5 m-5">
        <div className="flex justify-center w-full bg-gradient-to-br from-green-500 via-green-400 to-green-300 rounded-md p-1 text-white font-semibold">
          Confirmation
        </div>
        <table className="table-auto border-collapse border border-gray-400 w-full my-2">
          <tbody>
            <tr>
              <th className="border border-gray-400 p-2">First Name</th>
              <td className="border border-gray-400 p-2">
                {formData?.firstName}
              </td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">Last Name</th>
              <td className="border border-gray-400 p-2">
                {formData?.lastName}
              </td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">Phone (other)</th>
              <td className="border border-gray-400 p-2">{formData?.phone}</td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">Phone (Whatsapp)</th>
              <td className="border border-gray-400 p-2">
                {formData?.phoneWhatsapp}
              </td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">E-mail</th>
              <td className="border border-gray-400 p-2">{formData?.email}</td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">D.O.B</th>
              <td className="border border-gray-400 p-2">
                {formData?.dateOfBirth}
              </td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">E.ID</th>
              <td className="border border-gray-400 p-2">{formData?.eId}</td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">E.ID File</th>
              <td className="border border-gray-400 p-2">
                <div className="flex justify-between">
                  {formData?.eIdFile?.fileName}
                  <button
                    className="bg-green-400 rounded-md shadow-md cursor-pointer p-2"
                    onClick={() => window.open()}
                  >
                    <img src={view} />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">Company</th>
              <td className="border border-gray-400 p-2">
                {formData?.company?.name}
              </td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">
                Company License No.
              </th>
              <td className="border border-gray-400 p-2">
                {formData?.companyLicenseNo}
              </td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">
                Company License File
              </th>
              <td className="border border-gray-400 p-2">
                <div className="flex justify-between">
                  {formData?.companyLicenseFile?.fileName}
                  <button
                    className="bg-green-400 rounded-md shadow-md cursor-pointer p-2"
                    onClick={() => window.open()}
                  >
                    <img src={view} />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">Profession</th>
              <td className="border border-gray-400 p-2">
                {formData?.profession}
              </td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">Support File</th>
              <td className="border border-gray-400 p-2">
                <div className="flex justify-between">
                  {formData?.supportFile?.fileName}
                  <button
                    className="bg-green-400 rounded-md shadow-md cursor-pointer p-2 ml-10"
                    onClick={() => window.open()}
                  >
                    <img src={view} />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">Driving License</th>
              <td className="border border-gray-400 p-2">
                {formData?.hasDrivingLicense === true ? "Yes" : "No"}
              </td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">
                Driving License No.
              </th>
              <td className="border border-gray-400 p-2">
                {formData?.drivingLicenseNo}
              </td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">
                Driving License File
              </th>
              <td className="border border-gray-400 p-2">
                <div className="flex justify-between">
                  {formData?.drivingLicenseFile?.fileName}
                  <button
                    className="bg-green-400 rounded-md shadow-md cursor-pointer p-2"
                    onClick={() => window.open()}
                  >
                    <img src={view} />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th className="border border-gray-400 p-2">Location</th>
              {renderLocations()}
            </tr>
            {console.log("formData", formData)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConfirmationPage;
