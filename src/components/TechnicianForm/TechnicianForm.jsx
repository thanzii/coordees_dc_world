import { Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import Layout from "../Layout";
import { getDefaultValues, onSubmit } from "./helpers";
import UserDetails from "./UserDetails";
import ProfessionalDetails from "./ProfessionalDetails";
import ConfirmationPage from "./Confirmation/ConfirmationPage";

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
function TechnicianForm({ selectedTechnician, setSelectedTechnician }) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 2;
  const {
    control,
    getValues,
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: getDefaultValues(currentStep),
    reValidateMode: "onChange",
  });

  const hasDrivingLicense = watch("hasDrivingLicense");

  useEffect(() => {
    return () => {
      setSelectedTechnician(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedTechnician) {
      Object.keys(selectedTechnician).forEach((key) => {
        setValue(key, selectedTechnician[key]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTechnician]);

  const stepFields = [
    ["firstName", "lastName", "phoneWhatsapp", "phone", "email", "dateOfBirth"],
    [
      "company",
      "eId",
      "eIdFile",
      "profession",
      "supportFile",
      "hasDrivingLicense",
      "drivingLicenseNo",
      "drivingLicenseFile",
      "location",
    ],
  ];

  const handleSelection = async (key) => {
    key = Number(key);
    if (key > currentStep) {
      await trigger(stepFields[currentStep]);
      if (isValid) {
        setCurrentStep(key);
      }
    } else if (key < currentStep) {
      setCurrentStep(key);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center w-full m-5">
        <Card className="max-w-full w-3/5 h-100">
          <CardBody className="overflow-hidden">
            <Tabs
              aria-label="Options"
              className="w-full"
              fullWidth
              size="lg"
              selectedKey={String(currentStep)}
              onSelectionChange={handleSelection}
            >
              <Tab key="0" title="User Details">
                <UserDetails
                  control={control}
                  errors={errors}
                  register={register}
                />
                <Button
                  className="flex place-self-end"
                  onClick={() => handleSelection(1)}
                >
                  Next
                </Button>
              </Tab>
              <Tab key="1" title="Professional Details">
                <ProfessionalDetails
                  control={control}
                  errors={errors}
                  hasDrivingLicense={hasDrivingLicense}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
                <div className="flex flex-row justify-between">
                  <Button
                    className="flex place-self-start"
                    onClick={() => handleSelection(0)}
                  >
                    Previous
                  </Button>
                  <Button
                    className="flex place-self-end"
                    onClick={() => handleSelection(2)}
                  >
                    Next
                  </Button>
                </div>
              </Tab>
              <Tab key="2" title="Confirmation">
                <ConfirmationPage getValues={getValues} />
                <div className="flex flex-row justify-between">
                  <Button
                    className="flex place-self-start"
                    onClick={() => handleSelection(1)}
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    className="flex place-self-end"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
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

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(TechnicianForm);
