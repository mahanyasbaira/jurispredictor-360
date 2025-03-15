
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Upload,
  Info,
  Check,
  BarChart3,
  Clock,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  // User Details (Optional)
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  
  // Case Information (Mandatory)
  caseType: z.string({
    required_error: "Please select a case type",
  }),
  courtJurisdiction: z.string({
    required_error: "Please select court jurisdiction",
  }),
  caseDetails: z
    .string()
    .min(50, {
      message: "Case details must be at least 50 characters",
    })
    .max(1000, {
      message: "Case details must not exceed 1000 characters",
    }),
  hasPreviousHearings: z.boolean().default(false),
  
  // Conditional Fields for Previous Hearings
  numberOfHearings: z.number().optional(),
  hearingOutcome: z.string().optional(),
  judgeName: z.string().optional(),
  
  // Legal Arguments (Checkbox Selection)
  legalArguments: z.array(z.string()).optional(),
  otherLegalArgument: z.string().optional(),
  
  // Consent
  consentToAnalyze: z.boolean().default(false),
});

const AnalyzeCase = () => {
  const [expandedSection, setExpandedSection] = useState("caseInformation");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasPreviousHearings: false,
      consentToAnalyze: false,
      legalArguments: [],
    },
  });

  const hasPreviousHearings = form.watch("hasPreviousHearings");

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection("");
    } else {
      setExpandedSection(section);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      const validFiles = fileList.filter(file => {
        const fileType = file.type;
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (!validTypes.includes(fileType)) {
          toast.error(`Invalid file type: ${file.name}. Only PDF, DOC, DOCX, JPG, and PNG are allowed.`);
          return false;
        }
        
        if (file.size > maxSize) {
          toast.error(`File too large: ${file.name}. Maximum file size is 5MB.`);
          return false;
        }
        
        return true;
      });
      
      if (validFiles.length > 0) {
        setIsUploading(true);
        // Simulate upload delay
        setTimeout(() => {
          setUploadedFiles([...uploadedFiles, ...validFiles]);
          setIsUploading(false);
          toast.success(`${validFiles.length} file(s) uploaded successfully.`);
        }, 1500);
      }
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    toast.info("File removed");
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!data.consentToAnalyze) {
      toast.error("Please consent to AI analysis of your case");
      return;
    }
    
    console.log("Form data:", data);
    console.log("Uploaded files:", uploadedFiles);
    
    // Simulate AI analysis
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Store form data in session storage for the results page
      sessionStorage.setItem('caseData', JSON.stringify({
        formData: data,
        fileCount: uploadedFiles.length
      }));
      navigate("/case-results");
    }, 3000);
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="pt-24 pb-16 px-4 md:px-0">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center space-y-4 animate-fade-in">
          <Badge className="mb-2 px-3 py-1 bg-primary/10 text-primary border-none">
            AI-Powered Analysis
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-legal-900">
            Predict Your Case Outcome with AI
          </h1>
          <p className="text-legal-600 max-w-2xl mx-auto">
            Enter case details and let AI predict the time, possible judgment, and alternative solutions 
            before heading to court.
          </p>
        </div>

        {/* Main Form */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 mb-8 animate-scale-in">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Section 1: User Details */}
              <div className="space-y-4">
                <div 
                  className="flex items-center justify-between cursor-pointer" 
                  onClick={() => toggleSection("userDetails")}
                >
                  <h2 className="text-xl font-semibold text-legal-800 flex items-center">
                    <div className="flex items-center justify-center bg-primary/10 h-8 w-8 rounded-full mr-3 text-primary">
                      1
                    </div>
                    User Details <Badge className="ml-2 bg-secondary text-muted-foreground">Optional</Badge>
                  </h2>
                  <Button variant="ghost" size="icon" type="button">
                    {expandedSection === "userDetails" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                {expandedSection === "userDetails" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 animate-fade-in">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your name helps personalize the analysis
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            We'll never share your email with anyone else
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your phone number with country code
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-start space-x-2 md:col-span-2 bg-blue-50 p-3 rounded-md text-sm text-blue-800">
                      <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <p>
                        Your personal information is used only to tailor the AI analysis to your jurisdiction
                        and case specifics. We do not store or share this data with third parties.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Section 2: Case Information */}
              <div className="space-y-4">
                <div 
                  className="flex items-center justify-between cursor-pointer" 
                  onClick={() => toggleSection("caseInformation")}
                >
                  <h2 className="text-xl font-semibold text-legal-800 flex items-center">
                    <div className="flex items-center justify-center bg-primary/10 h-8 w-8 rounded-full mr-3 text-primary">
                      2
                    </div>
                    Case Information <Badge className="ml-2 bg-primary text-white">Required</Badge>
                  </h2>
                  <Button variant="ghost" size="icon" type="button">
                    {expandedSection === "caseInformation" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                {expandedSection === "caseInformation" && (
                  <div className="space-y-6 pt-4 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="caseType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Case Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select case type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="property">Property/Land Dispute</SelectItem>
                                <SelectItem value="family">Family Matters</SelectItem>
                                <SelectItem value="business">Business/Contract Disputes</SelectItem>
                                <SelectItem value="criminal">Criminal Cases</SelectItem>
                                <SelectItem value="financial">Financial Fraud & Disputes</SelectItem>
                                <SelectItem value="medical">Medical Negligence</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select the category that best matches your case
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="courtJurisdiction"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Court Jurisdiction</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select jurisdiction" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="highCourt">State High Court</SelectItem>
                                <SelectItem value="districtCourt">District Court</SelectItem>
                                <SelectItem value="supremeCourt">Supreme Court</SelectItem>
                                <SelectItem value="tribunal">Tribunals & Other Authorities</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select the court where your case would be filed
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="caseDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Case Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe the facts of your case, what happened, and what legal remedy you're seeking..."
                              className="min-h-[150px] resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide a clear description of your case (500-1000 characters)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasPreviousHearings"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Previous Court Hearings</FormLabel>
                            <FormDescription>
                              Has this case been previously heard in court?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {hasPreviousHearings && (
                      <div className="pl-6 border-l-2 border-primary/30 space-y-6 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="numberOfHearings"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Previous Hearings</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    min={1}
                                    onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="hearingOutcome"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Outcome of Previous Hearings</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select outcome" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                    <SelectItem value="partialJudgment">Partial Judgment</SelectItem>
                                    <SelectItem value="adjourned">Adjourned</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="judgeName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name of Judge (if known)</FormLabel>
                              <FormControl>
                                <Input placeholder="Hon. Justice..." {...field} />
                              </FormControl>
                              <FormDescription>
                                Provides context for the AI analysis
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    <div className="space-y-4">
                      <FormLabel>Expected Legal Arguments</FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: "lackOfEvidence", label: "Lack of evidence from opposition" },
                          { id: "legalTechnicalities", label: "Legal technicalities (jurisdiction, improper filing)" },
                          { id: "documentaryProof", label: "Strong documentary proof" },
                          { id: "precedents", label: "Precedents favoring the case" },
                          { id: "weakOpposition", label: "Weak opposition argument" },
                          { id: "other", label: "Other" }
                        ].map((argument) => (
                          <FormField
                            key={argument.id}
                            control={form.control}
                            name="legalArguments"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={argument.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(argument.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value || [], argument.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== argument.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {argument.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Show "Other" text field if "Other" is selected */}
                      {form.watch("legalArguments")?.includes("other") && (
                        <FormField
                          control={form.control}
                          name="otherLegalArgument"
                          render={({ field }) => (
                            <FormItem className="animate-fade-in">
                              <FormControl>
                                <Input placeholder="Please specify other argument..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Section 3: Supporting Evidence */}
              <div className="space-y-4">
                <div 
                  className="flex items-center justify-between cursor-pointer" 
                  onClick={() => toggleSection("supportingEvidence")}
                >
                  <h2 className="text-xl font-semibold text-legal-800 flex items-center">
                    <div className="flex items-center justify-center bg-primary/10 h-8 w-8 rounded-full mr-3 text-primary">
                      3
                    </div>
                    Supporting Evidence <Badge className="ml-2 bg-secondary text-muted-foreground">Optional</Badge>
                  </h2>
                  <Button variant="ghost" size="icon" type="button">
                    {expandedSection === "supportingEvidence" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                {expandedSection === "supportingEvidence" && (
                  <div className="pt-4 space-y-6 animate-fade-in">
                    <div className="border-2 border-dashed border-legal-200 rounded-lg p-6 text-center">
                      <FileText className="h-10 w-10 mx-auto mb-4 text-legal-400" />
                      <h3 className="text-lg font-medium text-legal-800 mb-2">Upload Supporting Documents</h3>
                      <p className="text-legal-500 mb-4">
                        Upload legal documents, property papers, agreements, or any other evidence that could strengthen your case analysis.
                      </p>
                      
                      <div className="flex flex-col items-center">
                        <label htmlFor="file-upload" className={cn(
                          "cursor-pointer inline-flex items-center",
                          isUploading ? "opacity-50 cursor-not-allowed" : ""
                        )}>
                          <Button 
                            type="button" 
                            disabled={isUploading}
                            className="flex items-center space-x-2"
                          >
                            {isUploading ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white mr-2" />
                            ) : (
                              <Upload className="h-4 w-4 mr-2" />
                            )}
                            {isUploading ? "Uploading..." : "Upload Files"}
                          </Button>
                          <input
                            id="file-upload"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            disabled={isUploading}
                          />
                        </label>
                        <p className="text-xs text-legal-500 mt-2">
                          Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                        </p>
                      </div>
                    </div>

                    {/* Display uploaded files */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-3 animate-fade-in">
                        <h3 className="font-medium text-legal-800">Uploaded Documents</h3>
                        <ul className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <li 
                              key={`${file.name}-${index}`} 
                              className="flex justify-between items-center p-3 bg-legal-50 rounded-md"
                            >
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-legal-500 mr-2" />
                                <span className="text-sm text-legal-700 truncate max-w-xs">{file.name}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="text-legal-500 hover:text-destructive"
                              >
                                Remove
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Separator />

              {/* Consent and Submit */}
              <div className="pt-2">
                <FormField
                  control={form.control}
                  name="consentToAnalyze"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          I consent to AI analysis of my case details
                        </FormLabel>
                        <FormDescription className="text-xs">
                          By checking this box, you consent to our AI system analyzing your case data for predicting outcomes.
                          Your information is processed securely and not shared with third parties.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="mt-8 flex flex-col md:flex-row justify-end gap-4">
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                  <Button 
                    type="submit" 
                    className="relative overflow-hidden group"
                    disabled={isSubmitting || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
                        <span className="flex items-center">
                          <BarChart3 className="mr-2 h-4 w-4 animate-pulse" />
                          Analyzing your case...
                        </span>
                      </>
                    ) : (
                      <span className="flex items-center">
                        Get AI Analysis
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass-card rounded-lg p-6 transition-all duration-300 hover:shadow-lg animate-fade-in">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-legal-900">Estimated Timeline</h3>
            <p className="text-legal-600 text-sm">
              Get an accurate prediction of your case duration based on historical data from similar cases.
            </p>
          </div>
          
          <div className="glass-card rounded-lg p-6 transition-all duration-300 hover:shadow-lg animate-fade-in delay-100">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-legal-900">Success Probability</h3>
            <p className="text-legal-600 text-sm">
              View the statistical likelihood of different outcomes based on AI analysis of your case details.
            </p>
          </div>
          
          <div className="glass-card rounded-lg p-6 transition-all duration-300 hover:shadow-lg animate-fade-in delay-200">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-legal-900">Alternative Solutions</h3>
            <p className="text-legal-600 text-sm">
              Discover faster, more cost-effective alternatives to lengthy court proceedings for your situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeCase;
