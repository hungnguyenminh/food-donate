'use client';

import { useEffect, useState } from "react";
import { onValue, ref } from "@firebase/database";
import { database, url } from "@/firebase/config";
import { useSelector } from "react-redux";
import { undefined } from "zod";

export default function History() {
  const user = useSelector((state: any) => state.user);
  const [dataHistory, setDataHistory] = useState<any>();

  console.log('dataHistory', dataHistory);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = ref(database);

        onValue(dataRef, (snapshot) => {
          const dataFromFirebase = snapshot.val();

          // // convert data
          const listDonate =
            dataFromFirebase.donate && Object.values(dataFromFirebase.donate);
          const listReceive =
            dataFromFirebase.revceive &&
            Object.values(dataFromFirebase.revceive);

          let listHistory: any = [];

          if (listDonate) {
            listHistory = [...listHistory, ...listDonate];
          }
          if (listReceive) {
            listHistory = [...listHistory, ...listReceive];
          }

          const filterMyHistory = listHistory.filter(
            (item: any) => (item.email = user.user.email)
          );

          setDataHistory(filterMyHistory);
        });
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="ml-[2rem]">
        {dataHistory &&
          dataHistory.map((item: any, index: any) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 mb-[1rem] cursor-pointer w-[30rem]"
            >
              {item.key === 'donate' ? <div>
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Item donate: {item.item_donate}
                      </h3>
                      <i className="text-red font-medium text-[1rem]">{item.key}</i>
                    </div>
                    <p className="text-gray-700">Donator’s name: {item.name_donater}</p>
                    <p className="text-gray-700">Phonenumber: {item.phone_number}</p>
                    <p className="text-gray-700">Description: {item.description}</p>
                    <p className="text-gray-700">
                      Address: {item.province}- {item.district}
                    </p>
                  </div> :
                  <div>
                    <div className='flex justify-end'>
                      <i className="text-red font-medium text-[1rem]">{item.key}</i>
                    </div>
                    {item?.listProduct && item?.listProduct.map((itemProduct: any) => (
                        <div className='mb-[2rem]'>
                          <div className="flex justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                              Item receive: {itemProduct.item_donate}
                            </h3>
                          </div>
                          <p className="text-gray-700">Donator’s name: {itemProduct.name_donater}</p>
                          <p className="text-gray-700">Phonenumber: {itemProduct.phone_number}</p>
                          <p className="text-gray-700">Description: {itemProduct.description}</p>
                          <p className="text-gray-700">
                            Address: {itemProduct.province}- {itemProduct.district}
                          </p>
                        </div>
                    ))}
                  </div>
              }

            </div>
          ))}
      </div>
    </div>
  );
}
