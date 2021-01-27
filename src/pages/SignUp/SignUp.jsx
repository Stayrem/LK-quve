import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import dictionary from '@utils/dictionary';

import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import { useAuth } from '../../hooks/use-auth';

const validate = (values) => {
  const errors = {};
  if (!values.full_name) {
    errors.full_name = 'Имя не заполнено';
  }

  if (!values.password) {
    errors.password = 'Пароль не установлен';
  } else if (values.password.length < 8) {
    errors.password = 'Пароль должен быть больше 8 символов';
  }

  if (!values.email) {
    errors.email = 'Email не заполнен';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Некорректный e-mail';
  }

  return errors;
};

const SignUp = () => {
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    document.title = `Регистрация — ${dictionary.APP_NAME}`;
  }, []);

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      auth.signUp(values)
        .then(() => {
          resetForm();
          toast.success('Пользователь успешно зарегистрирован!');
          history.push('/sign-in');
        }, (error) => {
          if (error.response.status === 422) {
            toast.error('Такой пользователь уже существует!');
          } else {
            toast.error(`Ошибка сервера: ${error.response.status}`);
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
              <h2 className="m-0">Регистрация</h2>
              <span className="text-white-50">
                Уже есть аккаунт?&nbsp;
                <Link to="/sign-in" className="text-white">Войти</Link>
              </span>
            </div>
            <div className="panel">
              <div className="panel-body">
                <form onSubmit={formik.handleSubmit} className="form" autoComplete="off">
                  <div className="form-group">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        className="form-control"
                        id="full_name"
                        name="full_name"
                        placeholder="Меня зовут..."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.full_name}
                      />
                    </div>
                    {formik.touched.full_name && formik.errors.full_name ? <small className="text-warning">{formik.errors.full_name}</small> : null}
                  </div>
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
                  <button type="submit" className="btn btn-accent btn-block btn-outline" disabled={formik.isSubmitting}>Отправить</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </main>
  );
};

export default SignUp;
