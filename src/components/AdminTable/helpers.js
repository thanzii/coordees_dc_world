import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const getTableHeaders = () => [
  "Company Name",
  "Name",
  "Email",
  "Profession",
  "Whatsapp number",
  "Other number",
  "D.O.B",
  "E.ID",
  "D/L Status",
  "D/L",
  "Company License",
  "Location",
];

const handleDownload = (file) => {
  const { fileName, mimeType, content } = file;

  const binaryContent = atob(content);

  const arrayBuffer = new ArrayBuffer(binaryContent.length);
  const unit8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryContent.length; i++) {
    unit8Array[i] = binaryContent.charCodeAt(i);
  }

  const blob = new Blob([unit8Array], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

const getDetails = (technician) => {
  return [
    {
      value: `${technician.firstName} ${technician.lastName}`,
    },
    { value: technician.email },
    { value: technician.profession },
    { value: technician.phoneWhatsapp },
    { value: technician.phone },
    { value: technician.dateOfBirth },
    {
      value: `No: ${technician.eId}`,
      onDownload: () => handleDownload(technician?.eIdFile[0]),
    },
    { value: technician.hasDrivingLicense ? "Yes" : "No" },
    {
      value: `No: ${technician.drivingLicenseNo}`,
      showDownload: technician?.hasDrivingLicense,
      onDownload: () => handleDownload(technician?.drivingLicenseFile[0]),
    },
    {
      value: `No: ${technician.companyLicenseNo}`,
      onDownload: () => handleDownload(technician?.companyLicenseFile[0]),
    },
  ];
};

const handleDelete = async ({ technicianId, deleteTechnician, refetch }) => {
  try {
    const { data } = await deleteTechnician({
      variables: {
        input: {
          id: technicianId,
        },
      },
    });
    refetch();
  } catch (error) {
    console.error(error);
  }
};

const sendApprovalMailAction = async ({
  technicianId,
  status,
  sendApprovalMail,
  techniciansData,
  refetch,
  setStatus,
}) => {
  try {
    const isApproved = status === "Approved";
    const action = isApproved ? "Approval" : "Rejection";

    socket.emit(`approveTechnician${isApproved ? "Approved" : "Rejected"}`, {
      technicianId,
    });

    const { data: mailData } = await sendApprovalMail({
      variables: { technicianId, status },
    });
    if (mailData.sendApprovalMail.success) {
      console.log(`${status} email sent successfully`);
      const updatedTechnicians = techniciansData.technicians.map((tech) =>
        tech.id === technicianId ? { ...tech, approvalStatus: status } : tech
      );
      refetch({ technicians: updatedTechnicians });
      setStatus(mailData.sendApprovalMail.status);
    } else {
      console.error(
        `Failed to send ${status.toLowerCase()} email:`,
        mailData.sendApprovalMail.message
      );
    }
  } catch (error) {
    console.error(`Error sending ${status.toLowerCase()} email:`, error);
  }
};

const handleApprovalAction = async ({
  technicianId,
  newStatus,
  handleApproval,
  status,
  setStatus,
  refetch,
  onSendApprovalMail,
}) => {
  try {
    const { data: approvalData } = await handleApproval({
      variables: { technicianId, status: newStatus },
    });
    refetch();
    if (approvalData.handleApproval.success) {
      setStatus(approvalData.handleApproval.status);
      await onSendApprovalMail(technicianId, newStatus);
    } else {
      console.error(
        `Failed to trigger ${status.toLowerCase()} logic:`,
        approvalData.handleApproval.message
      );
    }
  } catch (error) {
    console.error(`Error triggering ${status.toLowerCase()} logic:`, error);
  }
};

export {
  getDetails,
  getTableHeaders,
  handleApprovalAction,
  handleDelete,
  sendApprovalMailAction,
};
