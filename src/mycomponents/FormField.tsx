import { FormFieldProps } from './types';

const FormField: React.FC<FormFieldProps> =({
    type, 
    placeholder, 
    name, 
    required, 
    label, 
    error, 
    register,
    valueAsNumber,
    

})=> (
    <div>
        <label>{label}</label>
        <input
                type={type}
                placeholder={placeholder}
                required={required}
                {...register(name,{  valueAsNumber,})}
        />
        {error && <span className="error-message">{error.message}</span>}
    </div>

);
export default FormField;