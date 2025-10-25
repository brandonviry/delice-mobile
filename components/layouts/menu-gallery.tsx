"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { OrderQRCode } from "@/components/ui/order-qrcode";

interface MenuItem {
  id: number;
  name: string;
  subtitle?: string;
  price: number;
  oldPrice: number;
  rating?: number;
  image: string;
}

export function MenuGallery() {
  const [featuredItem, setFeaturedItem] = useState<MenuItem | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [addSauce, setAddSauce] = useState(true);
  const [includeCutlery, setIncludeCutlery] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{
    orderId: string;
    orderDate: string;
    orderTime: string;
  } | null>(null);

  // Charger le menu depuis l'API
  useEffect(() => {
    const loadMenu = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/menu");
        const data = await response.json();

        if (data.success) {
          setFeaturedItem(data.featuredItem);
          setMenuItems(data.menuItems);
        }
      } catch (error) {
        console.error("Erreur chargement menu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenu();
  }, []);

  const handleAdd = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleRemove = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1)
    }));
  };

  const handleOrder = async () => {
    if (totalItems === 0) return;

    setIsOrdering(true);
    setOrderSuccess(null);

    try {
      // Préparer les données de la commande
      const allItems = featuredItem ? [featuredItem, ...menuItems] : menuItems;
      const orderItems = cartItems.map(([id, qty]) => {
        const item = allItems.find(i => i?.id === Number(id));
        return {
          id: Number(id),
          name: item?.name || "Produit",
          price: item?.price || 0,
          quantity: qty,
        };
      });

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: orderItems,
          totalPrice,
          totalItems,
          includeCutlery,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de la commande");
      }

      // Succès !
      setOrderSuccess({
        orderId: result.orderId,
        orderDate: result.orderDate,
        orderTime: result.orderTime,
      });
      setQuantities({}); // Vider le panier

      // Cacher le message après 30 secondes (temps de télécharger le QR code)
      setTimeout(() => setOrderSuccess(null), 30000);
    } catch (error) {
      console.error("Erreur commande:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsOrdering(false);
    }
  };

  const cartItems = Object.entries(quantities).filter(([_, qty]) => qty > 0);
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(quantities).reduce((total, [id, qty]) => {
    const allItems = featuredItem ? [featuredItem, ...menuItems] : menuItems;
    const item = allItems.find(i => i?.id === Number(id));
    return total + (item ? item.price * qty : 0);
  }, 0);

  // Afficher un loader pendant le chargement
  if (isLoading) {
    return (
      <section id="menu" className="bg-gradient-to-br from-brand-gold/10 to-brand-orange/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-8 w-8 text-brand-olive" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-semibold text-stone-800">Chargement du menu...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="bg-gradient-to-br from-brand-gold/10 to-brand-orange/10 py-6 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Main content */}
          <div className="space-y-6">
            {/* Hero Featured Product */}
            {featuredItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl bg-white text-gray-800 p-6 shadow-lg">
              <div className="flex items-center justify-center">
                <Image
                  src={featuredItem.image}
                  alt={featuredItem.name}
                  width={600}
                  height={380}
                  className="w-full max-w-md rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">{featuredItem.name}</h2>
                  <button className="text-brand-red hover:text-brand-rust" aria-label="like">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M11.645 20.91l-.007-.003-.022-.01a15.247 15.247 0 01-.383-.177 25.18 25.18 0 01-4.244-2.72C4.688 15.584 2.25 12.552 2.25 9.318 2.25 6.682 4.318 4.5 6.75 4.5c1.676 0 3.136.901 3.9 2.243.764-1.342 2.224-2.243 3.9-2.243 2.432 0 4.5 2.182 4.5 4.818 0 3.234-2.438 6.266-4.739 8.682a25.175 25.175 0 01-4.244 2.72 15.247 15.247 0 01-.383.177l-.022.01-.007.003-.003.001a.75.75 0 01-.592 0l-.003-.001z"/>
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 -mt-2">{featuredItem.subtitle}</p>

                <div className="flex items-center gap-4">
                  <div className="text-brand-olive text-2xl font-extrabold">{featuredItem.price.toFixed(2)}€</div>
                  <div className="text-gray-400 line-through">{featuredItem.oldPrice.toFixed(2)}€</div>
                  <span className="rounded bg-brand-red px-2 py-0.5 text-sm font-semibold text-white">
                    {Math.round(((featuredItem.oldPrice - featuredItem.price) / featuredItem.oldPrice) * 100)}% off
                  </span>
                </div>

                <div className="flex items-center gap-5 text-sm">
                  <div className="flex items-center gap-1 text-amber-500">
                    <span>⭐</span><span>{featuredItem.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <span>📦</span><span>Livraison rapide</span>
                  </div>
                  <div className="flex items-center gap-1 text-brand-orange">
                    <span>🌶️</span><span>épices créoles</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-brand-olive focus:ring-brand-olive"
                      checked={addSauce}
                      onChange={(e) => setAddSauce(e.target.checked)}
                    />
                    <span className="text-gray-700">Ajouter sauce piment</span>
                  </label>
                  <span className="text-brand-red">+5% de remise si plus de 5</span>
                </div>

                <div>
                  <button
                    onClick={() => handleAdd(featuredItem.id)}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-gold px-4 py-2 font-semibold text-gray-900 shadow hover:bg-brand-orange"
                  >
                    <span>🛒</span>
                    <span>Ajouter au panier</span>
                  </button>
                </div>
              </div>
            </div>
            )}

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {menuItems.map((item) => {
                const qty = quantities[item.id] || 0;
                const discount = Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100);

                return (
                  <article
                    key={item.id}
                    className="relative rounded-2xl bg-white p-5 shadow-lg hover:shadow-xl transition-shadow min-h-[160px] flex flex-col"
                  >
                    {/* Heart Button */}
                    <button
                      className="absolute right-4 top-4 text-stone-300 hover:text-brand-red text-xl"
                      aria-label="favori"
                      onClick={(e) => e.stopPropagation()}
                    >
                      ♥
                    </button>

                    <div className="flex items-start gap-5 mb-auto">
                      {/* Image */}
                      <Image
                        className="h-20 w-28 rounded-xl object-cover flex-shrink-0"
                        src={item.image}
                        alt={item.name}
                        width={112}
                        height={80}
                      />

                      {/* Content - Vertical Stack */}
                      <div className="flex-1 pr-6 flex flex-col gap-1">
                        <h3 className="font-bold text-stone-900 text-lg leading-tight">{item.name}</h3>
                        <span className="text-brand-olive font-bold text-2xl">{item.price.toFixed(2)}€</span>
                        <span className="text-stone-500 line-through text-base">{item.oldPrice.toFixed(2)}€</span>
                      </div>
                    </div>

                    {/* Bottom Section: Badge left, Button/Controls center-right */}
                    <div className="flex items-center justify-between mt-4">
                      {/* Badge left */}
                      <span className="rounded-full bg-brand-red/90 px-3 py-1 text-xs font-bold text-white whitespace-nowrap">
                        -{discount}%
                      </span>

                      {/* Add Button or Quantity Controls right */}
                      {qty === 0 ? (
                        <button
                          onClick={() => handleAdd(item.id)}
                          className="rounded-full bg-brand-red px-8 py-2.5 font-heading font-semibold text-white hover:bg-brand-rust transition-colors shadow-md"
                        >
                          Ajouter
                        </button>
                      ) : (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="h-10 w-10 rounded-full bg-brand-olive text-white font-bold hover:bg-brand-orange transition-colors flex items-center justify-center text-xl"
                          >
                            −
                          </button>
                          <span className="font-heading font-bold text-xl text-stone-900 min-w-[2rem] text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleAdd(item.id)}
                            className="h-10 w-10 rounded-full bg-brand-olive text-white font-bold hover:bg-brand-orange transition-colors flex items-center justify-center text-xl"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Cart Sidebar */}
          <aside className="lg:sticky lg:top-20 h-fit">
            <div className="rounded-2xl bg-white p-0 text-gray-800 shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between rounded-t-2xl border-b border-gray-200 bg-gradient-to-r from-brand-gold/20 to-brand-orange/20 px-5 py-4">
                <h3 className="text-lg font-bold text-stone-900">Ma Commande</h3>
                <span className="rounded-full bg-brand-red px-3 py-1 text-sm font-bold text-white">
                  {totalItems}
                </span>
              </div>

              <div className="p-4">
                <Image
                  className="mx-auto mb-4 h-28 w-auto rounded-lg"
                  src="https://placehold.co/260x120/FFEBD1/333?text=Délice+Mobile"
                  alt="Délice Mobile Food Truck"
                  width={260}
                  height={120}
                />

                <ul className="space-y-4 min-h-[200px]">
                  {cartItems.length === 0 ? (
                    <li className="text-center text-gray-400 py-8">Votre panier est vide</li>
                  ) : (
                    cartItems.map(([id, qty]) => {
                      const allItems = featuredItem ? [featuredItem, ...menuItems] : menuItems;
                      const item = allItems.find(i => i?.id === Number(id));
                      if (!item) return null;

                      return (
                        <li key={id} className="flex items-center gap-3">
                          <Image
                            className="h-12 w-12 rounded object-cover"
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-800">{item.name}</span>
                              <span className="font-semibold">{item.price.toFixed(2)}€</span>
                            </div>
                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                              <div className="inline-flex items-center gap-2 rounded border border-gray-200 px-2 py-1">
                                <button
                                  className="text-gray-600"
                                  onClick={() => handleRemove(Number(id))}
                                >
                                  −
                                </button>
                                <span>{qty}</span>
                                <button
                                  className="text-gray-600"
                                  onClick={() => handleAdd(Number(id))}
                                >
                                  +
                                </button>
                              </div>
                              <button
                                className="text-rose-500"
                                onClick={() => setQuantities(prev => {
                                  const newQ = {...prev};
                                  delete newQ[Number(id)];
                                  return newQ;
                                })}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  )}
                </ul>

                <div className="my-4 h-px bg-gray-200"></div>

                <div className="space-y-3 text-sm">
                  <div className="rounded-lg bg-brand-olive/10 p-3">
                    <p className="font-semibold text-stone-900 mb-1">📍 Point de retrait</p>
                    <p className="text-stone-600 text-xs">Food Truck - Voir notre position en temps réel</p>
                  </div>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-brand-olive rounded"
                      checked={includeCutlery}
                      onChange={(e) => setIncludeCutlery(e.target.checked)}
                    />
                    <span className="text-stone-700">Couverts et serviettes</span>
                  </label>
                </div>

                <div className="my-4 h-px bg-gray-200"></div>

                <div className="flex items-center justify-between font-extrabold text-xl">
                  <span className="text-stone-900">Total</span>
                  <span className="text-brand-olive">{totalPrice.toFixed(2)}€</span>
                </div>

                {/* Message de succès avec QR Code */}
                {orderSuccess && (
                  <div className="mt-4 space-y-3">
                    <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                      <p className="text-sm text-green-800 font-bold">
                        ✓ Commande créée avec succès !
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        Scannez ou téléchargez votre QR code ci-dessous
                      </p>
                    </div>
                    <OrderQRCode
                      orderId={orderSuccess.orderId}
                      orderDate={orderSuccess.orderDate}
                      orderTime={orderSuccess.orderTime}
                    />
                  </div>
                )}

                <button
                  onClick={handleOrder}
                  disabled={isOrdering || totalItems === 0}
                  className={`mt-4 w-full rounded-xl px-4 py-3 text-center font-bold text-white transition-colors shadow-lg ${
                    isOrdering || totalItems === 0
                      ? "bg-stone-400 cursor-not-allowed"
                      : "bg-brand-red hover:bg-brand-rust"
                  }`}
                >
                  {isOrdering ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    "Valider la commande"
                  )}
                </button>

                <p className="mt-3 text-center text-xs text-stone-500">
                  🚚 Prêt en 15-20 minutes
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
