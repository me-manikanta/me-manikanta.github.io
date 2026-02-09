import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 150,
}) => {
  const noggin = size * 0.15;
  const heightWithNoggin = size + noggin;

  return (
    <div 
      className="avatar"
      style={
        {
          "--size": `${size}px`,
        } as React.CSSProperties
      }
    >
      <img src={src} alt={alt} />
    </div>
  );
};
