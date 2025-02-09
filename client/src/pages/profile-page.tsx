import { useAuth } from "@/hooks/use-auth";
import ProfileForm from "@/components/profile-form";
import SignaturePad from "@/components/signature-pad";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Profile Settings</h1>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Profile Details</TabsTrigger>
              <TabsTrigger value="signature">Digital Signature</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <ProfileForm user={user} />
            </TabsContent>

            <TabsContent value="signature">
              <SignaturePad 
                existingSignature={user.signature} 
                onSave={(signature) => {
                  // Handle saving signature
                }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
