import { isRequiredField } from "./isRequired";
import * as Yup from "yup";

describe("isRequiredField", () => {
  it("should return true for a required field", () => {
    const validationSchema = Yup.object().shape({
      name: Yup.string().required(),
    });
    expect(isRequiredField(validationSchema, "name")).toBe(true);
  });

  it("should return false for a non-required field", () => {
    const validationSchema = Yup.object().shape({
      name: Yup.string(),
    });
    expect(isRequiredField(validationSchema, "name")).toBe(false);
  });

  it("should return false for a field that does not exist in the schema", () => {
    const validationSchema = Yup.object().shape({
      name: Yup.string().required(),
    });
    expect(isRequiredField(validationSchema, "email")).toBe(false);
  });

  //   it("should return true for a required array field", () => {
  //     const validationSchema = Yup.object().shape({
  //       names: Yup.array().required(),
  //     });
  //     console.log(validationSchema, "arrayyyy");

  //     expect(isRequiredField(validationSchema, "names")).toBe(true);
  //   });

  //   it("should return true for a required object field", () => {
  //     const validationSchema = Yup.object().shape({
  //       user: Yup.object().required(),
  //     });
  //     expect(isRequiredField(validationSchema, "user")).toBe(true);
  //   });

   test("should return true for a required array field", () => {
     const validationSchema = Yup.object().shape({
       names: Yup.array().required("Names are required"),
     });
     expect(isRequiredField(validationSchema, "names")).toBe(true);
   });

   test("should return true for a required object field", () => {
     const validationSchema = Yup.object().shape({
       user: Yup.object().required("User is required"),
     });
     expect(isRequiredField(validationSchema, "user")).toBe(true);
   });

  it("should return false for a field with a min test in an array", () => {
    const validationSchema = Yup.object().shape({
      names: Yup.array().min(1),
    });
    expect(isRequiredField(validationSchema, "names")).toBe(true);
  });

  it("should return true for a required nested field in an array", () => {
    const validationSchema = Yup.object().shape({
      users: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required(),
        })
      ),
    });
    expect(isRequiredField(validationSchema, "users")).toBe(true);
  });

  it("should return true for a required nested field in an object", () => {
    const validationSchema = Yup.object().shape({
      user: Yup.object().shape({
        name: Yup.string().required(),
      }),
    });
    expect(isRequiredField(validationSchema, "user")).toBe(true);
  });

  it("should return false for a non-required nested field in an array", () => {
    const validationSchema = Yup.object().shape({
      users: Yup.array().of(
        Yup.object().shape({
          name: Yup.string(),
        })
      ),
    });
    expect(isRequiredField(validationSchema, "users")).toBe(false);
  });

  it("should return false for a non-required nested field in an object", () => {
    const validationSchema = Yup.object().shape({
      user: Yup.object().shape({
        name: Yup.string(),
      }),
    });
    expect(isRequiredField(validationSchema, "user")).toBe(false);
  });

  it("should return false for a field with a min test in an array", () => {
    const validationSchema = Yup.object().shape({
      names: Yup.array().min(1),
    });
    expect(isRequiredField(validationSchema, "names")).toBe(false);
  });

  it("should return false for a field with a min test in an object", () => {
    const validationSchema = Yup.object().shape({
      user: Yup.object().shape({
        name: Yup.string().min(1),
      }),
    });
    expect(isRequiredField(validationSchema, "user")).toBe(false);
  });

  it("should return false for a field with a max test in an array", () => {
    const validationSchema = Yup.object().shape({
      names: Yup.array().max(1),
    });
    expect(isRequiredField(validationSchema, "names")).toBe(false);
  });

  it("should return false for a field with a max test in an object", () => {
    const validationSchema = Yup.object().shape({
      user: Yup.object().shape({
        name: Yup.string().max(1),
      }),
    });
    expect(isRequiredField(validationSchema, "user")).toBe(false);
  });
});
