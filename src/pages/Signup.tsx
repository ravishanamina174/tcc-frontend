import { Helmet } from "react-helmet-async";
import { SignUp } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";





export default function Signup() {
  return (
    <div className="container py-16">
      <Helmet>
        <title>Sign Up | ParkNet</title>
        <meta name="description" content="Create your ParkNet account to reserve parking effortlessly." />
        <link rel="canonical" href="/signup" />
      </Helmet>

      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Join ParkNet</h1>
          <p className="mt-2 text-muted-foreground">
            Create your account to start parking smarter
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                card: "shadow-none",
                headerTitle: "text-2xl font-bold",
                headerSubtitle: "text-muted-foreground",
                socialButtonsBlockButton: "bg-background border border-input hover:bg-accent hover:text-accent-foreground",
                socialButtonsBlockButtonText: "text-foreground",
                formFieldInput: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                formFieldLabel: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                footerActionLink: "text-primary hover:text-primary/90",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground",
              }
            }}
            signInUrl="/login"
            redirectUrl="/dashboard"
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-primary/90 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
