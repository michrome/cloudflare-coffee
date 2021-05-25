export const config = {
  unstable_runtimeJS: false,
};

const slideTitles = [
  "Heroku Connect",
  "What is Heroku?",
  "Who uses Heroku?",
  "What is Heroku Connect?",
  "Why use Heroku Connect?",
  "Why use Heroku Connect?",
  "Demo",
  "Thank you",
];
const slides = slideTitles.map((title, index) => (
  <img
    className="snap-start border-t-2 border-b-2 border-cf-orange"
    src={`/slides/00${index + 1}.jpeg`}
    width={1920}
    height={1080}
    alt={title}
    id={`slide-${index + 1}`}
  />
));
const linksToSlides = slideTitles.map((title, index) => (
  <a className="block" href={`#slide-${index + 1}`}>
    {index + 1}
  </a>
));

export default function Presentation() {
  return (
    <>
      <p className="flex overflow-x-scroll snap snap-x snap-mandatory shadow-lg">
        {slides}
      </p>
      <p className="flex justify-around">{linksToSlides}</p>
    </>
  );
}
