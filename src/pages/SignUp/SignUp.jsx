import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import fetchData from '@utils/fetch';
import dictionary from '@utils/dictionary';

import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import PageContainer from '../../hocs/PageContainer/PageContainer';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Имя не заполнено';
  }

  if (!values.password) {
    errors.password = 'Пароль не установлен';
  } else if (values.password.length < 5) {
    errors.password = 'Пароль должен быть больше 5 символов';
  }

  if (!values.email) {
    errors.email = 'Email не заполнен';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Некорректный e-mail';
  }

  return errors;
};

const SignUp = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = `Регистрация — ${dictionary.APP_NAME}`;
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetchData('/api/sign-up', 'POST', values);
        if (response.code === 200) {
          toast.success('Пользователь успешно зарегистрирован!');
          history.push('/sign-in');
          resetForm();
        }
      } catch (error) {
        if (error.response.status === 422) {
          toast.error('Такой пользователь уже существует!');
        } else {
          toast.error(`Ошибка сервера: ${error.response.status}`);
        }
      }
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
                        id="name"
                        name="name"
                        placeholder="Меня зовут..."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                    </div>
                    {formik.touched.name && formik.errors.name ? <small className="text-warning">{formik.errors.name}</small> : null}
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
