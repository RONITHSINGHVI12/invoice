import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Mail } from "lucide-react";

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

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
  onBack: () => void;
}

const InvoicePreview = ({ invoiceData, onBack }: InvoicePreviewProps) => {
  const calculateSubtotal = () => {
    return invoiceData.lineItems.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = () => {
    return (calculateSubtotal() * invoiceData.taxRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex justify-between items-center print:hidden">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Edit
        </Button>
        <div className="flex space-x-2">
          <Button onClick={handlePrint} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </Button>
        </div>
      </div>

      {/* Invoice Document */}
      <Card className="print:shadow-none print:border-none">
        <CardContent className="p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-invoice-navy mb-2">INVOICE</h1>
                <div className="text-invoice-gray">
                  <p className="text-lg">{invoiceData.invoiceNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-semibold text-invoice-navy mb-2">
                  {invoiceData.businessName}
                </h2>
                <div className="text-invoice-gray whitespace-pre-line">
                  {invoiceData.businessAddress}
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Info and Bill To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-invoice-navy mb-3">Bill To:</h3>
              <div className="text-invoice-gray">
                <p className="font-semibold text-foreground mb-1">{invoiceData.clientName}</p>
                {invoiceData.clientEmail && (
                  <p className="mb-1">{invoiceData.clientEmail}</p>
                )}
                {invoiceData.clientAddress && (
                  <div className="whitespace-pre-line">{invoiceData.clientAddress}</div>
                )}
              </div>
            </div>
            <div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Invoice Date:</span>
                  <span>{formatDate(invoiceData.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Due Date:</span>
                  <span>{formatDate(invoiceData.dueDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="mb-8">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold">Description</th>
                    <th className="text-center p-4 font-semibold">Qty</th>
                    <th className="text-right p-4 font-semibold">Rate (₹)</th>
                    <th className="text-right p-4 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.lineItems.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                      <td className="p-4">{item.description}</td>
                      <td className="text-center p-4">{item.quantity}</td>
                      <td className="text-right p-4">₹{item.rate.toFixed(2)}</td>
                      <td className="text-right p-4 font-semibold">₹{item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80">
              <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                {invoiceData.taxRate > 0 && (
                  <div className="flex justify-between">
                    <span>Tax ({invoiceData.taxRate}%):</span>
                    <span className="font-semibold">₹{calculateTax().toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoiceData.notes && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-invoice-navy mb-3">Notes:</h3>
              <div className="text-invoice-gray whitespace-pre-line p-4 bg-muted/30 rounded-lg">
                {invoiceData.notes}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-invoice-gray text-sm border-t pt-6">
            <p>Thank you for your business!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicePreview;