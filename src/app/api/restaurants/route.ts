// src/app/api/restaurants/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      "https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json"
    );

    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}