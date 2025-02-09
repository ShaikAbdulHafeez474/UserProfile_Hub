import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LogOut, User } from "lucide-react";

export default function Navigation() {
  const { user, logoutMutation } = useAuth();

  if (!user) return null;

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/">
          <a className="font-bold text-xl">User Management</a>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/profile">
            <Button variant="ghost" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </Button>
          </Link>
          
          <Button 
            variant="ghost"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
