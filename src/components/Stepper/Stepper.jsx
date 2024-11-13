import React from "react";
import PersonalInformationIcon from "../../assets/PersonalInformationIcon.svg";
import CollectionIcon from "../../assets/CollectionIcon.svg";
import ConfirmationIcon from "../../assets/ConfirmationIcon.svg";

export default function VerticalAccordion({ currentStep, setCurrentStep }) {
  const accordionTitles = [
    "User Details",
    "Professional Details",
    "Confirmation",
  ];
  const icons = [PersonalInformationIcon, CollectionIcon, ConfirmationIcon];

  const handleStepClick = (index) => {
    setCurrentStep(index);
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-8 rounded-l-md ">
      {accordionTitles.map((title, index) => (
        <div
          key={index}
          className={`w-3/4 flex items-center px-4 py-3 cursor-pointer rounded-md ${
            currentStep === index
              ? "bg-green-100 text-green-600 font-semibold"
              : "bg-stone-200 text-stone-600"
          }`}
          onClick={() => handleStepClick(index)}
        >
          <img
            src={icons[index]}
            alt={`${title} Icon`}
            className="mr-3 h-6 w-6"
          />
          <span>{title}</span>
        </div>
      ))}
    </div>
  );
}
