import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Form, Table, Button } from "react-bootstrap";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const logedIn = localStorage.getItem("logedIn");
  const history = useHistory();

  useEffect(() => {
    if (logedIn) history.push("/home");
  }, [logedIn, history]);

  const handleChange = ({ target }) => {
    const { id, value } = target;

    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validation()) {
      localStorage.setItem("logedIn", true);
      localStorage.setItem("user", email);
      history.push("/home");
    }
  };

  const validation = () => {
    let errors = {};
    let formIsValid = true;
    const emailRegex =
      /((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

    if (!email.match(emailRegex)) {
      formIsValid = false;
      errors.email = "Please use a valid email address";
    }

    if (!password.match(passwordRegex)) {
      formIsValid = false;
      errors.password =
        "Your password must contain at least 1 lowercase, 1 uppercase and 1 numeric character";
    }

    setErrors(errors);
    return formIsValid;
  };

  const loginFormStyle = {
    display: "flex",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={{ loginFormStyle }}>
      <Card className="m-5 p-5">
        <Form onSubmit={handleSubmit}>
          <Table>
            <tr>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                required
                placeholder="Email"
                id="email"
                name="email"
                type="text"
                onChange={handleChange}
                value={email}
                isValid={!errors?.email}
                isInvalid={errors?.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </tr>
            <tr>
              <td>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  required
                  placeholder="Password"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  value={password}
                  isValid={!errors?.password}
                  isInvalid={errors?.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </td>
              <td>
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  EYE
                </Button>
              </td>
            </tr>
            <Button variant="success">Submit</Button>
          </Table>
        </Form>
      </Card>
    </div>
  );
}

export default LoginForm;
