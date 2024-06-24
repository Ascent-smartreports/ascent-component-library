import InputField from "../lib/components/Input";
import { Button } from "../lib/main";
import { IoEyeOffOutline } from "react-icons/io5";
function App() {
  return (
    <>
      <InputField label="name" leftIcon={<IoEyeOffOutline />} />
      <Button
        label={"hello world"}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        buttonType="outlined"
      />
    </>
  );
}
export default App;
