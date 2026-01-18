import { getUserTodos } from "@/lib/database/tables/todos/todos-action";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId)
    return Response.json({ error: "Missing userId" }, { status: 400 });

  const todos = await getUserTodos(userId);
  return Response.json(todos);
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}
