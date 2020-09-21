import Link from './Link'
import { Card, CardContent, Typography, styled } from '@material-ui/core'

const SuperText = styled(Typography)({
  fontSize: 14,
})

interface SearchResultItemProps {
  superText: string
  mainText: string
  mainTextHref: string
}

export default function SearchResultItem(props: SearchResultItemProps) {
  const { superText, mainText, mainTextHref } = props
  return (
    <Card role="listitem">
      <CardContent>
        <SuperText color="textSecondary" gutterBottom>
          {superText}
        </SuperText>
        <Link href={mainTextHref} target="_blank">
          <Typography>{mainText}</Typography>
        </Link>
      </CardContent>
    </Card>
  )
}
