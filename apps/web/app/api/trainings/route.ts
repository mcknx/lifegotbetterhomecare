import { NextResponse } from 'next/server';
import { getAllTrainings } from '@/lib/api';

export async function GET() {
  try {
    const trainings = await getAllTrainings();
    return NextResponse.json(trainings);
  } catch (error) {
    console.error('Error fetching trainings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trainings' },
      { status: 500 }
    );
  }
} 