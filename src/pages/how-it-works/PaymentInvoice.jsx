import React from "react";
import { Link } from "react-router-dom";

export default function PaymentInvoice() {
  const items = [
    { title: "Payment Methods", desc: "Mobile Money, Bank Transfer, and other available options." },
    { title: "Invoice & Receipt", desc: "After payment, you receive invoice + receipt for your records." },
    { title: "Refund Policy", desc: "Refund depends on service stage. Check refund policy page for full details." },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <Link to="/how-it-works" className="hover:underline">How It Works</Link> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Payment & Invoice</span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900">
          Payment & Invoice
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Clear payments, transparent invoices, and proper records.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {items.map((x) => (
            <div key={x.title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-extrabold text-gray-900">{x.title}</div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{x.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="text-sm font-extrabold text-gray-900">Need help with payment?</div>
          <p className="mt-2 text-sm text-gray-700">
            Contact support and we will guide you step-by-step.
          </p>
        </div>
      </div>
    </div>
  );
}