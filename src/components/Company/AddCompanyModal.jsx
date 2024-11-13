import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import FileUpload from "../FileUpload/FileUpload";
import { extractFileInfo } from "../TechnicianForm/helpers";

const CREATE_COMPANY = gql`
  mutation CreateCompany($input: CompanyInput!) {
    createCompany(input: $input) {
      id
      name
      companyLicenseNo
      companyLicenseFile {
        fileName
        mimeType
        content
      }
    }
  }
`;

function AddCompanyModal({
  isOpen,
  onClose,
  onCompanyCreated,
  inputValue,
  resetCompany,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    if (inputValue) {
      setValue("companyName", inputValue);
    }
  }, [inputValue]);

  const [createCompany] = useMutation(CREATE_COMPANY, {
    onCompleted: (data) => {
      onCompanyCreated(data.createCompany);
      reset();
      onClose();
    },
    onError: (error) => {
      console.error("Error creating company:", error);
    },
  });

  const onSubmit = async (data) => {
    createCompany({
      variables: {
        input: {
          name: data.companyName,
          companyLicenseNo: data.companyLicenseNo,
          companyLicenseFile: await extractFileInfo(data.companyLicenseFile),
        },
      },
    });
  };

  const handleClose = () => {
    reset();
    resetCompany();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose} placement="top-center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Add New Company
        </ModalHeader>
        <ModalBody>
          <Input
            size="sm"
            type="text"
            label="Company Name"
            {...register("companyName", {
              required: "This field is required",
            })}
            isInvalid={errors?.companyName}
            errorMessage={errors?.companyName?.message}
            isRequired
          />
          <Input
            size="sm"
            type="text"
            label="Company License No."
            {...register("companyLicenseNo", {
              required: "This field is required",
            })}
            isInvalid={errors?.companyLicenseNo}
            errorMessage={errors?.companyLicenseNo?.message}
            isRequired
          />

          <Controller
            name="companyLicenseFile"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field: { onChange, ref, ...field } }) => (
              <FileUpload
                label="Company License File"
                isRequired
                error={errors?.companyLicenseFile}
                onChange={(e) => {
                  onChange(e.target.files[0]);
                }}
                {...field}
              />
            )}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className="bg-green-600 text-white"
            auto
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
          <Button
            className="bg-red-600 text-white hover:bg-red-700"
            auto
            flat
            onClick={handleClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddCompanyModal;
