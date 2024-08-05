import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Hero from "@/components/Hero";
import { DashboardComponent } from "@/components/Dashboard";
import DashboardHeader from "@/components/DashboardHeader";

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
        >
          { session.user?.name&& <DashboardHeader userName={session.user?.name.split(' ')[0] as unknown as string} />}
          </DashboardComponent>
          
      </main>
    );
  }
  return (
    <main>
      <Hero />
    </main>
  );
}
