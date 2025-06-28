import ReportSection from "@/components/ReportDemoSection";
import { getAiReportById } from "@/firebase/firestore/actions";
import { notFound } from "next/navigation";
import React from "react";

export default async function ReportPage({
  params,
}: {
  params: { reportId: string };
}) {
  const { reportId } = await params;
  const getReport = await getAiReportById(reportId);
  console.log(getReport);

  return (
    <div className="max-w-5xl mx-auto sm:px-4 px-1 py-10">
      <ReportSection reportData = {getReport} />
    </div>
  );
}
