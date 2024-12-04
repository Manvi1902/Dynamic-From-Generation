import { FieldError, UseFormRegister } from "react-hook-form";

export type BaseFormData = {
    firstName: string;
    lastName: string;
    middleName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    mobile: number;
    city:string;
    state:string;
    address:string;
    country:string;
    pincode:number;
};

export type FieldValidationProps={
    minLength: string;  
    maxLength: string;  
    min: string;  
    max: string;  
    value: string | number | boolean;
    pattern: string  
    message: string  
};

export type FieldOptionProps = {  
    value: string;  
    label: string;  
};

export type FormFieldProps = {
    type: string;
    label: string;
    placeholder: string;
    //required:boolean;
    name: string | number ;
    register: UseFormRegister<BaseFormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    validation :  FieldValidationProps;
  };




 