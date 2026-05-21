import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(form);
      setSubmitted(true);

      // Reset form
      setForm({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <div className=" space-y-6 py-2.5 px-3">

      {/* Title */}
      <div className="border-b-[0.5px] dark:border-white/10 border-gray-200 flex flex-col gap-1  py-3 pb-4">
        <h1 className="text-xl font-semibold">Contact Us</h1>
        <p className="text-sm text-gray-500">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto pt-20 ">


      
      {/* Success Message */}
      {submitted && (
        <div className="p-3 rounded-md bg-green-100 text-green-700 text-sm mb-4">
          Message sent successfully!
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl p-6 space-y-4"
      >

        {/* Name */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 rounded-md border border-gray-300 
                       dark:border-white/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 rounded-md border border-gray-300 
                       dark:border-white/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Message
          </label>
          <textarea
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 rounded-md border border-gray-300 
                       dark:border-white/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {errors.message && (
            <p className="text-xs text-red-500 mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-md bg-black text-white dark:bg-white dark:text-black 
                     text-sm font-medium hover:opacity-90 transition"
        >
          Send Message
        </button>

      </form>

      </div>
    </div>
  );
}

export default Contact;