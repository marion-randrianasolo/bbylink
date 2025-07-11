"use client";

import Image from "next/image";

/**
 * XP progress indicator with radial segments and animated progress
 * @param {Object} props - component props
 * @param {number} props.xpLevel - current XP level (0-5)
 * @param {string} props.avatarSrc - user avatar image source from DiceBear API
 * @param {string} props.userName - user name for avatar fallback
 * @returns {JSX.Element} PlayerXP indicator with animated progress ring
 */
interface PlayerXPIndicatorProps {
	xpLevel?: number;
	avatarSrc?: string;
	userName?: string;
}

export default function PlayerXPIndicator({
	xpLevel = 2,
	avatarSrc,
	userName = "Player",
}: PlayerXPIndicatorProps) {
	const totalSegments = 5;
	const radius = 58;
	const strokeWidth = 5;
	const center = 75;

	/**
	 * Generates DiceBear avatar URL if no avatar provided
	 */
	const getAvatarUrl = (): string => {
		if (avatarSrc && avatarSrc.trim() !== "") {
			console.log("Using provided avatar:", avatarSrc);
			return avatarSrc;
		}
		const seed = userName.toLowerCase().replace(/\s+/g, "");
		const dicebearUrl = `https://api.dicebear.com/7.x/big-smile/svg?seed=${seed}&backgroundColor=transparent`;
		console.log("Generated DiceBear URL:", dicebearUrl);
		return dicebearUrl;
	};

	/**
	 * Renders animated semi-circle XP progress (180 degrees above avatar)
	 */
	const renderXPProgress = () => {
		return (
			<svg
				className="absolute w-[150px] h-[150px]"
				viewBox="0 0 150 150"
				style={{ transform: "rotate(180deg)" }}
			>
				{/* Background segments */}
				{Array.from({ length: totalSegments }, (_, i) => {
					const totalArcDegrees = 220; // Increased to 220 degrees for wider arc
					const gapDegrees = 10; // Gap between segments
					const segmentDegrees =
						(totalArcDegrees - (totalSegments - 1) * gapDegrees) /
						totalSegments;
					const offsetAngle = -20; // Start 20 degrees before horizontal (goes lower)
					const startAngle = offsetAngle + i * (segmentDegrees + gapDegrees);
					const endAngle = startAngle + segmentDegrees;
					const startRad = (startAngle * Math.PI) / 180;
					const endRad = (endAngle * Math.PI) / 180;

					const x1 = center + radius * Math.cos(startRad);
					const y1 = center + radius * Math.sin(startRad);
					const x2 = center + radius * Math.cos(endRad);
					const y2 = center + radius * Math.sin(endRad);

					return (
						<path
							key={`bg-${i}`}
							d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
							stroke="#2a2a2a"
							strokeWidth={strokeWidth}
							fill="none"
							strokeLinecap="round"
						/>
					);
				})}

				{/* Active segments */}
				{Array.from({ length: Math.floor(xpLevel) }, (_, i) => {
					const totalArcDegrees = 220; // Same as background segments
					const gapDegrees = 10; // Same gap for consistency
					const segmentDegrees =
						(totalArcDegrees - (totalSegments - 1) * gapDegrees) /
						totalSegments;
					const offsetAngle = -20; // Same offset as background
					const startAngle = offsetAngle + i * (segmentDegrees + gapDegrees);
					const endAngle = startAngle + segmentDegrees;
					const startRad = (startAngle * Math.PI) / 180;
					const endRad = (endAngle * Math.PI) / 180;

					const x1 = center + radius * Math.cos(startRad);
					const y1 = center + radius * Math.sin(startRad);
					const x2 = center + radius * Math.cos(endRad);
					const y2 = center + radius * Math.sin(endRad);

					return (
						<path
							key={`active-${i}`}
							d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
							stroke="url(#progressGradient)"
							strokeWidth={strokeWidth}
							fill="none"
							strokeLinecap="round"
							className="transition-all duration-1000 ease-out"
						/>
					);
				})}

				{/* Gradient definition */}
				<defs>
					<linearGradient
						id="progressGradient"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="0%"
					>
						<stop offset="0%" stopColor="#EA1846" />
						<stop offset="50%" stopColor="#EA1846" />
						<stop offset="100%" stopColor="#EA1846" />
					</linearGradient>
				</defs>
			</svg>
		);
	};

	return (
		<div className="relative w-[150px] h-[150px] flex items-center justify-center">
			{/* Animated XP Progress Ring */}
			{renderXPProgress()}

			{/* Player Avatar Circle */}
			<div className="relative z-[2] w-20 h-20 rounded-full bg-[#EA1846] flex items-center justify-center border-2 border-[#EA1846] shadow-lg">
				<div className="w-[72px] h-[72px] rounded-full overflow-hidden">
					<img
						src={getAvatarUrl()}
						alt={userName}
						className="w-full h-full object-cover"
						onError={(e) => {
							console.log(
								"Image failed to load, trying DiceBear fallback"
							);
							const target = e.target as HTMLImageElement;
							const seed = userName
								.toLowerCase()
								.replace(/\s+/g, "");
							const fallbackUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=transparent`;
							console.log("Fallback URL:", fallbackUrl);
							target.src = fallbackUrl;
							target.onerror = () => {
								console.log(
									"Both images failed, showing initials"
								);
								target.style.display = "none";
								const parent = target.parentElement;
								if (parent) {
									parent.innerHTML = `<span class="text-white text-xl font-bold flex items-center justify-center w-full h-full">${userName
										.charAt(0)
										.toUpperCase()}</span>`;
								}
							};
						}}
					/>
				</div>
			</div>

			{/* Championship Logo Circle - positioned slightly above bottom */}
			<div className="absolute z-[3] w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center bottom-4 left-1/2 transform -translate-x-1/2 shadow-md">
				<Image
					src="/assets/championships/epsi.png"
					alt="EPSI Championship"
					width={16}
					height={16}
					className="w-4 h-4 object-contain"
				/>
			</div>
		</div>
	);
}
