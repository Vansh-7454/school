import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function PortalRootPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = session.user.role;
  redirect(`/portal/${role}`);
}
