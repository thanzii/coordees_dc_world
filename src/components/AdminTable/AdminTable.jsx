import { useMutation, useQuery } from "@apollo/client";
import groupBy from "group-by";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import check from "../../assets/check.svg";
import close from "../../assets/close.svg";
import delete1 from "../../assets/delete.svg";
import edit from "../../assets/edit.svg";
import file from "../../assets/file.svg";
import coordeesLogo from "../../assets/coordeesSmall.svg";
import {
  DELETE_TECHNICIAN,
  GET_FILTERED_TECHNICIANS,
  GET_TECHNICIANS,
  HANDLE_APPROVAL,
  SEND_APPROVAL_MAIL,
} from "../../db-service/admin";
import Layout from "../Layout";
import TechnicianForm from "../TechnicianForm/TechnicianForm";
import {
  getDetails,
  getTableHeaders,
  handleApprovalAction,
  handleDelete,
  sendApprovalMailAction,
} from "./helpers";
import AdvanceFilterSearch from "./Filters/AdvancedFilter";
import { Chip } from "@nextui-org/react";

Modal.setAppElement("#root");

function AdminTable({
  technicians,
  selectedTechnician,
  setSelectedTechnician,
}) {
  const [handleApproval] = useMutation(HANDLE_APPROVAL);
  const [sendApprovalMail] = useMutation(SEND_APPROVAL_MAIL);
  const [deleteTechnician] = useMutation(DELETE_TECHNICIAN);
  const [status, setStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    locations: null,
    profession: "",
    company: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { loading, error, data, refetch } = useQuery(
    filters?.locations || filters.profession || filters.company
      ? GET_FILTERED_TECHNICIANS
      : GET_TECHNICIANS,
    {
      variables: { page: 1, pageSize: 7, ...filters },
      onCompleted: (result) => {
        console.log("log_res", result);

        const technicians =
          filters?.locations || filters.profession || filters.company
            ? result.getFilteredTechnicians
            : result.getTechnicians;
        setIsLoading(false);
        setTotalPages(Math.ceil(technicians.pageInfo.total / 7));
        console.log("tecccc", technicians);
      },
    }
  );
  useEffect(() => {
    refetch({ page: currentPage, pageSize: 7, filters })
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [filters, currentPage]);

  // if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const techniciansData = data?.getTechnicians;
  const filteredTechniciansData = data?.getFilteredTechnicians;

  const groupedTechnicians = groupBy(
    techniciansData?.technicians || [],
    "company.name"
  );

  const groupedFilteredTechnicians = groupBy(
    filteredTechniciansData?.technicians || [],
    "company.name"
  );
  console.log("flflflfl", groupedFilteredTechnicians);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    refetch({
      page: newPage,
    });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`mx-2 px-3 py-1 rounded-md ${
            i === currentPage
              ? "bg-gradient-to-bl from-green-500 via-green-400 to-green-300 hover:bg-gradient-to-tr hover:from-green-500 hover:via-green-400 hover:to-green-300 text-white text-lg"
              : "bg-green-100"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage + maxButtonsToShow <= totalPages) {
      buttons.push(
        <button
          key="forward"
          className="mx-2 px-3 py-1 rounded-md bg-gray-200"
          onClick={() => handlePageChange(currentPage + maxButtonsToShow)}
        >
          &rarr;
        </button>
      );
    }

    return buttons;
  };

  const onApproval = (technicianId, newStatus) =>
    handleApprovalAction({
      technicianId,
      newStatus,
      handleApproval,
      refetch,
      status,
      setStatus,
      onSendApprovalMail,
    });

  const onSendApprovalMail = (technicianId, status) =>
    sendApprovalMailAction({
      technicianId,
      status,
      sendApprovalMail,
      techniciansData,
      refetch,
      setStatus,
    });

  const onDelete = (technicianId) =>
    handleDelete({ technicianId, deleteTechnician, refetch });

  const handleChipClose = () => {
    setFilters({ locations: null, profession: "", company: "" });
    refetch({ page: currentPage, pageSize: 7 });
  };

  console.log("filllll", filters?.locations);

  return (
    <Layout>
      <div className="grid gap-2 rounded-md shadow-lg m-8 bg-stone-200 overflow-auto no-scrollbar">
        <div className="grid sm:grid-cols-2 sm:gap-x-2 mt-2 ml-2">
          <AdvanceFilterSearch onChange={setFilters} />
        </div>
        {filteredTechniciansData && (
          <div className="mx-4 my-2">
            {filters?.locations &&
              filters?.locations?.map(({ display_name }) => (
                <Chip size="lg" onClose={handleChipClose}>
                  {display_name}
                </Chip>
              ))}

            {filters?.profession && (
              <Chip size="lg" onClose={handleChipClose}>
                {filters?.profession}
              </Chip>
            )}

            {filters?.company && (
              <Chip size="lg" onClose={handleChipClose}>
                {filters?.company}
              </Chip>
            )}
          </div>
        )}
        <div className="grid">
          <table className="table-auto truncate text-left overflow-auto border-collapse border border-gray-400">
            <thead>
              <tr>
                {getTableHeaders().map((header, index) => (
                  <th key={index} className="p-4 border border-gray-400">
                    <span
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {header}
                    </span>
                  </th>
                ))}
                <th className="p-4 border border-gray-400">Edit</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan={13} className="p-4">
                    <div className=" flex justify-center items-center">
                      <img
                        src={coordeesLogo}
                        alt="coordeesLogo"
                        className="animate-spin h-8 w-8"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="table-row-group bg-stone-100">
                {filters.locations || filters.profession || filters.company
                  ? Object.entries(groupedFilteredTechnicians).map(
                      ([companyName, technicians]) => {
                        return technicians.map((technician, index) => {
                          const technicianDetails = getDetails(technician);

                          return (
                            <tr key={technician.id}>
                              {/* Render table rows for filtered technicians */}
                              {index === 0 ? (
                                <td
                                  className="p-2 border border-gray-400"
                                  rowSpan={technicians.length}
                                >
                                  {companyName}
                                </td>
                              ) : null}

                              {technicianDetails.map(
                                (
                                  {
                                    value,
                                    showDownload = true,
                                    onDownload = false,
                                  },
                                  index
                                ) => (
                                  <td
                                    key={index}
                                    className="p-2 border border-gray-400"
                                  >
                                    {value}
                                    {showDownload && onDownload && (
                                      <div className="flex flex-row">
                                        <button
                                          className="bg-gradient-to-bl from-green-500 via-green-400 to-green-300 hover:bg-gradient-to-tr hover:from-green-500 hover:via-green-400 hover:to-green-300 text-white p-2 rounded-md shadow-md text-lg"
                                          onClick={onDownload}
                                        >
                                          <img src={file} alt="file" />
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                )
                              )}

                              <td className="p-2 border border-gray-400">
                                <div className="flex flex-wrap gap-1">
                                  {technician?.location.map((loc, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-gray-200 rounded-md"
                                    >
                                      {loc.display_name}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="flex mt-1">
                                {technician.approvalStatus !== "Rejected" && (
                                  <div className="py-2 pr-2 m-4 cursor-pointer bg-gradient-to-bl from-stone-400 to-stone-300 hover:bg-gradient-to-tr hover:from-stone-300 hover:to-stone-400 rounded-md shadow-md">
                                    {technician.approvalStatus ===
                                      "Waiting_for_approval" && (
                                      <img
                                        src={check}
                                        alt="coordeeslogo"
                                        className="h-3 pr-2 my-2 mx-3"
                                        onClick={() =>
                                          onApproval(technician.id, "Approved")
                                        }
                                      />
                                    )}
                                    {technician.approvalStatus ===
                                      "Approved" && (
                                      <img
                                        src={edit}
                                        alt="coordeeslogo"
                                        className="h-3 pr-2 my-2 mx-3"
                                        onClick={() => {
                                          setSelectedTechnician(technician);
                                          setIsModalOpen(true);
                                        }}
                                      />
                                    )}
                                  </div>
                                )}
                                <div className="py-2 pr-2 m-4 cursor-pointer bg-gradient-to-bl from-stone-400 to-stone-300 rounded-md shadow-md">
                                  {technician.approvalStatus === "Approved" ||
                                    (technician.approvalStatus !==
                                      "Rejected" && (
                                      <img
                                        src={close}
                                        alt="coordeeslogo"
                                        className="h-3 pr-1 my-2 mx-3"
                                        onClick={() =>
                                          onApproval(technician.id, "Rejected")
                                        }
                                      />
                                    ))}
                                  {technician.approvalStatus !==
                                    "Waiting_for_approval" && (
                                    <img
                                      src={delete1}
                                      alt="coordeeslogo"
                                      className="h-3 pr-1 my-2 mx-3"
                                      onClick={() => onDelete(technician.id)}
                                    />
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        });
                      }
                    )
                  : Object.entries(groupedTechnicians).map(
                      ([companyName, technicians]) => {
                        return technicians.map((technician, index) => {
                          const technicianDetails = getDetails(technician);

                          return (
                            <tr key={technician.id}>
                              {/* Render table rows for all technicians */}
                              {index === 0 ? (
                                <td
                                  className="border border-gray-400 px-2"
                                  rowSpan={technicians.length}
                                >
                                  {companyName}
                                </td>
                              ) : null}

                              {technicianDetails.map(
                                (
                                  {
                                    value,
                                    showDownload = true,
                                    onDownload = false,
                                  },
                                  index
                                ) => (
                                  <td
                                    key={index}
                                    className="border border-gray-400 px-2"
                                  >
                                    {value}
                                    {showDownload && onDownload && (
                                      <div className="flex justify-start">
                                        <button
                                          className="px-2 py-1 bg-gradient-to-bl from-green-500 via-green-400 to-green-300 hover:bg-gradient-to-tr hover:from-green-500 hover:via-green-400 hover:to-green-300 text-white rounded-md shadow-md text-lg"
                                          onClick={onDownload}
                                        >
                                          Download
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                )
                              )}

                              <td className="border border-gray-400 px-2">
                                <div className="flex flex-wrap">
                                  {technician?.location.map((loc, index) => (
                                    <span
                                      key={index}
                                      className=" bg-gray-200 rounded-md"
                                    >
                                      {loc.display_name}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="flex mt-1">
                                {technician.approvalStatus !== "Rejected" && (
                                  <div className="py-2 pr-2 m-4 cursor-pointer bg-gradient-to-bl from-stone-400 to-stone-300 hover:bg-gradient-to-tr hover:from-stone-300 hover:to-stone-400 rounded-md shadow-md">
                                    {technician.approvalStatus ===
                                      "Waiting_for_approval" && (
                                      <img
                                        src={check}
                                        alt="coordeeslogo"
                                        className="h-3 pr-2 my-2 mx-3"
                                        onClick={() =>
                                          onApproval(technician.id, "Approved")
                                        }
                                      />
                                    )}
                                    {technician.approvalStatus ===
                                      "Approved" && (
                                      <img
                                        src={edit}
                                        alt="coordeeslogo"
                                        className="h-3 pr-2 my-2 mx-3"
                                        onClick={() => {
                                          setSelectedTechnician(technician);
                                          setIsModalOpen(true);
                                        }}
                                      />
                                    )}
                                  </div>
                                )}
                                <div className="py-2 pr-2 m-4 cursor-pointer bg-gradient-to-bl from-stone-400 to-stone-300 rounded-md shadow-md">
                                  {technician.approvalStatus === "Approved" ||
                                    (technician.approvalStatus !==
                                      "Rejected" && (
                                      <img
                                        src={close}
                                        alt="coordeeslogo"
                                        className="h-3 pr-1 my-2 mx-3"
                                        onClick={() =>
                                          onApproval(technician.id, "Rejected")
                                        }
                                      />
                                    ))}
                                  {technician.approvalStatus !==
                                    "Waiting_for_approval" && (
                                    <img
                                      src={delete1}
                                      alt="coordeeslogo"
                                      className="h-3 pr-1 my-2 mx-3"
                                      onClick={() => onDelete(technician.id)}
                                    />
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        });
                      }
                    )}
              </tbody>
            )}
          </table>
        </div>
        <div className="flex justify-center mb-2">
          {renderPaginationButtons()}
        </div>
        <Modal
          isOpen={isModalOpen}
          contentLabel="Technician Form Modal"
          className="modal"
          style={{
            content: {
              width: `[w-80vw]`,
              height: `h-80vh`,
              margin: "auto",
            },
          }}
        >
          <div className="modal-content bg-white bg-opacity-30 rounded-md">
            {selectedTechnician && <TechnicianForm />}
          </div>
        </Modal>
      </div>
    </Layout>
  );
}

const mapStateToProps = ({ techniciansModel: { selectedTechnician } }) => ({
  selectedTechnician,
});

const mapDispatchToProps = ({
  techniciansModel: { setSelectedTechnician },
}) => ({ setSelectedTechnician });

export default connect(mapStateToProps, mapDispatchToProps)(AdminTable);
