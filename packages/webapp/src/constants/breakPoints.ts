interface BreakPoints {
	mobile: string;
	mobileLandscape: string;
	tablet: string;
	tabletLandscape: string;
	laptop: string;
}

export const LAPTOP_WIDTH = 1536;
export const TABLET_LANDSCAPE_WIDTH = 1280;
export const TABLET_WIDTH = 810;
export const MOBILE_LANDSCAPE_WIDTH = 640;
export const MOBILE = 414;

// 해상도 break point는 https://gs.statcounter.com/screen-resolution-stats/ 참조하였음.
export const breakPoints: BreakPoints = {
	mobile: `${MOBILE}px`, // 414x736
	mobileLandscape: `${MOBILE_LANDSCAPE_WIDTH}px`, // 640x360(360x640)
	tablet: `${TABLET_WIDTH}px`, // 810x1080
	tabletLandscape: `${TABLET_LANDSCAPE_WIDTH}px`, // 1280x800(800x1280)
	laptop: `${LAPTOP_WIDTH}px` // 1536x864
};
