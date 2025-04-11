import * as React from 'react'

interface StepperProps {
  steps: React.ReactNode[]; // Array of step names
  stepsLabels: string[]; // Array of step labels
  currentStep: number; // Index of the current step
  onStepClick: (index: number) => void; // Callback function when a step is clicked
  disableOtherSteps?: boolean; // Optional prop to disable other steps
}

const Stepper = ({ steps, stepsLabels, currentStep, onStepClick, disableOtherSteps }: StepperProps) => {
  
  const renderStepNavigator = () => (
    <div className="flex items-center mb-4 w-full px-4 py-4">
      {Array.from({ length: steps.length }).map((_, index) => (
        <div key={index} className={`${index < steps.length -1 ? 'w-full': ''} flex items-center`}>
          <div className='text-center relative'>
            <button
              onClick={() => onStepClick(currentStep === index ? -1 : index)}
              disabled={currentStep === index || (index > 0 && disableOtherSteps)}
              className={`w-10 px-4 py-2 rounded-full ${currentStep >= index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {index + 1}
            </button>
            <div className={`text-xs pt-2 absolute bottom-o left-1/2 transform -translate-x-1/2 w-max ${currentStep >= index ? 'text-blue-500' : 'text-white'}`}>
              {stepsLabels[index]}
            </div>
          </div>
          {index < steps.length - 1 && (
          <div className={`w-full h-[2px] ${currentStep > index ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
          )}
        </div>
      ))}
    </div>
  )

  const renderStepContent = () => {

    return (
      <div className="p-4 rounded shadow-md w-full">
        {steps[currentStep]}
      </div>
    )
  }

  return (
    <div>
      {renderStepNavigator()}
      {renderStepContent()}
    </div>
  )
}

export default Stepper