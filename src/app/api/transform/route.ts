import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import OpenAI from 'openai'

import { prisma } from '@/lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const transformRequestSchema = z.object({
  memoryId: z.string(),
  style: z.string(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const body = transformRequestSchema.parse(json)

    const memory = await prisma.memory.findUnique({
      where: {
        id: body.memoryId,
        userId: session.user.id,
      },
    })

    if (!memory) {
      return new NextResponse('Memory not found', { status: 404 })
    }

    // Generate sci-fi story using OpenAI
    const prompt = `Transform this memory into a ${body.style} sci-fi story while preserving its emotional core:
    
    ${memory.content}
    
    Make it engaging and imaginative while keeping the original sentiment intact.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a creative sci-fi writer who transforms personal memories into engaging sci-fi stories.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const transformedContent = completion.choices[0]?.message?.content || ''

    // Create transformation record
    const transformation = await prisma.transformation.create({
      data: {
        style: body.style,
        content: transformedContent,
        memoryId: memory.id,
      },
    })

    return NextResponse.json(transformation)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data', { status: 422 })
    }

    console.error('Error transforming memory:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 