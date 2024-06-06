import { Button } from "../lib/main";

function App() {
  return (
    <>
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
