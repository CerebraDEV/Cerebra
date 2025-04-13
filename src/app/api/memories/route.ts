import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const memorySchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  type: z.enum(['text', 'image']),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const body = memorySchema.parse(json)

    const memory = await prisma.memory.create({
      data: {
        title: body.title,
        content: body.content,
        type: body.type,
        userId: session.user.id,
      },
    })

    return NextResponse.json(memory)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data', { status: 422 })
    }

    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const memories = await prisma.memory.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        transformations: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(memories)
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
} 