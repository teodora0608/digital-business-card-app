// src/pages/ProfilePage.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import BusinessCard from "../common/business-card";
import ActionButtons from "../common/action-buttons";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../api/firebase-config";
import QrCode from "../components/qr-code";

const ProfilePage = () => {
  // Theme persistence in localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const { username } = useParams();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  // fetch profile by customUrl
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "profiles"),
          where("customUrl", "==", username)
        );
        const snap = await getDocs(q);
        if (snap.empty) {
          setCardData(null);
        } else {
          const d = snap.docs[0].data();
          setCardData({
            name: d.fullName,
            email: d.email,
            jobTitle: d.jobTitle || "",
            location: d.location || "",
            bio: d.bio || "",
            phone: d.phone || "",
            website: d.website || "",
            linkedin: d.linkedin || "",
            github: d.github || "",
            customUrl: d.customUrl,
            template: d.visualTemplate || "creative",
            badges: d.badges || [],
            profileImage: d.profileImage || "",
          });
        }
      } catch (err) {
        console.error(err);
        setCardData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  const handleGenerateQR = () => setShowQr(v => !v);
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };
  const handleDownloadContact = () => {
    if (!cardData) return;
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${cardData.name}
TITLE:${cardData.jobTitle}
EMAIL:${cardData.email}
TEL:${cardData.phone}
URL:${cardData.website}
NOTE:${cardData.bio}
END:VCARD`;
    const blob = new Blob([vCard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cardData.name.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${cardData.name} – Digital Business Card`,
          text: `Check out ${cardData.name}'s card!`,
          url: window.location.href,
        })
        .catch(() => handleCopyLink());
    } else {
      handleCopyLink();
    }
  };

  const profileButtons = [
    {
      label: "Save Contact",
      onClick: handleDownloadContact,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 
               012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 
               0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      label: "Generate QR Code",
      onClick: handleGenerateQR,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h3v3H3V3zm0 8h3v3H3v-3zm8-8h3v3h-3V3zm0 
               8h3v3h-3v-3zm8-8h3v3h-3V3zm0 8h3v3h-3v-3zM3 
               19h18v2H3v-2z"
          />
        </svg>
      ),
    },
    {
      label: copied ? "Link Copied!" : "Share Profile",
      onClick: handleShare,
      icon: copied ? (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 
               9 12c0-.482-.114-.938-.316-1.342m0 
               2.684a3 3 0 110-2.684m0 2.684l6.632 
               3.316m-6.632-6l6.632-3.316m0 
               0a3 3 0 105.367-2.684 3 3 0 
               00-5.367 2.684zm0 9.316a3 3 0 
               105.367 2.684 3 3 0 
               00-5.367-2.684z"
          />
        </svg>
      ),
      extraClasses: copied
        ? "bg-green-100 text-green-700 border-green-200 border-2"
        : undefined,
    },
  ];

  // ✅ MODIFICARE: folosim linkul Netlify
  const profileUrl = `https://effulgent-sprite-fbbc2a.netlify.app/profile/${cardData?.customUrl}`;

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-r from-fuchsia-500 to-violet-600 rounded-3xl mx-auto mb-4" />
          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="text-center max-w-md px-6">
          <h1 className={isDarkMode ? "text-white" : "text-gray-900"}>
            Profile Not Found
          </h1>
          <Link
            to="/"
            className="mt-6 inline-block bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white px-6 py-3 rounded-lg"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        showShare={true}
        showGetStarted={false}
        showLogout={false}
        showProfileLink={false}
        showLogin={false} // ← ascunde Sign In
        cardData={null}
      />
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto space-y-12">
          <BusinessCard
            cardData={cardData}
            selectedBadges={cardData.badges}
            isDarkMode={isDarkMode}
            showProfilePhoto
            isClickable
            variant="standalone"
          />
          <ActionButtons buttons={profileButtons} isDarkMode={isDarkMode} />
          {showQr && (
            <div
              className={`p-6 rounded-xl border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={
                  isDarkMode ? "text-white" : "text-gray-900"
                }
              >
                QR Code
              </h3>
              <div className="flex justify-center">
                <QrCode profileUrl={profileUrl} size="200x200" />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default ProfilePage;
