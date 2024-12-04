// src/components/FormGenerator.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type {FormSchema}  from '../models/Form.models.ts';

interface FormGeneratorProps {
  schema: FormSchema;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState<Record<string, string | number | boolean>>({});

  const onSubmit = (data: Record<string, string | number | boolean>) => {
    console.log(data);
    setFormData(data);
    alert('Form submitted successfully!');
    
  };

  const copyToClipboard = () => {
    if (Object.keys(formData).length > 0) {
    const jsonData = JSON.stringify(formData, null, 2);
    //console.log(jsonData)

    navigator.clipboard.writeText(jsonData).then(() => {
      alert('Form JSON copied to clipboard!');
    });
  }
  };

  // Function to download form data as JSON
  const downloadJSON = () => {
    if (Object.keys(formData).length > 0) {
    const jsonBlob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    console.log(jsonBlob)
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-submission.json'; // Filename for the download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    }
  };

  return (
    <div className="container sm:w[] sm:mx-10 p-8 bg-blue-400 ">

      <div>
        {/* Copy JSON Button */}
      {Object.keys(formData).length > 0 && (
        <button
          onClick={copyToClipboard}
          className=" bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 mt-4"
        >
          Copy Form JSON
        </button>
      )}

      {/* Download Button */}
      {Object.keys(formData).length > 0 && (
        <button
          onClick={downloadJSON}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 mt-4"
        >
          Download Form Submission as JSON
        </button>
      )}
  
      </div>

    <div className='xl:ml-20'>
      <h2 className="text-2xl font-bold mb-2">{schema.formTitle}</h2>
      <p className="text-slate-500 mb-4">{schema.formDescription}</p>
      
      </div>
      
      <form
          onSubmit={handleSubmit(onSubmit)}
          className=''
      >
        <div className='" box-border grid grid-rows border-none
          
          rounded-lg bg-yellow-200
          '>

  {schema.fields.map((field) => (
    <div key={field.id}>
      <label className="block my-5 py-2 md:w-[100%] font-medium mb-1">
        {field.label}
      </label>

      {/* Render fields dynamically based on type */}
    { field.type === 'textarea' ? (
        <textarea
          {...register(field.id, {
            required: field.required,
            minLength: field.validation?.minLength,
            maxLength: field.validation?.maxLength,
            pattern: field.validation?.pattern
              ? new RegExp(field.validation.pattern)
              : undefined,
          })}
          placeholder={field.placeholder}
          className=" shadow-md bg-teal-800 rounded p-2"
        />
      ) : field.type === 'select' ? (
        <select
          {...register(field.id, { required: field.required })}
          className=" shadow-md bg-teal-300 rounded p-2"
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === 'radio' ? (
        <div className="grid grid-row md:grid-cols-2 gap-0">
          {field.options?.map((option) => (
            <label key={option.value} className="flex flex-row items-center md:w-[60%] md:ml-[10%]">
              <input
                type="radio"
                value={option.value}
                {...register(field.id, { required: field.required })}
                className="mr-2 m-5 sm:ml-2 md:m-4 shadow-md rounded p-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      ) : field.type === 'checkbox' ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register(field.id, { required: field.required })}
            className="mr-2 shadow-md rounded"
          />
          <span>{field.label}</span>
        </div>
      ) : field.type === 'file' ? (
        <input
          type="file"
          {...register(field.id, { required: field.required })}
          className=" shadow-md bg-teal-50 rounded p-2"
        />
      ) : field.type  === 'email' ?(
        <input
          type="email"
          {...register(field.id, {
            required: field.required,
            minLength: field.validation?.minLength,
            maxLength: field.validation?.maxLength,
            min: field.validation?.min,
            max: field.validation?.max,
            pattern: field.validation?.pattern
              ? new RegExp(field.validation.pattern)
              : undefined,
          })}
          placeholder={field.placeholder}
          className="shadow-md bg-teal-50 rounded p-2"
        />
      )  
      : (
        <input
          type="text"
          {...register(field.id, {
            minLength: field.validation?.minLength,
            maxLength: field.validation?.maxLength,
            min: field.validation?.min,
            max: field.validation?.max,
            pattern: field.validation?.pattern
              ? new RegExp(field.validation.pattern)
              : undefined,
          })}
          required = {field.required}
          placeholder={field.placeholder}
          className=" shadow-md bg-teal-50 rounded p-2"
        />
      )
    }
      {/* Display validation error messages */}
      {errors[field.id] && (
        <p className="text-red-500 text-sm md:w-[100%]">
          {errors[field.id]?.type === 'required'
            ? `${field.label} is required.`
            : field.validation?.message || 'Invalid input.'}
        </p>
      )}

    </div>
  ))}

<button
    type="submit"
    className=" text-white font-semibold text-lg mt-6 p-2 mx-10 rounded hover:bg-blue-600"
> 
  Submit
</button>
</div>
</form>


    </div>
  );
};

export default FormGenerator;
