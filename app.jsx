import React from "react";
import ATMDeposit from "./atmdeposit";


const App = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [value, setValue] = React.useState("");

  let status = `Available Funds $ ${totalState} `;
  const handleChange = (event) => {
    setValue(event.target.value);
    setDeposit(Number(event.target.value));
    if (event.target.value <= 0) {
      setValidTransaction(false);
    } else if (
      atmMode == "Cash Back" &&
      Number(event.target.value) > totalState
    ) {
      setValidTransaction(false);
    } else setValidTransaction(true);
  };
  const handleSubmit = (event) => {
    let newTotal = 0;
    if (atmMode == "Cash Back" && Number(deposit) > totalState) {
      newTotal = totalState;
      setValidTransaction(false);
    } else if (atmMode == "Cash Back" && Number(deposit) <= totalState) {
      newTotal = totalState - deposit;
    } else if (atmMode == "Deposit" && Number(deposit) >= 0) {
      newTotal = totalState + deposit;
    } else newTotal = totalState;
    setTotalState(newTotal);
    setValue("");
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    setValue("");
    event.preventDefault();
  };

  return (
    <div
      className="vh-100 w-100 pt-10"
      style={{ backgroundColor: "White", marginTop: 30 }}
    >
      <form
        className="mx-auto shadow-lg w-75 card text-center p-3"
        style={{
          maxWidth: 400,
          minWidth: 250,
          height: 350,
          borderRadius: 10,
          backgroundColor: "Pink"
        }}
        onSubmit={handleSubmit}
      >
        <h2 className="pt-4 fs-1 fw-bold ">ATM</h2>

        <label className="py-2">Select an action below to continue</label>
        <select
          className="form-select py-2 mb-2 w-8 mx-auto"
          onChange={(e) => handleModeSelect(e)}
          name="mode"
          id="mode-select"
        >
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option id="cashback-selection" value="Cash Back">
            Cash Back
          </option>
        </select>
        <h3 className="py-2" id="total">
          {status}
        </h3>
        <ATMDeposit
          onChange={handleChange}
          atmMode={atmMode}
          validTransaction={validTransaction}
          value={value}
        ></ATMDeposit>
      </form>
    </div>
  );
};
export default App;


/// from BillConley01 on Code Sandbox (https://codesandbox.io/p/sandbox/atm-machine-e50nn?file=%2Fsrc%2Fapp.jsx%3A2%2C24-2%2C38)