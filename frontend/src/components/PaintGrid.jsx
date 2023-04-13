import PaintRecommendation from './PaintRecommendation';

export default function PaintGrid({ recommendations }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
      {recommendations.map((recommendation) => (
        <PaintRecommendation
          key={recommendation.title}
          title={recommendation.title}
          desc={recommendation.desc}
          quantity={recommendation.quantity}
          cost={recommendation.cost}
          img={recommendation.img}
          link={recommendation.link}
        />
      ))}
    </div>
  );
}
