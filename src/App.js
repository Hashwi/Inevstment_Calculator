import React, { useState, useEffect } from "react";
import Header from "./assets/components/Header/Header";
import ResultsTable from "./assets/components/ResultsTable/ResultsTable";
import UserInput from "./assets/components/UserInputs/UserInputs";

function App() {
  const [userInputData, setUserInputData] = useState(null);
  const [yearlyData, setYearlyData] = useState([]);

  const calculateHandler = (userInputData) => {
    setUserInputData(userInputData);
  };

  const resetHandler = () => {
    setYearlyData([]);
    setUserInputData(null);   
  };

  useEffect(() => {
    if (userInputData) {
      let currentSavings = +userInputData["current-savings"];
      const yearlyContribution = +userInputData["yearly-contribution"];
      const expectedReturn = +userInputData["expected-return"] / 100;
      const duration = +userInputData["duration"];

      const updatedYearlyData = [];
      console.log(updatedYearlyData)

      for (let i = 0; i < duration; i++) {
        const yearlyInterest = currentSavings * expectedReturn;
        currentSavings += yearlyInterest + yearlyContribution;
        updatedYearlyData.push({
          key: i.toString() + Math.random(),
          year: i + 1,
          yearlyInterest: yearlyInterest,
          savingsEndOfYear: currentSavings,
          yearlyContribution: yearlyContribution,
        });
      }

      setYearlyData(updatedYearlyData);
    }
  }, [userInputData]);

 

  return (
    <div>
      <Header />
      <UserInput onReset={resetHandler} onCalculate={calculateHandler} />
      {!userInputData && <p style={{ textAlign: "center" }}>No investment calculated yet.</p>}
      {userInputData && <ResultsTable data={yearlyData} initialInvestment={userInputData["current-savings"]} />}
    </div>
  );
}

export default App;
