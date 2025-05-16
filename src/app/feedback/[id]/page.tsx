import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export default async function FeedbackDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return notFound();

  const feedback = await prisma.feedback.findUnique({
    where: { id: params.id },
    include: { author: true, organization: true },
  });
  if (!feedback) return notFound();

  const canEdit = session.user.role === "ADMIN" || session.user.id === feedback.authorId;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{feedback.title}</h1>
      <div className="mb-4 text-gray-600">By {feedback.author?.name || "Unknown"} on {new Date(feedback.createdAt).toLocaleDateString()}</div>
      <div className="mb-4">
        <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2">{feedback.status}</span>
        <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2">{feedback.priority}</span>
        <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded">{feedback.category}</span>
      </div>
      <div className="mb-6 text-gray-900 whitespace-pre-line">{feedback.content}</div>
      {canEdit && (
        <Link href={`/feedback/${feedback.id}/edit`} className="text-indigo-600 hover:underline">Edit Feedback</Link>
      )}
    </div>
  );
} 