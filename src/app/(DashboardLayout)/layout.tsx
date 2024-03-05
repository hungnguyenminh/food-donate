'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/userSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();
  console.log('state', state?.user?.user?.email);

  useEffect(() => {
    if (!state?.user?.user?.stsTokenManager?.accessToken) {
      dispatch(logout());
      router.push('/login');
    }
  }, [state?.user?.user]);

  const listTab = [
    {
      title: 'Donate',
      href: '/donate',
      icon: '',
    },
    {
      title: 'Receive',
      href: '/receive',
      icon: '',
    },
    {
      title: 'History',
      href: '/history',
      icon: '',
    },
    {
      title: 'Logout',
      href: '/login',
      icon: '',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-green-600 h-screen w-full flex flex-col  items-center overflow-y-auto pt-[3rem]">
      <div>
        <div className="flex items-center justify-center">
          <div className="h-[4rem] w-[4rem] mr-[1rem]">
            <Image
              src="/image/ICFood.svg"
              alt=""
              width={70}
              height={70}
              className="h-full w-full object-cover"
            />
          </div>
          <i className="text-[5rem]  font-bold font-mono bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            TB's Food Donation
          </i>
        </div>
        <i className="mb-[2rem] text-[5rem] leading-[5.8rem] font-bold font-mono bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Hello, {state?.user?.user?.email}!
        </i>
      </div>

      <div className=" w-full px-[10rem] flex justify-center">
        <div className="h-fit mr-[4rem]">
          {listTab.map((item, index) => (
            <Link
              onClick={() => item.href === '/login' && dispatch(logout())}
              href={item.href}
              key={index}
              className="cursor-pointer mb-[2rem] h-[8rem] w-[15rem] rounded-[1.2rem] border-[2px] flex items-center justify-center hover:shadow-xl hover:shadow-green-600 transition-all duration-500"
            >
              <div className="flex">
                <span className="text-white font-medium text-[1.7rem]">
                  {item.title}
                </span>
                <div>{item.icon}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="h-[calc(100vh-14rem)] w-fit overflow-auto max-w-[calc(100%-30rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
