import type { QueryBuilderConfig, RuleSet } from "./types.ts";

export const defaultConfig: QueryBuilderConfig = {
  combinators: [
    {
      name: "AND",
      identifier: "AND",
    },
    {
      name: "OR",
      identifier: "OR",
    },
  ],
  operators: [
    {
      name: "equals",
      value: "=",
      type: ["number"],
    },
    {
      name: "not equals",
      value: "!=",
      type: ["number"],
    },
    {
      name: "greater than",
      value: ">",
      type: ["number"],
    },
    {
      name: "less than",
      value: "<",
      type: ["number"],
    },
    {
      name: "contains",
      value: "contains",
      type: ["text"],
    },
    {
      name: "does not contain",
      value: "does not contain",
      type: ["text"],
    },
    {
      name: "before",
      value: "before",
      type: ["date"],
    },
    {
      name: "after",
      value: "after",
      type: ["date"],
    },
    {
      name: "is true",
      value: "is true",
      type: ["boolean"],
    },
    {
      name: "is false",
      value: "is false",
      type: ["boolean"],
    },
  ],
  fields: [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "Enter first name",
      inputType: "text",
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholder: "Enter last name",
      inputType: "text",
    },
    {
      name: "age",
      label: "Age",
      placeholder: "Enter age",
      inputType: "number",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter email",
      inputType: "email",
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      placeholder: "Select date of birth",
      inputType: "date",
    },
    {
      name: "isActive",
      label: "Is Active",
      placeholder: "Select if active",
      inputType: "checkbox",
    },
  ],
  colors: ["hsl(88, 50%, 55%)", "hsl(187, 100%, 45%)", "hsl(15, 100%, 55%)"],
};

export let defaultQuery: RuleSet = {
  operatorIdentifier: "OR",
  children: [
    {
      field: {
        name: "firstName",
        label: "First Name",
        placeholder: "Enter first name",
        inputType: "text",
      },
      operator: {
        name: "contains",
        value: "contains",
        type: ["text"],
      },
      value: "A",
    },
    {
      operatorIdentifier: "AND",
      children: [
        {
          field: {
            name: "dateOfBirth",
            label: "Date of Birth",
            placeholder: "Select date of birth",
            inputType: "date",
          },
          operator: {
            name: "before",
            value: "before",
            type: ["date"],
          },
          value: "",
        },
        {
          field: {
            name: "lastName",
            label: "First Name",
            placeholder: "Enter first name",
            inputType: "text",
          },
          operator: {
            name: "contains",
            value: "contains",
            type: ["text"],
          },
          value: "A",
        },
        {
          field: {
            name: "dateOfBirth",
            label: "Date of Birth",
            placeholder: "Select date of birth",
            inputType: "date",
          },
          operator: {
            name: "after",
            value: "after",
            type: ["date"],
          },
          value: "",
        },
        {
          operatorIdentifier: "AND",
          children: [
            {
              field: {
                name: "email",
                label: "Email",
                placeholder: "Enter email",
                inputType: "email",
              },
              operator: {
                name: "equals",
                value: "=",
                type: ["number"],
              },
              value: "",
            },
            {
              operatorIdentifier: "AND",
              children: [
                {
                  field: {
                    name: "age",
                    label: "Age",
                    placeholder: "Enter age",
                    inputType: "number",
                  },
                  operator: {
                    name: "greater than",
                    value: ">",
                    type: ["number"],
                  },
                  value: "",
                },
                {
                  field: {
                    name: "age",
                    label: "Age",
                    placeholder: "Enter age",
                    inputType: "number",
                  },
                  operator: {
                    name: "not equals",
                    value: "!=",
                    type: ["number"],
                  },
                  value: "",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
