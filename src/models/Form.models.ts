
export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  value:number | string | boolean
  pattern?: string; 
  message?: string;
}

export interface FieldOption {
  value: string;
  label: string;
}

export interface FormField {
  id: string; 
  type: 'text' | 'number' | 'email' | 'date' | 'checkbox' | 'select'| 'radio' |
        'password' | 'week' | 'textarea' |
        'image' | 'month' | 'time' | 'file';
  label: string;
  name?: string; 
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[]; // For select and radio
  validation?: FieldValidation; 
}

export interface FormSchema {
  formTitle: string; 
  formDescription: string; 
  fields: FormField[];
}








