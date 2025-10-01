# Multi-Step Form (React)

A dynamic and reusable multi-step form component built with React. It supports field-level validation, conditional rendering, progress tracking, and local data persistence. Ideal for onboarding flows, surveys, or complex data entry forms.

# Features

1. Step-by-step navigation
2. Field-level validation (required, email, pattern)
3. Support for multiple input types (text, email, password, number, select, checkbox)
4. Dynamic layout (single or double column)4.
5. Visual progress indicator4.
6. LocalStorage integration for data persistence4.
7. Edit mode support for updating existing entries

# Technologies Used

1. React (with Hooks)
2. Vite (for fast dev environment)
3. CSS-in-JS (inline styles)
4. LocalStorage API

# Installation

`npm install and npm run dev`

# Component Structure
1. StepperForm.jsx: Main form component with navigation and validation
2. constants.js: Shared styles and config
3. App.jsx: Entry point with step definitions

# Usage

`<StepperForm steps={stepConfig} currentStep={currentStep} onStepChange={setCurrentStep} isEdit={isEditing} onFormSaved={(data) => console.log("Saved:", data)}
/>`

# Config

`{
  section: "Personal Info",
  description: "Enter your basic details",
  layout: "double-column",
  fields: [
    {
      key: "firstName",
      label: "First Name",
      type: "text",
      validators: ["required"],
      placeholder: "John"
    },
    ...
  ]
}`