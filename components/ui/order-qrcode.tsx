"use client";

import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

interface OrderQRCodeProps {
  orderId: string;
  orderDate: string;
  orderTime: string;
}

export function OrderQRCode({ orderId, orderDate, orderTime }: OrderQRCodeProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const qrData = JSON.stringify({
    id: orderId,
    date: orderDate,
    time: orderTime,
    restaurant: "Délice Mobile"
  });

  const downloadQRCode = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    // Créer un canvas pour convertir SVG en PNG
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Taille du canvas (plus grand pour meilleure qualité)
    const size = 800;
    canvas.width = size;
    canvas.height = size + 200; // Espace pour le texte

    // Fond blanc
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size + 200);

    // Convertir SVG en image
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      // Dessiner le QR code
      const qrSize = 600;
      const qrX = (size - qrSize) / 2;
      const qrY = 50;
      ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

      // Ajouter le texte
      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 32px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Délice Mobile", size / 2, qrY + qrSize + 60);

      ctx.font = "28px Arial";
      ctx.fillText(`Commande: ${orderId}`, size / 2, qrY + qrSize + 100);

      ctx.font = "24px Arial";
      ctx.fillStyle = "#6b7280";
      ctx.fillText(`${orderDate} à ${orderTime}`, size / 2, qrY + qrSize + 135);

      // Télécharger
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement("a");
          link.download = `commande-${orderId}.png`;
          link.href = URL.createObjectURL(blob);
          link.click();
        }
      });

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-bold text-gray-900">
          Votre QR Code de commande
        </h3>

        <div ref={qrRef} className="flex justify-center bg-white p-4 rounded-lg">
          <QRCodeSVG
            value={qrData}
            size={200}
            level="H"
            includeMargin={true}
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>

        <div className="space-y-1 text-sm text-gray-600">
          <p className="font-bold text-gray-900">{orderId}</p>
          <p>{orderDate} à {orderTime}</p>
        </div>

        <button
          onClick={downloadQRCode}
          className="w-full flex items-center justify-center gap-2 bg-brand-olive hover:bg-brand-orange text-white font-semibold px-4 py-3 rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Télécharger le QR Code
        </button>

        <p className="text-xs text-gray-500">
          Présentez ce QR code au food truck pour récupérer votre commande
        </p>
      </div>
    </div>
  );
}
