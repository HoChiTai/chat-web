'use client';

import { useState } from 'react';
import { setCookie } from 'cookies-next';
import request from '@Utils/httpRequest';
import api from '@Configs/api';
import { saveUserDataStore } from '@Utils/store';

function Login() {
  interface Login {
    username: string;
    password: string;
  }
  interface Register {
    username: string;
    password: string;
    name: string;
  }

  const [login, setLogin] = useState<Login>({
    username: '',
    password: '',
  });

  const [register, setRegister] = useState<Register>({
    username: '',
    password: '',
    name: '',
  });

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin((prev: Login): Login => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegister((prev: Register): Register => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (login.username && login.password) {
      await request
        .post(api.loginUser, login)
        .then((res) => {
          saveUserDataStore(res.data.data);
          setCookie('access-token', res.data.accessToken, { path: '/', maxAge: 7 * 24 * 60 * 60 });
          setCookie('refresh-token', res.data.refreshToken, { path: '/', maxAge: 7 * 24 * 60 * 60 });
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const submitRegister = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (register.username && register.password && register.name) {
      await request
        .post(api.registerUser, register)
        .then((res) => {})
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
            deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input input-bordered"
                value={login.username}
                onChange={handleChangeLogin}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                value={login.password}
                onChange={handleChangeLogin}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={submitLogin}>
                Login
              </button>
            </div>
          </div>
        </form>
        <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                name="username"
                className="input input-bordered"
                value={register.username}
                onChange={handleChangeRegister}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                value={register.password}
                onChange={handleChangeRegister}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input input-bordered"
                value={register.name}
                onChange={handleChangeRegister}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={submitRegister}>
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
