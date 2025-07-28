'use client';

export default function Home() {
  const amount = 49.99;

  const handleCheckout = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });

    const { url } = await res.json();
    window.location.href = url; // Redirects to Stripe Hosted Checkout Page
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-black">
          <h1 className="text-3xl font-bold mb-4">Order Details</h1>
          <div className="mb-6">
            <p className="text-lg font-semibold">Gym Membership</p>
            <ul className="list-disc list-inside mt-2 mb-4">
              <li>Access: 24/7</li>
              <li>Duration: 1 Month</li>
              <li>Facilities: All inclusive</li>
            </ul>
            <div className="flex justify-between items-center mb-4">
              <span className="text-black">Price:</span>
              <span className="text-xl font-bold">${amount}</span>
            </div>
            <button
            onClick={handleCheckout}
            className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold"
          >
            Checkout with Stripe
          </button>
    
          </div>
        </div>
      </main>
    </div>
  );
}
// If you are seeing gray text instead of black, it may be due to Tailwind's default color palette or a global style override. 
// To ensure all text is black, you can add a global style override using a <style jsx global> block in this file: