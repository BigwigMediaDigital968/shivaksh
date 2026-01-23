"use client";

import { useState } from "react";
import Enquire from "../../../components/EnquiryForm";
import Image from "next/image";
import Webloader from "../../../components/WebLoader"

export default function SellPropertyPage() {
  const [loading, SetLoading] = useState(false);

  if(loading){
    return(
      <div className="min-h-screen flex items-center text-center justify-center bg-cover bg-center">
        <Webloader />
      </div>
    )
  }
  return (
    <div className="min-h-screen">
      {/* FULL PAGE BACKGROUND */}
      <section
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* CONTENT */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT CONTENT */}
            <div className="text-white bg-black/50 p-6 rounded-lg">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold leading-tight">
                Sell Your Property <br />
                With Absolute Confidence
              </h1>

              <p className="mt-6 text-lg text-white/90 max-w-xl leading-relaxed ">
                A professionally managed selling experience designed to maximize
                your property’s value. From pricing and marketing to negotiation
                and closure handled with precision and transparency.
              </p>

              <div className="mt-8 space-y-4 text-white/90 ">
                <p>✔ Market-aligned pricing strategy</p>
                <p>✔ Verified buyer outreach & controlled site visits</p>
                <p>✔ Professional negotiation support</p>
                <p>✔ End-to-end documentation & closure assistance</p>
              </div>

              <p className="mt-10 text-sm text-white/70 max-w-md">
                Trusted by homeowners who value clarity, reliability, and results.
              </p>
            </div>

            {/* RIGHT – ENQUIRY FORM */}
            <div className=" rounded-3xl shadow-2xl p-8 md:p-10 ml-5s">
              {/* <h2 className="text-3xl md:text-4xl text-black font-heading font-semibold text-center mb-6">
                List Your Property
              </h2>

              <p className="text-center text-black/80 mb-8">
                Share your details and our property expert will contact you shortly.
              </p> */}

              <Enquire />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
