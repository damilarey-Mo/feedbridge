"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";

interface Feedback {
  id: string;
  title: string;
  content: string;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
}

export default function FeedbackPage() {
  const router = useRouter();
  const [filter, setFilter] = useState({
    status: "ALL",
    priority: "ALL",
    category: "ALL",
  });

  // Mock data - in a real app, this would come from an API
  const feedback: Feedback[] = [
    {
      id: "1",
      title: "Add dark mode support",
      content: "Users have requested a dark mode option for better visibility in low-light conditions.",
      status: "OPEN",
      priority: "HIGH",
      category: "Feature Request",
      createdAt: "2024-03-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Improve mobile responsiveness",
      content: "The mobile version needs better optimization for different screen sizes.",
      status: "IN_PROGRESS",
      priority: "MEDIUM",
      category: "UI/UX",
      createdAt: "2024-03-14T15:30:00Z",
    },
    {
      id: "3",
      title: "Fix login page layout",
      content: "The login form alignment is broken on certain screen sizes.",
      status: "RESOLVED",
      priority: "LOW",
      category: "Bug",
      createdAt: "2024-03-13T09:15:00Z",
    },
  ];

  const filteredFeedback = feedback.filter((item) => {
    if (filter.status !== "ALL" && item.status !== filter.status) return false;
    if (filter.priority !== "ALL" && item.priority !== filter.priority) return false;
    if (filter.category !== "ALL" && item.category !== filter.category) return false;
    return true;
  });

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Feedback</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all feedback items from your customers.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => router.push("/feedback/new")}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New Feedback
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="ALL">All Status</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
        </select>

        <select
          value={filter.priority}
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="ALL">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="ALL">All Categories</option>
          <option value="Bug">Bug</option>
          <option value="Feature Request">Feature Request</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Performance">Performance</option>
        </select>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Priority
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredFeedback.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/feedback/${item.id}`)}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {item.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.status === "OPEN"
                              ? "bg-yellow-100 text-yellow-800"
                              : item.status === "IN_PROGRESS"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.priority === "HIGH"
                              ? "bg-red-100 text-red-800"
                              : item.priority === "MEDIUM"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.priority}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 