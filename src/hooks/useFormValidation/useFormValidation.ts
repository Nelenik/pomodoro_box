import { useState, useRef, useEffect, useCallback, RefObject } from "react";

export type PartialRecursive<T> = {
  [P in keyof T]?: T[P] extends object ? PartialRecursive<T[P]> : T[P];
};

interface Rule {
  value?: number | boolean | RegExp;
  message: string;
  validation: (inputValue: string) => boolean | void;
}

interface Rules {
  [key: string]: Rule;
}

interface FormData {
  [key: string]: string;
}
interface Errors {
  [key: string]: string;
}

type FormState = "valid" | "invalid";

type FieldType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function areErrors(errors: Errors) {
  return Object.values(errors).filter(Boolean).length > 0;
}

const defRules: Rules = {
  required: {
    value: false,
    message: "This field is required",
    validation: function (inputValue: string): boolean | void {
      if (this.value) {
        return inputValue.trim() !== "";
      }
    },
  },
  min: {
    value: 3,
    message: `Value must be greater than 3`,
    validation: function (inputValue: string): boolean | void {
      if (typeof this.value === "number" && this.value >= 0) {
        return Number(inputValue) >= this.value;
      }
    },
  },
  max: {
    value: 10,
    message: `Value must be less than 10`,
    validation: function (inputValue: string): boolean | void {
      if (typeof this.value === "number" && this.value >= 0) {
        return Number(inputValue) <= this.value;
      }
    },
  },
  email: {
    value: false,
    message: "Invalid email",
    validation: function (inputValue: string): boolean | void {
      if (this.value) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
          inputValue
        );
      }
    },
  },
  minLength: {
    value: 3,
    message: `Value must be greater than 3`,
    validation: function (inputValue: string): boolean | void {
      if (typeof this.value === "number" && this.value >= 0) {
        return inputValue.length >= this.value;
      }
    },
  },
  maxLength: {
    value: 10,
    message: `Value must be less than 10`,
    validation: function (inputValue: string): boolean | void {
      if (typeof this.value === "number" && this.value >= 0) {
        return inputValue.length <= this.value;
      }
    },
  },
  pattern: {
    value: /.+/,
    message: "",
    validation: function (inputValue: string): boolean | void {
      if (this.value && this.value instanceof RegExp) {
        return this.value.test(inputValue);
      }
    },
  },
};

function assignRules(rules: PartialRecursive<Rules>): Rules {
  for (const key of Object.keys(rules)) {
    const defRule = defRules[key];
    if (defRule) {
      rules[key] = { ...defRule, ...rules[key] };
    }
  }
  return rules as Rules;
}

export const useFormValidation = <T>(
  initialData: T & FormData,
  validateOn: string = ""
) => {
  const [formData, setFormData] = useState<T & FormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [formState, setFormState] = useState<FormState>("valid");
  const assignedRulesRef = useRef<{ [key: string]: Rules }>({});
  const formRef: RefObject<HTMLFormElement> = useRef(null);

  useEffect(() => {
    if (!areErrors(errors)) {
      setFormState("valid");
    } else {
      setFormState("invalid");
    }
  }, [errors]);
  const validateOnArray: string[] = validateOn.split(" ");

  const validateField = useCallback(
    (fieldName: string, value: string): Errors => {
      const assignedRules = assignedRulesRef.current[fieldName];
      const error: Errors = { [fieldName]: "" };
      for (const rule of Object.values(assignedRules)) {
        if (rule.validation(value) === false) {
          error[fieldName] = rule.message;
          break;
        }
      }
      return error;
    },
    []
  );

  const validateForm = useCallback(() => {
    const newErrors: Errors = {};
    for (const fieldName of Object.keys(assignedRulesRef.current)) {
      Object.assign(newErrors, validateField(fieldName, formData[fieldName]));
    }
    return newErrors;
  }, [formData, validateField]);

  const reset = useCallback(() => {
    formRef.current?.reset();
    setFormData(initialData);
    setErrors({});
  }, [initialData]);

  //change handler
  const onChange = (e: React.ChangeEvent<FieldType>) => {
    const { name, value } = e.target;
    (validateOnArray.includes("change") || validateOn.includes("all")) &&
      setErrors({ ...errors, ...validateField(name, value) });
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //blur handler
  const onBlur = (e: React.FocusEvent<FieldType>) => {
    const { name, value } = e.target;
    (validateOnArray.includes("blur") || validateOn.includes("all")) &&
      setErrors({ ...errors, ...validateField(name, value) });
  };
  //submit handler
  const onSubmit = (handler: () => void = () => {}) => {
    return function (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const newErrors = validateForm();
      setErrors(newErrors);
      if (!areErrors(newErrors)) {
        handler();
        return;
      }
      const errorsKeys = Object.keys(newErrors);
      const firstInvalidField = errorsKeys.find((key) =>
        Boolean(newErrors[key])
      );
      if (firstInvalidField && formRef.current) {
        formRef.current[firstInvalidField].focus();
      }
    };
  };

  const register = (fieldName: string, rules: PartialRecursive<Rules> = {}) => {
    assignedRulesRef.current[fieldName] = assignRules(rules);

    return {
      value: formData[fieldName],
      name: fieldName,
      onChange,
      onBlur,
    };
  };

  return { register, formState, errors, onSubmit, formData, formRef, reset };
};
