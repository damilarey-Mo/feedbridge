import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const feedback = await prisma.feedback.findUnique({
    where: { id: params.id },
    include: { author: true, organization: true },
  });
  if (!feedback) return NextResponse.json({ message: "Not found" }, { status: 404 });

  // Only allow if user is in the organization
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.organizationId !== feedback.organizationId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(feedback);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const feedback = await prisma.feedback.findUnique({ where: { id: params.id } });
  if (!feedback) return NextResponse.json({ message: "Not found" }, { status: 404 });

  // Only allow if user is author or admin in org
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.organizationId !== feedback.organizationId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  if (user.role !== "ADMIN" && feedback.authorId !== user.id) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { title, content, category, priority } = await req.json();
  const updated = await prisma.feedback.update({
    where: { id: params.id },
    data: { title, content, category, priority },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const feedback = await prisma.feedback.findUnique({ where: { id: params.id } });
  if (!feedback) return NextResponse.json({ message: "Not found" }, { status: 404 });

  // Only allow if user is author or admin in org
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.organizationId !== feedback.organizationId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  if (user.role !== "ADMIN" && feedback.authorId !== user.id) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await prisma.feedback.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
} 