import type { IconButtonProps } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { trackEvent } from 'fathom-client'

type ShareButtonProps = IconButtonProps & {
  url: string
  text: string
  children?: React.ReactNode
}

export function FacebookShareButton({ url, text, children, ...props }: ShareButtonProps) {
  const handleFacebookShareClick = () => trackEvent('W41FHRDG')

  const handleShare = () => {
    handleFacebookShareClick()
    window.open(
      `https://www.facebook.com/sharer/sharer.php?${
        new URLSearchParams({
          u: url,
          t: encodeURIComponent(text),
        })}`,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=436,width=646',
    )
  }
  return (
    <Button {...props} onClick={handleShare}>
      {children}
    </Button>
  )
}
export function TwitterShareButton({ url, text, children, ...props }: ShareButtonProps) {
  const handleTwitterShareClick = () => trackEvent('NTYBIWGF')
  const handleShare = () => {
    handleTwitterShareClick()
    window.open(
      `https://twitter.com/share?${
        new URLSearchParams({
          url,
          text: `${text}\n`,
        })}`,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=436,width=646',
    )
  }
  return (
    <Button {...props} onClick={handleShare}>
      {children}
    </Button>
  )
}
