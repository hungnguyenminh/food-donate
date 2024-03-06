'use client';

import { Formik } from 'formik';
import { listDistrictHaNoi } from "@/lib/list-district";
import { useEffect, useState } from "react";
import { onValue, push, ref, update } from "@firebase/database";
import { database, url } from "@/firebase/config";

export default function Receive() {
  const [listDataDonate, setListDataDonate] = useState<any>();
  const [listDataDonateFilter, setListDataDonateFilter] = useState<any>();
  const [itemDonateSelect, setItemDonateSelect] = useState();

  const handleFilterDonate = (district) => {
    const listDonate = listDataDonate.filter(
      (item) => item.district === district.target.value
    );

    setListDataDonateFilter(listDonate);
  };
  const handleGetItemReceive = (item) => {
    console.log("item", item);
    setItemDonateSelect(item);
  };

  const handleSubmit = (data: any) => {
    const dataSubmit = { ...data, ...itemDonateSelect };

    const dataRef = ref(database, url.receive);

    // push object to object in firebase
    const newObjectRef = push(dataRef, dataSubmit);
    update(newObjectRef, {
      id: newObjectRef.key,
    }).then(() => {
      alert('success!');
    });
  };
  console.log('listDataDonate', listDataDonate);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = ref(database, url.donate);

        onValue(dataRef, (snapshot) => {
          const dataFromFirebase = snapshot.val();

          // convert data

          setListDataDonate(Object.values(dataFromFirebase));
          setListDataDonateFilter(Object.values(dataFromFirebase));
        });
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      <div>
        <h1 className="text-[3rem] font-medium bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Create order receive
        </h1>
        <Formik
          initialValues={{
            name_receive: "",
            phone_number_receive: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
            <div className="w-[35rem]">
              <div className="grid grid-cols-2 gap-[12px]">
                <div className="mt-[1rem]">
                  <p className="text-[1.5rem] mb-[0.5rem]">Receiver name:</p>
                  <input
                    type="text"
                    placeholder="Donate name"
                    name="name_receive"
                    value={values.name_receive}
                    onChange={handleChange}
                    className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                  />
                </div>
                <div className="mt-[1rem]">
                  <p className="text-[1.5rem] mb-[0.5rem]">Phone number:</p>
                  <input
                    type="text"
                    placeholder="Food name"
                    name="phone_number_receive"
                    value={values.phone_number_receive}
                    onChange={handleChange}
                    className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[12px]">
                <div className="mt-[1rem]">
                  <p className="text-[1.5rem] mb-[0.5rem]">Province:</p>
                  <select
                    className="w-full border-[2px] border-[#F4F4F4] outline-[#F4F4F4] h-[3.5rem] pl-[0.5rem] mt-[0.2rem] rounded-[2rem]"
                    name="cars"
                    // onChange={(value: any) => {
                    //   setFieldValue('province', value.target.value);
                    // }}
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
                    onChange={handleFilterDonate}
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
      <div className="ml-[2rem]">
        {listDataDonateFilter &&
          listDataDonateFilter.map((item: any, index: any) => (
            <div
              key={index}
              onClick={() => handleGetItemReceive(item)}
              className="bg-white shadow-md rounded-lg p-4 mb-[1rem] cursor-pointer"
            >
              <h3 className="text-lg font-medium text-gray-900">
                {item.item_donate}
              </h3>
              <p className="text-gray-700">{item.name_donater}</p>
              <p className="text-gray-700">{item.phone_number}</p>
              <p className="text-gray-700">{item.description}</p>
              <p className="text-gray-700">
                {item.province}- {item.district}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
