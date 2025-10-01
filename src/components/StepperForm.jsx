import React, { useState } from "react";
import {
  BUTTON_STYLE,
  formStyle,
  progressContainer,
  progressBar,
  stepCircle,
  fieldWrapper,
  labelStyle,
  successMessage,
  footerStyle,
} from "../utils/constants";

export default function StepperForm({
  steps,
  currentStep,
  onStepChange,
  isEdit,
  onFormSaved,
  editIndex,
}) {
  const [formValues, setFormValues] = useState({});
  const [stepValidity, setStepValidity] = useState({});
  const [errors, setErrors] = useState({});

  function handleChange(key, value) {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: null }));
  }

  function validateStep(index = currentStep) {
    const fields = steps[index]?.fields || [];
    const newErrors = {};

    const isValid = fields.every((field) => {
      const value = isEdit ? field.value : formValues[field.key];
      if (field.validators?.includes("required") && !value) {
        newErrors[field.key] =
          field.validationMessage || "This field is required.";
        return false;
      }
      if (field.validators?.includes("email")) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.key] =
            field.validationMessage || "Invalid email format.";
          return false;
        }
      }
      const patternValidator = field.validators?.find((v) =>
        v.startsWith("pattern:")
      );
      if (patternValidator) {
        const pattern = patternValidator.split("pattern:")[1];
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
          newErrors[field.key] = field.validationMessage || "Invalid format.";
          return false;
        }
      }
      return true;
    });

    return { isValid, newErrors };
  }

  function isStepValid(index) {
    return stepValidity[index] === true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { isValid, newErrors } = validateStep();
    setErrors(newErrors);

    if (isValid) {
      setStepValidity((prev) => ({ ...prev, [currentStep]: true }));
      if (currentStep === steps.length - 1) {
        const savedData = localStorage.getItem("formData");
        let data = savedData ? JSON.parse(savedData) : [];
        if (isEdit) {
          formValues.id = data[editIndex].id || Date.now();
          if (editIndex === 0 || editIndex) {
            data[editIndex] = { ...data[editIndex], ...formValues };
          }
        } else {
          data.push(formValues);
        }
        onFormSaved && onFormSaved(data);
        setTimeout(() => {
          setFormValues({});
          setStepValidity({});
          onStepChange(0);
        }, 1000);
      } else {
        onStepChange(currentStep + 1);
      }
    }
  }

  function renderFields(field) {
    const value = formValues[field.key] ?? field.value ?? "";
    const error = errors[field.key];

    const commonProps = {
      id: field.key,
      name: field.key,
      value,
      onChange: (e) => handleChange(field.key, e.target.value),
      placeholder: field.placeholder,
      style: {
        padding: "8px",
        border: error ? "1px solid red" : "1px solid #ccc",
        borderRadius: "3px",
      },
    };

    let inputElement;
    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "date":
      case "tel":
      case "password":
        inputElement = <input type={field.type} {...commonProps} />;
        break;
      case "textarea":
        inputElement = <textarea {...commonProps} />;
        break;
      case "select":
        inputElement = (
          <select {...commonProps}>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
        break;
      /* case "multiselect":
        inputElement = (
          <SelectMulti
            id={field.key}
            name={field.key}
            options={field.options}
            selected={value}
            onChange={(val) => handleChange(field.key, val)}
          />
        );
        break; */
      case "radio":
        inputElement = field.options.map((option) => (
          <label key={option} style={{ marginRight: "10px" }}>
            <input
              type="radio"
              name={field.key}
              value={option}
              checked={value === option}
              onChange={(e) => handleChange(field.key, e.target.value)}
              style={{ marginRight: "5px" }}
            />
            {option}
          </label>
        ));
        break;
      case "checkbox":
        if (Array.isArray(field.options)) {
          // Multi-checkbox
          inputElement = field.options.map((option) => (
            <label key={option} style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                name={field.key}
                value={option}
                checked={Array.isArray(value) ? value.includes(option) : false}
                onChange={(e) => {
                  let newValue = Array.isArray(value) ? [...value] : [];
                  if (e.target.checked) {
                    newValue.push(option);
                  } else {
                    newValue = newValue.filter((v) => v !== option);
                  }
                  handleChange(field.key, newValue);
                }}
                style={{ marginRight: "5px" }}
              />
              {option}
            </label>
          ));
        } else {
          // Single checkbox
          inputElement = (
            <input
              type="checkbox"
              id={field.key}
              name={field.key}
              checked={Boolean(value)}
              onChange={(e) => handleChange(field.key, e.target.checked)}
              style={{ width: "20px" }}
            />
          );
        }
        break;
      default:
        return null;
    }

    return (
      <>
        {inputElement}
        {error && (
          <span style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
            {error}
          </span>
        )}
      </>
    );
  }

  const allStepsValid =
    Object.values(stepValidity).length === steps.length &&
    Object.values(stepValidity).every(Boolean);

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {/* Stepper Progress */}
      <div style={progressContainer}>
        <div style={progressBar}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div
                title={step.section}
                style={{
                  ...stepCircle,
                  backgroundColor: isStepValid(index)
                    ? "#007BFF"
                    : "transparent",
                  color: isStepValid(index) ? "white" : "black",
                }}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: "2px",
                    backgroundColor: isStepValid(index)
                      ? "#007BFF"
                      : "lightgray",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {!allStepsValid && (
        <>
          <div style={{ marginBottom: "20px" }}>
            <h2>{steps[currentStep]?.section}</h2>
            <p>{steps[currentStep]?.description}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection:
                steps[currentStep].layout === "double-column"
                  ? "row"
                  : "column",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {steps[currentStep].fields.map((field) => (
              <div
                key={field.key}
                style={{
                  ...fieldWrapper(steps[currentStep].layout),
                  flexDirection: ["radio", "checkbox"].includes(field.type)
                    ? "row"
                    : "column",
                }}
              >
                <label
                  style={{
                    ...labelStyle,
                    marginRight: ["radio", "checkbox"].includes(field.type)
                      ? "10px"
                      : "0px",
                  }}
                >
                  {field.label}
                </label>
                {renderFields(field)}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Success Message */}
      {allStepsValid && (
        <div style={successMessage}>
          <p>Form {isEdit ? "Updated" : "Submitted"} Successfully!</p>
        </div>
      )}

      {/* Footer Buttons */}
      <footer style={footerStyle(currentStep)}>
        {currentStep > 0 && (
          <button
            type="button"
            style={{ ...BUTTON_STYLE, borderColor: "lightgray" }}
            onClick={() => onStepChange(currentStep - 1)}
          >
            Back
          </button>
        )}
        <button
          type="submit"
          style={{
            ...BUTTON_STYLE,
            backgroundColor: "#007BFF",
            borderColor: "lightgray",
            color: "white",
          }}
        >
          {currentStep === steps.length - 1
            ? steps[currentStep].submitButtonText || "Submit"
            : "Next"}
        </button>
      </footer>
    </form>
  );
}
