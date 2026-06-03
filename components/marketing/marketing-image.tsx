import Image, { type ImageProps } from 'next/image'
import { type ImageKey, IMAGES, imageSrc } from '@/lib/images'

type MarketingImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  name: ImageKey
  priority?: boolean
}

export function MarketingImage({ name, priority, className, ...props }: MarketingImageProps) {
  const meta = IMAGES[name]
  return (
    <Image
      src={imageSrc(name)}
      alt={meta.alt}
      priority={priority}
      className={className}
      {...props}
    />
  )
}
