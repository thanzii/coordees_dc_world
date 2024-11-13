import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import React from "react";
import { MdExpandMore as ViewAllIcon } from "react-icons/md";

// eslint-disable-next-line react/prop-types
function ConfirmationPage({ getValues }) {
  const formData = getValues();
  const rows = [
    {
      key: "1",
      field: "First Name",
      value: formData?.firstName,
    },
    {
      key: "2",
      field: "Last Name",
      value: formData?.lastName,
    },
    {
      key: "3",
      field: "Phone (Whatsapp)",
      value: formData?.phoneWhatsapp,
    },
    {
      key: "4",
      field: "Phone (other)",
      value: formData?.phone ?? "--",
    },
    {
      key: "5",
      field: "E-mail",
      value: formData?.email,
    },
    {
      key: "6",
      field: "Date of Birth",
      value: formData?.dateOfBirth?.toString(),
    },
    {
      key: "7",
      field: "Emirates ID",
      value: formData?.eId,
    },
    {
      key: "8",
      field: "Emirates ID FIle",
      value: formData?.eIdFile?.name,
    },
    {
      key: "9",
      field: "Company Name",
      value: formData?.company?.name,
    },
    {
      key: "10",
      field: "Company License No.",
      value: formData?.company?.companyLicenseNo,
    },
    {
      key: "11",
      field: "Company License File",
      value: formData?.company?.companyLicenseFile[0]?.fileName,
    },
    {
      key: "12",
      field: "Profession",
      value: formData?.profession,
    },
    {
      key: "13",
      field: "Profession Support File",
      value: formData?.supportFile?.name,
    },
    {
      key: "14",
      field: "Have a Driving License?",
      value: formData?.hasDrivingLicense === "true" ? "Yes" : "No",
    },
    ...(formData?.hasDrivingLicense === "true"
      ? [
          {
            key: "15",
            field: "Driving License No.",
            value: formData?.drivingLicenseNo,
          },
          {
            key: "16",
            field: "Driving License File",
            value: formData?.drivingLicenseFile?.name,
          },
        ]
      : []),
    {
      key: "17",
      field: "Location",
      value: formData?.location,
    },
  ];

  const columns = [
    {
      key: "field",
      label: "FIELD",
    },
    {
      key: "value",
      label: "VALUE",
    },
  ];

  const getRowValue = (item, columnKey) => {
    const value = getKeyValue(item, columnKey);
    if (columnKey === "value") {
      switch (item.key) {
        case "17":
          return value.length === 1 ? (
            value[0].value.display_name
          ) : (
            <Popover placement="bottom" showArrow offset={10}>
              <PopoverTrigger>
                <div className="flex flex-row truncate">
                  <div className="truncate text-sm">
                    {value[0].value.display_name}
                  </div>
                  <ViewAllIcon size="1.3em" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[240px]">
                <div className="px-1 py-2 w-full">
                  <p className="text-xs font-medium">Locations</p>
                  <div className="mt-2 flex flex-col gap-2 w-full">
                    {value.map((location, index) => (
                      <p key={index} className="font-normal text-xs">
                        {location.value.display_name}
                      </p>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          );

        default:
          return value;
      }
    } else {
      return value;
    }
  };

  return (
    <Table aria-label="table" className="mb-5" hideHeader>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getRowValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default ConfirmationPage;
