import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return notFound();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { organization: true },
  });
  if (!user) return notFound();

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="mb-6">
        <div className="mb-2"><span className="font-semibold">Name:</span> {user.name}</div>
        <div className="mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
        <div className="mb-2"><span className="font-semibold">Role:</span> {user.role}</div>
        <div className="mb-2"><span className="font-semibold">Organization:</span> {user.organization?.name}</div>
      </div>
      <div className="text-gray-500">Settings update functionality coming soon.</div>
    </div>
  );
} 