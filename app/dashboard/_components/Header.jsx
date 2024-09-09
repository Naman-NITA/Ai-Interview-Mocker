"use client";

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Header = () => {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log(path);
  }, [path]);

  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image src={'/logo.svg'} width={160} height={100} alt="logo" />

      <ul className='hidden md:flex gap-6'>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}
          onClick={() => handleNavigation('/dashboard')}
        >
          Dashboard
        </li>

        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/questions' && 'text-primary font-bold'}`}
          onClick={() => handleNavigation('/dashboard/questions')}
        >
          Questions
        </li>

        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}
          onClick={() => handleNavigation('/dashboard/upgrade')}
        >
          Upgrade
        </li>

        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how' && 'text-primary font-bold'}`}
          onClick={() => handleNavigation('/dashboard/how')}
        >
          How it Works?
        </li>
      </ul>

      <UserButton />
    </div>
  );
};

export default Header;
