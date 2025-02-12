import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';


type FormFields = {
    fullName: string;
    phoneNumber: string;
    email: String;
    message: String;
};
const Feedback = () => {
    const { register } = useForm<FormFields>();
    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log(data);
    };
    

    return (
        <form className="feedback-form">
            <input {...register("fullName")} type="text" placeholder="name" />
            <input {...register("phoneNumber")} type="tel" placeholder="phone number" />
            <input {...register("email")} type="email" placeholder="email" />
            <input {...register("message")} type="text" placeholder="type your message" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Feedback;