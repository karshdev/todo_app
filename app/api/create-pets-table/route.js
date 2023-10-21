import { ExampleTable, db } from '@/libs/drizzle';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  const client=await db.select().from(ExampleTable)
return NextResponse.json(client)
}