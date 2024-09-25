import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent } from 'react'

type Props = { size?: number }

export const Logo: FunctionComponent<Props> = ({size =150}) => (
    <>
      <Link className="flex justify-center items-center" href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={size}
          height={size}
          className=""
          priority={true}
        />
      </Link>
    </>
  );