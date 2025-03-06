import { NextRequest, NextResponse } from 'next/server';
import { getJobById } from '@/lib/api';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = await getJobById(params.id);
    
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error(`Error fetching job with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
} 