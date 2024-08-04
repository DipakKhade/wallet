import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';

export const config ={
    matcher:['/:path*']
}

export default withAuth({
    pages: {
        signIn: '/',
    },
});