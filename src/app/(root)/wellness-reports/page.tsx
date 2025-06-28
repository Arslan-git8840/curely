"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/firebase/actions";
import { getAiReports } from "@/firebase/firestore/actions";

const mockReports = [
  {
    id: "report-001",
    patientName: "Dlex Alex",
    date: "2025-06-23",
    summary: "Type 2 Diabetes - Initial diagnosis and lifestyle guidance",
  },
  {
    id: "report-002",
    patientName: "Aanya Patel",
    date: "2025-06-25",
    summary: "Mild Viral Fever - Medication and hydration plan",
  },
];
type AiReport = {
  id: string;
  sessionId: string;
  userRef?: any; // or DocumentReference if needed
  report: Record<string, any>; // or a more specific type if you know the report structure
  conversation: { role: "user" | "assistant"; text: string }[];
  timestamp?: any; // could use Firebase Timestamp type
};

export default function Wellness_Reports() {
  const [reports, setReports] = useState<AiReport[] | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      const getReports = await getAiReports(user.uid);
      setReports(getReports);
      console.log(getReports);
      // const rawReport = getReports[0]?.report;

      // const reportObject =
      //   typeof rawReport === "string" ? JSON.parse(rawReport) : rawReport;

      // const medications = reportObject?.medications;

      // console.log(medications);
      // console.log(reportObject);
    };
    getUser();
  }, []);
  return (
    <div className="max-w-5xl mx-auto sm:px-4 px-1 py-10">
      <h1 className="text-3xl font-bold text-[#0f172a] mb-6">
        Available Wellness Reports
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-2xl">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-[#e0f7f4] text-[#019c6f] uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">Patient Name</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Summary</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reports?.map((report) => {
              const rawReport = report.report;
              const reportObject =
                typeof rawReport === "string"
                  ? JSON.parse(rawReport)
                  : rawReport;

              return (
                <tr key={report.id} className="hover:bg-[#f9fdfa] transition">
                  <td className="px-6 py-4 font-medium">
                    {reportObject?.patient?.name ?? "Unknown"}
                  </td>
                  <td className="px-6 py-4">
                    {reportObject?.generatedOn ?? "N/A"}
                  </td>
                   <td className="px-6 py-4">
                    {reportObject?.diagnosis?.condition ?? "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/wellness-reports/${report.id}`}
                      className="text-[#019c6f] hover:underline font-medium"
                    >
                      View Report →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
