import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const products = [
    {
      sku: "PLT-DK-001",
      name: "Bàn ăn gỗ sồi Nordic",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFKe_iGO123Opohzj4zTG4OzqXJRUYp5r_DsJ1S6qaQnO429wtD32JPz58oHUaODKRu7ac3B1nbrRBnY7YWWRgTyjYbRFGc9wZrEumQ46g9sYo8_tkcSXwIfYr3x2fjwUu2XKQf-OIPj2Y3mNLZmlgfrkQ-bd0TrvREHoVTLoNHyi7wV0jn2yqfBbrp84BPjXZgFtdYxaMMA3eiO5aRNlHC-kMIfu7hPlHGFX92hZgJwtsLNe431zF79TX_luZuEG-O-hLz1dXYMrC",
      height: "75cm",
      width: "120cm",
      depth: "80cm",
      price: "4.500.000đ",
      status: "Sẵn sàng",
      statusClass:
        "bg-tertiary-container text-on-tertiary-container",
    },
    {
      sku: "PLT-WR-042",
      name: "Tủ quần áo cánh kính",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVLa8oGI2GFjMdHfZ1CH2Kol0k_-h0dXFUKflJ3QJhVQG6BGecZW21fWsK9qG_7XB0QqZYJ9yL5g-4F9QIbBc5fU-O0rS8-wq5BDm2ckVfQS2SGHWYqtF49qwoYFKJ7dc7MiylMOp-xqqOB-GbBj2JWks03aLFwO6wIW0k2EFvwESdY2C-3MW5xBrd_v72iaO_XE9vE0NagM5vT5CSfiwCUIjyz2LsRvs6A5s5jabVELxefl0esKwQ8HVN4DIQ5xTNzK8miSoEkJ0m",
      height: "220cm",
      width: "180cm",
      depth: "60cm",
      price: "12.800.000đ",
      status: "Sắp về",
      statusClass:
        "bg-secondary-container text-on-secondary-container",
    },
    {
      sku: "PLT-SF-015",
      name: "Sofa Velvet Emerald",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAo5PqZ3XgzjGM1crxEkbrXZTowLrPbNQWGL71bkSyZ6Tq3SISksA6V2sbmzUIS36LOi5HOu8RqR-WwoEzA39Kdwtk34WsUyR_0JhHkNoll3_mQvjcVDLa-RM-42UUWB-48XxjXIt7JFbtEzwNJyl60GgggJRoMv10DzF_xnU6CS1qh-g5SLt0jGw9TgEZSGKw60A47Vg6bGSFGpRHekTbBSbLPtfrq59ilfrqDyw-QnTE0ZDXGYI28j5IMibd6ssQ3tSe7taM8SBND",
      height: "85cm",
      width: "210cm",
      depth: "95cm",
      price: "8.250.000đ",
      status: "Hết hàng",
      statusClass:
        "bg-error-container text-on-error-container",
    },
    {
      sku: "PLT-BS-088",
      name: "Kệ sách xương cá Walnut",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD930Bq6dCkyEtLaZmEGik_KJqgfCUOng8lskhwlkkSkPzMasYQhvOcYAaS4hYZcOuPx2y_FDoP1BZWvdF7APgjiAiF9Vd5b3vqB7dwpWqMCp-ucA_apZRhrogM6U6Xl4yMNu80Bxy4R9dyULHrQjB8zdrHO6tT6A9C8PDzX-TVBx-qGyz6JNmdhgq5O8R8Nd2rnUMFLaYw-2Udyhzk7l-yW491AdmDFz2hO9uhNHLCWwXgKPXX-HWCOUi4kvB-qMs5TUPsKE9jNvyA",
      height: "180cm",
      width: "90cm",
      depth: "35cm",
      price: "3.900.000đ",
      status: "Sẵn sàng",
      statusClass:
        "bg-tertiary-container text-on-tertiary-container",
    },
    {
      sku: "PLT-OD-023",
      name: "Bàn làm việc Modernist",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEBm-69c-LNtopbGyU55LeUBa03MbM0MSdgglL8U4GWiD8e0gphISaQh-dlckWCO1C5N5bYoPnP_MVnFHUYqo13g5W7oQC8-GYYZycbX7aFkUNpdnMjZnDFM7DN7UfvLa2WQN8_DLeCFCEJD86IULcDAvICkVX__RA3h5KQUXTXCCpv2rubX9QlPMi0Pkdsfc05Xly61nnWvPPcH7hd_-yZg0byU2NVs6lkuJikvRjB32EFVjbk1kDLdKy4Wy8w7g9M1Bhs0ugUcGw",
      height: "75cm",
      width: "140cm",
      depth: "70cm",
      price: "2.750.000đ",
      status: "Sẵn sàng",
      statusClass:
        "bg-tertiary-container text-on-tertiary-container",
    },
    {
      sku: "PLT-BD-112",
      name: "Giường bọc nệm Royal",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOk0dIwJxHGZ0aTuzJZ0Lghusfl8Qpn5qUt1bKJoKxpJaYakWRyqXRlSUBuJZL7Q6QuPAHQCic-nH9rLiloaZx0ah2iCMAzeRx75NnJsLhBWQ1u4NT2TEC_UK9_7GEfCCLWta4Z6CzWDtp93etLjYrUewgyn8usCfH07SO5zXEoE-0tK3Uc2X8-Ldh96M1O1K9ndZ3K6VjnBP8Y7b8FNG-hrYlg3A5QCq-BYdDNL9EI21X3Q02ZLP1Xwplqsb2nwgf8GVNg_R3sVru",
      height: "110cm",
      width: "180cm",
      depth: "200cm",
      price: "15.500.000đ",
      status: "Hết hàng",
      statusClass:
        "bg-error-container text-on-error-container",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      
      {products.map((item, index) => (
        <ProductCard key={index} product={item} />
      ))}

      {/* Add new product */}
      <button className="flex flex-col items-center justify-center gap-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-sm hover:border-primary/40 hover:bg-blue-50/30 transition-all group min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-outline group-hover:text-primary shadow-sm group-hover:shadow transition-all">
          <span className="material-symbols-outlined text-3xl">
            add
          </span>
        </div>

        <div className="text-center px-6">
          <div className="font-bold text-on-surface">
            Thêm sản phẩm mới
          </div>
          <p className="text-xs text-outline mt-1">
            Bắt đầu nhập liệu thông số kỹ thuật mới vào hệ thống
          </p>
        </div>
      </button>
    </div>
  );
}