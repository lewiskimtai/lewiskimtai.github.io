import React from "react";

const InvoicesWidget: React.FC<{
  invoices: {
    id: number;
    milestone: string;
    amount: number;
    paid: boolean;
    dateIssued: string | null;
  }[];
  projectName: string;
  currency: string;
  onMarkPaid: (id: number) => void;
  onIssueInvoice: (id: number) => void;
}> = ({ invoices, projectName, currency, onMarkPaid, onIssueInvoice }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Invoices</h3>
      <ul className="space-y-2">
        {invoices.map((invoice) => (
          <li key={invoice.id} className="flex justify-between items-center">
            <span>
              {invoice.milestone} ({currency} {invoice.amount.toFixed(2)})
            </span>
            <div>
              {invoice.dateIssued ? (
                invoice.paid ? (
                  <span className="text-green-500">Paid</span>
                ) : (
                  <>
                    <button
                      onClick={() => onMarkPaid(invoice.id)}
                      className="text-blue-500 hover:underline"
                    >
                      Mark Paid
                    </button>
                    <a
                      href={`mailto:?subject=Payment Reminder: ${projectName} - ${invoice.milestone}&body=Please send ${currency} ${invoice.amount} via bank wire transfer.`}
                      className="ml-2 text-blue-500 underline"
                    >
                      Remind via Gmail
                    </a>
                  </>
                )
              ) : (
                <button
                  onClick={() => onIssueInvoice(invoice.id)}
                  className="text-yellow-500 hover:underline"
                >
                  Issue Invoice
                </button>
              )}
              <span className="ml-2 text-gray-500">
                {invoice.dateIssued || "Not Issued"}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-gray-600">
        Payments via bank wire transfer.
      </p>
    </div>
  );
};

export default InvoicesWidget;
