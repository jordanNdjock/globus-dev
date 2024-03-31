import { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

function Basic() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!email.trim()) {
      errors.email = "Veuillez saisir votre adresse email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Veuillez saisir une adresse email valide.";
    }

    if (!password.trim()) {
      errors.password = "Veuillez saisir votre mot de passe.";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          user
            .getIdToken()
            .then((token) => {
              localStorage.setItem("token", token);
              localStorage.setItem("name", user.email);
            })
            .catch((error) => {
              console.error("Ereeur au niveau du token :", error);
            });
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          const updatedErrors = { ...errors };
          if (errorCode === "auth/invalid-credential") {
            updatedErrors.email = "Email incorrect.";
            updatedErrors.password = "Mot de passe incorrect.";
          }
          setErrors(updatedErrors);
        });
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
          spacing={3}
          justifyContent="center"
          sx={{ mt: 1, mb: 2 }}
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Se connecter sur Globus <br />
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                error={errors.email !== undefined}
                helperText={errors.email}
              />
            </MDBox>
            <MDBox mb={2} position="relative">
              <MDInput
                type={passwordVisible ? "text" : "password"}
                label="Mot de Passe"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                error={errors.password !== undefined}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <MDButton
                      onClick={togglePasswordVisibility}
                      size="large"
                      variant="text"
                      color="success"
                      position="absolute"
                      top="50%"
                      right="10px"
                      transform="translateY(-50%)"
                    >
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </MDButton>
                  ),
                }}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="success" fullWidth type="submit">
                Se connecter
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
