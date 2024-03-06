'use client';

import Image from 'next/image';
import ICFacebook from '@/components/Icons/ICFacebook';
import ICGoogle from '@/components/Icons/ICGoogle';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/firebase/functions/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (data: { email: string; password: string }) => {
    const { result, error }: any = await signIn(data.email, data.password);

    if (error) {
      alert(error.message);
      return;
    }

    // else successful
    alert('Success!');
    dispatch(setUser(result.user));
    router.push('/');
  };

  const LoginValidation = Yup.object().shape({
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
          src="/image/login.avif"
          alt=""
          width={600}
          height={600}
          className="w-full h-full object-cover max-md:object-contain"
        />
      </div>
      <div className="ml-[5rem] w-[37rem] max-md:w-full max-md:px-[10rem]">
        <h4 className="text-[4rem] font-medium max-md:text-center max-md:text-[7rem]">Sign in</h4>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleLogin}
          validateOnChange
          validateOnBlur
          validationSchema={LoginValidation}
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
                  <p className="text-[1.2rem] text-[#454545] max-md:text-[4rem]">Email:</p>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3rem] pl-[0.5rem] mt-[0.2rem] max-md:h-[9rem] max-md:text-[3rem]"
                  />
                  {errors.email && touched.email && (
                    <p style={{ color: 'red' }}>{errors.email}</p>
                  )}
                </div>
                <div>
                  <p className="text-[1.2rem] text-[#454545] max-md:text-[4rem]">Password:</p>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3rem] pl-[0.5rem] mt-[0.2rem] max-md:h-[9rem] max-md:text-[3rem]"
                  />
                  {errors.password && touched.password && (
                    <p style={{ color: 'red' }}>{errors.password}</p>
                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className=" bg-[#5ae4a8] px-[3.5rem] py-[0.8rem] text-white font-medium rounded-[2rem] text-[1.4rem] mt-[2rem] max-md:w-full max-md:py-[4rem] max-md:text-[3rem]"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            );
          }}
        </Formik>
        <div className="flex justify-center">
          <Link
            href="/register"
            className="text-center underline text-[#454545] text-[1.2rem] my-[1rem] max-md:text-[4rem] max-md:mt-[3rem]"
          >
            Or signup with
          </Link>
        </div>

        <div className="w-full grid grid-cols-2 gap-[0.5rem] px-[5rem]">
          <button className="flex items-center bg-[#4267b2] px-[3.5rem] py-[0.8rem] text-white font-medium rounded-[2rem] text-[1.4rem] mt-[2rem]">
            <ICFacebook height={20} width={20} fill="white" />
            <span>Facebook</span>
          </button>
          <button className="flex items-center bg-[#EA4335] px-[3.5rem] py-[0.8rem] text-white font-medium rounded-[2rem] text-[1.4rem] mt-[2rem]">
            <ICGoogle height={25} width={25} fill="white" />
            <span className="ml-[0.5rem]">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
