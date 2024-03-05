'use client';

import { Formik } from 'formik';

export default function Receive() {
  return (
    <div>
      <h1 className="text-[3rem] font-medium bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
        Create order receive
      </h1>
      <Formik
        initialValues={{ name: 'jared' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
          <div className="w-[35rem]">
            <div className="grid grid-cols-2 gap-[12px]">
              <div className="mt-[1rem]">
                <p className="text-[1.5rem] mb-[0.5rem]">Receiver name:</p>
                <input
                  type="text"
                  placeholder="Donate name"
                  className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                />
              </div>
              <div className="mt-[1rem]">
                <p className="text-[1.5rem] mb-[0.5rem]">Phone number:</p>
                <input
                  type="text"
                  placeholder="Food name"
                  className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[12px]">
              <div className="mt-[1rem]">
                <p className="text-[1.5rem] mb-[0.5rem]">Province:</p>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                />
              </div>
              <div className="mt-[1rem]">
                <p className="text-[1.5rem] mb-[0.5rem]">District:</p>
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button className=" border-[#10AD69] hover:shadow-lg hover:shadow-green-400 transition-all duration-500  border-[2px] px-[3.5rem] py-[0.8rem] text-white font-medium rounded-[2rem] text-[1.4rem] mt-[2rem]">
                Create
              </button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
