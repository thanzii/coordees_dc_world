import {
  createTechnician,
  updateTechnician,
} from "../../db-service/technicianDbService";
import { dispatch, getState } from "../../redux/store";

const getDefaultValues = (currentStep) => {
  switch (currentStep) {
    case 0:
      return {
        firstName: "",
        lastName: "",
        phoneWhatsapp: "",
        phone: "",
        email: "",
        dateOfBirth: "",
      };
    case 1:
      return {
        eId: "",
        eIdFile: {
          fileName: "",
          mimeType: "",
          content: "",
        },
        companyLicenseNo: "",
        companyLicenseFile: {
          fileName: "",
          mimeType: "",
          content: "",
        },
        profession: "",
        supportFile: {
          fileName: "",
          mimeType: "",
          content: "",
        },
        hasDrivingLicense: "false",
        drivingLicenseNo: "",
        drivingLicenseFile: {
          fileName: "",
          mimeType: "",
          content: "",
        },
      };
    case 2:
      return {
        firstName: "",
        lastName: "",
        phoneWhatsapp: "",
        phone: "",
        email: "",
        dateOfBirth: "",
        eId: "",
        eIdFile: {
          fileName: "",
          mimeType: "",
          content: "",
        },
        companyLicenseNo: "",
        companyLicenseFile: {
          fileName: "",
          mimeType: "",
          content: "",
        },
        profession: "",
        supportFile: {
          fileName: "",
          mimeType: "",
          content: "",
        },
        hasDrivingLicense: "false",
        drivingLicenseNo: "",
        drivingLicenseFile: {
          fileName: "",
          mimeType: "",
          content: "",
        },
      };
    default:
      return {};
  }
};

const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

const extractFileInfo = async (file) => {
  const fileContent = await readFileAsync(file);
  return {
    fileName: file.name,
    mimeType: file.type,
    content: fileContent.split(",")[1],
  };
};

const onSubmit = async (data) => {
  try {
    data.eIdFile = (await extractFileInfo(data?.eIdFile[0])) ?? null;

    data.companyLicenseFile =
      (await extractFileInfo(data?.companyLicenseFile[0])) ?? null;

    data.hasDrivingLicense = data.hasDrivingLicense === "true";
    data.drivingLicenseFile =
      (await extractFileInfo(data?.drivingLicenseFile[0])) ?? null;

    data.supportFile = (await extractFileInfo(data?.supportFile[0])) ?? null;

    dispatch.techniciansModel.createOrUpdateTechnician(data);
  } catch (error) {
    console.error("Error creating/updating technician", error);
  }
};

export { extractFileInfo, getDefaultValues, onSubmit };
