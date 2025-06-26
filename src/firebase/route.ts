// import { NextResponse } from "next/server";
// import { generateText } from "ai";
// import { google } from "@/lib/gemini";
// import { db } from "@/firebase/admin";
// import { getUserId } from "@/firebase/actions";
// import { getRandomInterviewCover } from "@/lib/utils";

// export async function POST(req: Request) {
//   try {
//     const { type, role, techstack, amount, level } = await req.json();
    
//     const user = await getUserId();
//     console.log("userData", user?.userData);

//     if (!type || !role || !techstack || !amount || !level) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const { text: ques } = await generateText({
//       model: google("gemini-2.0-flash-001"),
//       prompt: `Prepare questions for a job interview.
//         The job role is ${role}.
//         The job experience level is ${level}.
//         The tech stack used in the job is: ${techstack}.
//         The focus between behavioural and technical questions should lean towards: ${type}.
//         The amount of questions required is: ${amount}.
//         Please return only the questions, without any additional text.
//         The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
//         Return the questions formatted like this:
//         ["Question 1", "Question 2", "Question 3"]

//         Thank you! <3
//       `,
//     });

//     const questions = JSON.parse(ques);

//     const interview = {
//       role: role,
//       type: type,
//       level: level,
//       techstack: techstack.split(","),
//       questions: questions,
//       amount: amount,
//       userId: user?.userData?.uid,
//       finalized: true,
//       coverImage: getRandomInterviewCover(),
//       createdAt: new Date().toISOString(),
//     };

//     await db.collection("interviews").add(interview);

//     return NextResponse.json({ success: true, questions }, { status: 200 });
//   } catch (error) {
//     console.error("Error generating questions:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to generate questions" },
//       { status: 500 }
//     );
//   }
// }
