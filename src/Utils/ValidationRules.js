export const userNameRules = {
  required: "UserName is Required",
  maxLength: { value: 8, message: "Maximum length is 8" },
  pattern: {
    value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{1,8}$/,
    message: "Please Enter a Char with number max is 8",
  },
};
export const emailRules = {
  required: "Email is Required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    message: "Please Enter a Valid Mail",
  },
};

export const passwordRules = {
  required: "Password is Required",
  pattern: {
    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{5,}$/,
    message:
      "Password must start with a capital letter and contain letters, numbers, and a special character",
  },
};

export const countryRules = {
  required: "Country is Required",
  minLength: {
    value: 3,
    message: "min length is 3",
  },
};
export const phoneRules = {
  required: "PhoneNumber is Required",
  pattern: {
    value: /^(?:\+20)?01[0-9]{9}$/,
    message: "Please enter a valid Phone Number",
  },
};
export const otpRules = {
  required: "OTP is Required",
  minLength: {
    value: 3,
    message: "Enter a Valid OTP Code",
  },
};

export const confirmPasswordRules = (password) => ({
  required: "Confirm Password is required",
  validate: (value) => value === password || "Passwords do not match",
});
