import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    // res.cookies.set('user', JSON.stringify(user));

    return res;
}