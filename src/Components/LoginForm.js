import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }) => {
    const { id, value } = target;

    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  const handleSubmit = () => {
    alert("Submission succesful!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={handleChange}
          value={email}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          value={password}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          EYE
        </button>
      </fieldset>
      <button>Submit</button>
    </form>
  );
}

export default LoginForm;
