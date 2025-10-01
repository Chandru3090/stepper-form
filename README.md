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

# Screenshots

<img width="1917" height="990" alt="image" src="https://github.com/user-attachments/assets/96a979e7-2c5c-4397-911e-2f39a0835939" />

<img width="1917" height="977" alt="image" src="https://github.com/user-attachments/assets/26d2e23d-6e8b-478a-8a6b-a5bf50fd82e6" />

<img width="1918" height="983" alt="image" src="https://github.com/user-attachments/assets/313bec18-11ba-4d9b-b56d-e0d457855525" />

<img width="1911" height="980" alt="image" src="https://github.com/user-attachments/assets/928e48ba-782e-460a-90a5-4e9b14f4abba" />

<img width="1918" height="985" alt="image" src="https://github.com/user-attachments/assets/80078f45-c16d-41fb-b923-7756fb583ee1" />

<img width="1919" height="983" alt="image" src="https://github.com/user-attachments/assets/df17bf0c-6fa0-452b-8f24-e0f180ac7117" />





