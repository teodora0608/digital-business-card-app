// src/common/QrCode.jsx

const QrCode = ({
  profileUrl,
  size = "200x200",
  color = "0-0-0",
  bgColor = "255-255-255",
  format = "png",
}) => {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(
    profileUrl
  )}&color=${color}&bgcolor=${bgColor}&format=${format}`;

  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <img
          src={qrCodeUrl}
          alt="QR Code for profile"
          className="w-full h-auto"
          style={{ maxWidth: size.split("x")[0] + "px" }}
        />
      </div>
    </div>
  );
};

export default QrCode;
