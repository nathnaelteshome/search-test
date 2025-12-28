export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 500,
  RESULTS_PER_PAGE: 10,
  REQUEST_TIMEOUT: 10000,
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  MAX_CACHE_SIZE: 50,
} as const;

export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Accessories",
  "Audio",
  "Wearables",
  "Gaming",
  "Home & Office",
] as const;

export const PRODUCT_NAMES = {
  Electronics: [
    "Wireless Bluetooth Headphones",
    "USB-C Hub Adapter",
    "Mechanical Keyboard",
    "Portable SSD 1TB",
    "4K Webcam",
    "Smart LED Monitor",
    "Wireless Mouse",
    "Laptop Stand",
    "Power Bank 20000mAh",
    "USB Microphone",
  ],
  Accessories: [
    "Phone Case Premium",
    "Screen Protector Pack",
    "Charging Cable Braided",
    "Laptop Sleeve",
    "Cable Organizer Kit",
    "Webcam Cover Slider",
    "Keyboard Wrist Rest",
    "Monitor Light Bar",
    "Desk Mat XL",
    "Phone Stand Adjustable",
  ],
  Audio: [
    "True Wireless Earbuds",
    "Noise Cancelling Headphones",
    "Bluetooth Speaker",
    "Studio Headphones",
    "Soundbar Compact",
    "Podcast Microphone Kit",
    "DAC Amplifier",
    "Earphone Case",
    "Audio Splitter",
    "Microphone Arm Stand",
  ],
  Wearables: [
    "Smartwatch Pro",
    "Fitness Tracker Band",
    "Smart Ring",
    "VR Headset Lite",
    "Smart Glasses",
    "Health Monitor Watch",
    "Activity Tracker Kids",
    "Sleep Tracker",
    "Posture Corrector Smart",
    "UV Monitor Band",
  ],
  Gaming: [
    "Gaming Mouse RGB",
    "Controller Wireless",
    "Gaming Headset 7.1",
    "Capture Card 4K",
    "Stream Deck",
    "Gaming Keyboard TKL",
    "Mouse Pad XXL",
    "Controller Grip Kit",
    "Gaming Chair",
    "RGB Light Strip",
  ],
  "Home & Office": [
    "Smart Plug WiFi",
    "LED Desk Lamp",
    "Air Quality Monitor",
    "Smart Thermostat",
    "Video Doorbell",
    "WiFi Extender",
    "Paper Shredder",
    "Label Maker",
    "Document Scanner",
    "Ergonomic Footrest",
  ],
} as const;

// Unsplash image URLs for each product
export const PRODUCT_IMAGES: Record<string, Record<string, string>> = {
  Electronics: {
    "Wireless Bluetooth Headphones":
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    "USB-C Hub Adapter":
      "https://images.unsplash.com/photo-1683265738463-03da99c81445?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Mechanical Keyboard":
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop",
    "Portable SSD 1TB":
      "https://images.unsplash.com/photo-1719937206158-cad5e6775044?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydGFibGUlMjBzc2R8ZW58MHx8MHx8fDA%3D",
    "4K Webcam":
      "https://images.unsplash.com/photo-1626581795188-8efb9a00eeec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8NGslMjB3ZWJjYW18ZW58MHx8MHx8fDA%3D",
    "Smart LED Monitor":
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    "Wireless Mouse":
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    "Laptop Stand":
      "https://images.unsplash.com/photo-1623251606108-512c7c4a3507?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc3RhbmR8ZW58MHx8MHx8fDA%3D",
    "Power Bank 20000mAh":
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    "USB Microphone":
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop",
  },
  Accessories: {
    "Phone Case Premium":
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
    "Screen Protector Pack":
      "https://images.unsplash.com/photo-1600541519467-937869997e34?w=400&h=400&fit=crop",
    "Charging Cable Braided":
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    "Laptop Sleeve":
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
    "Cable Organizer Kit":
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    "Webcam Cover Slider":
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&h=400&fit=crop",
    "Keyboard Wrist Rest":
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    "Monitor Light Bar":
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400&h=400&fit=crop",
    "Desk Mat XL":
      "https://images.unsplash.com/photo-1616628188859-7a11abb6fcc9?w=400&h=400&fit=crop",
    "Phone Stand Adjustable":
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
  },
  Audio: {
    "True Wireless Earbuds":
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    "Noise Cancelling Headphones":
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
    "Bluetooth Speaker":
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    "Studio Headphones":
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    "Soundbar Compact":
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
    "Podcast Microphone Kit":
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop",
    "DAC Amplifier":
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=400&fit=crop",
    "Earphone Case":
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop",
    "Audio Splitter":
      "https://images.unsplash.com/photo-1558618047-3c8c76ca6392?w=400&h=400&fit=crop",
    "Microphone Arm Stand":
      "https://images.unsplash.com/photo-1590765773150-b02d23d8d0f2?w=400&h=400&fit=crop",
  },
  Wearables: {
    "Smartwatch Pro":
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    "Fitness Tracker Band":
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
    "Smart Ring":
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=400&h=400&fit=crop",
    "VR Headset Lite":
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&h=400&fit=crop",
    "Smart Glasses":
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
    "Health Monitor Watch":
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop",
    "Activity Tracker Kids":
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    "Sleep Tracker":
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop",
    "Posture Corrector Smart":
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&h=400&fit=crop",
    "UV Monitor Band":
      "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=400&h=400&fit=crop",
  },
  Gaming: {
    "Gaming Mouse RGB":
      "https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?w=400&h=400&fit=crop",
    "Controller Wireless":
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=400&fit=crop",
    "Gaming Headset 7.1":
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
    "Capture Card 4K":
      "https://images.unsplash.com/photo-1625805866449-3589fe3f71a3?w=400&h=400&fit=crop",
    "Stream Deck":
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop",
    "Gaming Keyboard TKL":
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop",
    "Mouse Pad XXL":
      "https://images.unsplash.com/photo-1631098983935-5363b8e50edb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91c2UlMjBwYWR8ZW58MHx8MHx8fDA%3D",
    "Controller Grip Kit":
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    "Gaming Chair":
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop",
    "RGB Light Strip":
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop",
  },
  "Home & Office": {
    "Smart Plug WiFi":
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop",
    "LED Desk Lamp":
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    "Air Quality Monitor":
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    "Smart Thermostat":
      "https://images.unsplash.com/photo-1567925086983-a3d77c3ada84?w=400&h=400&fit=crop",
    "Video Doorbell":
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop",
    "WiFi Extender":
      "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=400&fit=crop",
    "Paper Shredder":
      "https://images.unsplash.com/photo-1586339949216-35c2747cc36d?w=400&h=400&fit=crop",
    "Label Maker":
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop",
    "Document Scanner":
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=400&fit=crop",
    "Ergonomic Footrest":
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
  },
};

// Product data type
export interface ProductData {
  price: number;
  rating: number;
  inStock: boolean;
  description: string;
}

// Comprehensive product data with realistic prices, ratings, and descriptions
export const PRODUCT_DATA: Record<string, Record<string, ProductData>> = {
  Electronics: {
    "Wireless Bluetooth Headphones": {
      price: 79.99,
      rating: 4.5,
      inStock: true,
      description:
        "Premium wireless Bluetooth headphones with 40-hour battery life, active noise cancellation, and crystal-clear audio. Features comfortable over-ear design with memory foam cushions.",
    },
    "USB-C Hub Adapter": {
      price: 49.99,
      rating: 4.3,
      inStock: true,
      description:
        "7-in-1 USB-C hub with 4K HDMI, 100W Power Delivery, SD/microSD card readers, and 3 USB 3.0 ports. Compatible with MacBook, iPad Pro, and Windows laptops.",
    },
    "Mechanical Keyboard": {
      price: 129.99,
      rating: 4.7,
      inStock: true,
      description:
        "Hot-swappable mechanical keyboard with RGB backlighting, Cherry MX switches, and aircraft-grade aluminum frame. Includes wrist rest and keycap puller.",
    },
    "Portable SSD 1TB": {
      price: 109.99,
      rating: 4.8,
      inStock: true,
      description:
        "Ultra-fast portable SSD with 1050MB/s read speeds, shock-resistant design, and hardware encryption. USB 3.2 Gen 2 compatible with USB-C cable included.",
    },
    "4K Webcam": {
      price: 149.99,
      rating: 4.4,
      inStock: true,
      description:
        "4K Ultra HD webcam with autofocus, HDR, and built-in privacy shutter. Features dual omnidirectional microphones and works with all major video conferencing apps.",
    },
    "Smart LED Monitor": {
      price: 329.99,
      rating: 4.6,
      inStock: true,
      description:
        "27-inch 4K IPS monitor with USB-C connectivity, 99% sRGB color accuracy, and built-in speakers. Height adjustable stand with pivot and tilt functionality.",
    },
    "Wireless Mouse": {
      price: 59.99,
      rating: 4.5,
      inStock: true,
      description:
        "Ergonomic wireless mouse with 16000 DPI sensor, 70-hour battery life, and silent clicks. Features customizable buttons and works on any surface.",
    },
    "Laptop Stand": {
      price: 45.99,
      rating: 4.4,
      inStock: true,
      description:
        "Adjustable aluminum laptop stand with 6 height settings and ventilated design for cooling. Foldable and portable, supports laptops up to 17 inches.",
    },
    "Power Bank 20000mAh": {
      price: 39.99,
      rating: 4.6,
      inStock: true,
      description:
        "20000mAh portable charger with 65W USB-C PD fast charging, 3 output ports, and LED display. Can charge a laptop and two phones simultaneously.",
    },
    "USB Microphone": {
      price: 89.99,
      rating: 4.7,
      inStock: false,
      description:
        "Professional USB condenser microphone with cardioid pickup pattern, zero-latency monitoring, and tap-to-mute. Perfect for podcasting, streaming, and voice-overs.",
    },
  },
  Accessories: {
    "Phone Case Premium": {
      price: 29.99,
      rating: 4.3,
      inStock: true,
      description:
        "Military-grade drop protection phone case with MagSafe compatibility and scratch-resistant finish. Slim profile with raised edges for screen and camera protection.",
    },
    "Screen Protector Pack": {
      price: 14.99,
      rating: 4.2,
      inStock: true,
      description:
        "3-pack tempered glass screen protectors with 9H hardness, oleophobic coating, and easy bubble-free installation. Includes alignment frame and cleaning kit.",
    },
    "Charging Cable Braided": {
      price: 19.99,
      rating: 4.5,
      inStock: true,
      description:
        "6ft braided USB-C to USB-C cable with 100W PD charging support and 480Mbps data transfer. Reinforced stress points for 10,000+ bend lifespan.",
    },
    "Laptop Sleeve": {
      price: 34.99,
      rating: 4.4,
      inStock: true,
      description:
        "Water-resistant laptop sleeve with memory foam padding, accessory pocket, and magnetic closure. Fits 13-14 inch laptops. Available in multiple colors.",
    },
    "Cable Organizer Kit": {
      price: 12.99,
      rating: 4.1,
      inStock: true,
      description:
        "20-piece cable management kit with velcro ties, cable clips, and cord sleeves. Keep your desk tidy and cables organized. Reusable and adjustable.",
    },
    "Webcam Cover Slider": {
      price: 7.99,
      rating: 4.0,
      inStock: true,
      description:
        "3-pack ultra-thin webcam covers with smooth sliding mechanism. 0.7mm slim design that won't interfere with laptop closing. Fits most laptops and monitors.",
    },
    "Keyboard Wrist Rest": {
      price: 24.99,
      rating: 4.5,
      inStock: true,
      description:
        "Memory foam keyboard wrist rest with cooling gel layer and non-slip base. Ergonomic design reduces strain during long typing sessions. Machine washable cover.",
    },
    "Monitor Light Bar": {
      price: 54.99,
      rating: 4.6,
      inStock: true,
      description:
        "Asymmetric LED monitor light bar with adjustable color temperature (2700K-6500K), auto-dimming sensor, and USB power. Zero screen glare design.",
    },
    "Desk Mat XL": {
      price: 29.99,
      rating: 4.4,
      inStock: true,
      description:
        'Extra-large desk mat (35" x 17") with water-resistant PU leather surface, anti-slip rubber base, and stitched edges. Protects desk and provides smooth mouse tracking.',
    },
    "Phone Stand Adjustable": {
      price: 18.99,
      rating: 4.3,
      inStock: true,
      description:
        'Foldable aluminum phone/tablet stand with adjustable viewing angles and anti-scratch silicone pads. Supports devices from 4" to 13". Compact for travel.',
    },
  },
  Audio: {
    "True Wireless Earbuds": {
      price: 129.99,
      rating: 4.6,
      inStock: true,
      description:
        "Premium true wireless earbuds with active noise cancellation, 8-hour battery (32 hours with case), and IPX5 water resistance. Features spatial audio and touch controls.",
    },
    "Noise Cancelling Headphones": {
      price: 299.99,
      rating: 4.8,
      inStock: true,
      description:
        "Industry-leading noise cancellation headphones with 30-hour battery, multipoint connection, and speak-to-chat. Premium leather earcups with studio-quality sound.",
    },
    "Bluetooth Speaker": {
      price: 79.99,
      rating: 4.5,
      inStock: true,
      description:
        "Portable Bluetooth speaker with 360° sound, 24-hour playtime, and IP67 waterproof rating. Features PartyBoost for linking multiple speakers.",
    },
    "Studio Headphones": {
      price: 199.99,
      rating: 4.7,
      inStock: true,
      description:
        "Professional studio monitor headphones with 45mm beryllium drivers, detachable cables, and reference-grade flat frequency response. Includes carrying case.",
    },
    "Soundbar Compact": {
      price: 149.99,
      rating: 4.4,
      inStock: true,
      description:
        "Compact 2.1 soundbar with wireless subwoofer, Dolby Audio, and HDMI ARC. Dialogue enhancement mode and Bluetooth streaming. Wall-mountable design.",
    },
    "Podcast Microphone Kit": {
      price: 179.99,
      rating: 4.6,
      inStock: false,
      description:
        "Complete podcast kit with XLR condenser microphone, boom arm, shock mount, pop filter, and audio interface. Broadcast-quality sound for professionals.",
    },
    "DAC Amplifier": {
      price: 249.99,
      rating: 4.7,
      inStock: true,
      description:
        "Hi-res USB DAC/amp with ESS Sabre chip, balanced 4.4mm output, and MQA support. Powers headphones up to 600 ohms with pristine audio quality.",
    },
    "Earphone Case": {
      price: 15.99,
      rating: 4.2,
      inStock: true,
      description:
        "Premium silicone earphone case with carabiner clip, wireless charging compatibility, and 360° protection. Available in 12 colors with LED visible design.",
    },
    "Audio Splitter": {
      price: 9.99,
      rating: 4.0,
      inStock: true,
      description:
        "3.5mm audio splitter with volume control for each output. Gold-plated connectors and braided cable. Share audio with a friend from one device.",
    },
    "Microphone Arm Stand": {
      price: 49.99,
      rating: 4.5,
      inStock: true,
      description:
        'Heavy-duty microphone boom arm with internal cable routing, 360° rotation, and desk clamp. Supports microphones up to 4 lbs. Includes 3/8" and 5/8" adapters.',
    },
  },
  Wearables: {
    "Smartwatch Pro": {
      price: 399.99,
      rating: 4.7,
      inStock: true,
      description:
        "Advanced smartwatch with always-on AMOLED display, GPS, heart rate/SpO2 monitoring, and 5-day battery. 100+ workout modes with automatic detection.",
    },
    "Fitness Tracker Band": {
      price: 49.99,
      rating: 4.4,
      inStock: true,
      description:
        "Slim fitness tracker with 14-day battery, heart rate monitoring, sleep tracking, and 50m water resistance. Compatible with iOS and Android.",
    },
    "Smart Ring": {
      price: 299.99,
      rating: 4.5,
      inStock: false,
      description:
        "Titanium smart ring with sleep analysis, readiness score, and 24/7 heart rate tracking. 7-day battery life and water resistant to 100m depth.",
    },
    "VR Headset Lite": {
      price: 299.99,
      rating: 4.3,
      inStock: true,
      description:
        "Standalone VR headset with 4K+ resolution, hand tracking, and 256GB storage. No PC required. Access to 500+ games and immersive experiences.",
    },
    "Smart Glasses": {
      price: 249.99,
      rating: 4.1,
      inStock: true,
      description:
        "Smart audio glasses with open-ear speakers, built-in microphone, and UV protection lenses. Take calls, listen to music, and access voice assistant.",
    },
    "Health Monitor Watch": {
      price: 199.99,
      rating: 4.6,
      inStock: true,
      description:
        "Health-focused smartwatch with ECG, blood pressure monitoring, body temperature sensor, and stress tracking. FDA-cleared with 10-day battery life.",
    },
    "Activity Tracker Kids": {
      price: 39.99,
      rating: 4.2,
      inStock: true,
      description:
        "Fun activity tracker for kids ages 6+ with step counting, active minutes, bedtime reminders, and parent-controlled features. Swimproof with 1-year battery.",
    },
    "Sleep Tracker": {
      price: 149.99,
      rating: 4.4,
      inStock: true,
      description:
        "Advanced sleep tracking device with HRV analysis, breathing rate monitoring, and personalized insights. Non-wearable design that sits under your mattress.",
    },
    "Posture Corrector Smart": {
      price: 79.99,
      rating: 4.0,
      inStock: true,
      description:
        "Smart posture trainer with real-time vibration feedback, app coaching, and progress tracking. Discreet design worn under clothing. Rechargeable with 7-day battery.",
    },
    "UV Monitor Band": {
      price: 29.99,
      rating: 3.9,
      inStock: true,
      description:
        "Wearable UV exposure tracker that alerts when you need sunscreen. Measures vitamin D synthesis and sun damage risk. Waterproof with 6-month battery.",
    },
  },
  Gaming: {
    "Gaming Mouse RGB": {
      price: 69.99,
      rating: 4.6,
      inStock: true,
      description:
        "High-precision gaming mouse with 25600 DPI optical sensor, 1000Hz polling rate, and customizable RGB. 8 programmable buttons and 70-hour battery life.",
    },
    "Controller Wireless": {
      price: 59.99,
      rating: 4.5,
      inStock: true,
      description:
        "Premium wireless controller compatible with PC, Switch, and mobile. Features Hall effect triggers, motion controls, and 40-hour battery. USB-C charging.",
    },
    "Gaming Headset 7.1": {
      price: 99.99,
      rating: 4.4,
      inStock: true,
      description:
        "Virtual 7.1 surround sound gaming headset with 50mm drivers, detachable noise-cancelling mic, and memory foam earcups. Works with PC, PS5, Xbox, and Switch.",
    },
    "Capture Card 4K": {
      price: 159.99,
      rating: 4.7,
      inStock: true,
      description:
        "4K60 HDR capture card with ultra-low latency passthrough, USB 3.0 connection, and hardware encoding. Perfect for streaming and content creation.",
    },
    "Stream Deck": {
      price: 149.99,
      rating: 4.8,
      inStock: false,
      description:
        "15-key LCD stream controller for streamers and content creators. Trigger actions, switch scenes, and launch media with customizable keys. Includes stand.",
    },
    "Gaming Keyboard TKL": {
      price: 139.99,
      rating: 4.7,
      inStock: true,
      description:
        "Tenkeyless gaming keyboard with optical switches, per-key RGB, and aircraft-grade aluminum. 8000Hz polling rate and N-key rollover for competitive gaming.",
    },
    "Mouse Pad XXL": {
      price: 24.99,
      rating: 4.5,
      inStock: true,
      description:
        'Extra-large gaming mouse pad (36" x 18") with micro-texture cloth surface, anti-fray stitched edges, and non-slip rubber base. Optimized for speed and control.',
    },
    "Controller Grip Kit": {
      price: 19.99,
      rating: 4.3,
      inStock: true,
      description:
        "Anti-slip grip kit for gaming controllers with thumb stick covers and trigger extenders. Improves comfort and precision during long gaming sessions.",
    },
    "Gaming Chair": {
      price: 299.99,
      rating: 4.4,
      inStock: true,
      description:
        "Ergonomic gaming chair with 4D armrests, lumbar support pillow, and 165° recline. High-density foam with breathable mesh back. Supports up to 300 lbs.",
    },
    "RGB Light Strip": {
      price: 34.99,
      rating: 4.3,
      inStock: true,
      description:
        "2-meter RGB light strip with 16 million colors, music sync mode, and app control. Adhesive backing for easy installation. Works with voice assistants.",
    },
  },
  "Home & Office": {
    "Smart Plug WiFi": {
      price: 24.99,
      rating: 4.4,
      inStock: true,
      description:
        "2-pack WiFi smart plugs with energy monitoring, scheduling, and voice control. Works with Alexa, Google Home, and Apple HomeKit. No hub required.",
    },
    "LED Desk Lamp": {
      price: 49.99,
      rating: 4.5,
      inStock: true,
      description:
        "LED desk lamp with 5 color modes, 7 brightness levels, and USB charging port. Touch controls with 1-hour auto-off timer. Eye-care technology reduces strain.",
    },
    "Air Quality Monitor": {
      price: 129.99,
      rating: 4.3,
      inStock: true,
      description:
        "Indoor air quality monitor measuring PM2.5, CO2, VOCs, temperature, and humidity. E-ink display with 1-year battery. Connects to smartphone app.",
    },
    "Smart Thermostat": {
      price: 179.99,
      rating: 4.6,
      inStock: true,
      description:
        "Energy-saving smart thermostat with learning capability, geofencing, and remote control. Compatible with most HVAC systems. Saves up to 23% on energy bills.",
    },
    "Video Doorbell": {
      price: 149.99,
      rating: 4.5,
      inStock: true,
      description:
        "2K video doorbell with HDR, package detection, and two-way audio. Battery or wired installation. Includes free cloud storage for 30 days of recordings.",
    },
    "WiFi Extender": {
      price: 79.99,
      rating: 4.2,
      inStock: true,
      description:
        "WiFi 6 mesh extender covering up to 2000 sq ft with 1.5Gbps speeds. Easy setup with any router. Eliminates dead zones and reduces buffering.",
    },
    "Paper Shredder": {
      price: 89.99,
      rating: 4.4,
      inStock: true,
      description:
        "Cross-cut paper shredder for home office with 8-sheet capacity and 4-gallon bin. Shreds credit cards and CDs. Auto-start with overheat protection.",
    },
    "Label Maker": {
      price: 39.99,
      rating: 4.3,
      inStock: true,
      description:
        'Portable label maker with QWERTY keyboard, multiple fonts and symbols, and built-in cutter. Prints on 1/2" and 3/8" tape. Includes starter tape cartridge.',
    },
    "Document Scanner": {
      price: 299.99,
      rating: 4.6,
      inStock: false,
      description:
        "Duplex document scanner with 40ppm speed, automatic document feeder, and OCR software. Scans to cloud services directly. Handles receipts to legal-size documents.",
    },
    "Ergonomic Footrest": {
      price: 44.99,
      rating: 4.2,
      inStock: true,
      description:
        "Adjustable ergonomic footrest with massage texture surface, tilt function, and anti-slip base. Improves posture and circulation during long sitting hours.",
    },
  },
};
