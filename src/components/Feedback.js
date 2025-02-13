import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Feedback = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
        console.log(data);
      const response = await axios.post('http://127.0.0.1:4000/', data);
      if (response.status === 200) {
        console.log("Feedback submitted successfully: ", response.data);
        reset();
      }else {
        console.log("Feedback not submitted properly");
      }
    } catch (error) {
      console.error("There was an error submitting feedback:", "error");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Full Name</label>
        <input
          id="fullName"
          {...register("fullName", { required: "Name is required" })}
        />
        {errors.fullname && <p>{errors.fullname.message}</p>}
      </div>

      <div>
        <label htmlFor="phoneNumber">Phone</label>
        <input
          id="phoneNumber"
          type="tel"
          {...register("phoneNumber", { required: "Phone is required" })}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>


      <div>
        <label htmlFor="subject">Feedback title</label>
        <textarea
          id="subject"
          {...register("subject", { required: "Subject is required" })}
        />
        {errors.subject && <p>{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="feedback">Give us your feedback</label>
        <textarea
          id="feedback"
          {...register("feedback", { required: "Feedback is required" })}
        />
        {errors.feedback && <p>{errors.feedback.message}</p>}
      </div>

      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default Feedback;
