import React from 'react';
import { 
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import styled from '@emotion/styled'

import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { login as signin } from '../store/auth/authAction.js'

const defaultFormButtonText = 'Войти';
const disabledFormButtonText = 'Загрузка...';

const AvatarStyled = styled(Avatar)`
  margin: ${({theme}) => theme.spacing(1)};
  width: ${({theme}) => theme.spacing(7)};
  height: ${({theme}) => theme.spacing(7)};
`

const Form = styled.form`
  width: 100%;
  margin-top: ${({theme}) => theme.spacing(1)};
`
const Peper = styled.div`
  margin-top: ${({theme}) => theme.spacing(8)};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SubmitButton = ({className, disabled, text, disabledText}) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={className}
      disabled={disabled}
    >
      {disabled ? disabledText : text}
    </Button>
  )
}
const SubmitButtonStyled = styled(SubmitButton)`
  margin: ${({theme}) => theme.spacing(3, 0, 2)};
`

class SignIn extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        login: '', 
        password: '',
        showPassword: false
      };
    
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangePassword(event){
      this.setState({password: event.target.value});
  }

  handleChangeLogin(event) {
      this.setState({login: event.target.value});
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.signinUser(this.state.login, this.state.password);
  }
  
  handleClickShowPassword = () => {
    this.setState((state) => {
        return { showPassword: !state.showPassword }
    });
  };
  
  render() {
      const { disabled } = this.props;
      
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Peper>
            <AvatarStyled src="/tfoms.png" />
            <Typography component="h1" variant="h5">
              Войти в систему
            </Typography>
            <Form onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                type="email"
                fullWidth
                id="email"
                label="Email адрес"
                name="email"
                autoComplete="email"
                value={this.state.login}
                onChange={this.handleChangeLogin}
                autoFocus
              />
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                  <OutlinedInput
                    required
                    label={"Пароль"}
                    name="password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }

                  />
              </FormControl>
              {/*
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
               />
               */}
              <SubmitButtonStyled 
                disabled={disabled}
                text={defaultFormButtonText}
                disabledText={disabledFormButtonText}
              />
              <Grid container>
                {/*
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                */}
              </Grid>
            </Form>
          </Peper>
          <Box mt={5}>
            
          </Box>
        </Container>
      );
  }
}

const mapStateToProps = function(store) {
  return {
      disabled: store.auth.loading,
    };
}
const mapDispatchToProps = dispatch => {
  return {
    signinUser: (email, password) => {
        dispatch(signin(email, password));
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignIn));