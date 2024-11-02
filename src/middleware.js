import { NextResponse, NextRequest } from "next/server";

export function middleware(req){
    const { pathname } = new URL(req.url);
    if (pathname === '/'){
        return NextResponse.redirect(new URL('/home', req.nextUrl));
    }
}


export const config = {
    matcher: [
        '/',
        '/home'
    ]
}