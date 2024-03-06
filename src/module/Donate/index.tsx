'use client';

import { Formik } from 'formik';
import { database, url } from '@/firebase/config';
import { push, ref, update } from '@firebase/database';
import { listDistrictHaNoi } from '@/lib/list-district';
import { useSelector } from "react-redux";

export default function Donate() {
  const user = useSelector((state: any) => state.user);
  const handleSubmit = (data: any) => {
    const dataSubmit = { key: 'donate', email: user.user.email, ...data };
    const dataRef = ref(database, url.donate);

    // push object to object in firebase
    const newObjectRef = push(dataRef, dataSubmit);
    update(newObjectRef, {
      id: newObjectRef.key,
    }).then(() => {
      alert('success!');
    });
  };

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
          province: 'Ha Noi',
          district: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
          <div className="w-[35rem]">
            <div className="grid grid-cols-2 gap-[8px]">
              <div className="mt-[1rem]">
                <p className="text-[1.5rem] mb-[0.5rem]">Donator’s name:</p>
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
                    console.log("Province", value.target.value);
                    setFieldValue('province', value.target.value);
                  }}
                  id="cars"
                >
                  <option value="Ha Noi">Ha Noi</option>
                </select>
              </div>
              <div className="mt-[1rem]">
                <p className="text-[1.5rem] mb-[0.5rem]">District:</p>
                <select
                  className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                  name="cars"
                  id="cars"
                  onChange={(value: any) => {
                    console.log("district", value.target.value);
                    setFieldValue('district', value.target.value);
                  }}
                >
                  {listDistrictHaNoi.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.name}
                    </option>
                  ))}
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
