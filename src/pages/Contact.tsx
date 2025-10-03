import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Clock, Building2, CheckCircle, Send, AlertCircle } from "lucide-react";
import { feedbackApi, CreateFeedbackRequest } from "@/lib/api";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const feedbackData: CreateFeedbackRequest = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      };

      const response = await feedbackApi.create(feedbackData);
      
      if (response.success) {
        setIsSubmitted(true);
        toast.success("Message sent successfully!", {
          description: "Thank you for your feedback. We'll get back to you soon!"
        });
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", email: "", message: "" });
        }, 3000);
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setError(errorMessage);
      toast.error("Failed to send message", {
        description: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setError(null);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container py-8">
      <Helmet>
        <title>Contact Us | ParkNet</title>
        <meta name="description" content="Contact ParkNet support team for help and feedback." />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <h1 className="text-2xl font-bold">Contact Us</h1>

      <section className="mt-4 rounded-xl border bg-card p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <div className="text-sm text-muted-foreground">Main Hub</div>
            <div className="text-lg font-semibold">Colombo Central Parking Hub</div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Building2 className="h-4 w-4" /> No. 25, Smart Street, Colombo 01</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4" /> +94 70 227 5338</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" /> Open Hours: 6:00 AM - 11:00 PM</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> Colombo 01</div>
          </div>
        </div>
      </section>

      {isSubmitted ? (
        <motion.div 
          className="mt-6 max-w-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl border bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center shadow-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            </motion.div>
            <motion.h3 
              className="text-2xl font-bold text-green-800 mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Message Sent Successfully!
            </motion.h3>
            <motion.p 
              className="text-green-700 text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Thank you for reaching out to us. We've received your message and will get back to you within 24 hours.
            </motion.p>
            <motion.div 
              className="mt-6 text-sm text-green-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Your message has been saved and our team will review it shortly.
            </motion.div>
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button onClick={resetForm} variant="outline" className="text-green-700 border-green-300 hover:bg-green-50">
                Send Another Message
              </Button>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4">
          {error && (
            <motion.div 
              className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}
          
          <Input 
            placeholder="Your name" 
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            disabled={isSubmitting}
          />
          <Input 
            placeholder="Email address" 
            type="email" 
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            disabled={isSubmitting}
          />
          <Textarea 
            placeholder="Message" 
            className="min-h-[140px]" 
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            required
            disabled={isSubmitting}
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
