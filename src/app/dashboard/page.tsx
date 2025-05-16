"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface FeedbackStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
}

interface RecentFeedback {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<FeedbackStats>({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [recentFeedback, setRecentFeedback] = useState<RecentFeedback[]>([]);

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // For now, we'll use mock data
    setStats({
      total: 24,
      open: 8,
      inProgress: 6,
      resolved: 10,
    });

    setRecentFeedback([
      {
        id: "1",
        title: "Add dark mode support",
        status: "OPEN",
        priority: "HIGH",
        createdAt: "2024-03-15T10:00:00Z",
      },
      {
        id: "2",
        title: "Improve mobile responsiveness",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        createdAt: "2024-03-14T15:30:00Z",
      },
      {
        id: "3",
        title: "Fix login page layout",
        status: "RESOLVED",
        priority: "LOW",
        createdAt: "2024-03-13T09:15:00Z",
      },
    ]);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {session?.user?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Feedback</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {stats.total}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Open</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {stats.open}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">In Progress</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {stats.inProgress}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Resolved</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {stats.resolved}
          </dd>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Feedback</h2>
        <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
          <div className="divide-y divide-gray-200">
            {recentFeedback.map((feedback) => (
              <div
                key={feedback.id}
                className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {feedback.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        feedback.status === "OPEN"
                          ? "bg-yellow-100 text-yellow-800"
                          : feedback.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {feedback.status}
                    </span>
                    <span
                      className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        feedback.priority === "HIGH"
                          ? "bg-red-100 text-red-800"
                          : feedback.priority === "MEDIUM"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {feedback.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 