import Carousel from "./components/Carousel";
import Header from "./components/Header";
import MainAd from "./components/MainAd";
import PIC from "./assets/main-ad.png";

const cardData = [
  {
    id: 1,
    title: "Nike",
    description: "кроссовки General Purpose Shoe из коллаборации с Tom Sachs",
    imageUrl:
      "https://cdn-images.farfetch-contents.com/18/57/65/58/18576558_40420894_480.jpg",
    imageUrlOnHover:
      "https://cdn-images.farfetch-contents.com/18/57/65/58/18576558_40420928_480.jpg",
    lowestPrice: 4910,
  },
  {
    id: 2,
    title: "Nike",
    description: "кроссовки Zoom Vomero 5",
    imageUrl:
      "https://cdn-images.farfetch-contents.com/20/30/81/09/20308109_50269146_480.jpg",
    imageUrlOnHover:
      "https://cdn-images.farfetch-contents.com/20/30/81/09/20308109_50269144_480.jpg",
    lowestPrice: 4910,
  },
  {
    id: 3,
    title: "Nike",
    description: "кроссовки Zoom Vomero 5 Team Red",
    imageUrl:
      "https://cdn-images.farfetch-contents.com/20/99/61/32/20996132_51020434_480.jpg",
    imageUrlOnHover:
      "https://cdn-images.farfetch-contents.com/20/99/61/32/20996132_51020428_480.jpg",
    lowestPrice: 4910,
  },
  {
    id: 4,
    title: "Nike",
    description: "кроссовки General Purpose Shoe из коллаборации с Tom Sachs",
    imageUrl:
      "https://cdn-images.farfetch-contents.com/18/57/65/58/18576558_40420894_480.jpg",
    imageUrlOnHover:
      "https://cdn-images.farfetch-contents.com/18/57/65/58/18576558_40420928_480.jpg",
    lowestPrice: 4910,
  },
  {
    id: 5,
    title: "Nike",
    description: "кроссовки Zoom Vomero 5",
    imageUrl:
      "https://cdn-images.farfetch-contents.com/20/30/81/09/20308109_50269146_480.jpg",
    imageUrlOnHover:
      "https://cdn-images.farfetch-contents.com/20/30/81/09/20308109_50269144_480.jpg",
    lowestPrice: 4910,
  },
  {
    id: 6,
    title: "Nike",
    description: "кроссовки Zoom Vomero 5 Team Red",
    imageUrl:
      "https://cdn-images.farfetch-contents.com/20/99/61/32/20996132_51020434_480.jpg",
    imageUrlOnHover:
      "https://cdn-images.farfetch-contents.com/20/99/61/32/20996132_51020428_480.jpg",
    lowestPrice: 4910,
  },
];

function App() {
  return (
    <>
      <div className="w-7xl p-4 mx-auto">
        <Header />
        <MainAd url={PIC} />
        <div className="text-3xl font-bold">
          <p className="block w-fit mx-auto">Самые популярные позиции</p>
          <Carousel className="w-full" items={cardData} />
          <Carousel className="w-full" items={cardData} />
          <Carousel className="w-full" items={cardData} />
          <Carousel className="w-full" items={cardData} />
        </div>
      </div>
    </>
  );
}

export default App;
