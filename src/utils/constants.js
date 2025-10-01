// 🔧 Styles
export const formStyle = {
  border: "1px solid #ccc",
  padding: "10px 15px",
  borderRadius: "3px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

export const progressContainer = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  margin: "20px 0px",
};

export const progressBar = {
  width: "70%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const stepCircle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #007BFF",
  borderRadius: "50%",
  width: "15px",
  height: "15px",
  padding: "15px",
};

export const fieldWrapper = (layout) => ({
  marginBottom: "10px",
  display: "flex",
  flexDirection: "column",
  flex: layout === "double-column" ? "1 1 calc(50% - 16px)" : "1 1 100%",
  minWidth: layout === "double-column" ? "45%" : "100%",
});

export const labelStyle = {
  fontSize: "14px",
  fontWeight: "500",
  marginBottom: "5px",
};

export const successMessage = {
  minHeight: "250px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const footerStyle = (currentStep) => ({
  display: "flex",
  width: "100%",
  marginTop: "20px",
  justifyContent: currentStep > 0 ? "space-between" : "flex-end",
});

export const tableTdStyle = {
  paddingRight: "20px",
  verticalAlign: "top",
};

export const tableThStyle = {
  textAlign: "left",
  paddingRight: "20px",
};

export const BUTTON_STYLE = {
  padding: "10px 20px",
  border: "1px solid",
  borderRadius: "4px",
  backgroundColor: "white",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

export const STEPS = [
  {
    section: "Personal Information",
    description: "Basic details to identify the user.",
    layout: "double-column",
    fields: [
      {
        key: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter your first name",
        validators: ["required"],
        validationMessage: "First name is required.",
      },
      {
        key: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter your last name",
        validators: ["required"],
        validationMessage: "Last name is required.",
      },
      {
        key: "gender",
        label: "Gender",
        type: "select",
        options: ["Male", "Female", "Other"],
        value: "Male",
        validators: ["required"],
        validationMessage: "Please select your gender.",
      },
      {
        key: "dob",
        label: "Date of Birth",
        type: "date",
        validators: ["required"],
        validationMessage: "Date of birth is required.",
      },
    ],
  },
  {
    section: "Contact Details",
    description: "How we can reach you.",
    layout: "single-column",
    fields: [
      {
        key: "email",
        label: "Email Address",
        type: "email",
        placeholder: "example@domain.com",
        validators: ["required", "email"],
        validationMessage: "Valid email is required.",
      },
      {
        key: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "+91-XXXXXXXXXX",
        validators: ["required", "pattern:^\\+?[0-9]{10,13}$"],
        validationMessage: "Valid phone number is required.",
      },
    ],
  },
  {
    section: "Address Details",
    description: "Where you live.",
    layout: "single-column",
    fields: [
      {
        key: "address",
        label: "Address",
        type: "textarea",
        rows: 3,
        placeholder: "Enter your full address",
        validators: ["required"],
        validationMessage: "Address is required.",
      },
      {
        key: "city",
        label: "City",
        type: "text",
        validators: ["required"],
        validationMessage: "City is required.",
      },
      {
        key: "postalCode",
        label: "Postal Code",
        type: "text",
        validators: ["required", "pattern:^\\d{5,6}$"],
        validationMessage: "Valid postal code is required.",
      },
    ],
  },
  {
    section: "Additional Info",
    description: "Optional details to personalize your experience.",
    layout: "double-column",
    fields: [
      {
        key: "occupation",
        label: "Occupation",
        type: "text",
        validators: ["required"],
        validationMessage: "Occupation is required.",
      },
      {
        key: "hobbies",
        label: "Hobbies",
        type: "select",
        options: ["Reading", "Traveling", "Gaming", "Cooking"],
        value: "Reading",
        validators: [],
      },
    ],
  },
  {
    section: "Preferences",
    description: "Let us know your preferences.",
    layout: "single-column",
    submitButtonText: "Finish",
    fields: [
      {
        key: "subscribeNewsletter",
        label: "Subscribe to Newsletter",
        type: "checkbox",
        value: true,
      },
      {
        key: "termsAccepted",
        label: "I accept the terms and conditions",
        type: "checkbox",
        validators: ["required"],
        validationMessage: "You must accept the terms to continue.",
      },
    ],
  },
];
