import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';




const Feedback = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    return(
        <form>
            <div>
                <label>Full Name</label>
                <input id="name" {...register('name', {required: 'Name is required'})} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="">Phone</label>
                <input id="phoneNumber" type="tel" {...register('name', {required: 'Phone is required'})} />
                {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                    <input id="email" type="email" 
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Invalid email address',
                        }
                    })} />
                    {errors.email && <p>{errors.email.message}</p>}
            </div>

            

            <div>
                <label htmlFor="feedback">Give us your feedback</label>
                <textarea id="feedback" {...register('feedback', { required: 'Feedback is required'})} />
                {errors.feedback &&<p>{errors.feedback.message}</p>}

            </div>

            <button type="submit">Submit Feedback</button>
        </form>
    )
}

export default Feedback;