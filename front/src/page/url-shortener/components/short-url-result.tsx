import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface Props {
	shortUrl: string;
	originalUrl: string;
	copied: boolean;
	onCopy: () => void;
	onNewUrl: () => void;
}

const ShortUrlResult = ({ shortUrl, originalUrl, copied, onCopy, onNewUrl }: Props) => {
	return (
		<div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
			<div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
				<p className="text-xs text-zinc-500 mb-2 uppercase tracking-widest">Your short link</p>
				<div className="flex items-center gap-2">
					<span className="flex-1 text-green-300 font-semibold text-sm truncate">
						{shortUrl}
					</span>
					<Button
						size="sm"
						variant="outline"
						onClick={onCopy}
						className="shrink-0 h-8 px-3 rounded-lg border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20 hover:text-white transition-all"
					>
						{copied ? (
							<Check className="w-3.5 h-3.5" />
						) : (
							<Copy className="w-3.5 h-3.5" />
						)}
					</Button>
				</div>

				<div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center justify-between">
					<span className="text-xs text-zinc-600 truncate max-w-[70%]">
						{originalUrl}
					</span>
					<Button
						onClick={onNewUrl}
						variant="link"
						size="sm"
						className="text-xs text-zinc-500 hover:text-green-400 transition-colors underline underline-offset-2"
					>
						New URL
					</Button>
				</div>
			</div>
		</div>
	)
}
export default ShortUrlResult;