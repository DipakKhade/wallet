import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Hero from "@/components/Hero";
import { DashboardComponent } from "@/components/Dashboard";
async function serverSession() {
  const session = await getServerSession(authOptions);
  return session;
}
export default async function Home() {
  const session = await serverSession();
  if (session) {
    return (
      <main>
        <DashboardComponent
          profileImage={session.user?.image as string}
          userName={session.user?.name as string}
        />
      </main>
    );
  }
  return (
    <main>
      <Hero />
    </main>
  );
}
