import { useState } from "react"
import Head from "next/head"
import { useFormik } from "formik"
import * as yup from "yup"
import Orders from "../components/Orders"
import styles from "../styles/Admin.module.scss"

function admin() {
  let [loggedIn, setLoggedIn] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      const email = formik.values.email
      const password = formik.values.password

      if (
        email === process.env.NEXT_PUBLIC_ADMIN_USER &&
        password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
      ) {
        setLoggedIn(true)
      }
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Prosím, vyplňte e-mail ve správném tvaru.")
        .required("Prosím, vyplňte e-mail."),
      password: yup.string().trim().required("Prosím, vyplňte heslo."),
    }),
  })

  return (
    <>
      <Head>
        <title>Víno Iris</title>
        <meta name="title" content="Objednávky - Víno Iris" />
        <meta
          name="description"
          content="Víno Iris Pavlov - rodinné vinařství z Pavlova"
        />
      </Head>
      <div className={styles.adminBox}>
        <h1>Administrace</h1>

        {loggedIn && <Orders />}

        {!loggedIn && (
          <form className="w-100" onSubmit={formik.handleSubmit}>
            <div className="mb-1 mb-lg-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="jmeno@domena.cz"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-1 mb-lg-3">
              <label htmlFor="password" className="form-label">
                Heslo
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="heslo"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Přihlásit se
            </button>
          </form>
        )}
      </div>
    </>
  )
}

export default admin
