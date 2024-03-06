'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signUp } from '@/firebase/functions/auth';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const handleRegister = async (data: { email: string; password: string }) => {
    const { result, error }: any = await signUp(data.email, data.password);

    if (error) {
      alert(error.message);
      return;
    }

    console.log('result==========', result);

    alert('Success!');
    router.push('/login');
  };

  const RegisterValidation = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Email is not valid!')
      .required('Email is required!'),
    password: Yup.string()
      .trim()
      .required('Password is required!')
      .min(6, 'Password must be over 6 characters')
      .max(255, 'Password must not exceed 255 characters')
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{0,}$/g,
        'Password must have at least 1 lower case letter, 1 special character and 1 number'
      ),
  });

  return (
    <div className="w-full h-screen flex items-center justify-center max-md:flex-col max-md:px-[3.2rem] max-md:justify-start">
      <div className="w-[40rem] h-[40rem] rounded-[1.7rem] overflow-hidden max-md:w-full  max-md:h-[70rem] max-md:mt-[20rem]">
        <Image
            src="/image/image_food.png"
            alt=""
            width={600}
            height={600}
            className="w-full h-full max-md:object-contain"
        />
      </div>
      <div className="ml-[5rem] w-[37rem] max-md:w-full">
        <h4 className="text-[4rem] font-medium ">Sign up</h4>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleRegister}
          validateOnChange
          validateOnBlur
          validationSchema={RegisterValidation}
        >
          {({
            handleSubmit,
            values,
            handleChange,
            errors,
            touched,
          }): JSX.Element => {
            return (
              <div className="login-container">
                <div className="mt-[1.5rem] mb-[0.8rem]">
                  <p className="text-[1.2rem] text-[#454545]">Email:</p>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3rem] pl-[0.5rem] mt-[0.2rem]"
                  />
                  {errors.email && touched.email && (
                    <p style={{ color: 'red' }}>{errors.email}</p>
                  )}
                </div>
                <div>
                  <p className="text-[1.2rem] text-[#454545]">Password:</p>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3rem] pl-[0.5rem] mt-[0.2rem]"
                  />
                  {errors.password && touched.password && (
                    <p style={{ color: 'red' }}>{errors.password}</p>
                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className=" bg-[#5ae4a8] px-[3.5rem] py-[0.8rem] text-white font-medium rounded-[2rem] text-[1.4rem] mt-[2rem]"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            );
          }}
        </Formik>
        {/* <div className="mt-[1.5rem] mb-[0.8rem]"> */}
        {/*  <p className="text-[1.2rem] text-[#454545]">Username:</p> */}
        {/*  <input */}
        {/*    type="text" */}
        {/*    placeholder="Username" */}
        {/*    className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3rem] pl-[0.5rem] mt-[0.2rem]" */}
        {/*  /> */}
        {/* </div> */}

        <div className="flex justify-center">
          <Link
            href="/login"
            className="text-center underline text-[#454545] text-[1.2rem] my-[1rem]"
          >
            Or sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
