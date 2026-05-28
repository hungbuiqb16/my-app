"use client";

import { useState } from "react";
import Image from "next/image";

// ─── Asset URLs from Figma (valid for 7 days) ────────────────────────────────
const IMG_HERO_BG       = "https://www.figma.com/api/mcp/asset/156f5f1d-2136-43fa-b5b2-7686805e49b2";
const IMG_HERO_OVERLAY  = "https://www.figma.com/api/mcp/asset/933201ca-fc1d-442a-a06e-8c87385e47f8";
const IMG_FOOD_BOWL     = "https://www.figma.com/api/mcp/asset/705ef27d-7bf6-4d87-9f5f-c8ce933cdf70";
const IMG_LOGO_ICON     = "https://www.figma.com/api/mcp/asset/17738114-a8cc-467c-9146-2410ad390fe1";
const IMG_STEP_LOCATION = "https://www.figma.com/api/mcp/asset/8527b6a8-190c-4f47-8a21-62d728c93cf2";
const IMG_STEP_MENU     = "https://www.figma.com/api/mcp/asset/0d88074d-d4e3-4599-974f-be59f6f62994";
const IMG_STEP_INVOICE  = "https://www.figma.com/api/mcp/asset/cc23a4a3-905d-4fe9-b4fc-74454c6bfe9c";
const IMG_STEP_DONUT    = "https://www.figma.com/api/mcp/asset/ca845ef5-7c2e-4c58-a819-a77f6d4cdbc3";

// ─── Data ─────────────────────────────────────────────────────────────────────
const flashDeals = [
  { name: "Chicken Burger",   category: "Fast Food", discount: "40%", price: "$8.99",  original: "$14.99", emoji: "🍔", color: "#FF7A7A" },
  { name: "Pad Thai",         category: "Thai",      discount: "30%", price: "$7.49",  original: "$10.69", emoji: "🍜", color: "#FFB30E" },
  { name: "Margherita Pizza", category: "Italian",   discount: "25%", price: "$9.99",  original: "$13.29", emoji: "🍕", color: "#F17228" },
  { name: "Sushi Box",        category: "Japanese",  discount: "35%", price: "$12.99", original: "$19.99", emoji: "🍱", color: "#FF7A7A" },
];

const popularItems = [
  { name: "Ramen Bowl",      restaurant: "Pho Saigon",   rating: 4.8, price: "$12.99", emoji: "🍜" },
  { name: "Beef Burger",     restaurant: "Burger House", rating: 4.7, price: "$9.99",  emoji: "🍔" },
  { name: "Fried Rice",      restaurant: "Dragon Palace",rating: 4.6, price: "$8.49",  emoji: "🍚" },
  { name: "Sushi Roll",      restaurant: "Tokyo Bites",  rating: 4.9, price: "$14.99", emoji: "🍣" },
  { name: "Pepperoni Pizza", restaurant: "Pizza Corner", rating: 4.5, price: "$11.99", emoji: "🍕" },
];

const restaurants = [
  { name: "The Burger Lab", cuisine: "American",   rating: 4.8, delivery: "20-30 min", minOrder: "$5",  emoji: "🍔" },
  { name: "Pho Saigon",     cuisine: "Vietnamese", rating: 4.7, delivery: "25-35 min", minOrder: "$8",  emoji: "🍜" },
  { name: "Tokyo Garden",   cuisine: "Japanese",   rating: 4.9, delivery: "30-40 min", minOrder: "$10", emoji: "🍱" },
  { name: "Bella Italia",   cuisine: "Italian",    rating: 4.6, delivery: "20-30 min", minOrder: "$7",  emoji: "🍕" },
  { name: "Spice Route",    cuisine: "Indian",     rating: 4.7, delivery: "25-35 min", minOrder: "$6",  emoji: "🍛" },
  { name: "Dragon Palace",  cuisine: "Chinese",    rating: 4.5, delivery: "20-25 min", minOrder: "$5",  emoji: "🥟" },
  { name: "The Plant Cafe", cuisine: "Vegan",      rating: 4.8, delivery: "15-25 min", minOrder: "$8",  emoji: "🥗" },
  { name: "Noah's Bagels",  cuisine: "Bakery",     rating: 4.6, delivery: "10-20 min", minOrder: "$4",  emoji: "🥯" },
];

const categories = [
  { name: "Pizza",   emoji: "🍕", bg: "#FFF3E0" },
  { name: "Burger",  emoji: "🍔", bg: "#FFF8E1" },
  { name: "Sushi",   emoji: "🍣", bg: "#E8F5E9" },
  { name: "Chinese", emoji: "🥟", bg: "#F3E5F5" },
  { name: "Italian", emoji: "🍝", bg: "#E3F2FD" },
  { name: "Indian",  emoji: "🍛", bg: "#FCE4EC" },
];

const detailCards = [
  {
    emoji: "🛵",
    title: "Fast & Reliable Delivery",
    body: "Our dedicated team of delivery partners ensures your food arrives fresh and on time, every time. Track your order in real-time.",
    tag: "Delivery",
    color: "#FFB30E",
  },
  {
    emoji: "⭐",
    title: "Only the Best Restaurants",
    body: "We partner with top-rated local restaurants to bring you the finest dining experience delivered straight to your door.",
    tag: "Quality",
    color: "#F17228",
  },
  {
    emoji: "💳",
    title: "Safe & Easy Payments",
    body: "Multiple secure payment options available including credit cards, digital wallets, and cash on delivery for your convenience.",
    tag: "Payment",
    color: "#FF7A7A",
  },
];

const topCities = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <span className="text-sm">
      <span style={{ color: "#FFB30E" }}>{"★".repeat(full)}</span>
      <span style={{ color: "#DDDDDD" }}>{"★".repeat(5 - full)}</span>
      <span style={{ color: "#757575", marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav
      className="w-full bg-white px-5 lg:px-24 py-4 flex items-center justify-between sticky top-0 z-50"
      style={{ boxShadow: "0px 5px 5px rgba(255,174,0,0.26), 0px 20px 20px rgba(255,174,0,0.29)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <Image src={IMG_LOGO_ICON} alt="" width={28} height={30} unoptimized />
        <span style={{ fontFamily: "var(--font-source-sans)", fontSize: 26, fontWeight: 700, lineHeight: 1 }}>
          <span style={{ color: "#F17228" }}>food</span>
          <span style={{ color: "#FFB30E" }}>wa</span>
          <span style={{ color: "#FFB30E", fontWeight: 900 }}>G</span>
          <span style={{ color: "#FFB30E" }}>on</span>
        </span>
      </div>

      {/* Deliver address */}
      <div className="hidden md:flex items-center gap-2 text-[#424242] text-sm">
        <span style={{ fontFamily: "var(--font-source-sans)", fontWeight: 700 }}>Deliver to:</span>
        <span style={{ color: "#FFB30E" }}>📍</span>
        <span style={{ color: "#424242" }}>Current Location</span>
        <span style={{ fontFamily: "var(--font-open-sans)", fontWeight: 700, color: "#424242" }}>
          Mohammadpur Bus Stand, Dhaka
        </span>
      </div>

      {/* Search + Login */}
      <div className="flex items-center gap-5">
        <div className="hidden sm:flex items-center gap-2 text-sm cursor-pointer" style={{ color: "#424242" }}>
          <span style={{ color: "#FFB30E" }}>🔍</span>
          <span style={{ fontFamily: "var(--font-source-sans)", fontWeight: 700 }}>Search Food</span>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-3 rounded-lg text-white text-sm font-bold"
          style={{
            background: "linear-gradient(92.52deg, #FFB800 47.722%, #FF8A00 136.81%)",
            fontFamily: "var(--font-source-sans)",
            boxShadow: "0px 5px 5px rgba(255,174,0,0.26), 0px 20px 20px rgba(255,174,0,0.29)",
          }}
        >
          <span>👤</span> Login
        </button>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery");

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 620 }}>
      {/* Base yellow */}
      <div className="absolute inset-0" style={{ background: "#FFB30E" }} />

      {/* BG texture */}
      <div className="absolute inset-0">
        <Image src={IMG_HERO_BG} alt="" fill className="object-cover" unoptimized />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0">
        <Image src={IMG_HERO_OVERLAY} alt="" fill className="object-cover" unoptimized />
      </div>

      <div className="relative z-10 max-w-[1480px] mx-auto px-5 lg:px-0 flex items-center min-h-[620px] py-20">
        {/* Text + card */}
        <div className="flex flex-col gap-8 w-full max-w-[856px]">
          <div className="flex flex-col gap-4">
            <h1
              style={{
                fontFamily: "var(--font-source-sans)",
                fontSize: "clamp(42px, 5.5vw, 88px)",
                fontWeight: 700,
                lineHeight: 1,
                color: "#fff",
                textShadow: "0px 27px 82px rgba(255,174,0,0.28)",
              }}
            >
              Are you starving?
            </h1>
            <p style={{ fontFamily: "var(--font-source-sans)", fontSize: 22, color: "#504f4f", lineHeight: 1.2, maxWidth: 532 }}>
              Within a few clicks, find meals that are accessible near you
            </p>
          </div>

          {/* Order card */}
          <div
            className="bg-white rounded-2xl overflow-hidden w-full"
            style={{ boxShadow: "0px 5px 5px rgba(255,174,0,0.26), 0px 20px 20px rgba(255,174,0,0.29)" }}
          >
            {/* Tabs */}
            <div className="flex gap-2 p-6 border-b border-[#EEEEEE]">
              {(["delivery", "pickup"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-base font-bold transition-all"
                  style={{
                    fontFamily: "var(--font-source-sans)",
                    background: activeTab === tab ? "rgba(241,114,40,0.1)" : "transparent",
                    color: activeTab === tab ? "#F17228" : "#757575",
                    lineHeight: 1,
                  }}
                >
                  {tab === "delivery" ? "🛵" : "🛍️"}{" "}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Input row */}
            <div className="flex flex-col sm:flex-row gap-4 p-6 items-stretch sm:items-center">
              <div
                className="flex flex-1 items-center gap-3 rounded-lg px-4 py-3"
                style={{ background: "#F5F5F5" }}
              >
                <span style={{ color: "#FF7474", fontSize: 24 }}>📍</span>
                <input
                  type="text"
                  placeholder="Enter Your Address"
                  className="flex-1 bg-transparent outline-none text-base"
                  style={{ fontFamily: "var(--font-open-sans)", color: "#9E9E9E" }}
                />
              </div>
              <button
                className="flex items-center justify-center gap-2 px-10 py-4 rounded-lg text-white font-bold text-lg whitespace-nowrap"
                style={{
                  background: "linear-gradient(108.36deg, #FF7A7A 39.641%, #F65900 135.31%)",
                  fontFamily: "var(--font-source-sans)",
                }}
              >
                🔍 Find Food
              </button>
            </div>
          </div>
        </div>

        {/* Food bowl image */}
        <div className="absolute right-0 bottom-0 top-0 hidden lg:flex items-center pr-12">
          <div className="relative" style={{ width: 500, height: 500 }}>
            <Image src={IMG_FOOD_BOWL} alt="Delicious food" fill className="object-contain" unoptimized />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Flash Deals ──────────────────────────────────────────────────────────────
function FlashDeals() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1480px] mx-auto px-5">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h2 style={{ fontFamily: "var(--font-source-sans)", fontSize: 32, fontWeight: 700, color: "#424242" }}>
              Flash Deals
            </h2>
            <span
              className="text-xs font-bold text-white px-3 py-1 rounded-full"
              style={{ background: "linear-gradient(108.36deg, #FF7A7A 39.641%, #F65900 135.31%)" }}
            >
              ⚡ Limited Time
            </span>
          </div>
          <button style={{ color: "#F17228", fontFamily: "var(--font-source-sans)", fontWeight: 700, fontSize: 14 }}>
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDeals.map((deal) => (
            <div
              key={deal.name}
              className="rounded-2xl overflow-hidden bg-white cursor-pointer hover:scale-[1.02] transition-transform"
              style={{ boxShadow: "0px 5px 40px rgba(255,174,0,0.18)" }}
            >
              <div
                className="h-48 flex items-center justify-center relative"
                style={{ background: `${deal.color}18` }}
              >
                <span style={{ fontSize: 72 }}>{deal.emoji}</span>
                <span
                  className="absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded-full"
                  style={{ background: deal.color }}
                >
                  {deal.discount} OFF
                </span>
              </div>
              <div className="p-5">
                <p style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 4 }}>{deal.category}</p>
                <h3 style={{ fontFamily: "var(--font-source-sans)", fontWeight: 700, color: "#424242", fontSize: 20, marginBottom: 10 }}>
                  {deal.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span style={{ color: "#F17228", fontWeight: 700, fontSize: 22 }}>{deal.price}</span>
                  <span style={{ color: "#9E9E9E", textDecoration: "line-through", fontSize: 14 }}>{deal.original}</span>
                </div>
                <button
                  className="mt-4 w-full py-2.5 rounded-lg text-white text-sm font-bold"
                  style={{ background: "linear-gradient(108.36deg, #FF7A7A 39.641%, #F65900 135.31%)" }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How Does It Work ─────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { img: IMG_STEP_LOCATION, title: "Select location", desc: "Choose the location where your food will be delivered." },
    { img: IMG_STEP_MENU,     title: "Choose order",   desc: "Check over hundreds of menus to pick your favorite food" },
    { img: IMG_STEP_INVOICE,  title: "Pay advanced",   desc: "It's quick, safe, and simple. Select several methods of payment" },
    { img: IMG_STEP_DONUT,    title: "Enjoy meals",    desc: "Food is made and delivered directly to your home." },
  ];

  return (
    <section
      className="py-20"
      style={{ background: "linear-gradient(180deg, rgba(255,206,103,0.22) 42.471%, rgba(253,237,202,0) 100%)" }}
    >
      <div className="max-w-[1480px] mx-auto px-5 flex flex-col items-center gap-16">
        <h2
          style={{
            fontFamily: "var(--font-source-sans)",
            fontSize: 43,
            fontWeight: 700,
            color: "#F17228",
            lineHeight: 1.12,
            textAlign: "center",
          }}
        >
          How does it work
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 w-full">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center gap-6 text-center">
              <div
                style={{
                  width: 112,
                  height: 112,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  filter: "drop-shadow(0px 20px 40px rgba(255,174,0,0.29)) drop-shadow(0px 5px 10px rgba(255,174,0,0.26))",
                }}
              >
                <Image src={step.img} alt={step.title} width={112} height={112} unoptimized />
              </div>
              <div className="flex flex-col gap-2">
                <p style={{ fontFamily: "var(--font-source-sans)", fontSize: 22, fontWeight: 700, color: "#434343", lineHeight: 1.2 }}>
                  {step.title}
                </p>
                <p style={{ fontFamily: "var(--font-open-sans)", fontSize: 18, color: "#9E9E9E", lineHeight: 1.4 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Popular Items ────────────────────────────────────────────────────────────
function PopularItems() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1480px] mx-auto px-5">
        <div className="flex items-center justify-between mb-10">
          <h2 style={{ fontFamily: "var(--font-source-sans)", fontSize: 32, fontWeight: 700, color: "#424242" }}>
            Popular Items
          </h2>
          <div className="flex gap-3">
            {["←", "→"].map((arrow) => (
              <button
                key={arrow}
                className="w-[76px] h-[76px] rounded-full flex items-center justify-center text-xl font-bold transition-colors"
                style={{
                  border: "2px solid #FFB30E",
                  color: "#FFB30E",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#FFB30E";
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "#FFB30E";
                }}
              >
                {arrow}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {popularItems.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl overflow-hidden bg-white cursor-pointer hover:scale-[1.02] transition-transform"
              style={{ boxShadow: "0px 5px 40px rgba(255,174,0,0.15)" }}
            >
              <div className="h-44 flex items-center justify-center" style={{ background: "#FFF8E1" }}>
                <span style={{ fontSize: 64 }}>{item.emoji}</span>
              </div>
              <div className="p-4">
                <h3 style={{ fontFamily: "var(--font-source-sans)", fontWeight: 700, color: "#424242", marginBottom: 4 }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: 12, color: "#9E9E9E", marginBottom: 8 }}>{item.restaurant}</p>
                <div className="flex items-center justify-between">
                  <StarRating rating={item.rating} />
                  <span style={{ color: "#F17228", fontWeight: 700, fontSize: 14 }}>{item.price}</span>
                </div>
                <button
                  className="mt-3 w-full py-2 rounded-lg text-white text-xs font-bold"
                  style={{ background: "linear-gradient(108.36deg, #FF7A7A 39.641%, #F65900 135.31%)" }}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Restaurant ──────────────────────────────────────────────────────
function FeaturedRestaurant() {
  return (
    <section className="py-16" style={{ background: "#FFFDF5" }}>
      <div className="max-w-[1480px] mx-auto px-5">
        <h2
          className="text-center mb-10"
          style={{ fontFamily: "var(--font-source-sans)", fontSize: 32, fontWeight: 700, color: "#424242" }}
        >
          Featured Restaurant
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {restaurants.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl overflow-hidden bg-white cursor-pointer hover:scale-[1.02] transition-transform"
              style={{ boxShadow: "0px 5px 40px rgba(255,174,0,0.12)" }}
            >
              <div className="h-36 flex items-center justify-center" style={{ background: "#FFF3E0" }}>
                <span style={{ fontSize: 48 }}>{r.emoji}</span>
              </div>
              <div className="p-4">
                <h3 style={{ fontFamily: "var(--font-source-sans)", fontWeight: 700, color: "#424242", marginBottom: 4 }}>
                  {r.name}
                </h3>
                <p style={{ fontSize: 12, color: "#9E9E9E", marginBottom: 8 }}>{r.cuisine}</p>
                <div style={{ marginBottom: 8 }}>
                  <StarRating rating={r.rating} />
                </div>
                <div className="flex items-center justify-between" style={{ fontSize: 12, color: "#757575" }}>
                  <span>🕐 {r.delivery}</span>
                  <span>Min: {r.minOrder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            className="flex items-center gap-2 px-8 py-4 rounded-lg text-white font-bold"
            style={{
              background: "linear-gradient(108.36deg, #FF7A7A 39.641%, #F65900 135.31%)",
              fontFamily: "var(--font-source-sans)",
            }}
          >
            View All Restaurants →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Search by Food ───────────────────────────────────────────────────────────
function SearchByFood() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1480px] mx-auto px-5">
        <div className="flex items-center justify-between mb-10">
          <h2 style={{ fontFamily: "var(--font-source-sans)", fontSize: 32, fontWeight: 700, color: "#424242" }}>
            Search by Food
          </h2>
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-1 text-sm font-bold"
              style={{ color: "#F17228", fontFamily: "var(--font-source-sans)" }}
            >
              View All →
            </button>
            <div className="flex gap-2">
              {["←", "→"].map((arrow) => (
                <button
                  key={arrow}
                  className="w-[76px] h-[76px] rounded-full flex items-center justify-center text-xl font-bold transition-colors"
                  style={{ border: "2px solid #FFB30E", color: "#FFB30E", background: "transparent" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#FFB30E";
                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "#FFB30E";
                  }}
                >
                  {arrow}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex flex-col items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
            >
              <div
                className="w-[218px] max-w-full aspect-square rounded-2xl flex items-center justify-center"
                style={{
                  background: cat.bg,
                  boxShadow: "0px 5px 20px rgba(0,0,0,0.08)",
                  maxHeight: 218,
                }}
              >
                <span style={{ fontSize: 56 }}>{cat.emoji}</span>
              </div>
              <span style={{ fontFamily: "var(--font-source-sans)", fontWeight: 700, color: "#424242", fontSize: 16 }}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    { icon: "🚀", title: "Free Delivery",    desc: "Enjoy free delivery on your first order over $20" },
    { icon: "🔒", title: "Secure Payment",   desc: "100% secure payment methods available" },
    { icon: "🎁", title: "Best Offers",      desc: "Exclusive daily deals and seasonal discounts" },
  ];

  return (
    <section className="py-16" style={{ background: "#FFFDF5" }}>
      <div className="max-w-[1480px] mx-auto px-5">
        <div
          className="rounded-2xl px-10 py-12 flex flex-col sm:flex-row items-center justify-between gap-8 bg-white"
          style={{ boxShadow: "0px 5px 40px rgba(255,174,0,0.12)" }}
        >
          {features.map((f, i) => (
            <div key={f.title} className="flex items-center gap-6 flex-1">
              <div
                className="shrink-0 w-[136px] h-[136px] rounded-full flex items-center justify-center text-5xl"
                style={{
                  background: "linear-gradient(135deg, #FFECE0 0%, #FFF3D0 100%)",
                  boxShadow: "0px 5px 20px rgba(255,174,0,0.2)",
                }}
              >
                {f.icon}
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-source-sans)", fontWeight: 700, fontSize: 22, color: "#424242", marginBottom: 6 }}>
                  {f.title}
                </p>
                <p style={{ fontFamily: "var(--font-open-sans)", fontSize: 16, color: "#9E9E9E", lineHeight: 1.4 }}>
                  {f.desc}
                </p>
              </div>
              {i < features.length - 1 && (
                <div className="hidden sm:block w-px h-24 mx-4 shrink-0" style={{ background: "#EEEEEE" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── App Download ─────────────────────────────────────────────────────────────
function AppDownload() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#FFF8E1" }}>
      {/* Decorative circles */}
      <div
        className="absolute -left-24 -bottom-24 rounded-full opacity-20 pointer-events-none"
        style={{ width: 400, height: 400, background: "#FFB30E" }}
      />
      <div
        className="absolute -right-24 -top-24 rounded-full opacity-10 pointer-events-none"
        style={{ width: 320, height: 320, background: "#F17228" }}
      />

      <div className="max-w-[1480px] mx-auto px-5 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        {/* Phone mockup */}
        <div className="flex-1 flex justify-center">
          <div
            className="relative"
            style={{
              width: 260,
              height: 520,
              borderRadius: 40,
              background: "#1a1a2e",
              boxShadow: "0 30px 80px rgba(0,0,0,0.3), 0 0 0 2px #333",
              overflow: "hidden",
            }}
          >
            {/* Screen */}
            <div
              className="absolute"
              style={{ inset: 8, borderRadius: 32, background: "#fff", overflow: "hidden" }}
            >
              <div
                className="flex items-center justify-between px-4"
                style={{ height: 32, background: "#FFB30E" }}
              >
                <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>9:41</span>
                <span style={{ color: "#fff", fontSize: 10 }}>●●●</span>
              </div>
              <div className="p-3" style={{ background: "#FFFDF5" }}>
                <div
                  className="rounded-xl p-3 mb-3"
                  style={{ background: "#FFB30E" }}
                >
                  <p style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>foodWaGon</p>
                  <p style={{ color: "#fff", fontSize: 9, marginTop: 2 }}>Order your favorite food</p>
                </div>
                {[
                  { emoji: "🍔", name: "Burger House",  time: "20-30 min", rating: "4.8" },
                  { emoji: "🍜", name: "Pho Saigon",    time: "25-35 min", rating: "4.7" },
                  { emoji: "🍕", name: "Pizza Corner",  time: "15-25 min", rating: "4.5" },
                ].map((r) => (
                  <div
                    key={r.name}
                    className="flex items-center gap-2 bg-white rounded-lg p-2 mb-2"
                    style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                  >
                    <span style={{ fontSize: 18 }}>{r.emoji}</span>
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 700, color: "#424242" }}>{r.name}</p>
                      <p style={{ fontSize: 9, color: "#9E9E9E" }}>{r.time} • ⭐ {r.rating}</p>
                    </div>
                  </div>
                ))}
                <button
                  className="w-full py-2 rounded-lg text-white text-xs font-bold mt-2"
                  style={{ background: "linear-gradient(108.36deg, #FF7A7A 39.641%, #F65900 135.31%)" }}
                >
                  Order Now 🛵
                </button>
              </div>
            </div>
            {/* Notch */}
            <div
              className="absolute z-10"
              style={{ top: 16, left: "50%", transform: "translateX(-50%)", width: 90, height: 18, background: "#1a1a2e", borderRadius: "0 0 12px 12px" }}
            />
          </div>
        </div>

        {/* Text + download buttons */}
        <div className="flex-1 max-w-[432px]">
          <h2
            style={{
              fontFamily: "var(--font-source-sans)",
              fontSize: "clamp(28px, 3vw, 48px)",
              fontWeight: 700,
              color: "#424242",
              lineHeight: 1.2,
              marginBottom: 20,
            }}
          >
            Download Our App &amp; Get Your Delivery Faster!
          </h2>
          <p style={{ fontFamily: "var(--font-open-sans)", fontSize: 18, color: "#9E9E9E", lineHeight: 1.5, marginBottom: 32 }}>
            Get the best food delivery experience on your smartphone. Available on iOS and Android – track orders, browse restaurants, and pay with ease.
          </p>

          <div className="flex flex-wrap gap-4">
            {[
              { icon: "▶", top: "GET IT ON", bottom: "Google Play" },
              { icon: "🍎", top: "DOWNLOAD ON THE", bottom: "App Store" },
            ].map((btn) => (
              <button
                key={btn.bottom}
                className="flex items-center gap-3 px-5 py-3 rounded-xl text-white"
                style={{ background: "#424242" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#333"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#424242"; }}
              >
                <span style={{ fontSize: 22 }}>{btn.icon}</span>
                <div className="text-left">
                  <p style={{ fontSize: 10, opacity: 0.7 }}>{btn.top}</p>
                  <p style={{ fontWeight: 700, fontSize: 14 }}>{btn.bottom}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Details ──────────────────────────────────────────────────────────────────
function Details() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1480px] mx-auto px-5">
        <h2
          className="text-center mb-10"
          style={{ fontFamily: "var(--font-source-sans)", fontSize: 32, fontWeight: 700, color: "#424242" }}
        >
          Why Choose FoodWagon?
        </h2>

        <div className="flex flex-col gap-8">
          {detailCards.map((d, i) => (
            <div
              key={d.title}
              className={`flex flex-col lg:flex-row items-center rounded-2xl overflow-hidden ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              style={{ background: "#FFFDF5", boxShadow: "0px 5px 40px rgba(255,174,0,0.10)" }}
            >
              <div
                className="lg:w-1/2 flex items-center justify-center"
                style={{ minHeight: 200, background: `${d.color}15`, fontSize: 80 }}
              >
                <span className="py-10 px-16">{d.emoji}</span>
              </div>
              <div className="lg:w-1/2 p-10">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full text-white inline-block mb-4"
                  style={{ background: d.color }}
                >
                  {d.tag}
                </span>
                <h3
                  style={{ fontFamily: "var(--font-source-sans)", fontSize: 28, fontWeight: 700, color: "#424242", marginBottom: 16 }}
                >
                  {d.title}
                </h3>
                <p style={{ fontFamily: "var(--font-open-sans)", fontSize: 18, color: "#757575", lineHeight: 1.6 }}>
                  {d.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(108.36deg, #FF7A7A 0%, #F65900 100%)" }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{ width: 500, height: 500, background: "#fff", top: 0, left: 0, transform: "translate(-40%, -40%)" }}
        />
        <div
          className="absolute rounded-full"
          style={{ width: 400, height: 400, background: "#fff", bottom: 0, right: 0, transform: "translate(30%, 30%)" }}
        />
      </div>

      <div className="max-w-[728px] mx-auto px-5 relative z-10 text-center">
        <h2
          style={{
            fontFamily: "var(--font-source-sans)",
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          Get Delicious Food at Your Doorstep
        </h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, marginBottom: 40, lineHeight: 1.5 }}>
          Order from your favorite restaurants and get food delivered fast. Available 24/7.
        </p>
        <button
          className="px-10 py-4 rounded-xl font-bold text-xl"
          style={{
            background: "#fff",
            color: "#F65900",
            fontFamily: "var(--font-source-sans)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#FFF8E1"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#fff"; }}
        >
          Order Now →
        </button>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const footerLinks: Record<string, string[]> = {
    Company:         ["About Us", "Careers", "Blog", "Press"],
    Legal:           ["Privacy Policy", "Terms of Use", "Cookie Policy"],
    "Help & Support": ["FAQ", "Contact Us", "Order Tracking", "Report an Issue"],
  };

  return (
    <footer style={{ background: "#1a1a2e", color: "#fff" }} className="pt-16 pb-8">
      <div className="max-w-[1480px] mx-auto px-5">

        {/* Top Cities */}
        <div className="mb-12">
          <h3
            style={{ fontFamily: "var(--font-source-sans)", fontSize: 18, fontWeight: 700, color: "#FFB30E", marginBottom: 24 }}
          >
            Our Top Cities
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {topCities.map((city) => (
              <div key={city}>
                <p style={{ fontWeight: 700, color: "#fff", marginBottom: 12, fontFamily: "var(--font-source-sans)" }}>
                  {city}
                </p>
                {["Old Town", "New Market", "City Center"].map((area) => (
                  <p
                    key={area}
                    className="text-sm mb-2 cursor-pointer transition-colors hover:text-yellow-400"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {area}, {city}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginBottom: 48 }} />

        {/* Brand + Menus */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src={IMG_LOGO_ICON} alt="" width={24} height={24} unoptimized />
              <span style={{ fontFamily: "var(--font-source-sans)", fontSize: 20, fontWeight: 700 }}>
                <span style={{ color: "#F17228" }}>food</span>
                <span style={{ color: "#FFB30E" }}>waGon</span>
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>
              Delivering happiness to your doorstep. Fast, fresh, and always delicious.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 style={{ fontFamily: "var(--font-source-sans)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
                {group}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li
                    key={link}
                    className="text-sm cursor-pointer transition-colors hover:text-yellow-400"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social + Subscription */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div>
            <h4 style={{ fontFamily: "var(--font-source-sans)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              Follow Us
            </h4>
            <div className="flex gap-3">
              {[{ label: "f" }, { label: "𝕏" }, { label: "in" }].map(({ label }) => (
                <button
                  key={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#FFB30E";
                    (e.currentTarget as HTMLButtonElement).style.color = "#FFB30E";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: "var(--font-source-sans)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              Subscribe to our newsletter
            </h4>
            <div className="flex gap-3">
              <div
                className="flex-1 flex items-center gap-2 rounded-lg px-4 py-3"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <span style={{ color: "#FFB30E" }}>✉</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                />
              </div>
              <button
                className="px-6 py-3 rounded-lg font-bold text-white text-sm"
                style={{ background: "linear-gradient(108.36deg, #FF7A7A 39.641%, #F65900 135.31%)" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginBottom: 24 }} />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          <p>All rights Reserved © FoodWagon, 2024</p>
          <p>
            Made with ❤️ by <span style={{ color: "#FFB30E", fontWeight: 700 }}>ThemeWagon</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FoodWagonPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <FlashDeals />
      <HowItWorks />
      <PopularItems />
      <FeaturedRestaurant />
      <SearchByFood />
      <Features />
      <AppDownload />
      <Details />
      <CTA />
      <Footer />
    </main>
  );
}
