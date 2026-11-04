import { prisma } from "@phoenix/db";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("pst_session")?.value;

  if (!sessionToken) {
    // Return default technician for quick preview if no cookie yet
    const fallbackUser = await prisma.user.findUnique({
      where: { username: "technician1" },
    });
    return fallbackUser;
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ id: sessionToken }, { username: sessionToken }, { apiKey: sessionToken }],
    },
  });

  return user;
}

