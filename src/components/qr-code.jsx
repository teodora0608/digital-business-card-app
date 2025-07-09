import React from "react";

const QrCode = ({ url, size = "200x200", color = "0-0-0", format = "png" }) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    url
  )}&size=${size}&color=${color}&format=${format}`;

  return (
    <img
      src={qrUrl}
      alt="QR code"
      width={size.split("x")[0]}
      height={size.split("x")[1]}
    />
  );
};

export default QrCode;