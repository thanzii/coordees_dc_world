import { useMutation, useQuery } from "@apollo/client";
import groupBy from "group-by";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import {
  MdCheck as ApproveIcon,
  MdDelete as DeleteIcon,
  MdOutlineFileDownload as DownloadIcon,
  MdEdit as EditIcon,
  MdOutlineMoreVert as MenuIcon,
  MdClose as RejectIcon,
  MdExpandMore as ViewAllIcon,
} from "react-icons/md";
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
  handleApprovalAction,
  handleDelete,
  handleDownload,
  sendApprovalMailAction,
} from "./helpers";
import AdvanceFilterSearch from "./Filters/AdvancedFilter";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 7,
    total: 0,
    totalPages: 1,
  });
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
        const technicians =
          filters?.locations || filters.profession || filters.company
            ? result.getFilteredTechnicians
            : result.getTechnicians;
        setIsLoading(false);
        setPageInfo({
          ...technicians.pageInfo,
          totalPages: Math.ceil(
            technicians.pageInfo.total / technicians.pageInfo.pageSize
          ),
        });
        setTotalPages(Math.ceil(technicians.pageInfo.total / 7));
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
    "Company.name"
  );

  const groupedFilteredTechnicians = groupBy(
    filteredTechniciansData?.technicians || [],
    "Company.name"
  );

  const techniciansToDisplay =
    filters?.locations || filters.profession || filters.company
      ? groupedFilteredTechnicians
      : groupedTechnicians;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    refetch({
      page: newPage,
    });
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

  const headerColumns = [
    { id: "companyName", name: "Company Name" },
    { id: "technician", name: "Technician" },
    { id: "profession", name: "Profession" },
    { id: "whatsapp", name: "Whatsapp number" },
    { id: "eId", name: "E.ID" },
    { id: "dl", name: "D/L" },
    { id: "location", name: "Location" },
    { id: "edit", name: "Edit" },
  ];

  const bottomContent = React.useMemo(() => {
    const { page, totalPages } = pageInfo;
    return (
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="default"
          variant="light"
          page={page}
          total={totalPages}
          onChange={handlePageChange}
        />
      </div>
    );
  }, [pageInfo]);

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className="grid sm:grid-cols-2 sm:gap-x-2 mt-2 ml-2">
          <AdvanceFilterSearch onChange={setFilters} />
        </div>
        {filteredTechniciansData && (
          <div className="mx-4 my-2">
            {filters?.locations &&
              filters?.locations?.map(({ display_name }) => (
                <Chip size="lg" onClose={handleChipClose} key={display_name}>
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
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {pageInfo.total} technicians
            </span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page: {pageInfo.pageSize}
            </label>
          </div>
        </div>
      </>
    );
  }, [pageInfo, filters, filteredTechniciansData]);

  const renderCell = React.useCallback((technician, detail) => {
    console.log("d>>", technician);
    switch (detail.id) {
      case "company":
        return (
          <div className="flex flex-row justify-between gap-3">
            <div className="flex flex-col">
              <p className="font-bold text-sm capitalize">
                {detail.value.companyName}
              </p>
              <p className="font-bold text-xs capitalize text-default-400">
                {detail.value.companyLicenseNo}
              </p>
            </div>
            <Button size="sm" isIconOnly onPress={detail?.onDownload}>
              <DownloadIcon size="1.3em" />
            </Button>
          </div>
        );

      case "technician":
        return (
          <Accordion
            isCompact
            itemClasses={{
              base: "py-0 m-0 min-w-[150px]",
              title: "font-semibold text-sm capitalize",
              content: "font-semibold text-xs text-default-400",
            }}
          >
            <AccordionItem key="1" title={detail.value.name}>
              <p>{detail.value.email}</p>
              <p>{detail.value.phone}</p>
              <p>{detail.value.dob}</p>
            </AccordionItem>
          </Accordion>
        );

      case "eId":
      case "dl":
        return (
          <div className="flex flex-row justify-between gap-2">
            <p className="font-medium text-sm">{detail.value}</p>
            <Button
              size="sm"
              title="click to download the document"
              isIconOnly
              onPress={detail?.onDownload}
            >
              <DownloadIcon size="1.3em" />
            </Button>
          </div>
        );

      case "locations":
        return (
          <>
            <Popover placement="bottom" showArrow offset={10}>
              <PopoverTrigger>
                <div className="flex flex-row truncate">
                  <div className="truncate text-sm font-medium">
                    {detail.value[0].display_name}
                  </div>
                  <ViewAllIcon size="1.3em" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[240px]">
                <div className="px-1 py-2 w-full">
                  <p className="text-xs font-medium">Locations</p>
                  <div className="mt-2 flex flex-col gap-2 w-full">
                    {detail.value.map((location, index) => (
                      <p key={index} className="font-normal text-xs">
                        {location.display_name}
                      </p>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </>
        );

      case "edit":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <MenuIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="menu" aria-labelledby="Menu-items">
                {technician.approvalStatus === "Waiting_for_approval" && (
                  <DropdownItem
                    textValue="Approval"
                    onPress={() => {
                      onApproval(technician.id, "Approved");
                    }}
                  >
                    <div className="flex flex-row gap-1">
                      <ApproveIcon size="1.2em" />
                      <p className="font-normal text-sm ml-2">Approve</p>
                    </div>
                  </DropdownItem>
                )}

                {technician.approvalStatus === "Approved" && (
                  <DropdownItem
                    textValue="Approval"
                    onPress={() => {
                      setSelectedTechnician(technician);
                      setIsModalOpen(true);
                      onOpen(technician);
                    }}
                  >
                    <div className="flex flex-row gap-1">
                      <EditIcon size="1.2em" />
                      <p className="font-normal text-sm ml-2">Edit</p>
                    </div>
                  </DropdownItem>
                )}

                {technician.approvalStatus === "Approved" ||
                  (technician.approvalStatus !== "Rejected" && (
                    <DropdownItem
                      textValue="Approval"
                      onPress={() => onApproval(technician.id, "Rejected")}
                    >
                      <div className="flex flex-row gap-1">
                        <RejectIcon size="1.2em" />
                        <p className="font-normal text-sm ml-2">Reject</p>
                      </div>
                    </DropdownItem>
                  ))}

                {technician.approvalStatus !== "Waiting_for_approval" && (
                  <DropdownItem
                    textValue="Delete"
                    onPress={() => onDelete(technician.id)}
                  >
                    <div className="flex flex-row gap-1">
                      <DeleteIcon size="1.2em" />
                      <p className="font-normal text-sm ml-2">Delete</p>
                    </div>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        );

      default:
        return (
          <div className="flex flex-row justify-between gap-3">
            <p className="font-medium text-sm">{detail.value}</p>
          </div>
        );
    }
  }, []);

  return (
    <Layout>
      <Table
        className="sm:m-10 m-4 w-auto"
        aria-label="technician-table"
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
        topContent={topContent}
        topContentPlacement="inside"
      >
        <TableHeader columns={headerColumns}>
          {headerColumns.map(({ id, name }) => (
            <TableColumn key={id} align={name === "edit" ? "center" : "start"}>
              {name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          emptyContent={"No technicians found"}
          items={Object.entries(techniciansToDisplay)}
        >
          {Object.entries(techniciansToDisplay).map(
            ([companyName, technicians]) => {
              return technicians.map((technician, index) => {
                const technicianDetails = getDetails(technician);

                {
                  return (
                    <TableRow key={technician.id}>
                      {index === 0 ? (
                        <TableCell
                          key="company"
                          rowSpan={technicians.length}
                          className="align-top min-w-[200px]"
                        >
                          {renderCell(technician, {
                            id: "company",
                            value: {
                              companyName,
                              companyLicenseNo:
                                technician.Company.companyLicenseNo,
                            },
                            onDownload: () =>
                              handleDownload(
                                technician?.Company.companyLicenseFile[0]
                              ),
                          })}
                        </TableCell>
                      ) : (
                        ""
                      )}

                      {technicianDetails.map((detail, ix) => (
                        <TableCell
                          key={ix}
                          className={`align-top ${
                            detail.id === "technician" ? "py-0" : ""
                          }`}
                        >
                          {renderCell(technician, detail)}
                        </TableCell>
                      ))}

                      <TableCell
                        key="location"
                        className="align-top flex flex-row justify-between gap-3  max-w-[250px]"
                      >
                        {renderCell(technician, {
                          id: "locations",
                          value: technician.location,
                        })}
                      </TableCell>
                      <TableCell key="edit" className="align-top">
                        {renderCell(technician, { id: "edit" })}
                      </TableCell>
                    </TableRow>
                  );
                }
              });
            }
          )}
        </TableBody>
      </Table>
      {/* <Modal
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
      </Modal> */}
      <Modal
        className="bg-opacity-50 shadow-md"
        size="4xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>{selectedTechnician && <TechnicianForm />}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
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
