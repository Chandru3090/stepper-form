import { useState } from "react";
import StepperForm from "./components/StepperForm";
import { tableTdStyle, tableThStyle, STEPS } from "./utils/constants";
import "./index.css";

export default function App() {
  const [steps, setSteps] = useState(STEPS);
  const [currentStep, setCurrentStep] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState(
    localStorage.getItem("formData")
      ? JSON.parse(localStorage.getItem("formData"))
      : []
  );

  function handleEdit(index) {
    const dataToEdit = formData[index];
    setEditIndex(index);
    if (dataToEdit) {
      const updatedSteps = STEPS.map((step) => {
        const updatedFields = step.fields.map((field) => {
          const updatedValue =
            dataToEdit[field.key] ?? (field.type === "checkbox" ? false : "");
          return { ...field, value: updatedValue };
        });
        return { ...step, fields: updatedFields };
      });
      setSteps(updatedSteps);
      setIsEdit(true);
      setCurrentStep(0);
    }
  }

  function handleDelete(index) {
    const updatedData = formData.filter((_, i) => i !== index);
    setFormData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
  }
  return (
    <>
      <div style={{ maxWidth: "95%", margin: "0 auto", padding: "20px" }}>
        <main>
          <h1 style={{ textAlign: "center", marginBottom: "15px" }}>Multi-Step Form</h1>
          <div style={{ marginBottom: "15px" }}>
            <StepperForm
              isEdit={isEdit}
              steps={steps}
              currentStep={currentStep}
              editIndex={isEdit ? editIndex : null}
              onStepChange={(step) => {
                setCurrentStep(step);
              }}
              onFormSaved={(newData) => {
                console.log("New Data:", newData);
                localStorage.setItem("formData", JSON.stringify(newData));
                setFormData(newData);
                setIsEdit(false);
                setSteps(STEPS);
              }}
            />
          </div>
          {formData && formData.length > 0 && (
            <div style={{ marginBottom: "15px" }}>
              <table>
                <thead>
                  <tr>
                    <th style={tableThStyle}>#</th>
                    <th style={tableThStyle}>Name</th>
                    <th style={tableThStyle}>Gender</th>
                    <th style={tableThStyle}>DOB</th>
                    <th style={tableThStyle}>Email</th>
                    <th style={tableThStyle}>Phone</th>
                    <th style={tableThStyle}>Address</th>
                    <th style={tableThStyle}>Occupation</th>
                    <th style={tableThStyle}>Hobbies</th>
                    <th style={tableThStyle}>Sub. News Letter</th>
                    <th style={tableThStyle}>is Term Accepted</th>
                    <th style={tableThStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.map((field, index) => (
                    <tr key={index}>
                      <td style={tableTdStyle}>{index + 1}</td>
                      <td style={tableTdStyle}>
                        {field?.firstName} {field?.lastName}
                      </td>
                      <td style={tableTdStyle}>{field?.gender}</td>
                      <td style={tableTdStyle}>{field?.dob}</td>
                      <td style={tableTdStyle}>{field?.email}</td>
                      <td style={tableTdStyle}>{field?.phone}</td>
                      <td style={tableTdStyle}>
                        <p>{field?.address}</p>
                        <p>{field?.city}</p>
                        <p>{field?.postalCode}</p>
                      </td>
                      <td style={tableTdStyle}>{field?.occupation}</td>
                      <td style={tableTdStyle}>{field?.hobbies}</td>
                      <td style={tableTdStyle}>
                        {field?.subscribeNewsletter ? "Yes" : "No"}
                      </td>
                      <td style={tableTdStyle}>
                        {field?.termsAccepted ? "Yes" : "No"}
                      </td>
                      <td style={tableTdStyle}>
                        <span
                          style={{
                            cursor: "pointer",
                            color: "blue",
                            paddingRight: "5px",
                          }}
                          onClick={() => {
                            handleEdit(index);
                          }}
                        >
                          Edit
                        </span>
                        <span
                          style={{ cursor: "pointer", color: "red" }}
                          onClick={() => {
                            handleDelete(index);
                          }}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
