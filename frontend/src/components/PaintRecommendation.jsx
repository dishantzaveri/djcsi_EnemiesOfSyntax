export default function PaintRecommendation({ title, desc, quantity, cost, img, link }) {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-gray-700 p-4">
      <img className="w-1/2 mx-auto" src={img} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-white-700 text-base" style={{'-webkit-line-clamp': 5, lineClamp: 5 }}>{desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-white-700 font-bold text-xl">{cost}</p>
          <a href={link} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Buy now
          </a>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-white-700 text-lg">{quantity}</p>
        </div>
      </div>
    </div>
  );
}
