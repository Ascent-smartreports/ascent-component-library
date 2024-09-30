/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";

export const isRequiredField = (
  validationSchema: Yup.AnySchema,
  name: string
): boolean => {
  try {
    const schemaDescription = validationSchema.describe();
    const fieldSchema = (schemaDescription as any).fields[name];

    if (!fieldSchema) {
      return false;
    }

    // Check if the field is directly required
    if (fieldSchema.tests?.some((obj: { name: string }) => obj.name === "required")) {
      return true;
    }

    // Check if it's an array and if the array itself or its items are required
    if (fieldSchema.type === "array") {
      if (fieldSchema.tests?.some((obj: { name: string }) => obj.name === "min")) {
        return true;
      }
      const arrayItem = fieldSchema.of;
      if (arrayItem?.tests?.some((obj: { name: string }) => obj.name === "required")) {
        return true;
      }
    }

    // Check if it's an object and if any of its nested fields are required
    if (fieldSchema.type === "object") {
      const nestedFields = fieldSchema.fields;
      return Object.keys(nestedFields).some((key) =>
        nestedFields[key]?.tests?.some((obj: { name: string }) => obj.name === "required")
      );
    }

    return false;
  } catch (error) {
    return false;
  }
};
