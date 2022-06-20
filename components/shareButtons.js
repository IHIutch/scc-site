import React from 'react'
import { Button } from '@chakra-ui/react'
import { trackGoal } from 'fathom-client'

export function FacebookShareButton({ url, title, children, ...props }) {
  const handleFacebookShareClick = () => trackGoal('W41FHRDG')

  const handleShare = () => {
    handleFacebookShareClick()
    window.open(
      'https://www.facebook.com/sharer/sharer.php?' +
        new URLSearchParams({
          u: url,
          t: encodeURIComponent(title),
        }),
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=436,width=646'
    )
  }
  return (
    <Button {...props} onClick={handleShare}>
      {children}
    </Button>
  )
}
export function TwitterShareButton({ url, text, children, ...props }) {
  const handleTwitterShareClick = () => trackGoal('NTYBIWGF')
  const handleShare = () => {
    handleTwitterShareClick()
    window.open(
      'https://twitter.com/share?' +
        new URLSearchParams({
          url,
          text: text + '\n',
        }),
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=436,width=646'
    )
  }
  return (
    <Button {...props} onClick={handleShare}>
      {children}
    </Button>
  )
}
