import { Zap } from 'lucide-react';

const Header = () => {
	return (
		<div className="mb-10 text-center">
			<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs mb-6 tracking-widest uppercase">
				<Zap className="w-3 h-3" />
				URL Shortener
			</div>
			<h1 className="text-4xl font-bold text-white tracking-tight leading-tight">
				Max URL shortener<span className="text-green-400">.</span>
			</h1>
			<p className="mt-2 text-sm text-zinc-500">
				Paste your long URL and get a clean link.
			</p>
		</div>
	);
};

export default Header;