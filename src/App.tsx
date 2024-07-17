import React from 'react';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import Button from '../lib/components/Button';

const App: React.FC = () => {

  const handleSubmit = () => {
    console.log('Submit button clicked');
  };

  const handleConfirm = () => {
    console.log('Confirm button clicked');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 mt-8">
      <Button
        text="Submit"
        icon={<FaArrowRight />}
        onClick={handleSubmit}
        className="custom-submit-button"
        testId="submit-button"
      />
      <Button
        text="Confirm"
        icon={<FaCheck />}
        onClick={handleConfirm}
        isDisabled={true}
        className="custom-confirm-button"
        testId="confirm-button"
      />
      <Button
        text="Cancel"
        onClick={() => console.log('Cancel button clicked')}
        className="custom-cancel-button"
        testId="cancel-button"
      />
    </div>


  );

};

export default App;



