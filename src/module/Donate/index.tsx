'use client';

import { Formik } from 'formik';
import { useState } from 'react';

export default function Donate() {
  const [listDistrictSelect, setListDistrictSelect] = useState();
  return (
    <div>
      <h1 className="text-[3rem] font-medium bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
        Create order donate
      </h1>
      <Formik
        initialValues={{
          name_donater: '',
          item_donate: '',
          phone_number: '',
          description: '',
          province: '',
          district: '',
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
          <div className="w-[35rem]">
            <div className="grid grid-cols-2 gap-[8px]">
              <div className="mt-[1rem]">
                <p className="text-[1.5rem] mb-[0.5rem]">Donate name:</p>
                <input
                  type="text"
                  placeholder="Donate name"
                  name="name_donater"
                  value={values.name_donater}
                  onChange={handleChange}
                  className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                />
              </div>
              <div className="mt-[1rem]">
                <p className="text-[1.5rem] mb-[0.5rem]">Food name:</p>
                <input
                  type="text"
                  placeholder="Food name"
                  name="item_donate"
                  value={values.item_donate}
                  onChange={handleChange}
                  className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[8px]">
              <div className="mt-[1rem]">
                <p className="text-[1.5rem] mb-[0.5rem]">Phone number:</p>
                <input
                  type="text"
                  placeholder="Phone number"
                  name="phone_number"
                  value={values.phone_number}
                  onChange={handleChange}
                  className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                />
              </div>
              <div className="mt-[1rem]">
                <p className="text-[1.5rem] mb-[0.5rem]">Description:</p>
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[8px]">
              <div className="mt-[1rem]">
                <p className="text-[1.5rem] mb-[0.5rem]">Province:</p>
                <select
                  className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                  name="cars"
                  onChange={(value: any) => {
                    setFieldValue('province', value.target.value);
                  }}
                  id="cars"
                >
                  <option value="Ha Noi">Ha Noi</option>
                  <option value="Ha Noi2">TP HCM</option>
                </select>
              </div>
              <div className="mt-[1rem]">
                <p className="text-[1.5rem] mb-[0.5rem]">District:</p>
                <select
                  className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                  name="cars"
                  id="cars"
                  onChange={(value: any) => {
                    setFieldValue('district', value.target.value);
                  }}
                >
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => handleSubmit()}
                className=" border-[#10AD69] hover:shadow-lg hover:shadow-green-400 transition-all duration-500  border-[2px] px-[3.5rem] py-[0.8rem] text-white font-medium rounded-[2rem] text-[1.4rem] mt-[2rem]"
              >
                Create
              </button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
