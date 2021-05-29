import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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

  return (
    <div
      style={{
        // position: relative,
        // text-align: center,
        marginLeft: "auto",
        marginRight: "auto",
        minHeight: "100vh",
        maxWidth: "100%",
        backgroundImage: `url(
          "https://i.pinimg.com/originals/18/9f/77/189f776f14db99a76061527c3afb5df8.jpg"
        )`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundColor: "black",
      }}
    >
      <Card
        style={{
          width: "50%",
          position: "absolute",
          top: "20%",
          left: "10%",
          transform: "translate(-10%, -20%)",
        }}
        bg="primary"
        border="dark"
        text="light"
      >
        <Card.Header>Login</Card.Header>

        <Card className=" m-0 pt-4 pr-5 pb-4 pl-5" bg="dark" text="light">
          <Form onSubmit={handleSubmit}>
            <Container>
              <Row>
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
              </Row>
              <Row className="mt-3 mb-0">
                <Form.Label className="mb-2" htmlFor="password">
                  Password
                </Form.Label>
              </Row>
              <Row className="mb-4 justify-content-md-between align-items-start ">
                <Col
                  className="d-flex ml-0 p-0 flex-column "
                  xs={12}
                  sm={12}
                  md={9}
                  lg={10}
                  xl={10}
                >
                  <Form.Control
                    className="mt-0"
                    required
                    placeholder="Password"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    value={password}
                    isValid={!errors?.password}
                    isInvalid={errors?.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Col>
                <Col
                  className="d-flex ml-0 p-0 justify-content-end"
                  xs={12}
                  sm={2}
                  md={3}
                  lg={2}
                  xl={2}
                >
                  <Button
                    className="mt-0 ml-1"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </Button>
                </Col>
              </Row>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Container>
          </Form>
        </Card>
      </Card>
    </div>
  );
}

export default LoginForm;
