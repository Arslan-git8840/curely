import ConsultationCall from "@/components/ConsultationCall";
import React from "react";

interface PageProps {
  params: {
    sessionId: string;
  };
}

async function Page({ params }: PageProps) {
  const { sessionId } = await params;
  console.log(sessionId);
  return (
    <div>
      <ConsultationCall sessionId={sessionId} />
    </div>
  );
}

export default Page;
