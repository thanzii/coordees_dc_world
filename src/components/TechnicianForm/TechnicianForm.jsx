import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import Layout from "../Layout";
import UserDetails from "./UserDetails";
import { getDefaultValues, onSubmit } from "./helpers";
import ProfessionalDetails from "./ProfessionalDetails";
import next from "../../assets/next.svg";
import previous from "../../assets/previous.svg";
import Stepper from "../Stepper/Stepper";
import ConfirmationPage from "../TechnicianForm/Confirmation/ConfirmationPage";

function TechnicianForm({ selectedTechnician }) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 2;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: getDefaultValues(currentStep),
  });

  const hasDrivingLicense = watch("hasDrivingLicense");

  useEffect(() => {
    if (selectedTechnician) {
      Object.keys(selectedTechnician).forEach((key) => {
        setValue(key, selectedTechnician[key]);
      });
    }
  }, [selectedTechnician]);

  const handleNext = () => {
    if (isValid) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <form
          className="w-[70vw] h-auto p-6 bg-gradient-to-br from-stone-300 via-stone-200 to-stone-50 my-5 rounded-md shadow-md overflow-auto no-scrollbar relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Stepper totalSteps={totalSteps} currentStep={currentStep} />
            {currentStep === 0 && (
              <UserDetails register={register} errors={errors} />
            )}
            {currentStep === 1 && (
              <ProfessionalDetails
                register={register}
                errors={errors}
                hasDrivingLicense={hasDrivingLicense}
              />
            )}
            {currentStep === 2 && <ConfirmationPage />}
          </div>
          <div className="flex justify-end">
            {currentStep > 0 && (
              <div
                onClick={handlePrev}
                className="max-w-14 cursor-pointer absolute bottom-4 md:top-4 left-4"
              >
                <img src={previous} alt="prev_icon" />
              </div>
            )}
            {currentStep < totalSteps ? (
              <div className="max-w-12 cursor-pointer" onClick={handleNext}>
                <img src={next} alt="next_icon" />
              </div>
            ) : (
              <button
                type="submit"
                className={`text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                {"Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
}

const mapStateToProps = ({ techniciansModel: { selectedTechnician } }) => ({
  selectedTechnician,
});

export default connect(mapStateToProps)(TechnicianForm);
