export default function Mug() {
  return (
    <div className="flex justify-center">
      <a href="/">
        <img
          src="/mug.png"
          width={380}
          height={321}
          className="h-14 sm:h-28 w-auto filter drop-shadow-cf-orange transform hover:rotate-6"
          alt="Coffee mug with 1.1.1.1 typed on it"
        />
      </a>
    </div>
  );
}
