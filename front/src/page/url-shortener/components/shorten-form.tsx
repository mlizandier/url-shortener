import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Link2, Loader2 } from 'lucide-react';
import { type SubmitEvent } from 'react';


interface Props {
	handleSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
	url: string;
	onUrlChange: (url: string) => void;
	isPending: boolean;
}

const ShortenForm = ({
	handleSubmit,
	url,
	onUrlChange,
	isPending
}: Props) => {
	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			<div className="relative">
				<Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
				<Input
					type="url"
					placeholder="https://your-very-long-url.com/goes/here"
					value={url}
					onChange={(e) => onUrlChange(e.target.value)}
					disabled={isPending}
					className="pl-9 pr-4 h-12 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-zinc-600 focus-visible:ring-green-500/50 focus-visible:border-green-500/50 rounded-xl text-sm transition-all"
				/>
			</div>

			<Button
				type="submit"
				disabled={isPending || !url.trim()}
				className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold tracking-wide transition-all duration-200 disabled:opacity-40 group"
			>
				{isPending ? (
					<span className="flex items-center gap-2">
						<Loader2 className="w-4 h-4 animate-spin" />
						Shortening…
					</span>
				) : (
					<span className="flex items-center gap-2">
						Shorten URL
						<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
					</span>
				)}
			</Button>
		</form>);
};

export default ShortenForm;