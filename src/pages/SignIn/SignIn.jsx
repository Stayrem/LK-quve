import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import dictionary from '@utils/dictionary';

import { useFormik } from 'formik';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import { useAuth } from '../../hooks/use-auth';
import { toast } from 'react-toastify';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email не заполнен';
  }

  if (!values.password) {
    errors.password = 'Пароль не заполнен';
  }

  return errors;
};

const SignIn = () => {
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    document.title = `Вход — ${dictionary.APP_NAME}`;
  }, []);

  useEffect(() => {
    if (auth.user) {
      history.push('/');
    }
  }, [auth.user]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      auth.signIn(values)
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          const errorStatus = error.response && error.response.status;
          if (errorStatus === 401) {
            toast.error('Некорректные email или пароль.');
          } else {
            toast.error(`Ошибка сервера: ${errorStatus}`);
          }
          formik.setSubmitting(false);
        });
    },
  });

  return (
    <main className="main">
      <PageContainer>
        <div className="row my-5 d-flex flex-column align-items-center">
          <div className="col-md-5">
            <div className="d-flex align-items-end justify-content-between mb-3">
              <h2 className="m-0">Вход в аккаунт</h2>
              <span className="text-white-50">
                Нет аккаунта?&nbsp;
                <Link to="/sign-up" className="text-white">Регистрация</Link>
              </span>
            </div>
            <div className="panel">
              <div className="panel-body">
                <form onSubmit={formik.handleSubmit} className="form" autoComplete="off">
                  <div className="form-group">
                    <div className="input-wrapper">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email..."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email ? <small className="text-warning">{formik.errors.email}</small> : null}
                  </div>
                  <div className="form-group">
                    <div className="input-wrapper">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Пароль..."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                    </div>
                    {formik.touched.password && formik.errors.password ? <small className="text-warning">{formik.errors.password}</small> : null}
                  </div>
                  <button type="submit" className="btn btn-accent btn-block btn-outline" disabled={formik.isSubmitting}>Войти</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </main>
  );
};

export default SignIn;
