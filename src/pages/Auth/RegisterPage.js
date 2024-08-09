import {FormControl, FormGroup, FormHelperText, Input, InputLabel} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useState ,useEffect} from "react";
import Box from "@mui/material/Box";
import { Link , useNavigate} from 'react-router-dom';


function RegisterPage() {

    ////
    

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        nameErr: "",
        emailErr: "",
        usernameErr: "",
        passwordErr: "",
        confirmPasswordErr: ""
    });

    const navigate = useNavigate(); 
    useEffect(() => {
        const savedUserInfo = localStorage.getItem('userInfo');
        if (savedUserInfo) {
            setUserInfo(JSON.parse(savedUserInfo));
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }, [userInfo]);
    

    const _emailRegex = /^[a-zA-Z][a-zA-Z0-9_#]+@[a-zA-Z]+\.com$/;
    const _passwordRegex =  /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).+$/;

    const ChangeUserData = (e) => {
        if (e.target.name === "name") {
            setErrors({
                ...errors,
                nameErr: e.target.value.length === 0 ? "Name is required" : !/^[a-z]{3,}/.test(e.target.value) && "Please write a valid name"
            });
        } else if (e.target.name === "email") {
            setErrors({
                ...errors,
                emailErr: e.target.value.length === 0 ? "Email address is required" : !_emailRegex.test(e.target.value) ? "Enter valid email (xxx@xxxx.com)" : ''
            });

        } else if (e.target.name === "username") {
            setErrors({
                ...errors,
                usernameErr: e.target.value.length === 0 ? "Username is required" : e.target.value.includes(" ") ? "Username must not contain spaces" : ''
            });
        } else if (e.target.name === "password") {
            setErrors({
                ...errors,
                passwordErr: e.target.value.length === 0 ? "Password is required" : e.target.value.length < 8 ? "password length not less\n" +
                    "than 8 characters" : !_passwordRegex.test(e.target.value) ? "Password must contain special characters" : ''
            });
        } else if (e.target.name === "confirmPassword") {
            setErrors({
                ...errors,
                confirmPasswordErr: e.target.value.length === 0 ? "Confirm password is required" : e.target.value !== userInfo.password ? "Password does not match" : ''
            });
        }
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }

    const submitForm = (e) => {
        
        
        
        if (userInfo.email.length === 0) {
           
            console.log("Email address is required");
            setErrors({
                ...errors,
                emailErr: "Email address is required"
                
            });
        }
        if (userInfo.password.length === 0) {
            
            setErrors({
                ...errors,
                passwordErr: "Password is required"
            });
        }

        if (userInfo.username.length === 0) {
            
            setErrors({
                ...errors,
                usernameErr: "Username is required"
            });
        }
        if (userInfo.name.length === 0) {
           
            setErrors({
                ...errors,
                passwordErr: "Password is required"
            });
        }
        if (userInfo.confirmPassword.length === 0) {
            
            setErrors({
                ...errors,
                confirmPasswordErr: "Confirm password is required"
            });
        }
    }

    /////////
    useEffect(() => {
        if (userInfo.name && userInfo.username && userInfo.email && userInfo.password && userInfo.confirmPassword) {
            localStorage.setItem('name', JSON.stringify(userInfo.name));
            localStorage.setItem('username', JSON.stringify(userInfo.username));
            localStorage.setItem('email', JSON.stringify(userInfo.email));
            localStorage.setItem('password', JSON.stringify(userInfo.password));
            localStorage.setItem('password', JSON.stringify(userInfo.confirmPassword));
            navigate('/home'); 
    }
  }, [userInfo.name, userInfo.username, userInfo.email, userInfo.password,userInfo.confirmPassword]);
       
   
        

    return (
        <>
            <div style={{
                width: "50%",
                margin: "auto",
                // background: "",
                // color: ""
            }}>
                <br/>
                <br/>
                <Typography
                    sx={{
                        fontSize: 30,
                        fontWeight: 600,
                        textAlign: "center"
                    }}>
                    Register
                </Typography>
                <br/>
                <br/>
                <FormGroup>
                    
                    <FormControl>
                        <InputLabel htmlFor="register-name">Name</InputLabel>
                        <Input name={"name"} value={userInfo.name} onChange={ChangeUserData} id="register-name"/>
                        <FormHelperText id="register-name-text"
                                        sx={{
                                            color: "red"
                                        }}>
                            {errors.nameErr}
                        </FormHelperText>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl>
                        <InputLabel htmlFor="register-username">User Name</InputLabel>
                        <Input name={"username"} value={userInfo.username} onChange={ChangeUserData}
                               id="register-username"/>
                        <FormHelperText id="register-username-text"
                                        sx={{
                                            color: "red"
                                        }}>
                            {errors.usernameErr}
                        </FormHelperText>
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="register-email">Email address</InputLabel>
                        <Input name={"email"} value={userInfo.email} onChange={ChangeUserData} id="register-email"/>
                        <FormHelperText id="register-email-text"
                                        sx={{
                                            color: "red"
                                        }}>
                            {errors.emailErr}
                        </FormHelperText>
                    </FormControl>
                    <br/>
                    
                    <br/>
                    <FormControl>
                        <InputLabel htmlFor="register-password">Password</InputLabel>
                        <Input type={"password"} name={"password"} value={userInfo.password} onChange={ChangeUserData}
                               id="register-password"/>
                        <FormHelperText id="register-password-text"
                                        sx={{
                                            color: "red"
                                        }}>
                            {errors.passwordErr}
                        </FormHelperText>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl>
                        <InputLabel htmlFor="register-confirmPassword">Confirm Password</InputLabel>
                        <Input type={"Password"} name={"confirmPassword"} value={userInfo.confirmPassword}
                               onChange={ChangeUserData}
                               id="register-confirmPassword"/>
                        <FormHelperText id="register-confirmPassword-text"
                                        sx={{
                                            color: "red"
                                        }}>
                            {errors.confirmPasswordErr}
                        </FormHelperText>
                    </FormControl>
                    <br/>
                    <br/>
                    <Button variant="contained" type={"submit"} onClick={submitForm}
                            disabled={errors.emailErr || errors.passwordErr || errors.confirmPasswordErr || errors.nameErr || errors.usernameErr}
                            sx={{
                                height: "6vh",
                            }}>
                        Register
                    </Button>
                </FormGroup>
                <Box sx={{height: "7vh"}}></Box>
                <Typography sx={{textAlign: "center"}}>
                    Already have an account? <Link className="btn-info" to="/login">Login</Link>
                </Typography>
            </div>

        </>
    );
}

export default RegisterPage;
