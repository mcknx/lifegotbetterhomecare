import { NextRequest, NextResponse } from 'next/server';
import { getTrainingById, updateTraining, deleteTraining } from '@/lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: 'Training ID is required' },
        { status: 400 }
      );
    }

    const training = await getTrainingById(id);
    
    if (!training) {
      return NextResponse.json(
        { error: 'Training not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(training);
  } catch (error) {
    console.error(`Error fetching training:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch training' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: 'Training ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    const updatedTraining = await updateTraining(id, data);
    
    if (!updatedTraining) {
      return NextResponse.json(
        { error: 'Failed to update training' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedTraining);
  } catch (error) {
    console.error(`Error updating training:`, error);
    return NextResponse.json(
      { error: 'Failed to update training' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: 'Training ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteTraining(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete training' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting training:`, error);
    return NextResponse.json(
      { error: 'Failed to delete training' },
      { status: 500 }
    );
  }
} 