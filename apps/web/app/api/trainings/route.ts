import { NextRequest, NextResponse } from 'next/server';
import { getAllTrainings, createTraining } from '@/lib/api';

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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'title', 'description', 'image', 
      'availability', 'duration', 'notificationChannel'
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Field '${field}' is required` },
          { status: 400 }
        );
      }
    }
    
    const newTraining = await createTraining(data);
    
    if (!newTraining) {
      return NextResponse.json(
        { error: 'Failed to create training' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(newTraining, { status: 201 });
  } catch (error) {
    console.error('Error creating training:', error);
    return NextResponse.json(
      { error: 'Failed to create training' },
      { status: 500 }
    );
  }
} 