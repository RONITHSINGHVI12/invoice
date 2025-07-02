import { useState } from "react";
import { FileText } from "lucide-react";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  businessName: string;
  businessAddress: string;
  lineItems: LineItem[];
  taxRate: number;
  notes: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'preview'>('form');
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  const handlePreview = (data: InvoiceData) => {
    setInvoiceData(data);
    setCurrentView('preview');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-invoice-navy">InvoiceMaker</h1>
              <p className="text-invoice-gray">Professional invoice creation</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === 'form' ? (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-invoice-navy mb-2">Create New Invoice</h2>
              <p className="text-invoice-gray">Fill in the details below to generate your professional invoice.</p>
            </div>
            <InvoiceForm onPreview={handlePreview} />
          </div>
        ) : (
          invoiceData && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-invoice-navy mb-2">Invoice Preview</h2>
                <p className="text-invoice-gray">Review your invoice before sending or downloading.</p>
              </div>
              <InvoicePreview invoiceData={invoiceData} onBack={handleBackToForm} />
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default Index;
