import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next'

export default function Nav () {
    const { t } = useTranslation();
    const router = useRouter();
    const { data: session, status } = useSession();
    const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

    return (
        <nav>
            <Link href="/">
                {t`home`}
            </Link>{' | '}
            <Link href="/goals">
                {t`goals`}
            </Link>{' | '}
            <Link href="/public">
                {t`public`}
            </Link>{' | '}
         { 
            !session ?
                <Link href="/api/auth/signin" data-active={isActive('/signup')}>
                    Log in
                </Link>
                :
                <>
                    <Link href="/addgoal">
                        {t`add_goal`}
                    </Link>{' | '}
                    <Link href="/profile" data-active={isActive('/profile')}>
                        {t`profile`}
                    </Link>{' | '}
                    <Link href="/api/auth/signout" data-active={isActive('/signup')}>
                        {t`logout`}
                    </Link>
                </>
         }
        </nav>
    )
}