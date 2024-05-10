import React from "react";
import PersonalInformationIcon from "../../assets/PersonalInformationIcon.svg";
import CollectionIcon from "../../assets/CollectionIcon.svg";
import ConfirmationIcon from "../../assets/ConfirmationIcon.svg";
import check from "../../assets/check.svg";

export default function Stepper({ totalSteps, currentStep }) {
  const activeColor = (index) =>
    currentStep >= index ? "bg-green-400" : "bg-green-100";
  const isFinalStep = (index) => index === totalSteps;

  const getIcon = (index) => {
    if (index === 0) {
      return (
        <div className="flex justify-center mt-2">
          <img src={PersonalInformationIcon} />
        </div>
      );
    } else if (index === 1) {
      return (
        <div className="flex justify-center mt-2">
          <img src={CollectionIcon} />
        </div>
      );
    } else if (index === 2) {
      return (
        <div className="flex justify-center mt-2">
          <img src={ConfirmationIcon} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center">
      {Array.from({ length: totalSteps + 1 }).map((_, index) => (
        <React.Fragment key={index}>
          <div className={`w-12 h-12 rounded-full ${activeColor(index)}`}>
            {currentStep > index ? (
              <div className="flex justify-center m-4 w-5 h-5 text-white">
                <img src={check} />
              </div>
            ) : null}
            {currentStep === index ? getIcon(index) : null}
          </div>
          {isFinalStep(index) ? null : (
            <div className={`w-44 h-1 ${activeColor(index)}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
