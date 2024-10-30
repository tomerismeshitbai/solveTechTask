import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { login } from '../../store/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './Login.css';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(login(data));
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/characters'); 
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Username"
            {...register('username')}
          />
          {errors.username && <span className="error-message">{errors.username.message}</span>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
