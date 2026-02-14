interface Props {
	label: string;
}

const ErrorBanner = ({ label }: Props) => {
	return (
		<div className="mt-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
			{label}
		</div>
	)
}
export default ErrorBanner;