import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { input } = await req.json();

        // (Later you'll send this to OpenAI)
        console.log("Received input:", input);

        return NextResponse.json({
            success: true,
            message: "Input received successfully.",
            input,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Invalid request" },
            { status: 400 }
        );
    }
}
