import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import Layout from "../Layout";
import UserDetails from "./UserDetails";
import { getDefaultValues, onSubmit } from "./helpers";
import ProfessionalDetails from "./ProfessionalDetails";
import next from "../../assets/next.svg";
import previous from "../../assets/previous.svg";
import ConfirmationPage from "../TechnicianForm/Confirmation/ConfirmationPage";
import VerticalAccordion from "../Stepper/Stepper";
import { Button } from "@nextui-org/react";

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

  const handleNext = async () => {
    await trigger(stepFields[currentStep]);
    if (isValid) {
      setCurrentStep((prevStep) => prevStep + 1);
      // currentStep === 1?
    }
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="flex w-[70vw] my-5 rounded-md shadow-md">
          <div className="flex w-full">
            <div className="flex-none w-1/3 bg-stone-300  rounded-l-md relative px-12 py-5">
              {currentStep > 0 && (
                <div
                  onClick={handlePrev}
                  className="max-w-14 absolute top-4 left-4 cursor-pointer"
                >
                  <img src={previous} alt="prev_icon" />
                </div>
              )}
              <VerticalAccordion
                totalSteps={totalSteps}
                currentStep={currentStep}
              />
            </div>
            <div className="flex-1 p-6 bg-stone-300 rounded-r-md shadow-md overflow-auto relative">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  {currentStep === 0 && (
                    <UserDetails
                      control={control}
                      register={register}
                      errors={errors}
                    />
                  )}
                  {currentStep === 1 && (
                    <ProfessionalDetails
                      control={control}
                      register={register}
                      errors={errors}
                      hasDrivingLicense={hasDrivingLicense}
                      watch={watch}
                      setValue={setValue}
                    />
                  )}
                  {currentStep === 2 && (
                    <ConfirmationPage getValues={getValues} />
                  )}
                </div>
                <div className="flex justify-end">
                  {currentStep < totalSteps ? (
                    <div
                      className="max-w-12 cursor-pointer"
                      onClick={handleNext}
                    >
                      <img src={next} alt="next_icon" />
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      className={`text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    >
                      {"Submit"}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
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
