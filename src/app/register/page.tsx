import React from 'react';
import Divider from '@/components/shared/divider';

import Image from 'next/image';
import FormAuth from '@/components/shared/FormAuth';
import Link from 'next/link';
import NavigationBar from '@/components/shared/NavigationBar';

export default function Register() {
  return (
    <main>
      <NavigationBar page={'auth'} />

      {/*AUTH NAVIGATON*/}

      <section className={'max-w-7xl mx-auto py-12 px-4'}>
        <div className={'grid grid-cols-1  lg:grid-cols-2 gap-10'}>
          <div className={'hidden lg:inline-block'}>
            <Image
              src={'/auth/dummyImge.png'}
              alt={'bg-image'}
              role={'presentation'}
              width={625}
              height={725}
            />
          </div>

          <div
            className={
              'mx-auto flex flex-col gap-8 max-w-md justify-center h-full lg:mx-0'
            }
          >
            <div className={'flex flex-col gap-4 w-full'}>
              <h1 className={'title font-nunito'}>Start Tracking as a Team</h1>
              <p className={'body-text'}>
                {`Sign up to create your couple dashboard, where love and finances finally meet.`}
              </p>
            </div>
            <button
              type={'button'}
              disabled={true}
              className={
                'h-10   flex justify-center items-center gap-3 bg-neutral-300 p-4 rounded-2xl w-full cursor-not-allowed text-sm text-neutral-900'
              }
            >
              <Image
                src={'/google-icon.svg'}
                width={24}
                height={24}
                alt={'google-icon'}
                role={'presentation'}
              />
              <span className={'opacity-50'}>Coming Soon</span>
            </button>

            <Divider text={'Or Continue With'} />

            {/*  Form Login*/}
            <FormAuth page={'register'} />

            <p className={'text-left text-neutral-900'}>
              Already have an account?{' '}
              <Link className={'underline text-primary-500'} href={'/login'}>
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
