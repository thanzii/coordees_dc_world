import { parseDate } from "@internationalized/date";
import {
  createTechnician,
  updateTechnician,
} from "../../db-service/technicianDbService";
import { dispatch, getState } from "../../redux/store";
import { CalendarDate } from "@internationalized/date";

// Default values for each step in the form
const getDefaultValues = (currentStep) => {
  switch (currentStep) {
    case 0:
      return {
        firstName: "",
        lastName: "",
        phoneWhatsapp: "",
        phone: "",
        email: "",
        dateOfBirth: parseDate("1995-01-01"),
      };
    case 1:
      return {
        eId: "",
        eIdFile: {
          fileName: "",
          mimeType: "",
          content: "",
        },
        // companyLicenseNo: "",
        // companyLicenseFile: {
        //   fileName: "",
        //   mimeType: "",
        //   content: "",
        // },
        company: {
          name: "",
          companyLicenseNo: "",
          companyLicenseFile: {
            fileName: "",
            mimeType: "",
            content: "",
          },
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
        // companyLicenseNo: "",
        // companyLicenseFile: {
        //   fileName: "",
        //   mimeType: "",
        //   content: "",
        // },
        company: {
          name: "",
          companyLicenseNo: "",
          companyLicenseFile: {
            fileName: "",
            mimeType: "",
            content: "",
          },
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

// Utility to read file asynchronously
const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    if (file instanceof Blob) {
      reader.readAsDataURL(file); // Read the file as data URL
    } else {
      reject(new Error("File is not a valid Blob"));
    }
  });
};

// Function to extract file information (name, type, content)
const extractFileInfo = async (file) => {
  if (!file) return null; // If no file is provided, return null

  try {
    const fileContent = await readFileAsync(file);
    return {
      fileName: file.name,
      mimeType: file.type,
      content: fileContent.split(",")[1], // Extract base64 content from data URL
    };
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
};

export const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
};

// Main function to handle form submission
const onSubmit = async (data) => {
  try {
    // Ensure dateOfBirth is properly formatted if it's a CalendarDate instance
    if (data?.dateOfBirth instanceof CalendarDate) {
      data.dateOfBirth = formatDate(data?.dateOfBirth);
    }

    // Extract file info if files are present
    if (data?.eIdFile && data?.eIdFile instanceof File) {
      data.eIdFile = await extractFileInfo(data?.eIdFile);
    }

    if (
      data?.company?.companyLicenseFile &&
      data?.company.companyLicenseFile instanceof File
    ) {
      data.company.companyLicenseFile = await extractFileInfo(
        data.company.companyLicenseFile
      );
    }

    if (data?.drivingLicenseFile && data?.drivingLicenseFile instanceof File) {
      data.drivingLicenseFile = await extractFileInfo(data?.drivingLicenseFile);
    }

    if (data?.supportFile && data?.supportFile instanceof File) {
      data.supportFile = await extractFileInfo(data?.supportFile);
    }

    // Convert hasDrivingLicense to boolean if it's a string
    data.hasDrivingLicense = data.hasDrivingLicense === "true";

    // Dispatch the action to create or update technician
    dispatch.techniciansModel.createOrUpdateTechnician(data);
  } catch (error) {
    console.error("Error creating/updating technician", error);
  }
};

export { extractFileInfo, getDefaultValues, onSubmit };
