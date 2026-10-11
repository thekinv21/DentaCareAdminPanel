import Link from 'next/link'

type TAuthSwitchLinkProps = {
	question: string
	href: string
	linkLabel: string
}

/**
 * "No account yet? Register" line under an auth form
 */
export function AuthSwitchLink({
	question,
	href,
	linkLabel,
}: TAuthSwitchLinkProps) {
	return (
		<p className='text-center text-sm leading-5.5 text-ink-muted'>
			{question}{' '}
			<Link
				href={href}
				className='font-semibold text-brand no-underline hover:underline'
			>
				{linkLabel}
			</Link>
		</p>
	)
}
