import AccessoryCard from "./AccessoryCard";

export default function AccessoryGrid() {
  const accessories = [
    {
      id: 1,
      name: "Tay nắm đồng xước cổ điển",
      sku: "HND-BR-042",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDMUe3QFco6K6aDd8f8c7TQZ7zKJYjQbdTHeY22jVg_Z3xV7UuTs_fd3b0KM-IitE4ScpB8t_YsyJGtb0u5FfTr8urSYuR08vJReZ2TimNRWZGfkY-PdeqTEzNmcAf9KjmRtm3HRZ-kwoLQUjcwbgbqf2yLnptohXVUtemaoLctEfVlNHkw7SiADqIf4ypYEnq7CfPtjs8kgicROZZ0HRLE2_J3I_mj2cubZQhCrQIiO-KVCtRm4uN_WTAXxYjV8JBr21-stQ1nMwBR",
    },
    {
      id: 2,
      name: "Bản lề giảm chấn Thép 304",
      sku: "HNG-SC-800",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAaWckNaTLW80c8-fgcSNN0Ic2_cx64iHlUGtrvETyjqeKXo3nu5JqaZwiANHlHlkUlyklaRHnFfUiUkgnJzcZ7vaoKVga9K-RgOc9oSLLZm9T2KPgtBbTeqHzqSW7xLzS2ZX0zkXi1WxotBRMvKi5hHtFGFjFslBNWG4RcIwsmJMPpiEhp8-Od5MG-ibIWvLN_fn86h3mcNDz2Ty2MLAsdm-oUcUV1qnfGeU3fjB3pTZJP1WsjpF-ZDYptT9ImsyvfBMYLpSH7c-fD",
    },
    {
      id: 3,
      name: "Ray trượt âm Hafele 500mm",
      sku: "SLD-HD-120",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDKWGLKlS2MpV70t3o8Cd6jbh-dk4lPl-HyURZb-VFvBEzVNmvgIVK8fNN9Zw_2NcVJbrDBDzKQYUt4kugHFwb7JF2tfc66bMcavftO20034If7-wmliV0pKDMFYQOuF6YU7Ix-4hT2aSwKvpiTkv3aSU7shOQtKa-eIhc1wVdEzV8RIcW7XzE0JsM2bXS-KsyQm7aqBqgdlXA-GsjVEpz2xl22fbBng4CnibOTXY5-uFo-ifbekqqcv97Id7w23VfH0l4Qrp2yJwcj",
    },
    {
      id: 4,
      name: "Góc trang trí mạ vàng 24K",
      sku: "CRN-GD-001",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCV6vHjXBAhXXkz_axSna-3KYB9G-o-OYIzgn09eNS3a3ZVF_XQjzcnrCTGKKOud5jHB2aRKavzdXd2HFe9X6EgqV0-OvyiMreFWhEDMNr-k8p90-xKoytFO5pDN5d5suMCXEA7YgE4P6iRmKmSuXasmGKoicITsdyFMqWuKPOcI889MEGiNxENv6UJNBlRLA1bqJjUU6kj8nflhmNGdjcNZqhwe--KxaNj_YK_90uBYqFEwNEv51ysUMzff-cylUkr3CRVrHy013ZE",
    },
    {
      id: 5,
      name: "Thanh nhôm định hình LED đen",
      sku: "LED-PR-020",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDToNTuRpJsEXOkrGizlbCYsP8D1LUd_5K8OXVAhBBsLsAqPAOtvBnnR3x3KZPJ_5aSU1CV7wICRaPDY3biXlFLWOHi-DorX-PVxw_8XbXJNItpEWN2bLo06qqP2wpRgp8K_oaSrIopj3bcg-ld6DtrS3WnuC_acL113G7seTWn2NBDGhgFW7ZtJUwMMeM8YMMMKwEJ9HAoCqrfnCXnKxlwafLnMEQ-85nSaypBg_zcF65N6YTsiXHjoU01mw7r9aqsyrWfhEeSObv0",
    },
    {
      id: 6,
      name: "Chốt gỗ sồi nhập khẩu 10mm",
      sku: "JON-WD-012",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCejBzMLtrQlV9BFJIKlDPJVA1FhbWqzzbAKxGiPpUDZbDX5ebhapdgCiPkb9IXF1Qo7RfUtWFE1tdl1ZaW12DYWNwJgUDFBXwPxhRy8lANZ9g7LjOzZ1Tb3N069VJRfqu0zOCAa5RaUle8sSzpLatMZzZYUEuW8hf02PdZDFLFD4rNvNYn1oBss2uJLo1GiGhnXo9qHYNGdinNC2pjnaiocXpHHEh9mUECW8rlDDRG4WvZN-FE6BnYXhJd-qSWvRMUZABUOYaY0lTo",
    },
    {
      id: 7,
      name: "Tay nắm da bò Saddle Brown",
      sku: "LTH-PL-005",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBeznR7ZkL3r3AcIjjNukzxpmz3zGMgKQkeyrOc_ohsiJ0DwUmw6MlAYaaKOZhqDrFNaKRzW0kajLVrGCVstABlKLByabubpyRHXYYNLXAg-uT3aACwWQk_rkZJX2cSl2GgODNebjsn23fDmp8dH8U73uJy9-A1VLbXcFwTJ-DtWTv0OtbuwdQU4SmDlOnGhjb5qBDrgamTL0tdiuw69L6cOyao4O-KvMjNeI1GeMt3fAj_Ln60szP-fkDt_F-kBWPCuzARCLWyUH-z",
    },
    {
      id: 8,
      name: "Vít tự khoan thép tôi cứng",
      sku: "SCR-ST-001",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBlxUa9hBWwWVrHmGTGAENBUmjgIHUVSOyx0--FPx9-ehgH3DNfaBVaH_vtQjPz2A6KtiW1XOwlDHG7lwCJMoEsLAFGh0hejj6ldQBm7itEAI2yi5iMg-VYcW4EYJjP4hgJqExuCDN6JbrnnN-SlvDYvXv7CC4_3fdY_04aMmJaDIMmA4NRRaZIwRkL654Qdfmi9qTzohxfZK4FY6GECnwtpeUNSsM7VUFWB4gnjA1yLmPON9UtGIAjtqoRnIW0WDJY8o6hZwKdgvD3",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {accessories.map((item) => (
        <AccessoryCard key={item.id} accessory={item} />
      ))}
    </div>
  );
}