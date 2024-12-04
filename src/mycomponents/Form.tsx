import { useForm } from "react-hook-form";
import { BaseFormData } from "./types";
import FormField from "./FormField";

const Form = ()=>{

const {
    register,
    handleSubmit,
    formState: {errors},
} = useForm<BaseFormData>();

const onSubmit = async (data:BaseFormData) => {

    console.log("success",data);
}

return(

    <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid col-auto">
                    <h1>Welcom to Form </h1>

                    <FormField
            type="email"
            placeholder="Email"
           
            name="email"
            register={register}
            error={errors.email}
          />


          <FormField
            type="password"
            placeholder="Password"
            required="this field is reu"
            name="password"
            register={register}
            error={errors.password}
          />

         
    </div>
</form>
</div>

)
}

export default Form;