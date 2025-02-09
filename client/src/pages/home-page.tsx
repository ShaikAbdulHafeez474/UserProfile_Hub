import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { User, Briefcase, FileSignature } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome, {user?.username}!</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Complete your profile to get started.
            </p>
            <Link href="/profile">
              <Button>Update Profile</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Onboarding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Status: {user?.onboardingStatus}
            </p>
            <Link href="/profile">
              <Button variant="secondary">View Details</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSignature className="h-5 w-5" />
              Digital Signature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {user?.signature ? "Signature created" : "No signature yet"}
            </p>
            <Link href="/profile">
              <Button variant="secondary">Manage Signature</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
