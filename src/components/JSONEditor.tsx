import { useState } from 'react';
import { FormSchema } from '../models/Form.models';

interface JSONEditorProps {
  onChange: (schema: FormSchema | null) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ onChange }) => {
  const [json, setJson] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJson(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value) as FormSchema;
      setError(null);
      onChange(parsed);
    } catch (err) {
      console.log(err) 
      onChange(null);
    }
  };

  return (
    <div className="container  h-[100vh] sm:w-[70%] md:h-[200vh]  bg-[#002630] text-white ">
      <button>Paste JSON Form data</button>
      <textarea
        value={json}
        onChange={handleJsonChange}
        placeholder={`{
                        "formTitle": "Project Requirements Survey",
                        "formDescription": "Please fill out this survey about your project needs",
                        "fields": [{
                                      "id": "name",
                                      "type": "text",
                                      "label": "Full Name",
                                      "required": true,
                                      "placeholder": "Enter your full name"
                                    }]
                      }`
                    }
  className=" mx-3 my-5 w-[95%] h-[90%] scroll-behavior: auto bg-[#193B44] rounded  text-[#6ee7b7]
  "
/>
    {error && <p className="text-white bg-red-500 w-6 h-10  mt-2">{error}</p>}
    </div>
  );
};

export default JSONEditor;
