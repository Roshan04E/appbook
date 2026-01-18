import { auth } from "@/auth";
// import type { NextRequest } from "next/server";

// export async function proxy(req: NextRequest) {
//   // custom logic
//   // console.log("Middleware ran");
//   return auth();
// }
//

export const proxy = auth;

export const config = {
  matcher: ["/"],
};
