"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const feedbackSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  priority: z.string().min(1, "Please select a priority"),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

export default function EditFeedbackPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
  });

  useEffect(() => {
    async function fetchFeedback() {
      const res = await fetch(`/api/feedback/${params.id}`);
      if (!res.ok) {
        setError("Failed to load feedback");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setValue("title", data.title);
      setValue("content", data.content);
      setValue("category", data.category);
      setValue("priority", data.priority);
      setLoading(false);
    }
    fetchFeedback();
  }, [params.id, setValue]);

  const onSubmit = async (data: FeedbackForm) => {
    setError(null);
    const res = await fetch(`/api/feedback/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      setError(err.message || "Failed to update feedback");
      return;
    }
    router.push(`/feedback/${params.id}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Feedback</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input {...register("title")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea {...register("content")}
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          {errors.content && <p className="text-red-600 text-sm">{errors.content.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select {...register("category")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="">Select a category</option>
            <option value="Bug">Bug</option>
            <option value="Feature Request">Feature Request</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Performance">Performance</option>
          </select>
          {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select {...register("priority")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="">Select a priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
          {errors.priority && <p className="text-red-600 text-sm">{errors.priority.message}</p>}
        </div>
        <div className="flex gap-x-3">
          <button type="button" onClick={() => router.back()} className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
} 